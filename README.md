# Hedamo - Product Transparency Platform

A full-stack application for analyzing product transparency with AI-powered insights.

## Project Structure

```
Hedamo/
├── frontend_hedamo/          # React + TypeScript frontend
├── backend/                  # Node.js + Express backend
├── ai-service/              # Python FastAPI AI service
└── README.md
```

## Quick Start

### 1. AI Service (Port 8000)
```bash
cd ai-service
pip install -r requirements.txt
python app/main.py
```

### 2. Backend (Port 3001)
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend (Port 5173)
```bash
cd frontend_hedamo
npm install
npm run dev
```

## Environment Variables

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

## API Endpoints

### Backend API (Port 3001)
- `GET /health` - Health check
- `POST /api/analyze-product` - Analyze product
- `POST /api/generate-questions` - Generate questions
- `GET /api/reports` - Get reports
- `POST /api/generate-pdf-report` - Generate PDF

### AI Service API (Port 8000)
- `GET /health` - Health check
- `POST /generate-questions` - Generate questions
- `POST /transparency-score` - Calculate scores

## Features

- 🔍 Product Analysis with AI
- 📊 Transparency Scoring
- 📱 Responsive Design
- 🔐 Clerk Authentication
- 📄 PDF Report Generation
- 🤖 AI-Powered Questions

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI Service**: Python, FastAPI, Hugging Face
- **Authentication**: Clerk
- **Database**: PostgreSQL (planned)

## Development

1. Start all services in order: AI Service → Backend → Frontend
2. Frontend will be available at http://localhost:5173
3. Backend API at http://localhost:3001
4. AI Service at http://localhost:8000