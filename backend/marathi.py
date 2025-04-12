import logging
from dotenv import load_dotenv
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
    llm,
)
from livekit.plugins import silero
from livekit.plugins.google import tts
# from livekit.plugins.deepgram import tts
from livekit.plugins.deepgram import stt
from livekit.plugins.groq import LLM,STT
from livekit.plugins.elevenlabs import tts as eleven_tts
import os
from typing import Annotated, Optional
from livekit import agents
from livekit.plugins.turn_detector import EOUModel
from livekit.agents import metrics, tokenize
from livekit.agents.metrics import usage_collector
import re
import sqlite3
from hospital_db_driver import DatabaseDriver
import smtplib
from email.message import EmailMessage
from livekit.agents.voice_assistant import VoiceAssistant
import asyncio

# Load environment variables (only for GROQ_API_KEY)
load_dotenv(dotenv_path=".env")
logger = logging.getLogger("nurse-assistant")

# Global database instance
DB = DatabaseDriver()

# Email constants
EMAIL_SENDER = "aravsaxena884@gmail.com"
EMAIL_PASSWORD = "qovwbrbopzsghezk"  # Use your App Password here

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()

# deepgram_stt = stt.STT(
#     model="nova-2-general",
#     interim_results=True,
#     smart_format=True,
#     punctuate=True,
#     filler_words=True,
#     profanity_filter=False,
#     keywords=[("LiveKit", 1.5)],
#     language="en-in",
# )

# deepgram_tts = tts.TTS(
#     model="aura-asteria-en",
# )

# hindi_tts = eleven_tts.TTS(
#     model="eleven_multilingual_v2",
#     voice=eleven_tts.Voice(
#         id="eyVoIoi3vo6sJoHOKgAc",
#         name="Raghav – Skilled Hindi Support Specialist",
#         category="premade",
#         settings=eleven_tts.VoiceSettings(stability=0.71, similarity_boost=0.5, style=0.0, use_speaker_boost=True),
#     ),
#     language="hi",
#     streaming_latency=3,
#     enable_ssml_parsing=False,
#     chunk_length_schedule=[80, 120, 200, 260],
# )


# from livekit.plugins.cartesia import tts

# cartesia_tts = tts.TTS(
#     model="sonic-multilingual",  # Use the multilingual model that supports Hindi
#     voice="bdab08ad-4137-4548-b9db-6142854c7525",
#     language="hi",
#     emotion=["curiosity:high", "positivity:high"]
# )



# google_tts = tts.TTS(
#     language_code="mr-IN",  # Marathi - India
#     gender="female",
#     voice_name="mr-IN-Wavenet-A"  # or "mr-IN-Standard-A" depending on what's available
# )

google_tts = tts.TTS(
    language="hi-IN",  # Hindi - India
    gender="female",
    voice_name="hi-IN-Wavenet-A"  # Or "hi-IN-Standard-A"
)


