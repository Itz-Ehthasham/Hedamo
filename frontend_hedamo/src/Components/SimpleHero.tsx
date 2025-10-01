import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useState } from 'react';
import ProductAnalysisModal from './ProductAnalysisModal';
import apiService from '../services/api';

export default function SimpleHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          Make Smart, Ethical, and Health-First Choices
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#6b7280',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Get instant transparency reports on any product. Make informed decisions with AI-powered insights.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                Get Started Free
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <button 
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(to right, #10b981, #059669)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onClick={() => setIsModalOpen(true)}
            >
              🔍 Analyze Product
            </button>
          </SignedIn>
          
          <ProductAnalysisModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={async (data) => {
              try {
                const response = await apiService.analyzeProduct({
                  productName: data.productName,
                  brand: data.brand,
                  category: data.category,
                  concerns: data.concerns,
                  answers: data.additionalInfo ? [{ question: 'Additional Info', answer: data.additionalInfo }] : []
                });
                
                if (response.success) {
                  window.location.href = `/analyze?product=${encodeURIComponent(data.productName || 'analyzed-product')}`;
                } else {
                  alert('Analysis failed: ' + response.error);
                }
              } catch (error) {
                console.error('Analysis error:', error);
                alert('Failed to analyze product. Please try again.');
              }
              setIsModalOpen(false);
            }}
          />
          
          <button style={{
            padding: '1rem 2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#1f2937',
            fontWeight: '600',
            borderRadius: '0.75rem',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}