import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useState } from 'react';
import ProductAnalysisModal from './ProductAnalysisModal';
import AboutPage from './AboutPage';
import apiService from '../services/api';

export default function SimpleHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
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
          fontSize: '3.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 50%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1.5rem',
          lineHeight: '1.2',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          letterSpacing: '-0.02em'
        }}>
          Make Smart, Ethical, and Health-First Choices
        </h1>
        
        <p style={{
          fontSize: '1.375rem',
          color: '#4b5563',
          marginBottom: '2rem',
          lineHeight: '1.7',
          fontWeight: '400',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Get instant transparency reports on any product. Make informed decisions with 
          <span style={{ 
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '600'
          }}>
            AI-powered insights
          </span>.
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
                  // Store the analysis data in sessionStorage
                  sessionStorage.setItem('analysisData', JSON.stringify(response.data));
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
          

        </div>
      </div>
    </section>

    {/* Reports Section */}
    <section style={{
      minHeight: '100vh',
      padding: '4rem 2rem',
      backgroundColor: 'rgba(248, 250, 252, 0.8)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #1f2937, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '2rem'
        }}>
          Transparency Reports
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: '#4b5563',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          Access detailed analysis reports for products you've analyzed.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onClick={() => window.location.href = '/reports'}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3>Detailed Analytics</h3>
          </div>
          <div 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onClick={() => window.location.href = '/reports'}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <h3>PDF Reports</h3>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section style={{
      minHeight: '100vh',
      padding: '4rem 2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '3rem'
        }}>
          Why Choose Hedamo?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>AI-Powered Analysis</h3>
            <p style={{ color: '#6b7280' }}>Advanced algorithms analyze thousands of data points to provide accurate transparency scores.</p>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Instant Results</h3>
            <p style={{ color: '#6b7280' }}>Get comprehensive product analysis in seconds, not hours of research.</p>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Privacy First</h3>
            <p style={{ color: '#6b7280' }}>Your data stays private. We don't track or sell your information.</p>
          </div>
        </div>
      </div>
    </section>

    {/* About Section - Full AboutPage Component */}
    <AboutPage />
    </>
  );
}