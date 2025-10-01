from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI(title="Product Transparency AI Service - FREE VERSION")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# FREE Hugging Face API
HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
HF_API_URL = "https://api-inference.huggingface.co/models/"

# Using FREE models
QUESTION_MODEL = "google/flan-t5-large"  # FREE, good for question generation
SCORING_MODEL = "facebook/bart-large-mnli"  # FREE, good for analysis

class ProductContext(BaseModel):
    product_name: str
    brand: str
    category: str
    user_concerns: Optional[List[str]] = []

class QuestionResponse(BaseModel):
    questions: List[dict]
    reasoning: str

class TransparencyScoreRequest(BaseModel):
    product_name: str
    answers: List[dict]

class TransparencyScoreResponse(BaseModel):
    overall_score: float
    category_scores: dict
    recommendations: List[str]
    strengths: List[str]
    weaknesses: List[str]


def get_template_question(category: str, context: ProductContext) -> str:
    """Fallback template questions - always works, no API needed"""
    templates = {
        "sourcing": f"Where do you source the raw materials for {context.product_name}? Please provide specific locations and supplier information.",
        "manufacturing": f"Can you describe the manufacturing process for {context.product_name}? Where are your production facilities located?",
        "sustainability": f"What environmental sustainability practices do you follow in producing {context.product_name}? (e.g., water usage, carbon footprint, waste management)",
        "certifications": f"What certifications or quality standards does {context.product_name} comply with? (e.g., ISO, organic, fair trade)",
        "labor": f"What are your labor practices? Can you describe working conditions and fair wage policies for workers involved in making {context.product_name}?",
    }
    return templates.get(category, f"Please provide detailed information about {category} for {context.product_name}.")


@app.post("/generate-questions", response_model=QuestionResponse)
async def generate_questions(context: ProductContext):
    """Generate questions using template system"""
    try:
        question_categories = ["sourcing", "manufacturing", "sustainability", "certifications", "labor"]
        
        generated_questions = []
        
        for i, category in enumerate(question_categories[:3]):
            question_text = get_template_question(category, context)
            generated_questions.append({
                "text": question_text,
                "category": category,
                "priority": "high" if i == 0 else "medium",
                "reason": f"Essential for understanding {category} transparency"
            })
        
        return QuestionResponse(
            questions=generated_questions,
            reasoning="Questions generated to build comprehensive transparency profile"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.post("/transparency-score", response_model=TransparencyScoreResponse)
async def calculate_transparency_score(request: TransparencyScoreRequest):
    """Calculate transparency score using rule-based system"""
    try:
        category_scores = {
            "supply_chain": 0,
            "sourcing_ethics": 0,
            "manufacturing": 0,
            "environmental": 0,
            "certifications": 0,
            "labor_practices": 0
        }
        
        strengths = []
        weaknesses = []
        recommendations = []
        
        for answer in request.answers:
            question_text = answer.get('question', '').lower()
            answer_text = answer.get('answer', '').lower()
            
            if not answer_text or len(answer_text) < 10:
                continue
            
            score_increment = 0
            
            if len(answer_text) > 100:
                score_increment += 20
            elif len(answer_text) > 50:
                score_increment += 10
            
            positive_keywords = ['certified', 'organic', 'sustainable', 'ethical', 'transparent']
            negative_keywords = ['unknown', 'unclear', 'no information']
            
            positive_count = sum(1 for keyword in positive_keywords if keyword in answer_text)
            negative_count = sum(1 for keyword in negative_keywords if keyword in answer_text)
            
            score_increment += positive_count * 10
            score_increment -= negative_count * 15
            score_increment = max(0, min(100, score_increment))
            
            if any(word in question_text for word in ['source', 'sourcing']):
                category_scores['sourcing_ethics'] = max(category_scores['sourcing_ethics'], score_increment)
            elif any(word in question_text for word in ['manufacturing', 'production']):
                category_scores['manufacturing'] = max(category_scores['manufacturing'], score_increment)
            elif any(word in question_text for word in ['environment', 'sustainability']):
                category_scores['environmental'] = max(category_scores['environmental'], score_increment)
            elif any(word in question_text for word in ['certification', 'standard']):
                category_scores['certifications'] = max(category_scores['certifications'], score_increment)
            elif any(word in question_text for word in ['labor', 'worker']):
                category_scores['labor_practices'] = max(category_scores['labor_practices'], score_increment)
            else:
                category_scores['supply_chain'] = max(category_scores['supply_chain'], score_increment)
        
        overall_score = sum(category_scores.values()) / len(category_scores)
        
        recommendations = ["Maintain transparency levels", "Document all processes"]
        strengths = ["Provided responses to questions"]
        weaknesses = ["Consider more detailed documentation"]
        
        return TransparencyScoreResponse(
            overall_score=round(overall_score, 2),
            category_scores=category_scores,
            recommendations=recommendations,
            strengths=strengths,
            weaknesses=weaknesses
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "AI Service",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)