main_stt = STT.with_groq(model="whisper-large-v3-turbo", language="hi")
class HospitalAssistantFnc(llm.FunctionContext):
    def __init__(self):
        super().__init__()
        self.current_patient = {}

    @llm.ai_callable(description="Register a new patient with their contact and insurance information")
    async def create_patient(
        self,
        name: Annotated[str, llm.TypeInfo(description="Patient's full name")],
        phone: Annotated[str, llm.TypeInfo(description="Patient's phone number (e.g., +919876543210)")],
        email: Annotated[str, llm.TypeInfo(description="Patient's email address")],
        insurance_provider: Annotated[Optional[str], llm.TypeInfo(description="Patient's insurance provider (if applicable)")],
        insurance_number: Annotated[Optional[str], llm.TypeInfo(description="Patient's insurance policy number (if applicable)")],
    ) -> str:
        logger.info("Creating patient - name: %s, phone: %s, email: %s", name, phone, email)
        if not re.match(r'^(?:\+91[-\s]?)?[6789]\d{9}$', phone):
            return "Please provide a valid phone number (e.g., +919876543210)"
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return "Please provide a valid email address (e.g., example@domain.com)"
        
        result, error = DB.create_patient(name, phone, email, insurance_provider, insurance_number)
        if result is None:
            return error
        
        self.current_patient = {
            "id": result.id,
            "name": result.name,
            "phone": result.phone,
            "email": result.email
        }
        return "Patient registered successfully. How can I assist you further?"

    @llm.ai_callable(description="Book an appointment for a patient with a specific specialty")
    async def book_appointment(
        self,
        specialty: Annotated[str, llm.TypeInfo(description="Medical specialty (e.g., Cardiology, Neurology)")],
        preferred_date: Annotated[str, llm.TypeInfo(description="Preferred date (YYYY-MM-DD format)")],
        preferred_time: Annotated[str, llm.TypeInfo(description="Preferred time (HH:MM format)")],
    ) -> str:
        logger.info("Booking appointment - specialty: %s, date: %s, time: %s", specialty, preferred_date, preferred_time)
        if not self.current_patient.get("id"):
            return "Please register patient details first using your name, phone, and email."
        
        patient_id = self.current_patient["id"]
        result, error = DB.create_booking(patient_id, specialty, preferred_date, preferred_time)
        if result is None:
            return f"Failed to book appointment: {error}"
        
        booking = result
        email_sent = self.send_confirmation_email(self.current_patient['email'], booking)
        self.current_patient = {}  # Clear after booking
        
        if email_sent:
            return f"Great! Your appointment (#{booking.id}) has been confirmed for {preferred_date} at {preferred_time} with a {specialty}. You'll receive a confirmation email."
        else:
            return f"Great! Your appointment (#{booking.id}) has been confirmed for {preferred_date} at {preferred_time} with a {specialty}. However, there was an issue sending the confirmation email. Please check your email later or contact us if you don’t receive it."

    def send_confirmation_email(self, patient_email: str, booking: 'Booking') -> bool:
        try:
            msg = EmailMessage()
            msg['Subject'] = "Appointment Reminder"
            msg['From'] = EMAIL_SENDER
            msg['To'] = patient_email
            msg.set_content(f"Hello {self.current_patient['name']}, your appointment is scheduled for {booking.preferred_date} at {booking.preferred_time} with a {booking.specialty}.")
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(EMAIL_SENDER, EMAIL_PASSWORD)
                server.send_message(msg)
            logger.info(f"Confirmation email sent to {patient_email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to {patient_email}: {e}")
            return False

    @llm.ai_callable(description="Check if a patient has health insurance by phone number")
    async def check_insurance(
        self,
        phone: Annotated[str, llm.TypeInfo(description="Patient's phone number")],
    ) -> str:
        logger.info("Checking insurance - phone: %s", phone)
        patient = DB.get_patient_by_phone(phone)
        if patient is None:
            return "No patient found with that phone number."
        if patient.insurance_provider and patient.insurance_number:
            return f"The patient has insurance with {patient.insurance_provider}, policy number {patient.insurance_number}."
        return "The patient does not have insurance information on record."

    @llm.ai_callable(description="Suggest a specialist based on symptoms")
    async def suggest_specialist(
        self,
        symptoms: Annotated[str, llm.TypeInfo(description="Description of symptoms")],
    ) -> str:
        logger.info("Suggesting specialist - symptoms: %s", symptoms)
        specialties = DB.get_specialties_for_symptoms(symptoms)
        if not specialties:
            return "I'm not sure which specialist to suggest. Please provide more details or consider seeing a General Physician."
        
        specialty = specialties[0]  # Take first match
        doctors = DB.get_doctors_by_specialty(specialty)
        if not doctors:
            return f"No doctors available for {specialty}."
        
        doctor_names = ", ".join([f"Dr. {doctor.name}" for doctor in doctors])
        return f"Based on your symptoms, I suggest seeing a {specialty}, such as {doctor_names}."

    @llm.ai_callable(description="Check upcoming appointments for a patient by phone number")
    async def check_appointments(
        self,
        phone: Annotated[str, llm.TypeInfo(description="Patient's phone number")],
    ) -> str:
        logger.info("Checking appointments - phone: %s", phone)
        bookings = DB.get_upcoming_bookings_by_phone(phone)
        if not bookings:
            return "You have no upcoming appointments."
        appointment_list = "\n".join([f"- Appointment #{booking.id} with {booking.specialty} on {booking.preferred_date} at {booking.preferred_time}" for booking in bookings])
        return f"You have the following upcoming appointments:\n{appointment_list}"

    @llm.ai_callable(description="Cancel an appointment by phone number and date")
    async def cancel_appointment_by_date(
        self,
        phone: Annotated[str, llm.TypeInfo(description="Patient's phone number")],
        preferred_date: Annotated[str, llm.TypeInfo(description="Date of the appointment to cancel (YYYY-MM-DD)")],
    ) -> str:
        logger.info("Canceling appointment - phone: %s, date: %s", phone, preferred_date)
        booking = DB.get_booking_by_phone_and_date(phone, preferred_date)
        if not booking:
            return "No confirmed appointment found for that date."
        success = DB.cancel_booking(booking.id)
        if success:
            return f"Your appointment on {preferred_date} has been canceled successfully."
        else:
            return "Failed to cancel appointment. Please try again."

