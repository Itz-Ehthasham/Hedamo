 ai-service/app/main.py
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
    category: str
    description: str
    previous_answers: Optional[List[dict]] = []

class QuestionRequest(BaseModel):
    context: ProductContext
    num_questions: int = 3

class QuestionResponse(BaseModel):
    questions: List[dict]
    reasoning: str

class TransparencyScoreRequest(BaseModel):
    product_data: dict
    answers: List[dict]

class TransparencyScoreResponse(BaseModel):
    overall_score: float
    category_scores: dict
    recommendations: List[str]
    strengths: List[str]
    weaknesses: List[str]


def query_huggingface(model_name: str, payload: dict):
    """Query Hugging Face Inference API (FREE)"""
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    API_URL = f"{HF_API_URL}{model_name}"
    
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


@app.post("/generate-questions", response_model=QuestionResponse)
async def generate_questions(request: QuestionRequest):
    """
    Generate questions using FREE Hugging Face models
    """
    try:
        context = request.context
        
        # Build context
        previous_qa = "\n".join([
            f"Q: {qa.get('question', '')}\nA: {qa.get('answer', '')}"
            for qa in context.previous_answers
        ])
        
        # Create prompts for different question categories
        question_categories = [
            {
                "category": "sourcing",
                "prompt": f"Generate a detailed question about the sourcing and origin of materials for {context.product_name}, a {context.category} product. {context.description}. Previous answers: {previous_qa}"
            },
            {
                "category": "manufacturing",
                "prompt": f"Generate a detailed question about the manufacturing process and facilities for {context.product_name}. Previous answers: {previous_qa}"
            },
            {
                "category": "sustainability",
                "prompt": f"Generate a detailed question about environmental impact and sustainability practices for {context.product_name}. Previous answers: {previous_qa}"
            },
            {
                "category": "certifications",
                "prompt": f"Generate a detailed question about certifications, compliance, and quality standards for {context.product_name}. Previous answers: {previous_qa}"
            },
            {
                "category": "labor",
                "prompt": f"Generate a detailed question about labor practices and worker conditions for {context.product_name}. Previous answers: {previous_qa}"
            }
        ]
        
        generated_questions = []
        
        # Generate questions for each category
        for i, cat_info in enumerate(question_categories[:request.num_questions]):
            try:
                result = query_huggingface(
                    QUESTION_MODEL,
                    {"inputs": cat_info["prompt"]}
                )
                
                # Extract question text
                question_text = result[0].get('generated_text', '') if isinstance(result, list) else result.get('generated_text', '')
                
                # If generation failed, use template questions
                if not question_text or len(question_text) < 10:
                    question_text = get_template_question(cat_info["category"], context)
                
                generated_questions.append({
                    "text": question_text,
                    "category": cat_info["category"],
                    "priority": "high" if i == 0 else "medium",
                    "reason": f"Essential for understanding {cat_info['category']} transparency"
                })
            except Exception as e:
                # Fallback to template questions
                question_text = get_template_question(cat_info["category"], context)
                generated_questions.append({
                    "text": question_text,
                    "category": cat_info["category"],
                    "priority": "medium",
                    "reason": f"Standard question for {cat_info['category']}"
                })
        
        return QuestionResponse(
            questions=generated_questions,
            reasoning="Questions generated to build comprehensive transparency profile"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


def get_template_question(category: str, context: ProductContext) -> str:
    """Fallback template questions - always works, no API needed"""
    templates = {
        "sourcing": f"Where do you source the raw materials for {context.product_name}? Please provide specific locations and supplier information.",
        "manufacturing": f"Can you describe the manufacturing process for {context.product_name}? Where are your production facilities located?",
        "sustainability": f"What environmental sustainability practices do you follow in producing {context.product_name}? (e.g., water usage, carbon footprint, waste management)",
        "certifications": f"What certifications or quality standards does {context.product_name} comply with? (e.g., ISO, organic, fair trade)",
        "labor": f"What are your labor practices? Can you describe working conditions and fair wage policies for workers involved in making {context.product_name}?",
        "packaging": f"What materials are used in packaging {context.product_name}? Are they recyclable or biodegradable?",
        "transportation": f"How is {context.product_name} transported from manufacturing to retail? What's the carbon footprint of your supply chain?",
        "ethics": f"What ethical guidelines does your company follow in producing {context.product_name}? How do you ensure ethical practices throughout your supply chain?"
    }
    return templates.get(category, f"Please provide detailed information about {category} for {context.product_name}.")


@app.post("/transparency-score", response_model=TransparencyScoreResponse)
async def calculate_transparency_score(request: TransparencyScoreRequest):
    """
    Calculate transparency score using rule-based system + FREE AI
    """
    try:
        # Initialize scores
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
        
        # Analyze each answer
        for answer in request.answers:
            question_text = answer.get('question', '').lower()
            answer_text = answer.get('answer', '').lower()
            
            # Skip empty answers
            if not answer_text or len(answer_text) < 10:
                continue
            
            # Rule-based scoring
            score_increment = 0
            
            # Check for detailed answers (longer = more transparent)
            if len(answer_text) > 100:
                score_increment += 20
            elif len(answer_text) > 50:
                score_increment += 10
            
            # Check for specific keywords
            positive_keywords = [
                'certified', 'certification', 'organic', 'sustainable', 
                'fair trade', 'verified', 'audited', 'compliant',
                'renewable', 'recycled', 'ethical', 'transparent',
                'documented', 'traced', 'monitored'
            ]
            
            negative_keywords = [
                'unknown', "don't know", 'not sure', 'unclear',
                'no information', 'confidential', 'proprietary'
            ]
            
            positive_count = sum(1 for keyword in positive_keywords if keyword in answer_text)
            negative_count = sum(1 for keyword in negative_keywords if keyword in answer_text)
            
            score_increment += positive_count * 10
            score_increment -= negative_count * 15
            
            # Cap at 100
            score_increment = min(score_increment, 100)
            score_increment = max(score_increment, 0)
            
            # Categorize the question and update relevant score
            if any(word in question_text for word in ['source', 'sourcing', 'origin', 'supplier']):
                category_scores['sourcing_ethics'] = max(category_scores['sourcing_ethics'], score_increment)
                if positive_count > 2:
                    strengths.append(f"Well-documented sourcing: {answer_text[:50]}...")
            
            elif any(word in question_text for word in ['manufacturing', 'production', 'facility', 'process']):
                category_scores['manufacturing'] = max(category_scores['manufacturing'], score_increment)
                if positive_count > 2:
                    strengths.append(f"Transparent manufacturing: {answer_text[:50]}...")
            
            elif any(word in question_text for word in ['environment', 'sustainability', 'carbon', 'waste', 'water']):
                category_scores['environmental'] = max(category_scores['environmental'], score_increment)
                if positive_count > 2:
                    strengths.append(f"Strong environmental practices: {answer_text[:50]}...")
            
            elif any(word in question_text for word in ['certification', 'certified', 'standard', 'compliance']):
                category_scores['certifications'] = max(category_scores['certifications'], score_increment)
                if positive_count > 2:
                    strengths.append(f"Good certifications: {answer_text[:50]}...")
            
            elif any(word in question_text for word in ['labor', 'worker', 'employee', 'wage', 'working conditions']):
                category_scores['labor_practices'] = max(category_scores['labor_practices'], score_increment)
                if positive_count > 2:
                    strengths.append(f"Fair labor practices: {answer_text[:50]}...")
            
            else:
                category_scores['supply_chain'] = max(category_scores['supply_chain'], score_increment)
            
            # Identify weaknesses
            if negative_count > 0 or len(answer_text) < 30:
                weaknesses.append(f"Limited information on: {question_text[:60]}...")
        
        # Calculate overall score
        overall_score = sum(category_scores.values()) / len(category_scores)
        
        # Generate recommendations based on scores
        for category, score in category_scores.items():
            if score < 40:
                recommendations.append(
                    f"Improve {category.replace('_', ' ')}: Provide more detailed information and documentation"
                )
            elif score < 60:
                recommendations.append(
                    f"Enhance {category.replace('_', ' ')}: Consider obtaining relevant certifications"
                )
        
        # Default recommendations
        if not recommendations:
            recommendations = [
                "Maintain current transparency levels",
                "Continue documenting all processes",
                "Regularly update certifications and compliance records"
            ]
        
        # Default strengths if none found
        if not strengths:
            strengths = ["Provided responses to transparency questions"]
        
        # Default weaknesses if none found
        if not weaknesses:
            weaknesses = ["Consider providing more detailed documentation in some areas"]
        
        return TransparencyScoreResponse(
            overall_score=round(overall_score, 2),
            category_scores=category_scores,
            recommendations=recommendations[:5],
            strengths=strengths[:5],
            weaknesses=weaknesses[:5]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "FREE AI Service",
        "cost": "₹0",
        "model": "Hugging Face + Rule-based"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```
