import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Hedamo Backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// AI Service Integration Routes
app.post('/api/generate-questions', async (req, res) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/generate-questions`, req.body, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate questions',
      message: error.response?.data?.detail || error.message
    });
  }
});

app.post('/api/transparency-score', async (req, res) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/transparency-score`, req.body, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({
      error: 'Failed to calculate transparency score',
      message: error.response?.data?.detail || error.message
    });
  }
});

// Product Analysis Routes
app.post('/api/analyze-product', async (req, res) => {
  try {
    const { productData } = req.body;
    
    // Step 1: Generate questions based on product context
    const questionsResponse = await axios.post(`${AI_SERVICE_URL}/generate-questions`, {
      product_name: productData.productName,
      brand: productData.brand,
      category: productData.category,
      user_concerns: productData.concerns || []
    });

    // Step 2: Calculate transparency score if answers provided
    let scoreResponse = null;
    if (productData.answers && productData.answers.length > 0) {
      scoreResponse = await axios.post(`${AI_SERVICE_URL}/transparency-score`, {
        product_name: productData.productName,
        answers: productData.answers
      });
    }

    res.json({
      success: true,
      questions: questionsResponse.data.questions,
      score: scoreResponse?.data || null,
      productInfo: {
        name: productData.productName,
        brand: productData.brand,
        category: productData.category,
        analyzedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Product Analysis Error:', error.message);
    res.status(500).json({
      error: 'Failed to analyze product',
      message: error.response?.data?.detail || error.message
    });
  }
});

// Reports Routes
app.get('/api/reports', (req, res) => {
  const mockReports = [
    {
      id: '1',
      productName: 'Coca-Cola Classic',
      brand: 'Coca-Cola',
      category: 'Beverages',
      healthScore: 3,
      sustainabilityScore: 4,
      transparencyScore: 7,
      date: '2024-01-15',
      summary: 'High sugar content, artificial additives present.'
    }
  ];

  res.json({
    success: true,
    reports: mockReports,
    total: mockReports.length
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🤖 AI Service: ${AI_SERVICE_URL}`);
});

export default app;