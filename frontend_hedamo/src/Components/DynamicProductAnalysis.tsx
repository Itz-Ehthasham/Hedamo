import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/clerk-react';

interface ProductData {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  scores: {
    health: number;
    ethical: number;
    transparency: number;
    overall: number;
  };
  ingredients: Array<{
    name: string;
    risk: 'low' | 'medium' | 'high';
    description: string;
  }>;
  sourcing: {
    origin: string;
    certifications: string[];
    laborScore: number;
  };
  manufacturing: {
    location: string;
    carbonFootprint: number;
    waterUsage: number;
  };
  sustainability: {
    packaging: number;
    recyclability: number;
    carbonScore: number;
  };
  healthImpact: {
    benefits: string[];
    concerns: string[];
    allergens: string[];
  };
}

const mockProducts: Record<string, ProductData> = {
  'coca-cola': {
    id: 'coca-cola',
    name: 'Coca-Cola Classic',
    brand: 'The Coca-Cola Company',
    category: 'Carbonated Soft Drinks',
    image: '🥤',
    scores: { health: 3, ethical: 6, transparency: 7, overall: 5.3 },
    ingredients: [
      { name: 'High Fructose Corn Syrup', risk: 'high', description: 'High sugar content linked to obesity and diabetes' },
      { name: 'Caramel Color', risk: 'medium', description: 'Artificial coloring with potential carcinogenic compounds' },
      { name: 'Phosphoric Acid', risk: 'medium', description: 'May affect calcium absorption' },
      { name: 'Natural Flavors', risk: 'low', description: 'Proprietary blend, generally safe' },
      { name: 'Caffeine', risk: 'low', description: '34mg per serving, moderate stimulant' }
    ],
    sourcing: { origin: 'Global suppliers', certifications: ['Fair Trade (partial)'], laborScore: 7 },
    manufacturing: { location: 'Global network', carbonFootprint: 85, waterUsage: 78 },
    sustainability: { packaging: 75, recyclability: 85, carbonScore: 45 },
    healthImpact: {
      benefits: ['Quick energy boost', 'Caffeine for alertness'],
      concerns: ['High sugar (39g)', 'Artificial additives', 'Tooth decay risk'],
      allergens: []
    }
  },
  'organic-almond-milk': {
    id: 'organic-almond-milk',
    name: 'Organic Almond Milk',
    brand: 'Whole Foods',
    category: 'Dairy Alternatives',
    image: '🥛',
    scores: { health: 8, ethical: 8, transparency: 9, overall: 8.3 },
    ingredients: [
      { name: 'Organic Almonds', risk: 'low', description: 'Rich in vitamin E and healthy fats' },
      { name: 'Filtered Water', risk: 'low', description: 'Pure water base' },
      { name: 'Sea Salt', risk: 'low', description: 'Natural preservative and flavor enhancer' },
      { name: 'Locust Bean Gum', risk: 'low', description: 'Natural thickener from carob tree' }
    ],
    sourcing: { origin: 'California organic farms', certifications: ['USDA Organic', 'Non-GMO'], laborScore: 9 },
    manufacturing: { location: 'California, USA', carbonFootprint: 35, waterUsage: 92 },
    sustainability: { packaging: 60, recyclability: 70, carbonScore: 75 },
    healthImpact: {
      benefits: ['Low calories', 'Vitamin E', 'Lactose-free', 'Heart healthy'],
      concerns: ['Low protein', 'High water usage in production'],
      allergens: ['Tree nuts (almonds)']
    }
  }
};

