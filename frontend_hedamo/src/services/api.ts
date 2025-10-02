const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://courageous-grace-production.up.railway.app';
console.log('API_BASE_URL:', API_BASE_URL);
console.log('VITE_API_URL env:', import.meta.env.VITE_API_URL);

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'API request failed');
      }

      return {
        success: true,
        data: data,
      };
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }

  async analyzeProduct(productData: {
    productName: string;
    brand: string;
    category: string;
    concerns?: string[];
    answers?: Array<{ question: string; answer: string }>;
  }) {
    return this.request('/api/analyze-product', {
      method: 'POST',
      body: JSON.stringify({ productData }),
    });
  }

  async generateQuestions(context: {
    product_name: string;
    brand: string;
    category: string;
    user_concerns?: string[];
  }) {
    return this.request('/api/generate-questions', {
      method: 'POST',
      body: JSON.stringify(context),
    });
  }

  async getReports() {
    return this.request('/api/reports');
  }

  async generatePDFReport(productData: any, analysisData: any) {
    return this.request('/api/generate-pdf-report', {
      method: 'POST',
      body: JSON.stringify({ productData, analysisData }),
    });
  }
}

export const apiService = new ApiService();
export default apiService;