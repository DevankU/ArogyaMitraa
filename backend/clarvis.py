# clarvis.py
from groq import Groq
from deepgram import DeepgramClient
import cv2
import base64
import logging
import threading
from queue import Queue
import json
import time
import re
import numpy as np
from typing import List, Dict, Optional


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Clarvis:
    def __init__(self, groq_api_key: str, deepgram_api_key: str):
        """Initialize Clarvis with API clients and configurations."""
        self.groq_client = Groq(api_key=groq_api_key)
        self.deepgram_client = DeepgramClient(deepgram_api_key)
        
        # Model configuration
        self.vision_model = "llama-3.2-90b-vision-preview"
        self.text_model = "gemma2-9b-it"
        self.max_retries = 3
        self.retry_delay = 1
        self.min_confidence = 0.82
        self.frame_queue = Queue(maxsize=3)
        self.result_queue = Queue(maxsize=3)
        self.running = False
        self.lock = threading.Lock()
        
        # Medical condition taxonomy
        self.condition_categories = {
            'injury': ['cut', 'burn', 'fracture', 'sprain', 'bruise'],
            'skin': ['rash', 'acne', 'eczema', 'psoriasis', 'infection'],
            'dental': ['cavity', 'cracked', 'abscess', 'discoloration'],
            'eye': ['conjunctivitis', 'stye', 'foreign object']
        }
        self.body_locations = {
            'head', 'neck', 'face', 'eye', 'mouth', 'arm', 
            'hand', 'chest', 'back', 'leg', 'foot', 'skin'
        }

    def start_processing(self, language: str = 'en') -> None:
        """Start the frame processing thread."""
        self.running = True
        threading.Thread(target=self._process_frames, args=(language,), daemon=True).start()

    def stop_processing(self) -> None:
        """Stop processing and clear queues."""
        with self.lock:
            self.running = False
            self._clear_queue(self.frame_queue)
            self._clear_queue(self.result_queue)

    def _process_frames(self, language: str) -> None:
        """Process frames from the queue."""
        while self.running:
            try:
                if not self.frame_queue.empty():
                    frame = self.frame_queue.get()
                    conditions = self.detect_conditions(frame)
                    if conditions:
                        guidance = self.generate_guidance(conditions, language)
                        audio = self.text_to_speech(guidance, language)
                        with self.lock:
                            self.result_queue.put({
                                'conditions': conditions,
                                'guidance': guidance,
                                'audio': audio
                            })
            except Exception as e:
                logger.error(f"Processing error: {str(e)}")
                time.sleep(self.retry_delay)

    def _clear_queue(self, q: Queue) -> None:
        """Clear a queue safely."""
        while not q.empty():
            try:
                q.get_nowait()
            except:
                continue

    def add_frame(self, frame: np.ndarray) -> None:
        """Add a frame to the processing queue."""
        if self.frame_queue.full():
            self.frame_queue.get()
        self.frame_queue.put(frame.copy())

    def get_results(self) -> dict:
        """Retrieve processing results."""
        return self.result_queue.get() if not self.result_queue.empty() else None

    def detect_conditions(self, frame: np.ndarray) -> List[Dict]:
        """Detect medical conditions using vision model."""
        base64_image = self._encode_image(frame)
        if not base64_image:
            return []

        vision_prompt = """Analyze this medical image with clinical precision. Identify any:
- Injuries (cuts, burns, fractures)
- Skin conditions (rashes, infections)
- Dental issues (cracks, discoloration)
- Eye problems (redness, swelling)

Respond in this exact JSON format:
{
    "conditions": [{
        "type": "Specific condition name",
        "category": "injury|skin|dental|eye",
        "location": "Specific body part",
        "severity": "mild|moderate|severe",
        "confidence": 0.0-1.0,
        "urgent": boolean
    }]
}"""

        for attempt in range(self.max_retries):
            try:
                response = self.groq_client.chat.completions.create(
                    model=self.vision_model,
                    messages=[{
                        "role": "user",
                        "content": [
                            {"type": "text", "text": vision_prompt},
                            {"type": "image_url", "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }}
                        ]
                    }],
                    temperature=0.1,
                    max_tokens=1000,
                    response_format={"type": "json_object"}
                )
                return self._parse_vision_response(response.choices[0].message.content)
            except Exception as e:
                logger.warning(f"Vision analysis failed (attempt {attempt+1}): {str(e)}")
                time.sleep(self.retry_delay * (2 ** attempt))
        return []

    def _parse_vision_response(self, response_text: str) -> List[Dict]:
        """Parse and validate the vision model response."""
        try:
            response = json.loads(response_text)
            valid_conditions = []
            for cond in response.get('conditions', []):
                if self._validate_condition(cond):
                    valid_conditions.append({
                        'type': cond['type'].lower(),
                        'category': cond['category'].lower(),
                        'location': cond['location'].lower(),
                        'severity': cond['severity'].lower(),
                        'confidence': round(float(cond['confidence']), 2),
                        'urgent': bool(cond['urgent'])
                    })
            return valid_conditions
        except Exception as e:
            logger.error(f"Response parsing failed: {str(e)}")
            return []

    def _validate_condition(self, condition: Dict) -> bool:
        """Validate a detected medical condition."""
        required = ['type', 'category', 'location', 'severity', 'confidence', 'urgent']
        if not all(key in condition for key in required):
            return False
        if condition['category'] not in self.condition_categories:
            return False
        if condition['location'] not in self.body_locations:
            return False
        return float(condition['confidence']) >= self.min_confidence

    def generate_guidance(self, conditions: List[Dict], language: str) -> str:
        """Generate medical guidance using Gemma2."""
        conditions_text = "\n".join(
            f"- {cond['type'].title()} ({cond['severity'].title()}) on {cond['location'].title()}"
            for cond in conditions
        )
        prompt = f"""Generate professional medical guidance for these conditions:
{conditions_text}

Include:
1. Immediate care steps
2. Recommended treatments
3. When to see a doctor
4. Prevention tips
Use clear, concise language under 250 words."""

        for attempt in range(self.max_retries):
            try:
                response = self.groq_client.chat.completions.create(
                    model=self.text_model,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.2,
                    max_tokens=600
                )
                return self._clean_guidance(response.choices[0].message.content)
            except Exception as e:
                logger.error(f"Guidance generation failed: {str(e)}")
                time.sleep(self.retry_delay)
        return "Medical guidance unavailable."

    def _clean_guidance(self, text: str) -> str:
        """Clean and format the guidance text."""
        text = re.sub(r'\*\*|\n{2,}', '', text)  # Remove markdown
        return '\n'.join(line.strip() for line in text.split('\n') if line.strip())

    def text_to_speech(self, text: str, language: str = 'en') -> Optional[bytes]:
        """Convert guidance to speech using Deepgram."""
        try:
            response = self.deepgram_client.speak.v("1").stream(
                {"text": text},
                {"model": "aura-luna-en", "encoding": "linear16", "container": "wav"}
            )
            return b''.join(response.stream)
        except Exception as e:
            logger.error(f"TTS failed: {str(e)}")
            return None

    def _encode_image(self, frame: np.ndarray) -> Optional[str]:
        """Encode frame to base64."""
        try:
            _, buffer = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 85])
            return base64.b64encode(buffer).decode('utf-8')
        except Exception as e:
            logger.error(f"Image encoding failed: {str(e)}")
            return None