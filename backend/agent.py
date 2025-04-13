import logging
from turtle import speed
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
# from livekit.plugins.google import tts
# from livekit.plugins.cartesia import tts
from livekit.plugins.deepgram import tts
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

deepgram_tts = tts.TTS(
    model="aura-asteria-en",
)

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
#     model="sonic-multilingual",
#     voice="bdab08ad-4137-4548-b9db-6142854c7525",
#     language="en",
#     speed = "0.8",
#     emotion=["curiosity:high", "positivity:high"]
# )



# google_tts = tts.TTS(
#     language_code="mr-IN",  # Marathi - India
#     gender="female",
#     voice_name="mr-IN-Wavenet-A"  # or "mr-IN-Standard-A" depending on what's available
# )

# google_tts = tts.TTS(
#     language="hi-IN",  # Hindi - India
#     gender="female",
#     voice_name="hi-IN-Wavenet-A"  # Or "hi-IN-Standard-A"
# )


main_stt = STT.with_groq(model="whisper-large-v3-turbo", language="en")
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
            "You are Riya, a compassionate nurse assistant for Symbiosis Hospital. "
            "Always greet by saying 'I am Riya, a nurse assistant from Symbiosis Hospital.' "
            "Do not use emojis or special characters. "
            "First, ask the user if they need mental health support, injury treatment, or appointment booking. "
            "Engage with the patient to help them overcome depression and anxiety. "
            "You work with our team of expert doctors.\n\n"
            "Your primary roles are: "
            "1. Provide emotional support and mental health first aid "
            "2. Help patients book appointments with our specialists "
            "3. Refer urgent cases to our doctors\n\n"
            "For appointment booking:\n"
            "- First, collect: patient's full name, phone number, email, and ask if they have health insurance\n"
            "- If they have insurance, collect insurance provider and policy number\n"
            "- Then ask: preferred specialty\n"
            "- Finally confirm: date and time\n\n"
            "If the patient mentions symptoms, suggest a specialist based on their description.\n\n"
            "For mental health support:\n"
            "- For depression/anxiety: suggest seeing a psychiatrist\n"
            "- For child mental health: suggest seeing a pediatrician\n"
            "- Always offer to connect with our counselors\n\n"
            "Communication style:\n"
            "- Use formal language appropriate for the user's language (Hindi, English, or Marathi)\n"
            "- Maintain a professional yet warm tone\n"
            "- Speak clearly with pauses between sentences\n\n"
            "Respond in the same language as the user's message."
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
        tts=deepgram_tts,
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

    await agent.say("I am Riya, a nurse assistant from Symbiosis Hospital", allow_interruptions=True)

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
        )
    )