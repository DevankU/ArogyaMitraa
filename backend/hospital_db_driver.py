import sqlite3
from typing import Optional, List, Tuple
from dataclasses import dataclass
from contextlib import contextmanager
from datetime import datetime

@dataclass
class Patient:
    id: int
    name: str
    phone: str
    email: str
    insurance_provider: Optional[str]
    insurance_number: Optional[str]

@dataclass
class Doctor:
    id: int
    name: str
    specialty: str
    availability: str

@dataclass
class Booking:
    id: int
    patient_id: int
    doctor_id: int
    specialty: str
    preferred_date: str
    preferred_time: str
    status: str

@dataclass
class SymptomSpecialty:
    id: int
    symptom_keyword: str
    specialty: str

class DatabaseDriver:
    def __init__(self, db_path: str = "hospital.db"):
        self.db_path = db_path
        self._init_db()

    @contextmanager
    def _get_connection(self):
        conn = sqlite3.connect(self.db_path)
        try:
            yield conn
        finally:
            conn.close()

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            # Patients table
            cursor.execute("""CREATE TABLE IF NOT EXISTS patients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL,
                insurance_provider TEXT,
                insurance_number TEXT)""")
            # Doctors table
            cursor.execute("""CREATE TABLE IF NOT EXISTS doctors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                specialty TEXT NOT NULL,
                availability TEXT)""")
            # Bookings table
            cursor.execute("""CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                patient_id INTEGER,
                doctor_id INTEGER,
                specialty TEXT NOT NULL,
                preferred_date TEXT NOT NULL,
                preferred_time TEXT NOT NULL,
                status TEXT,
                FOREIGN KEY (patient_id) REFERENCES patients(id),
                FOREIGN KEY (doctor_id) REFERENCES doctors(id))""")
            # Symptom-specialty table
            cursor.execute("""CREATE TABLE IF NOT EXISTS symptom_specialty (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                symptom_keyword TEXT NOT NULL,
                specialty TEXT NOT NULL)""")
            conn.commit()
            self._populate_default_data(cursor)
            conn.commit()

    def _populate_default_data(self, cursor):
        cursor.execute("SELECT COUNT(*) FROM doctors")
        if cursor.fetchone()[0] == 0:
            default_doctors = [
                ("Rajesh Sharma", "Cardiologist", "10am to 10pm"),
                ("Priya Patel", "Neurologist", "9am to 8pm"),
                ("Arun Gupta", "Psychiatrist", "10am to 10pm"),
                ("Sunita Reddy", "Pediatrician", "10am to 10pm"),
                ("Vikram Kumar", "General Physician", "10am to 10pm"),
                ("Anjali Singh", "Dermatologist", "11am to 9pm"),
                ("Ravi Verma", "Orthopedic Surgeon", "8am to 6pm"),
                ("Meena Desai", "Gynecologist", "9am to 7pm"),
                ("Suresh Nair", "Ophthalmologist", "10am to 8pm"),
                ("Pooja Mehta", "ENT Specialist", "11am to 9pm"),
                ("Amitabh Bachchan", "Cardiologist", "10am to 10pm"),
                ("Kareena Kapoor", "Neurologist", "9am to 8pm"),
                ("Shah Rukh Khan", "Psychiatrist", "10am to 10pm"),
                ("Deepika Padukone", "Pediatrician", "10am to 10pm"),
                ("Ranveer Singh", "General Physician", "10am to 10pm"),
                ("Alia Bhatt", "Dermatologist", "11am to 9pm"),
                ("Varun Dhawan", "Orthopedic Surgeon", "8am to 6pm"),
                ("Katrina Kaif", "Gynecologist", "9am to 7pm"),
                ("Salman Khan", "Ophthalmologist", "10am to 8pm"),
                ("Aishwarya Rai", "ENT Specialist", "11am to 9pm"),
            ]
            cursor.executemany("INSERT INTO doctors (name, specialty, availability) VALUES (?, ?, ?)", default_doctors)
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
            ]
            cursor.executemany("INSERT INTO symptom_specialty (symptom_keyword, specialty) VALUES (?, ?)", default_symptoms)

    def create_patient(self, name: str, phone: str, email: str, insurance_provider: Optional[str], insurance_number: Optional[str]) -> Tuple[Optional[Patient], Optional[str]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            try:
                cursor.execute("""INSERT INTO patients (name, phone, email, insurance_provider, insurance_number)
                                  VALUES (?, ?, ?, ?, ?)""", (name, phone, email, insurance_provider, insurance_number))
                conn.commit()
                patient_id = cursor.lastrowid
                return Patient(id=patient_id, name=name, phone=phone, email=email, insurance_provider=insurance_provider, insurance_number=insurance_number), None
            except sqlite3.IntegrityError:
                return None, "A patient with this phone number already exists."

    def get_patient_by_phone(self, phone: str) -> Optional[Patient]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM patients WHERE phone = ?", (phone,))
            row = cursor.fetchone()
            if not row:
                return None
            return Patient(id=row[0], name=row[1], phone=row[2], email=row[3], insurance_provider=row[4], insurance_number=row[5])

    def create_booking(self, patient_id: int, specialty: str, preferred_date: str, preferred_time: str) -> Tuple[Optional[Booking], Optional[str]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            try:
                booking_datetime = datetime.strptime(f"{preferred_date} {preferred_time}", "%Y-%m-%d %H:%M")
                if booking_datetime < datetime.now():
                    return None, "The preferred date and time must be in the future."
            except ValueError:
                return None, "Invalid date or time format. Please use YYYY-MM-DD for date and HH:MM for time."
            cursor.execute("SELECT id FROM doctors WHERE specialty = ? LIMIT 1", (specialty,))
            doctor_row = cursor.fetchone()
            if not doctor_row:
                return None, f"No doctors available for the specialty: {specialty}"
            doctor_id = doctor_row[0]
            try:
                cursor.execute("""INSERT INTO bookings (patient_id, doctor_id, specialty, preferred_date, preferred_time, status)
                                  VALUES (?, ?, ?, ?, ?, ?)""", (patient_id, doctor_id, specialty, preferred_date, preferred_time, "confirmed"))
                conn.commit()
                booking_id = cursor.lastrowid
                return Booking(id=booking_id, patient_id=patient_id, doctor_id=doctor_id, specialty=specialty, preferred_date=preferred_date, preferred_time=preferred_time, status="confirmed"), None
            except sqlite3.IntegrityError:
                return None, "Failed to create booking. Please check patient and doctor details."

    def get_specialties_for_symptoms(self, symptom_description: str) -> List[str]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT symptom_keyword, specialty FROM symptom_specialty")
            keyword_specialty = {row[0].lower(): row[1] for row in cursor.fetchall()}
            description_lower = symptom_description.lower()
            matched_specialties = set()
            for keyword in keyword_specialty:
                if keyword in description_lower:
                    matched_specialties.add(keyword_specialty[keyword])
            return list(matched_specialties)

    def get_doctors_by_specialty(self, specialty: str) -> List[Doctor]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, specialty, availability FROM doctors WHERE specialty = ?", (specialty,))
            rows = cursor.fetchall()
            return [Doctor(id=row[0], name=row[1], specialty=row[2], availability=row[3]) for row in rows]

    def get_upcoming_bookings_by_phone(self, phone: str) -> List[Booking]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""SELECT b.id, b.patient_id, b.doctor_id, b.specialty, b.preferred_date, b.preferred_time, b.status
                              FROM bookings b
                              JOIN patients p ON b.patient_id = p.id
                              WHERE p.phone = ? AND b.preferred_date >= date('now') AND b.status = 'confirmed'
                              ORDER BY b.preferred_date, b.preferred_time""", (phone,))
            rows = cursor.fetchall()
            return [Booking(id=row[0], patient_id=row[1], doctor_id=row[2], specialty=row[3], preferred_date=row[4], preferred_time=row[5], status=row[6]) for row in rows]

    def get_booking_by_phone_and_date(self, phone: str, preferred_date: str) -> Optional[Booking]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""SELECT b.id, b.patient_id, b.doctor_id, b.specialty, b.preferred_date, b.preferred_time, b.status
                              FROM bookings b
                              JOIN patients p ON b.patient_id = p.id
                              WHERE p.phone = ? AND b.preferred_date = ? AND b.status = 'confirmed'""", (phone, preferred_date))
            row = cursor.fetchone()
            if not row:
                return None
            return Booking(id=row[0], patient_id=row[1], doctor_id=row[2], specialty=row[3], preferred_date=row[4], preferred_time=row[5], status=row[6])

    def cancel_booking(self, booking_id: int) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE bookings SET status = 'canceled' WHERE id = ? AND status = 'confirmed'", (booking_id,))
            conn.commit()
            return cursor.rowcount > 0