async def entrypoint(ctx: JobContext):
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    initial_ctx = llm.ChatContext().append(
        role="system",
        text=(
            "आपण सिम्बायोसिस हॉस्पिटलसाठी एक अनुभवी आणि दयाळू नर्स सहाय्यक रिया आहात. "
            "नेहमी नमूद करा की मी सिम्बायोसिस हॉस्पिटलची नर्स सहाय्यक रिया आहे आणि रुग्णांच्या आरोग्य पुनर्प्राप्तीस मदत करण्यासाठी येथे आहे. "
            "(महत्त्वाचे) इमोजी किंवा विशेष वर्ण वापरू नका. "
            "सर्वप्रथम, रुग्णाला विचारा की त्यांना **गंभीर दुखापतींचे तज्ञ उपचार, मानसिक आरोग्य समर्थन, किंवा भेटीची बुकिंग** हवी आहे का. "
            "(महत्त्वाचे) रुग्णांना समजुतीने ऐका, त्यांचे लक्षणे विश्लेषित करा, आणि योग्य उपचारांसाठी मार्गदर्शन करा. "
            "आपण आमच्या तज्ज्ञ डॉक्टर आणि समुपदेशक टीमसोबत समन्वय साधता आणि आवश्यक असल्यास आपत्कालीन सेवा सुचवता.\n\n"

            "### आपल्या प्राथमिक भूमिका:\n"
            "1. **गंभीर दुखापती आणि पुनर्वसन:**\n"
            "   - हाड मोडणे, स्नायू किंवा सांध्यांचे दुखणे, जळजळ, खोल जखमा, रक्तस्त्राव इत्यादी दुखापतींचे प्राथमिक निदान व सल्ला देणे\n"
            "   - आवश्यक असल्यास रुग्णाला ऑर्थोपेडिक तज्ज्ञ किंवा सर्जनकडे पाठवणे\n"
            "   - त्वरित औषधोपचार किंवा पुनर्वसन सेवा सुचवणे\n"
            "   - बँडेज, सुतूर, फ्रॅक्चर सपोर्ट आणि पोस्ट-ऑपरेटिव्ह केअरबद्दल माहिती देणे\n\n"
            
            "2. **मानसिक आरोग्य आणि भावनिक आधार:**\n"
            "   - नैराश्य, चिंता, मानसिक तणावासाठी विशिष्ट मार्गदर्शन देणे\n"
            "   - गंभीर मानसिक असंतुलन, आत्महानीच्या भावना असल्यास तातडीने मानसोपचार तज्ञांकडे रुग्णाला संदर्भित करणे\n"
            "   - PTSD (Post-Traumatic Stress Disorder), झोपेचे विकार, आणि दीर्घकालीन मानसिक अस्वस्थता असलेल्या रुग्णांसाठी योग्य उपचार सुचवणे\n"
            "   - गरज असल्यास, समुपदेशक तज्ज्ञांसोबत रुग्णाची भेट बुक करणे\n\n"
            
            "3. **तातडीची वैद्यकीय मदत आणि भेटी बुक करणे:**\n"
            "   - लक्षणांनुसार तज्ज्ञ डॉक्टर सुचवणे (उदा. फिजिओथेरपिस्ट, न्यूरोलॉजिस्ट, मानसोपचारतज्ज्ञ)\n"
            "   - रुग्णाची संपूर्ण माहिती गोळा करणे: नाव, फोन नंबर, ईमेल, आरोग्य विम्याची माहिती\n"
            "   - विमा असल्यास, त्याचा प्रदाता व पॉलिसी क्रमांक नोंद करणे\n"
            "   - रुग्णाच्या गरजेनुसार अपॉइंटमेंटची तारीख आणि वेळ निश्चित करणे\n"
            "   - अत्यावश्यक स्थितीत, त्वरित आपत्कालीन सेवेशी संपर्क साधण्यास मदत करणे\n\n"

            "### गंभीर दुखापतींसाठी मार्गदर्शन:\n"
            "- **मोठ्या रक्तस्त्रावासह जखम असल्यास:** त्वरीत दाब द्या आणि नजीकच्या तातडीच्या कक्षात जाण्याचा सल्ला द्या.\n"
            "- **हाड मोडण्याची शक्यता असल्यास:** हालचाल मर्यादित ठेवा आणि ऑर्थोपेडिक तज्ज्ञाशी त्वरित संपर्क साधा.\n"
            "- **डोके किंवा मणक्याला गंभीर इजा झाल्यास:** कोणताही हालचाल करू नका आणि तातडीने न्यूरोलॉजिस्टशी संपर्क साधा.\n"
            "- **जळजळ झाल्यास:** प्रभावित भाग थंड पाण्याने धुवा आणि आवश्यक असल्यास त्वचारोगतज्ज्ञाकडे पाठवा.\n\n"

            "### मानसिक आरोग्यासाठी मार्गदर्शन:\n"
            "- **अत्यंत तणाव किंवा झोपेचे विकार असल्यास:** समुपदेशक वा मानसोपचारतज्ज्ञ यांना भेटण्याचा सल्ला द्या.\n"
            "- **आत्महानीच्या भावना असल्यास:** त्वरित मानसोपचारतज्ज्ञाची भेट बुक करण्यास मदत करा आणि रुग्णाला एकटं राहू देऊ नका.\n"
            "- **PTSD किंवा दीर्घकालीन चिंता असल्यास:** मानसोपचारतज्ज्ञ व तणाव व्यवस्थापन तंत्रांबद्दल माहिती द्या.\n"
            "- **बाल मानसोपचार हवे असल्यास:** बाल मानसोपचार तज्ज्ञांची भेट बुक करा.\n\n"

            "### संचार शैली:\n"
            "- औपचारिक व व्यावसायिक मराठी वापरा (उदा. 'कृपया आपल्या दुखापतीची माहिती सांगा')\n"
            "- आत्मीय, संयमी आणि विश्वासार्ह संवाद ठेवा\n"
            "- लहान, स्पष्ट आणि अचूक वाक्य वापरा जेणेकरून रुग्णाला सहज समजेल\n"
            "- तणावाखालील रुग्णांशी संवाद साधताना शांतपणे आणि सहानुभूतीने बोला\n\n"

            "(महत्त्वाचे) सर्व उत्तरे मराठीत द्या आणि रुग्णाच्या गंभीर परिस्थितींवर अधिक लक्ष केंद्रित करा."
        ),
    )


    fnc_ctx = HospitalAssistantFnc()
    llm_instance = LLM(model="gemma2-9b-it", api_key=os.getenv("GROQ_API_KEY"))

    agent = VoiceAssistant(
        vad=silero.VAD.load(),
        stt=main_stt,
        chat_ctx=initial_ctx,
        llm=llm_instance,
        fnc_ctx=fnc_ctx,
        tts=google_tts,
        turn_detector=EOUModel(),
    )

    async def handle_chat_message(message, chat_ctx, llm, agent, fnc_ctx):
        chat_ctx.append(role="user", text=message)
        response = await llm.chat(chat_ctx, fnc_ctx=fnc_ctx)
        if response:
            chat_ctx.append(role="assistant", text=response)
            await agent.say(response)
            await ctx.room.localParticipant.publish_data(response.encode("utf-8"), topic="chat")

    def on_data_received(payload, topic, participant):
        if topic == "chat" and participant != ctx.room.localParticipant:
            message = payload.decode("utf-8")
            asyncio.create_task(handle_chat_message(message, initial_ctx, llm_instance, agent, fnc_ctx))

    ctx.room.on("data_received", on_data_received)

    agent.start(ctx.room)
    usage_collector = metrics.UsageCollector()

    @agent.on("metrics_collected")
    def _on_metrics_collected(mtrcs: metrics.AgentMetrics):
        metrics.log_metrics(mtrcs)
        usage_collector.collect(mtrcs)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: ${summary}")

    ctx.add_shutdown_callback(log_usage)

    await agent.say("मी रिया, सिम्बायोसिस रुग्णालयातील एक करुणामय नर्स सहाय्यक आहे.", allow_interruptions=True)

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
        )
    )