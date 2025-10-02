# Hedamo - Product Transparency Platform

A full-stack application for analyzing product transparency with AI-powered insights.
This project integrates React (frontend), Node.js + Express (backend), and a Python FastAPI AI service.

## 📂 Project Structure
```
Hedamo/
├── frontend_hedamo/     # React + TypeScript frontend
├── backend/             # Node.js + Express backend
├── ai-service/          # Python FastAPI AI service
└── README.md
```

## 🚀 Setup Instructions

### Option 1: Manual Setup

#### 1. AI Service (Port 8000)
```bash
cd ai-service
pip install -r requirements.txt
python app/main.py
```

#### 2. Backend (Port 3001)
```bash
cd backend
npm install
npm run dev
```

#### 3. Frontend (Port 5173)
```bash
cd frontend_hedamo
npm install
npm run dev
```

### Option 2: Docker (Recommended)
```bash
docker-compose up --build
```

This will start all services with proper configuration.

## 🔑 Environment Variables

### Frontend (.env.local)
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
FRONTEND_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
CLERK_SECRET_KEY=your_clerk_secret
```

### AI Service (.env.local)
```
HUGGINGFACE_API_KEY=your_hf_key (optional)
```

## 📡 API Endpoints

### Backend API (Port 3001)
- `GET /health` – Health check
- `POST /api/analyze-product` – Analyze product
- `POST /api/generate-questions` – Generate follow-up questions
- `GET /api/reports` – Fetch reports
- `POST /api/generate-pdf-report` – Generate PDF

### AI Service API (Port 8000)
- `GET /health` – Health check
- `POST /generate-questions` – Generate AI-powered questions
- `POST /transparency-score` – Calculate transparency score

## ✨ Features

- 🔍 AI-driven Product Analysis
- 📊 Transparency Scoring
- 📱 Responsive Design (mobile + web)
- 🔐 Clerk Authentication
- 📄 PDF Report Generation
- 🤖 AI-Powered Dynamic Questions

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI Service**: Python, FastAPI, Hugging Face
- **Authentication**: Clerk
- **Database**: PostgreSQL (planned)

## 🧪 Sample Product Entry + Example Report

### Sample Input:
```json
{
  "productName": "EcoFresh Water Bottle",
  "material": "Recycled Stainless Steel",
  "manufacturer": "GreenWare Co.",
  "countryOfOrigin": "India",
  "certifications": ["BPA-Free", "ISO 14001"]
}
```

### Generated Report (Summary Example):
```json
{
  "productName": "EcoFresh Water Bottle",
  "transparencyScore": 82,
  "analysis": {
    "materials": "Made from 100% recycled stainless steel.",
    "safety": "Certified BPA-Free and ISO 14001 compliant.",
    "origin": "Manufactured in India with moderate labor transparency.",
    "sustainability": "Strong focus on eco-friendly practices."
  },
  "recommendations": [
    "Provide more details about worker safety standards.",
    "Share third-party environmental audit results."
  ]
}
```

## 🔄 Development Workflow

### Local Development
1. Start services in order: AI Service → Backend → Frontend
2. Frontend → http://localhost:5173
3. Backend API → http://localhost:3001
4. AI Service → http://localhost:8000

### Docker Deployment
```bash
cp .env.docker .env
docker-compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:3001
- AI Service: http://localhost:8000

Stop with:
```bash
docker-compose down
```

## 📝 Bonus Reflection

During development, AI tools played a major role in accelerating progress. I used AI to scaffold boilerplate code, design prompts for the AI service, and even generate example datasets and reports for testing. This reduced setup time and helped me focus on the core logic of product transparency instead of repetitive tasks.

The architecture follows a modular microservice approach: the frontend handles user interaction, the backend manages business logic and authentication, and the AI service is isolated for scalability. This separation ensures flexibility (e.g., swapping AI models without touching the core backend).

From a design perspective, simplicity and clarity were prioritized—users should easily understand how transparency scores are generated. For product transparency logic, I followed principles of explainability (showing why a score was given) and fairness (ensuring AI suggestions aren't biased towards certain products or regions). The platform is built not only to analyze but also to build trust through openness.
