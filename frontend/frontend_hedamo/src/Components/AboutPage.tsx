import { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former sustainability consultant with 10+ years experience in ethical business practices and consumer advocacy.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    role: 'Chief Science Officer',
    bio: 'PhD in Environmental Chemistry, specializing in product safety analysis and health impact assessment.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'Head of AI & Technology',
    bio: 'AI researcher and former Google engineer, passionate about using technology for social good.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Head of Product',
    bio: 'UX designer and product strategist focused on creating intuitive experiences for conscious consumers.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const iconStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginBottom: '1rem'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '8rem 2rem 4rem', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '700', 
            color: '#0f172a', 
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            About Hedamo
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#475569', 
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We're on a mission to empower consumers with transparent, AI-driven insights 
            that promote healthier choices and ethical consumption.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ 
              ...iconStyle, 
              backgroundColor: '#dcfce7', 
              color: '#16a34a',
              margin: '0 auto 1rem'
            }}>
              🎯
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
              Our Mission
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#475569', 
              lineHeight: '1.7',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              To democratize product transparency by providing instant, comprehensive analysis 
              of health impacts, ethical sourcing, and environmental sustainability for every 
              product consumers encounter.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '3rem' 
          }}>
            {/* Vision */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                ...iconStyle, 
                backgroundColor: '#dbeafe', 
                color: '#2563eb',
                margin: '0 auto 1rem'
              }}>
                🔮
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.6' }}>
                A world where every consumer has access to complete product transparency, 
                enabling informed decisions that benefit personal health and global sustainability.
              </p>
            </div>

            {/* Values */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                ...iconStyle, 
                backgroundColor: '#fef3c7', 
                color: '#d97706',
                margin: '0 auto 1rem'
              }}>
                💎
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
                Our Values
              </h3>
              <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#16a34a' }}>Transparency:</strong> Complete openness in our methods and findings
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#2563eb' }}>Accuracy:</strong> Science-based analysis you can trust
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#7c3aed' }}>Accessibility:</strong> Making complex data simple and actionable
                </div>
                <div>
                  <strong style={{ color: '#dc2626' }}>Impact:</strong> Driving positive change through informed choices
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ 
            ...iconStyle, 
            backgroundColor: '#f3e8ff', 
            color: '#7c3aed',
            margin: '0 auto 2rem'
          }}>
            📖
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#0f172a', marginBottom: '2rem' }}>
            Our Story
          </h2>
          <div style={{ textAlign: 'left', fontSize: '1.125rem', color: '#475569', lineHeight: '1.7' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Hedamo was born from a simple frustration: trying to understand what's really 
              in the products we use every day. Our founders, a team of scientists, technologists, 
              and consumer advocates, spent countless hours researching ingredients, supply chains, 
              and health impacts.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              We realized that while this information exists, it's scattered across research papers, 
              regulatory databases, and corporate reports—making it nearly impossible for everyday 
              consumers to access and understand.
            </p>
            <p>
              That's when we decided to build Hedamo: an AI-powered platform that aggregates, 
              analyzes, and translates complex product data into clear, actionable insights. 
              Today, we're proud to help millions of consumers make more informed, healthier, 
              and more ethical choices.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ 
              ...iconStyle, 
              backgroundColor: '#fecaca', 
              color: '#dc2626',
              margin: '0 auto 1rem'
            }}>
              👥
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
              Meet Our Team
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#475569', maxWidth: '600px', margin: '0 auto' }}>
              Passionate experts united by a shared vision of transparency and consumer empowerment.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {teamMembers.map(member => (
              <div
                key={member.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: hoveredCard === member.id 
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transform: hoveredCard === member.id ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredCard(member.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 1.5rem',
                    border: '4px solid #e2e8f0'
                  }}
                />
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#0f172a', 
                  marginBottom: '0.5rem' 
                }}>
                  {member.name}
                </h3>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#3b82f6', 
                  fontWeight: '500', 
                  marginBottom: '1rem' 
                }}>
                  {member.role}
                </p>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#64748b', 
                  lineHeight: '1.5' 
                }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 2rem', 
        backgroundColor: '#0f172a', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            color: '#ffffff', 
            marginBottom: '1rem' 
          }}>
            Join Our Mission
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#cbd5e1', 
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Ready to make more informed choices? Start analyzing products today 
            and join thousands of conscious consumers.
          </p>
          <button style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transform: 'scale(1)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}