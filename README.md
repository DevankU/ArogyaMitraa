![ArogyaMitra Banner](https://github.com/user-attachments/assets/c4ae9ba9-312e-4096-a32c-0434ca17b80b)

# 🩺 ArogyaMitra: Your AI-Powered Virtual Nurse

> **Empowering Accessible Healthcare Through AI + Voice + Vision**

---

## 🌐 Overview

**ArogyaMitra** is an AI-driven virtual healthcare assistant designed to provide multilingual, real-time medical assistance using advanced speech recognition, computer vision, and intelligent automation. It supports diagnosis via image uploads, voice-based symptom checks, doctor appointment booking, and emotional wellness support — all from one smart, seamless interface.

---

## 🛣️ User Journey

1. **Landing Page**: User visits the ArogyaMitra homepage and selects a preferred language (English, Hindi, Marathi, Tamil, Punjabi).
2. **Authentication**: User signs up or logs in securely.
3. **Personalized Dashboard**:
   - 🤖 ArogyaBot (chat for health queries)
   - 🎙️ Voice Assistant (multilingual interaction)
   - 📸 Upload Photo (for injury, skin, or dental diagnosis)
   - 🧘 Meditation Zone (guided audio sessions)
   - 📅 Book Appointment
   - 📊 Track Health History
4. **Interaction**:
   - Users speak or chat for medical advice.
   - Upload images for wound/skin analysis.
   - Book a specialist visit directly.
   - Relax and de-stress via audio wellness sessions.
5. **Smart Tracking**: Health activity and progress are tracked and displayed in the user dashboard.

---

## ⚙️ Tech Stack & Architecture

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js |
| **Backend/API** | FastAPI, Node.js |
| **AI Models** | Python (Custom-trained models) |
| **Multilingual STT/TTS** | Whisper (Groq), Deepgram, Google TTS |
| **Database** | Convex (state mgmt), SQL |
| **Authentication** | Auth API |
| **Deployment** | Docker |
| **Others** | Google Calendar API, Twilio, SMTP, Phidata |

---

## 🚀 Key Features

- 🎙️ **Voice-Based Symptom Checker**  
  Speak your symptoms in your native language and get AI-powered responses.

- 🖼️ **Image-Based Diagnosis**  
  Upload photos for skin, dental, or injury assessments using custom-trained vision models.

- 📞 **Multilingual Mental Health Support**  
  Voice-to-voice conversation in 5 languages for stress, anxiety, and emotional support.

- 📅 **Automated Appointment Scheduler**  
  Book doctor appointments with reminders via email/SMS.

- 📊 **Health Tracker & Reminders**  
  Monitor symptoms, medications, and chronic condition progress.

- 🧘 **Meditation & Mental Wellness Zone**  
  Access audio-guided meditation sessions for a calming experience.

---

## 🧪 Use Cases

### ✅ Symptom Check & Skin Analysis
**Scenario**: User uploads a skin rash image.  
**Action**: ArogyaMitra analyzes and suggests possible conditions + appointment links.  
**Benefit**: Immediate first-response care and reduced unnecessary doctor visits.

### 🗣️ Voice Interaction in Native Language
**Scenario**: A Hindi-speaking user feels anxious.  
**Action**: ArogyaMitra converts voice to text, offers support, and mental health resources.  
**Benefit**: Lowers the barrier to care through accessible, inclusive communication.

### 🩹 First-Aid for Injury
**Scenario**: A user injures their hand.  
**Action**: Uploads photo → AI guides with wound care or emergency instructions.  
**Benefit**: Fast, reliable advice before visiting the ER.

### 🧾 Personalized Health Monitoring
**Scenario**: A diabetic patient tracks their routine.  
**Action**: ArogyaMitra reminds for meds, logs symptoms, and monitors changes.  
**Benefit**: Better chronic condition management and proactive care.

### 🧑‍⚕️ Doctor Appointment Booking
**Scenario**: A user wants a specialist but is unsure which.  
**Action**: Based on health data, ArogyaMitra recommends a doctor and books via integrated scheduler.  
**Benefit**: Saves time, ensures the right care.

### 🔁 Post-Treatment Monitoring
**Scenario**: Post-surgery recovery at home.  
**Action**: ArogyaMitra shares recovery instructions, tracks symptoms, and follow-up reminders.  
**Benefit**: Reduces complications and improves recovery outcomes.

---

## 🧰 Installation & Setup

### 1. Clone the Repo
```bash
git clone https://github.com/arav7781/ArogyaMitra
cd ArogyaMitra
### 2. Install Dependencies

```bash
# Backend (FastAPI)
pip install -r requirements.txt

# Frontend (React)
cd client
npm install

### 3. Start the Application

```bash
# Backend
uvicorn main:app --reload

# Frontend
cd client
npm start

## 🔐 Authentication

ArogyaMitra uses secure Auth APIs to manage user sessions, login, and data privacy. User health records, activity, and preferences are stored safely with role-based access controls.

---

## 🐳 Docker Deployment

```bash
# Build Docker image
docker-compose build

# Run containers
docker-compose up

