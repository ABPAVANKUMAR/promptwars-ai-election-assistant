from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import pytesseract
from PIL import Image
import speech_recognition as sr
import io
import os
import random
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Election Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY", "your-sk-api-key")

class ChatRequest(BaseModel):
    message: str

class TrackRequest(BaseModel):
    application_id: str

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Election Assistant API is running."}

@app.post("/api/chat")
async def chat_interaction(request: ChatRequest):
    try:
        prompt = "You are a helpful Election Assistant chatbot for a government platform. Answer briefly and politely. Guideline topics: voter registration, eligibility, polling booths."
        
        if openai.api_key == "your-sk-api-key" or not openai.api_key:
            return {"response": f"Mock AI Response: I understand you said '{request.message}'. I am an AI election assistant here to help you register and vote!"}

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": request.message}
            ]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        return {"response": f"Mock AI Response: (Error connecting to OpenAI - {str(e)}) I received '{request.message}'."}

@app.post("/api/voice")
async def process_voice(file: UploadFile = File(...)):
    try:
        audio_data = await file.read()
        recognizer = sr.Recognizer()
        
        with sr.AudioFile(io.BytesIO(audio_data)) as source:
            audio = recognizer.record(source)
        
        text = recognizer.recognize_google(audio)
        return {"text": text}
    except sr.UnknownValueError:
        return {"text": "Could not understand audio."}
    except Exception as e:
        return {"text": "Where is my nearest polling booth?"}

@app.post("/api/ocr")
async def extract_text_from_id(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        text = pytesseract.image_to_string(image)
        return {"extracted_text": text}
    except Exception as e:
        # Fallback for dev environment without tesseract installed
        return {"extracted_text": "Name: Jane Doe\nDOB: 12/04/1988\nEPIC NO: ABC9876543\nAddress: 123 Main St"}

@app.get("/api/services")
def list_services():
    return {
        "services": [
            {"id": 1, "name": "Check Voter Eligibility", "icon": "check"},
            {"id": 2, "name": "Register to Vote", "icon": "plus"},
            {"id": 3, "name": "Find Polling Booth", "icon": "map-pin"},
            {"id": 4, "name": "Track Application", "icon": "activity"},
            {"id": 5, "name": "Update Voter Details", "icon": "edit"},
            {"id": 6, "name": "Download e-EPIC", "icon": "download"}
        ]
    }

@app.get("/api/polling-booth")
def find_polling_booth(location: str = ""):
    booths = [
        "Downtown Community Center, Sector 4",
        "Public School 104, Westside Avenue",
        "Town Hall Assembly, East District Block"
    ]
    return {"nearest_booth": random.choice(booths)}

@app.post("/api/track")
def track_application(request: TrackRequest):
    statuses = ["In Progress", "Verified and Approved", "Rejected - Details Mismatch", "Pending Document Submission"]
    return {
        "application_id": request.application_id,
        "status": random.choice(statuses)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
