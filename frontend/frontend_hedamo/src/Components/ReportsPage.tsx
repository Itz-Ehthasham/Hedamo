import { useState } from 'react';

interface Report {
  id: string;
  productName: string;
  brand: string;
  category: string;
  healthScore: number;
  sustainabilityScore: number;
  date: string;
  summary: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    productName: 'Coca-Cola Classic',
    brand: 'Coca-Cola',
    category: 'Beverages',
    healthScore: 3,
    sustainabilityScore: 4,
    date: '2024-01-15',
    summary: 'High sugar content, artificial additives present. Moderate environmental impact.'
  },
  {
    id: '2',
    productName: 'Organic Almond Milk',
    brand: 'Whole Foods',
    category: 'Dairy Alternatives',
    healthScore: 8,
    sustainabilityScore: 7,
    date: '2024-01-14',
    summary: 'Excellent nutritional profile, organic certification. Good sustainability practices.'
  },
  {
    id: '3',
    productName: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Electronics',
    healthScore: 9,
    sustainabilityScore: 6,
    date: '2024-01-13',
    summary: 'No health concerns. Moderate sustainability due to manufacturing processes.'
  }
];

export default function ReportsPage() {
  const [reports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  const categories = ['All', 'Beverages', 'Dairy Alternatives', 'Electronics', 'Food', 'Personal Care'];

  const filteredReports = reports
    .filter(report => 
      report.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(report => categoryFilter === 'All' || report.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'health') return b.healthScore - a.healthScore;
      if (sortBy === 'sustainability') return b.sustainabilityScore - a.sustainabilityScore;
      return a.productName.localeCompare(b.productName);
    });

  const getScoreColor = (score: number) => {
    if (score >= 8) return '#10b981'; // Green
    if (score >= 6) return '#f59e0b'; // Yellow
    if (score >= 4) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 2rem 2rem', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            Product Reports
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
            Browse transparency reports for products you've analyzed
          </p>
        </div>

        {/* Filters and Search */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search products or brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              minWidth: '300px',
              flex: 1
            }}
          />

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="health">Sort by Health Score</option>
            <option value="sustainability">Sort by Sustainability</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Reports Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {filteredReports.map(report => (
            <div
              key={report.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}
            >
              {/* Product Info */}
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                  {report.productName}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {report.brand} • {report.category}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  Analyzed on {new Date(report.date).toLocaleDateString()}
                </p>
              </div>

              {/* Scores */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Health Score
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: getScoreColor(report.healthScore) 
                  }}>
                    {report.healthScore}/10
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Sustainability
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: getScoreColor(report.sustainabilityScore) 
                  }}>
                    {report.sustainabilityScore}/10
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p style={{ 
                color: '#4b5563', 
                fontSize: '0.875rem', 
                lineHeight: '1.4', 
                marginBottom: '1rem' 
              }}>
                {report.summary}
              </p>

              {/* View Details Button */}
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={() => alert(`View full report for ${report.productName}`)}
              >
                View Full Report
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredReports.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#6b7280' 
          }}>
            <p style={{ fontSize: '1.125rem' }}>No reports found matching your criteria.</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}