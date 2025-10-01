import { UserButton } from '@clerk/clerk-react';

const mockProduct = {
  name: 'Coca-Cola Classic',
  brand: 'The Coca-Cola Company',
  category: 'Carbonated Soft Drinks',
  healthScore: 3,
  ethicalScore: 6,
  transparencyScore: 7,
  overallScore: 5.3
};

export default function ProductAnalysisPage() {
  const getScoreColor = (score: number) => {
    if (score >= 8) return '#10b981';
    if (score >= 6) return '#f59e0b';
    if (score >= 4) return '#f97316';
    return '#ef4444';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
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
            <button onClick={() => window.history.back()}>←</button>
            <div>
              <h1>{mockProduct.name}</h1>
              <p>{mockProduct.brand} • {mockProduct.category}</p>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <div>🏥</div>
            <h3>Health Score</h3>
            <div style={{ color: getScoreColor(mockProduct.healthScore) }}>
              {mockProduct.healthScore}/10
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <div>⚖️</div>
            <h3>Ethical Score</h3>
            <div style={{ color: getScoreColor(mockProduct.ethicalScore) }}>
              {mockProduct.ethicalScore}/10
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <div>🔍</div>
            <h3>Transparency</h3>
            <div style={{ color: getScoreColor(mockProduct.transparencyScore) }}>
              {mockProduct.transparencyScore}/10
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <div>🎯</div>
            <h3>Overall Score</h3>
            <div style={{ color: getScoreColor(mockProduct.overallScore) }}>
              {mockProduct.overallScore}/10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}