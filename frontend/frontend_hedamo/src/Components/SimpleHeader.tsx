import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function SimpleHeader() {
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
        <a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a>
        <a href="/reports" style={{ textDecoration: 'none', color: 'black' }}>Reports</a>
        <a href="/about" style={{ textDecoration: 'none', color: 'black' }}>About</a>
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