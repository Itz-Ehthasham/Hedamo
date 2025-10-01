import { useEffect, useRef, useState } from 'react'
import './index.css'
import SimpleHeader from './Components/SimpleHeader'
import SimpleHero from './Components/SimpleHero'
import ReportsPage from './Components/ReportsPage'
import AboutPage from './Components/AboutPage'

function App() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((window as any).VANTA && vantaRef.current) {
        (window as any).VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          backgroundColor: 0xffffff,
          color1: 0x3b82f6,
          color2: 0x8b5cf6,
          quantity: 3,
          birdSize: 1.2,
          speedLimit: 3
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simple routing
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/reports') setCurrentPage('reports');
    else if (path === '/about') setCurrentPage('about');
    else setCurrentPage('home');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'reports':
        return <ReportsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <SimpleHero />;
    }
  };

  return (
    <div ref={vantaRef} style={{ minHeight: '100vh' }}>
      <SimpleHeader />
      {renderPage()}
    </div>
  );
}

export default App