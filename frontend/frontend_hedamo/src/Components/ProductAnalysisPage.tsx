import { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';

interface ProductData {
  name: string;
  brand: string;
  category: string;
  healthScore: number;
  ethicalScore: number;
  transparencyScore: number;
  overallScore: number;
  ingredients: string[];
  sourcing: {
    origin: string;
    certifications: string[];
    laborPractices: string;
  };
  manufacturing: {
    location: string;
    processes: string[];
    environmental: string;
  };
  sustainability: {
    packaging: string;
    carbonFootprint: string;
    recyclability: string;
  };
  healthImpact: {
    benefits: string[];
    concerns: string[];
    allergens: string[];
  };
}

const mockProduct: ProductData = {
  name: 'Coca-Cola Classic',
  brand: 'The Coca-Cola Company',
  category: 'Carbonated Soft Drinks',
  healthScore: 3,
  ethicalScore: 6,
  transparencyScore: 7,
  overallScore: 5.3,
  ingredients: ['Carbonated Water', 'High Fructose Corn Syrup', 'Caramel Color', 'Phosphoric Acid', 'Natural Flavors', 'Caffeine'],
  sourcing: {
    origin: 'Multiple global suppliers',
    certifications: ['Fair Trade Sugar (partial)', 'Rainforest Alliance'],
    laborPractices: 'Generally compliant with international standards'
  },
  manufacturing: {
    location: 'Global network of bottling partners',
    processes: ['Mixing', 'Carbonation', 'Bottling', 'Quality Control'],
    environmental: 'Water usage optimization programs in place'
  },
  sustainability: {
    packaging: 'Recyclable PET bottles and aluminum cans',
    carbonFootprint: 'High due to global distribution',
    recyclability: '85% of packaging is recyclable'
  },
  healthImpact: {
    benefits: ['Provides quick energy', 'Contains caffeine for alertness'],
    concerns: ['High sugar content (39g per 12oz)', 'Artificial additives', 'Potential tooth decay'],
    allergens: ['None declared']
  }
};

export default function ProductAnalysisPage({ productName = 'Coca-Cola Classic' }: { productName?: string }) {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const product = mockProduct;

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

  const ScoreCard = ({ title, score, icon }: { title: string; score: number; icon: string }) => (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>
        {title}
      </h3>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        color: getScoreColor(score),
        marginBottom: '0.25rem'
      }}>
        {score}/10
      </div>
      <div style={{
        width: '100%',
        height: '4px',
        backgroundColor: '#e5e7eb',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${score * 10}%`,
          height: '100%',
          backgroundColor: getScoreColor(score),
          borderRadius: '2px'
        }} />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => window.history.back()}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ←
            </button>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                {product.brand} • {product.category}
              </p>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', gap: '2rem', padding: '2rem' }}>
        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Summary Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <ScoreCard title="Health Score" score={product.healthScore} icon="🏥" />
            <ScoreCard title="Ethical Score" score={product.ethicalScore} icon="⚖️" />
            <ScoreCard title="Transparency" score={product.transparencyScore} icon="🔍" />
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>
                Overall Score
              </h3>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: getScoreColor(product.overallScore),
                marginBottom: '0.25rem'
              }}>
                {product.overallScore}/10
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid #e5e7eb',
              overflowX: 'auto'
            }}>
              {[
                { id: 'ingredients', label: 'Ingredients', icon: '🧪' },
                { id: 'sourcing', label: 'Sourcing', icon: '🌍' },
                { id: 'manufacturing', label: 'Manufacturing', icon: '🏭' },
                { id: 'sustainability', label: 'Sustainability', icon: '♻️' },
                { id: 'health', label: 'Health Impact', icon: '❤️' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '1rem 1.5rem',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? '#f3f4f6' : 'transparent',
                    borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div style={{ padding: '2rem' }}>
              {activeTab === 'ingredients' && (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Ingredient Analysis
                  </h3>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {product.ingredients.map((ingredient, index) => (
                      <div key={index} style={{
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{ fontWeight: '500', color: '#1f2937' }}>{ingredient}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                          {ingredient === 'High Fructose Corn Syrup' && 'High sugar content - may contribute to weight gain and dental issues'}
                          {ingredient === 'Caramel Color' && 'Artificial coloring - generally safe but may contain trace amounts of 4-methylimidazole'}
                          {ingredient === 'Phosphoric Acid' && 'Preservative and flavoring - may affect calcium absorption in large quantities'}
                          {ingredient === 'Natural Flavors' && 'Proprietary blend - specific ingredients not disclosed'}
                          {ingredient === 'Caffeine' && 'Stimulant - 34mg per 12oz serving, moderate amount'}
                          {ingredient === 'Carbonated Water' && 'Base ingredient - safe for consumption'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'sourcing' && (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Sourcing Information
                  </h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Origin</h4>
                      <p style={{ color: '#6b7280', margin: 0 }}>{product.sourcing.origin}</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Certifications</h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {product.sourcing.certifications.map((cert, index) => (
                          <span key={index} style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#dbeafe',
                            color: '#1e40af',
                            borderRadius: '12px',
                            fontSize: '0.75rem'
                          }}>
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Labor Practices</h4>
                      <p style={{ color: '#6b7280', margin: 0 }}>{product.sourcing.laborPractices}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'manufacturing' && (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Manufacturing Details
                  </h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Location</h4>
                      <p style={{ color: '#6b7280', margin: 0 }}>{product.manufacturing.location}</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Processes</h4>
                      <ul style={{ color: '#6b7280', margin: 0, paddingLeft: '1rem' }}>
                        {product.manufacturing.processes.map((process, index) => (
                          <li key={index}>{process}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Environmental Impact</h4>
                      <p style={{ color: '#6b7280', margin: 0 }}>{product.manufacturing.environmental}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sustainability' && (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Sustainability Assessment
                  </h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem', color: '#15803d' }}>♻️ Packaging</h4>
                      <p style={{ color: '#166534', margin: 0 }}>{product.sustainability.packaging}</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem', color: '#d97706' }}>🌍 Carbon Footprint</h4>
                      <p style={{ color: '#92400e', margin: 0 }}>{product.sustainability.carbonFootprint}</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem', color: '#15803d' }}>🔄 Recyclability</h4>
                      <p style={{ color: '#166534', margin: 0 }}>{product.sustainability.recyclability}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Health Impact Analysis
                  </h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem', color: '#15803d' }}>✅ Benefits</h4>
                      <ul style={{ color: '#166534', margin: 0, paddingLeft: '1rem' }}>
                        {product.healthImpact.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem', color: '#dc2626' }}>⚠️ Concerns</h4>
                      <ul style={{ color: '#991b1b', margin: 0, paddingLeft: '1rem' }}>
                        {product.healthImpact.concerns.map((concern, index) => (
                          <li key={index}>{concern}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#fffbeb', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                      <h4 style={{ fontWeight: '500', marginBottom: '0.5rem', color: '#d97706' }}>🚨 Allergens</h4>
                      <p style={{ color: '#92400e', margin: 0 }}>
                        {product.healthImpact.allergens.length > 0 ? product.healthImpact.allergens.join(', ') : 'None declared'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: '300px', position: 'sticky', top: '120px', height: 'fit-content' }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              📄 Generate Report
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              Download a comprehensive PDF report with all analysis details.
            </p>
            <button style={{
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
            onClick={() => alert('PDF report generation coming soon!')}
            >
              Download PDF Report
            </button>
            
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#1f2937' }}>
                Quick Actions
              </h4>
              <button style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}>
                📧 Email Report
              </button>
              <button style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}>
                📱 Share Report
              </button>
              <button style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}>
                💾 Save to Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}