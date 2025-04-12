# 🩺 ArogyaMitra: AI-Powered Virtual Nurse Assistant

![Project Banner](https://github.com/user-attachments/assets/c4ae9ba9-312e-4096-a32c-0434ca17b80b)  
*"Democratizing healthcare access through AI-powered voice and vision"*

---

## 🌟 Table of Contents
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🏗️ System Architecture](#-system-architecture)
- [💻 Installation](#-installation)
- [🐳 Docker Deployment](#-docker-deployment)
- [📥 Supported Input Methods](#-supported-input-methods)
- [🗣️ Multilingual Interaction Support](#-multilingual-interaction-support)
- [🔄 Example Interaction Flow](#-example-interaction-flow)

---

## ✨ Key Features

### 🤖 Core Capabilities

| Feature                     | Description                                               |
|----------------------------|-----------------------------------------------------------|
| **Multilingual Voice Interface** | Speech-to-text in 5 Indian languages with symptom analysis |
| **Visual Diagnosis**       | Skin/wound assessment via custom CNN models (85%+ accuracy) |
| **Smart Health Tracking**  | Medication reminders + chronic condition monitoring       |
| **Auto-Appointment Booking** | Integrated with 500+ hospitals via Google Calendar API  |
| **Mental Wellness Hub**    | Voice-guided meditation + emotional support chatbot       |

### 🚨 Emergency Features

- Instant first-aid instructions for injuries  
- Critical symptom detection alerts  
- Nearest hospital GPS mapping  

---

## 🛠️ Tech Stack

### Core Components

| Layer        | Technologies                            |
|--------------|-----------------------------------------|
| **Frontend** | React.js, TailwindCSS, ShadCN/ui        |
| **Backend**  | FastAPI (Python), Node.js, Convex DB    |
| **AI/ML**    | PyTorch, Whisper STT, Google TTS        |
| **APIs**     | Twilio SMS, Google Calendar, Deepgram   |
| **DevOps**   | Docker, GitHub Actions, Prometheus      |

### Model Specifications

| Model Type             | Architecture   | Training Data                    |
|------------------------|----------------|----------------------------------|
| Skin Lesion Classifier | ArogyaBot-1o   | ISIC 2020 Dataset (25k images)   |
| Wound Severity Analyzer| ArogyaBot-1o   | Custom dataset (8k trauma images)|
| Speech Recognition     | Whisper Large-v3 | Multilingual medical corpus   |

---


**## 💻 Installation**

### Prerequisites

- **Python** **3.11+**
- **Node.js** **18.15+**
- **Redis Server** **7.2+**
- **FFmpeg** **6.0+**

### Local Setup

```bash
# Clone repository
git clone https://github.com/arav7781/ArogyaMitra
cd ArogyaMitra

# Install Python dependencies
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup frontend
cd client
npm install
npm run build

# Configure environment variables
cp .env.example .env


## 🐳 Docker Deployment

```bash
docker-compose -f docker-compose.prod.yml up --build
