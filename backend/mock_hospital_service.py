import re
from datetime import datetime
from typing import Dict, Optional, List
import smtplib
from email.message import EmailMessage

class MockHospitalService:
    def __init__(self, db_conn):
        self.db_conn = db_conn
        self.booking_counter = 1000
        # Email credentials for sending confirmation
        self.EMAIL_SENDER = "aravsaxena884@gmail.com"
        self.EMAIL_PASSWORD = "qovwbrbopzsghezk"  # Replace with a valid App Password
        self.initialize_database()

    def initialize_database(self):
        cursor = self.db_conn.cursor()
        # Insert default doctors if table is empty
        cursor.execute("SELECT COUNT(*) FROM doctors")
        if cursor.fetchone()[0] == 0:
            default_doctors = [
                ("Rajesh Sharma", "Cardiologist", "10am to 10pm"),
                ("Priya Patel", "Neurologist", "9am to 8pm"),
                ("Arun Gupta", "Psychiatrist", "10am to 10pm"),
                ("Sunita Reddy", "Pediatrician", "10am to 10pm"),
                ("Vikram Kumar", "General Physician", "10am to 10pm"),
                ("Anjali Joshi", "Orthopedic Surgeon", "10am to 10pm"),
                ("Rahul Nair", "Dermatologist", "10am to 10pm"),
                ("Meera Iyer", "Endocrinologist", "10am to 10pm"),
                ("Sanjay Choudhary", "Gastroenterologist", "10am to 10pm"),
                ("Neha Mehta", "Pulmonologist", "10am to 10pm"),
                ("Deepak Malhotra", "Oncologist", "10am to 10pm"),
                ("Kavita Srinivasan", "Gynecologist", "10am to 10pm"),
                ("Amitabh Banerjee", "Nephrologist", "10am to 10pm"),
                ("Shreya Chatterjee", "Rheumatologist", "12am to 10pm"),
                ("Rohit Khanna", "ENT Specialist", "11am to 10pm"),
            ]
            cursor.executemany("INSERT INTO doctors (name, specialty, availability) VALUES (?, ?, ?)", default_doctors)
        # Insert default symptom-specialty mappings if table is empty
        cursor.execute("SELECT COUNT(*) FROM symptom_specialty")
        if cursor.fetchone()[0] == 0:
            default_symptoms = [
                ("heart", "Cardiologist"),
                ("chest pain", "Cardiologist"),
                ("headache", "Neurologist"),
                ("dizziness", "Neurologist"),
                ("depression", "Psychiatrist"),
                ("anxiety", "Psychiatrist"),
                ("child", "Pediatrician"),
                ("skin", "Dermatologist"),
                ("stomach", "Gastroenterologist"),
                ("lung", "Pulmonologist"),
                ("cancer", "Oncologist"),
                ("pregnancy", "Gynecologist"),
                ("kidney", "Nephrologist"),
                ("joint pain", "Rheumatologist"),
                ("ear", "ENT Specialist"),
                ("nose", "ENT Specialist"),
                ("throat", "ENT Specialist"),
            ]
            cursor.executemany("INSERT INTO symptom_specialty (symptom_keyword, specialty) VALUES (?, ?)", default_symptoms)
        self.db_conn.commit()

    def validate_phone_number(self, phone: str) -> bool:
        phone_pattern = r'^(?:\+91[-\s]?)?[6789]\d{9}$'
        return bool(re.match(phone_pattern, phone))

    def validate_datetime(self, date_str: str, time_str: str) -> tuple[bool, str]:
        try:
            booking_datetime = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
            if booking_datetime < datetime.now():
                return False, "Cannot book appointments in the past"
            return True, "Valid date and time"
        except ValueError:
            return False, "Invalid date or time format"

    def send_confirmation_email(self, patient_email: str, booking: Dict) -> bool:
        try:
            msg = EmailMessage()
            msg['Subject'] = "Appointment Confirmation - Symbiosis Hospital"
            msg['From'] = self.EMAIL_SENDER
            msg['To'] = patient_email
            msg.set_content(f"""
Hello {booking['patient_name']},

Your appointment has been successfully booked with Symbiosis Hospital.

**Appointment Details:**
- **Booking ID:** {booking['booking_id']}
- **Type:** {booking['appointment_type']}
- **Date:** {booking['preferred_date']}
- **Time:** {booking['preferred_time']}
- **Phone:** {booking['phone']}

Please arrive 10 minutes early for your appointment. If you need to reschedule or cancel, kindly contact us.

Thank you,
Riya
Nurse Assistant, Symbiosis Hospital
""")
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(self.EMAIL_SENDER, self.EMAIL_PASSWORD)
                server.send_message(msg)
            print(f"Confirmation email sent to {patient_email}")
            return True
        except Exception as e:
            print(f"Failed to send email to {patient_email}: {e}")
            return False

    def check_insurance(self, name: str, phone: str) -> str:
        cursor = self.db_conn.cursor()
        cursor.execute("SELECT insurance_provider, insurance_number FROM patients WHERE name = ? AND phone = ?", (name, phone))
        result = cursor.fetchone()
        if result:
            provider, number = result
            if provider and number:
                return f"The patient has insurance with {provider}, policy number {number}."
            else:
                return "The patient does not have insurance information on record."
        else:
            return "No patient found with that name and phone number."

    def get_specialties_for_symptoms(self, symptom_description: str) -> List[str]:
        cursor = self.db_conn.cursor()
        cursor.execute("SELECT symptom_keyword, specialty FROM symptom_specialty")
        keyword_specialty = {row[0].lower(): row[1] for row in cursor.fetchall()}
        description_words = re.findall(r'\b\w+\b', symptom_description.lower())
        matched_specialties = set()
        for word in description_words:
            if word in keyword_specialty:
                matched_specialties.add(keyword_specialty[word])
        return list(matched_specialties)

    def get_doctors_by_specialty(self, specialty: str) -> List[tuple]:
        cursor = self.db_conn.cursor()
        cursor.execute("SELECT name, availability FROM doctors WHERE specialty = ?", (specialty,))
        return cursor.fetchall()

    def process_appointment(self, booking_data: Dict) -> Dict:
        cursor = self.db_conn.cursor()
        # Check if patient exists
        cursor.execute("SELECT id FROM patients WHERE phone = ?", (booking_data['phone'],))
        patient = cursor.fetchone()
        if patient:
            patient_id = patient[0]
            if 'insurance_provider' in booking_data and 'insurance_number' in booking_data:
                cursor.execute("UPDATE patients SET insurance_provider = ?, insurance_number = ? WHERE id = ?", 
                               (booking_data['insurance_provider'], booking_data['insurance_number'], patient_id))
        else:
            cursor.execute('''
            INSERT INTO patients (name, phone, email, insurance_provider, insurance_number)
            VALUES (?, ?, ?, ?, ?)
            ''', (booking_data['patient_name'], booking_data['phone'], booking_data['email'], 
                  booking_data.get('insurance_provider'), booking_data.get('insurance_number')))
            patient_id = cursor.lastrowid
        
        # Validate date and time
        date_str = booking_data.get('preferred_date')
        time_str = booking_data.get('preferred_time')
        if date_str and time_str:
            is_valid, message = self.validate_datetime(date_str, time_str)
            if not is_valid:
                return {
                    'success': False,
                   }
        # Create booking
        cursor.execute('''
        INSERT INTO bookings (patient_id, appointment_type, preferred_date, preferred_time, status)
        VALUES (?, ?, ?, ?, ?)
        ''', (patient_id, booking_data['appointment_type'], booking_data['preferred_date'], booking_data['preferred_time'], 'confirmed'))
        booking_id = cursor.lastrowid
        self.db_conn.commit()
        
        # Send confirmation email if email is provided
        email_sent = False
        if 'email' in booking_data:
            email_sent = self.send_confirmation_email(booking_data['email'], {
                'booking_id': booking_id,
                'patient_name': booking_data['patient_name'],
                'appointment_type': booking_data['appointment_type'],
                'preferred_date': booking_data['preferred_date'],
                'preferred_time': booking_data['preferred_time'],
                'phone': booking_data['phone']
            })
        
        return {
            'success': True,
            'booking_id': booking_id,
            'email_sent': email_sent,
            'message': 'Appointment confirmed'
        }