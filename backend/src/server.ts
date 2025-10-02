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
app.set('trust proxy', 1);
const PORT = parseInt(process.env.PORT || '3001', 10);
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

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Hedamo Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api/*'
    }
  });
});

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

// PDF Report Generation
app.post('/api/generate-pdf-report', async (req, res) => {
  try {
    const { productData, analysisData } = req.body;
    const PDFDocument = require('pdfkit');
    
    const doc = new PDFDocument();
    let buffers: Buffer[] = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${productData.name}-report.pdf"`);
      res.send(pdfData);
    });
    
    // Generate PDF content
    doc.fontSize(20).text('Product Transparency Report', 50, 50);
    doc.fontSize(16).text(`Product: ${productData.name}`, 50, 100);
    doc.fontSize(12).text(`Brand: ${productData.brand}`, 50, 130);
    doc.text(`Category: ${productData.category}`, 50, 150);
    
    doc.text('Scores:', 50, 200);
    doc.text(`Health Score: ${productData.scores?.health || 'N/A'}/10`, 70, 220);
    doc.text(`Ethical Score: ${productData.scores?.ethical || 'N/A'}/10`, 70, 240);
    doc.text(`Transparency Score: ${productData.scores?.transparency || 'N/A'}/10`, 70, 260);
    doc.text(`Overall Score: ${productData.scores?.overall || 'N/A'}/10`, 70, 280);
    
    if (analysisData?.score?.strengths) {
      doc.text('Strengths:', 50, 320);
      analysisData.score.strengths.forEach((strength: string, index: number) => {
        doc.text(`• ${strength}`, 70, 340 + (index * 20));
      });
    }
    
    if (analysisData?.score?.recommendations) {
      doc.text('Recommendations:', 50, 420);
      analysisData.score.recommendations.forEach((rec: string, index: number) => {
        doc.text(`• ${rec}`, 70, 440 + (index * 20));
      });
    }
    
    doc.end();
  } catch (error: any) {
    console.error('PDF Generation Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate PDF report',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🤖 AI Service: ${AI_SERVICE_URL}`);
});

export default app;