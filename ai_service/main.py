from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel
from transformers import pipeline, BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch
import io

app = FastAPI(title="Grievance Classification API")

# Initialize models
print("Loading Text Classifier (BART)...")
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

print("Loading Image Captioner (BLIP)...")
blip_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

print("Loading AI Image Detector...")
# Using a popular AI image detection model
ai_image_detector = pipeline("image-classification", model="umm-maybe/AI-image-detector")

print("All models loaded successfully!")

class GrievanceRequest(BaseModel):
    text: str

class GrievanceResponse(BaseModel):
    category: str
    priority: str
    confidence: float
    description: str = ""

# Predefined categories
CATEGORIES = [
    "Road Issues",
    "Sewage Issues",
    "Waste & Garbage",
    "Water Supply",
    "Electricity & Lights",
    "Others"
]

PRIORITY_LABELS = ["High", "Medium", "Low"]

@app.get("/")
async def root():
    return {"message": "AI Classification Service is Running"}

@app.post("/classify", response_model=GrievanceResponse)
async def classify_grievance(request: GrievanceRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    
    result = run_classification(request.text)
    return result

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # 1. Read image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # 2. Generate Caption using BLIP directly
        print("Generating image caption...")
        inputs = blip_processor(image, return_tensors="pt")
        output = blip_model.generate(**inputs, max_new_tokens=50)
        caption = blip_processor.decode(output[0], skip_special_tokens=True)
        print(f"Caption: {caption}")

        # 3. Classify the caption
        result = run_classification(caption)
        result["description"] = caption
        
        return result
    except Exception as e:
        print(f"Error analyzing image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def run_classification(text: str):
    try:
        # Category
        category_result = classifier(text, candidate_labels=CATEGORIES)
        top_category = category_result['labels'][0]
        category_score = category_result['scores'][0]

        # Priority
        priority_prompt = "The priority of this issue is"
        priority_result = classifier(text, candidate_labels=PRIORITY_LABELS, hypothesis_template=priority_prompt + " {}.")
        top_priority = priority_result['labels'][0]

        return {
            "category": top_category,
            "priority": top_priority,
            "confidence": round(category_score, 4),
            "description": text
        }
    except Exception as e:
        print(f"Classification error: {e}")
        return {
            "category": "Others",
            "priority": "Low",
            "confidence": 0,
            "description": text
        }

@app.post("/detect-ai-image")
async def detect_ai_image(file: UploadFile = File(...)):
    """Detect if an uploaded image is AI-generated"""
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        
        results = ai_image_detector(image)
        print(f"\nRAW AI DETECTION RESULTS: {results}")
        
        # The model umm-maybe/AI-image-detector returns 'artificial' and 'human'
        # Some models use 'fake'/'real', 'synthetic', etc.
        ai_confidence = 0
        ai_labels = ['artificial', 'ai', 'fake', 'synthetic', 'generated']
        human_labels = ['human', 'real', 'natural']
        
        for result in results:
            label = result['label'].lower()
            if any(x in label for x in ai_labels):
                ai_confidence = max(ai_confidence, result['score'])
            elif any(x in label for x in human_labels):
                # If we find a human label, ai_confidence could be 1 - human_score
                # but only if we don't have a direct AI label
                pass

        # If no direct AI label was high, but human label is low, 
        # it might be AI. Let's be more aggressive.
        human_score = 0
        for result in results:
            if any(x in result['label'].lower() for x in human_labels):
                human_score = result['score']
        
        # If human score is low, it's likely AI
        if ai_confidence < (1 - human_score):
            ai_confidence = 1 - human_score

        is_ai_generated = ai_confidence > 0.4  # Lowering threshold to 0.4 for safety
        print(f"DECISION: is_ai={is_ai_generated}, conf={ai_confidence}\n")
        
        return {
            "is_ai_generated": is_ai_generated,
            "confidence": round(ai_confidence * 100, 2),
            "details": results
        }
    except Exception as e:
        print(f"AI Image Detection Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Using string reference to app for reload support
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
