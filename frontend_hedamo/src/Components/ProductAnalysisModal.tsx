import { useState } from 'react';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'select' | 'multiselect' | 'textarea';
  options?: string[];
  required: boolean;
}

const questions: Question[] = [
  {
    id: 'productName',
    text: 'What is the product name?',
    type: 'text',
    required: true
  },
  {
    id: 'brand',
    text: 'What brand is this product?',
    type: 'text',
    required: true
  },
  {
    id: 'category',
    text: 'What category does this product belong to?',
    type: 'select',
    options: ['Food & Beverages', 'Personal Care', 'Electronics', 'Clothing', 'Home & Garden', 'Health & Wellness', 'Other'],
    required: true
  },
  {
    id: 'ingredients',
    text: 'Can you list the main ingredients or components? (if available)',
    type: 'textarea',
    required: false
  },
  {
    id: 'concerns',
    text: 'What specific concerns do you have about this product?',
    type: 'multiselect',
    options: ['Health Impact', 'Environmental Impact', 'Ethical Sourcing', 'Manufacturing Practices', 'Ingredient Safety', 'Company Ethics'],
    required: false
  },
  {
    id: 'usage',
    text: 'How do you plan to use this product?',
    type: 'select',
    options: ['Daily use', 'Occasional use', 'One-time purchase', 'Gift for someone', 'Professional use'],
    required: false
  },
  {
    id: 'additionalInfo',
    text: 'Any additional information or specific questions about this product?',
    type: 'textarea',
    required: false
  }
];

interface ProductAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
}

export default function ProductAnalysisModal({ isOpen, onClose, onSubmit }: ProductAnalysisModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onSubmit(answers);
    setIsAnalyzing(false);
  };

  const canProceed = () => {
    if (!currentQuestion.required) return true;
    const answer = answers[currentQuestion.id];
    return answer && (typeof answer === 'string' ? answer.trim() : true);
  };

  const renderInput = () => {
    const value = answers[currentQuestion.id] || '';

    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Enter your answer..."
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleAnswer(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              backgroundColor: 'white',
              outline: 'none'
            }}
          >
            <option value="">Select an option...</option>
            {currentQuestion.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {currentQuestion.options?.map(option => (
              <label key={option} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <input
                  type="checkbox"
                  checked={(value || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    if (e.target.checked) {
                      handleAnswer([...currentValues, option]);
                    } else {
                      handleAnswer(currentValues.filter((v: string) => v !== option));
                    }
                  }}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.875rem' }}>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Enter your answer..."
            rows={4}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        );

      default:
        return null;
    }
  };

  if (isAnalyzing) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
            animation: 'pulse 2s infinite'
          }}>
            🤖
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            AI is Analyzing Your Product
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Our AI is processing your information and generating a comprehensive transparency report...
          </p>
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              borderRadius: '2px',
              animation: 'loading 2s ease-in-out infinite'
            }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0
            }}>
              Product Analysis
            </h2>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#e5e7eb',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0
          }}>
            Question {currentStep + 1} of {questions.length}
          </p>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '500',
            color: '#1f2937',
            marginBottom: '1.5rem',
            lineHeight: '1.4'
          }}>
            {currentQuestion.text}
            {currentQuestion.required && (
              <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>
            )}
          </h3>
          
          {renderInput()}
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: currentStep === 0 ? '#f3f4f6' : '#ffffff',
              color: currentStep === 0 ? '#9ca3af' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Previous
          </button>

          <div style={{ flex: 1, textAlign: 'center' }}>
            {!currentQuestion.required && (
              <button
                onClick={handleNext}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  textDecoration: 'underline'
                }}
              >
                Skip this question
              </button>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              padding: '0.75rem 1.5rem',
              background: canProceed() 
                ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)' 
                : '#f3f4f6',
              color: canProceed() ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px',
              cursor: canProceed() ? 'pointer' : 'not-allowed',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {currentStep === questions.length - 1 ? '🚀 Analyze Product' : 'Next'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}