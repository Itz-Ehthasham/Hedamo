import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function SimpleHeader({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      zIndex: 50,
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      {/* Logo */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }}>
        Hedamo
      </div>

      {/* Navigation */}
      <nav style={{ display: 'flex', gap: '2rem', color: 'black' }}>
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          style={{ 
            textDecoration: 'none', 
            color: 'black',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(0px)',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backdropFilter = 'blur(10px)';
            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            e.currentTarget.style.color = '#3b82f6';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backdropFilter = 'blur(0px)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Home
        </a>
        <a 
          href="/reports" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('reports');
          }}
          style={{ 
            textDecoration: 'none', 
            color: 'black',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(0px)',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backdropFilter = 'blur(10px)';
            e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            e.currentTarget.style.color = '#10b981';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backdropFilter = 'blur(0px)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Reports
        </a>
        <a 
          href="/about" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('about');
          }}
          style={{ 
            textDecoration: 'none', 
            color: 'black',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(0px)',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backdropFilter = 'blur(10px)';
            e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
            e.currentTarget.style.color = '#8b5cf6';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backdropFilter = 'blur(0px)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          About
        </a>
      </nav>

      {/* Auth */}
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'black',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}