export default function DynamicProductAnalysis({ initialProduct = 'coca-cola' }: { initialProduct?: string }) {
  const [currentProduct, setCurrentProduct] = useState<ProductData>(mockProducts[initialProduct] || mockProducts['coca-cola']);

  const [expandedSections, setExpandedSections] = useState<string[]>(['scores']);
  const [isLoading, setIsLoading] = useState(false);
  const [animateScores, setAnimateScores] = useState(false);
  const [realAnalysisData, setRealAnalysisData] = useState<any>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setHeaderVisible(false);
      } else {
        // Scrolling up
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Check for real analysis data first
    const analysisData = sessionStorage.getItem('analysisData');
    if (analysisData) {
      try {
        const data = JSON.parse(analysisData);
        setRealAnalysisData(data);
        // Update product with real data
        // Create product from analysis data
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product') || 'Unknown Product';
        
        const realProduct = {
          id: productName.toLowerCase().replace(/\s+/g, '-'),
          name: productName,
          brand: data.productInfo?.brand || 'Unknown Brand',
          category: data.productInfo?.category || 'Unknown Category',
          image: '📦',
          scores: {
            health: Math.min(10, Math.max(1, Math.round((data.score?.overall_score || 50) / 10))),
            ethical: Math.min(10, Math.max(1, Math.round((data.score?.category_scores?.sourcing_ethics || 50) / 10))),
            transparency: Math.min(10, Math.max(1, Math.round((data.score?.category_scores?.certifications || 50) / 10))),
            overall: Math.min(10, Math.max(1, data.score?.overall_score || 5))
          },
          ingredients: [
            { name: 'Analysis in progress', risk: 'low' as const, description: 'Detailed ingredient analysis coming soon' }
          ],
          sourcing: { 
            origin: data.productInfo?.origin || 'Information being gathered', 
            certifications: data.score?.strengths?.slice(0, 2) || [], 
            laborScore: Math.round((data.score?.category_scores?.labor_practices || 50) / 10)
          },
          manufacturing: { 
            location: 'Information being gathered', 
            carbonFootprint: Math.round(data.score?.category_scores?.environmental || 50), 
            waterUsage: 50 
          },
          sustainability: { 
            packaging: Math.round(data.score?.category_scores?.environmental || 50), 
            recyclability: 70, 
            carbonScore: Math.round(data.score?.category_scores?.environmental || 50) 
          },
          healthImpact: {
            benefits: data.score?.strengths || ['Analysis in progress'],
            concerns: data.score?.weaknesses || ['Analysis in progress'],
            allergens: []
          }
        };
        
        setCurrentProduct(realProduct);
        setTimeout(() => setAnimateScores(true), 100);
      } catch (error) {
        console.error('Error parsing analysis data:', error);
      }
    } else {
      // Fallback to URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const productParam = urlParams.get('product');
      if (productParam) {
        const productKey = productParam.toLowerCase().replace(/\s+/g, '-');
        if (mockProducts[productKey]) {
          loadProduct(productKey);
        }
      }
    }
  }, []);

  const loadProduct = async (productKey: string) => {
    setIsLoading(true);
    setAnimateScores(false);
    
    try {
      // Get AI analysis for the product
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/analyze-product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productData: {
            productName: mockProducts[productKey]?.name || 'Unknown Product',
            brand: mockProducts[productKey]?.brand || 'Unknown Brand',
            category: mockProducts[productKey]?.category || 'Unknown Category',
            answers: [
              { question: 'Product ingredients', answer: 'Standard commercial ingredients' },
              { question: 'Manufacturing process', answer: 'Industrial manufacturing with quality controls' },
              { question: 'Sustainability practices', answer: 'Following industry standards' }
            ]
          }
        })
      });
      
      if (response.ok) {
        const aiData = await response.json();
        const baseProduct = mockProducts[productKey];
        
        // Update product with AI insights
        const updatedProduct = {
          ...baseProduct,
          scores: {
            health: Math.min(10, Math.max(1, Math.round((aiData.score?.overall_score || 50) / 10))),
            ethical: Math.min(10, Math.max(1, Math.round((aiData.score?.category_scores?.sourcing_ethics || 50) / 10))),
            transparency: Math.min(10, Math.max(1, Math.round((aiData.score?.category_scores?.certifications || 50) / 10))),
            overall: Math.min(10, Math.max(1, aiData.score?.overall_score || 5))
          },
          healthImpact: {
            ...baseProduct.healthImpact,
            benefits: aiData.score?.strengths || baseProduct.healthImpact.benefits,
            concerns: aiData.score?.weaknesses || baseProduct.healthImpact.concerns
          }
        };
        
        setCurrentProduct(updatedProduct);
        setRealAnalysisData(aiData);
      } else {
        setCurrentProduct(mockProducts[productKey]);
      }
    } catch (error) {
      console.error('AI Analysis failed:', error);
      setCurrentProduct(mockProducts[productKey]);
    }
    
    setIsLoading(false);
    setTimeout(() => setAnimateScores(true), 100);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return '#10b981';
    if (score >= 6) return '#f59e0b';
    if (score >= 4) return '#f97316';
    return '#ef4444';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const AnimatedScoreCard = ({ title, score, icon, delay = 0 }: { title: string; score: number; icon: string; delay?: number }) => (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center',
      transform: animateScores ? 'scale(1)' : 'scale(0.95)',
      opacity: animateScores ? 1 : 0.7,
      transition: `all 0.6s ease ${delay}ms`
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
      <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>
        {title}
      </h3>
      <div style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: getScoreColor(score),
        marginBottom: '0.75rem'
      }}>
        {animateScores ? score : 0}/10
      </div>
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: '#e5e7eb',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: animateScores ? `${score * 10}%` : '0%',
          height: '100%',
          backgroundColor: getScoreColor(score),
          borderRadius: '3px',
          transition: 'width 1s ease-in-out'
        }} />
      </div>
    </div>
  );

  const CollapsibleSection = ({ title, icon, children, sectionKey }: { 
    title: string; 
    icon: string; 
    children: React.ReactNode; 
    sectionKey: string;
  }) => {
    const isExpanded = expandedSections.includes(sectionKey);
    
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        marginBottom: '1rem',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => toggleSection(sectionKey)}
          style={{
            width: '100%',
            padding: '1.25rem',
            backgroundColor: isExpanded ? '#f8fafc' : '#ffffff',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1f2937'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
            {title}
          </div>
          <span style={{ 
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}>
            ▼
          </span>
        </button>
        
        <div style={{
          maxHeight: isExpanded ? '1000px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out'
        }}>
          <div style={{ padding: '0 1.25rem 1.25rem' }}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}>
            🔍
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>
            Analyzing Product...
          </h2>
          <p style={{ color: '#6b7280' }}>
            Gathering transparency data and generating insights
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>


      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem 2rem', display: 'flex', gap: '2rem' }}>
        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Animated Score Cards */}
          <CollapsibleSection title="Product Scores" icon="📊" sectionKey="scores">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem'
            }}>
              <AnimatedScoreCard title="Health Score" score={currentProduct?.scores?.health || 5} icon="🏥" delay={0} />
              <AnimatedScoreCard title="Ethical Score" score={currentProduct?.scores?.ethical || 5} icon="⚖️" delay={100} />
              <AnimatedScoreCard title="Transparency" score={currentProduct?.scores?.transparency || 5} icon="🔍" delay={200} />
              <AnimatedScoreCard title="Overall Score" score={currentProduct?.scores?.overall || 5} icon="🎯" delay={300} />
            </div>
          </CollapsibleSection>

          {/* Ingredients Analysis */}
          <CollapsibleSection title="Ingredients Analysis" icon="🧪" sectionKey="ingredients">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {currentProduct.ingredients.map((ingredient, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: `2px solid ${getRiskColor(ingredient.risk)}20`,
                  borderLeft: `4px solid ${getRiskColor(ingredient.risk)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>{ingredient.name}</h4>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: getRiskColor(ingredient.risk),
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {ingredient.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem' }}>
                    {ingredient.description}
                  </p>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Sourcing Information */}
          <CollapsibleSection title="Sourcing & Ethics" icon="🌍" sectionKey="sourcing">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#15803d' }}>Origin</h4>
                <p style={{ color: '#166534', margin: 0 }}>{currentProduct.sourcing.origin}</p>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1e40af' }}>Certifications</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {currentProduct.sourcing.certifications.map((cert, index) => (
                    <span key={index} style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '0.75rem'
                    }}>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>Labor Practices Score</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    flex: 1,
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${currentProduct.sourcing.laborScore * 10}%`,
                      height: '100%',
                      backgroundColor: getScoreColor(currentProduct.sourcing.laborScore),
                      borderRadius: '4px',
                      transition: 'width 1s ease-in-out'
                    }} />
                  </div>
                  <span style={{ fontWeight: '600', color: getScoreColor(currentProduct.sourcing.laborScore) }}>
                    {currentProduct.sourcing.laborScore}/10
                  </span>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sustainability Metrics */}
          <CollapsibleSection title="Sustainability Impact" icon="♻️" sectionKey="sustainability">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Packaging Score', value: currentProduct.sustainability.packaging, icon: '📦' },
                { label: 'Recyclability', value: currentProduct.sustainability.recyclability, icon: '🔄' },
                { label: 'Carbon Score', value: currentProduct.sustainability.carbonScore, icon: '🌱' }
              ].map((metric, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
                  <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    {metric.label}
                  </h4>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getScoreColor(metric.value / 10) }}>
                    {metric.value}%
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Health Impact */}
          <CollapsibleSection title="Health Impact Assessment" icon="❤️" sectionKey="health">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#15803d' }}>✅ Health Benefits</h4>
                <ul style={{ color: '#166534', margin: 0, paddingLeft: '1rem' }}>
                  {currentProduct.healthImpact.benefits.map((benefit, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#dc2626' }}>⚠️ Health Concerns</h4>
                <ul style={{ color: '#991b1b', margin: 0, paddingLeft: '1rem' }}>
                  {currentProduct.healthImpact.concerns.map((concern, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>{concern}</li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '1rem', backgroundColor: '#fffbeb', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#d97706' }}>🚨 Allergens</h4>
                <p style={{ color: '#92400e', margin: 0 }}>
                  {currentProduct.healthImpact.allergens.length > 0 
                    ? currentProduct.healthImpact.allergens.join(', ') 
                    : 'No known allergens'}
                </p>
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Sticky Sidebar */}
        <div style={{ width: '320px', position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                Transparency Report
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Generate a comprehensive analysis report for {currentProduct.name}
              </p>
            </div>

            <button style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '1rem',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={async () => {
              try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/generate-pdf-report`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    productData: currentProduct,
                    analysisData: realAnalysisData
                  })
                });
                
                if (response.ok) {
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${currentProduct.name}-transparency-report.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                } else {
                  alert('Failed to generate PDF report');
                }
              } catch (error) {
                console.error('PDF generation error:', error);
                alert('Error generating PDF report');
              }
            }}
            >
              📥 Download PDF Report
            </button>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                📧 Email Report
              </button>
              
              <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                📱 Share Analysis
              </button>
              
              <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                💾 Save to Reports
              </button>
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#15803d', marginBottom: '0.5rem' }}>
                🎯 Overall Assessment
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#166534', margin: 0, lineHeight: '1.4' }}>
                {currentProduct.scores.overall >= 7 
                  ? 'This product meets high standards for transparency and ethical practices.'
                  : currentProduct.scores.overall >= 5
                  ? 'This product has moderate transparency with some areas for improvement.'
                  : 'This product has limited transparency and significant concerns to consider.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}