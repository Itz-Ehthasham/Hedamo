import { useEffect, useRef, useState } from 'react'
import './index.css'
import SimpleHeader from './Components/SimpleHeader'
import SimpleHero from './Components/SimpleHero'
import ReportsPage from './Components/ReportsPage'
import AboutPage from './Components/AboutPage'
import ProductAnalysisPage from './Components/ProductAnalysisPage'
import DynamicProductAnalysis from './Components/DynamicProductAnalysis'

function App() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Always clean up first
    if (vantaEffect.current) {
      try {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      } catch (e) {}
    }

    // Only create for home page after cleanup
    if (currentPage === 'home' && vantaRef.current) {
      const timer = setTimeout(() => {
        if ((window as any).VANTA && vantaRef.current && !vantaEffect.current) {
          try {
            vantaEffect.current = (window as any).VANTA.BIRDS({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              backgroundColor: 0xffffff,
              color1: 0x3b82f6,
              color2: 0x8b5cf6,
              quantity: 4,
              birdSize: 0.8,
              speedLimit: 1
            });
            console.log('VANTA Birds initialized with 3 birds');
          } catch (e) {
            console.log('VANTA init failed:', e);
          }
        }
      },100);
      
      return () => {
        clearTimeout(timer);
        if (vantaEffect.current) {
          try {
            vantaEffect.current.destroy();
            vantaEffect.current = null;
          } catch (e) {}
        }
      };
    }
  }, [currentPage]);

  // Simple routing
  useEffect(() => {
    const updatePage = () => {
      const path = window.location.pathname;
      console.log('Updating page for path:', path);
      if (path === '/reports') setCurrentPage('reports');
      else if (path === '/about') setCurrentPage('about');
      else if (path === '/analyze') setCurrentPage('analyze');
      else setCurrentPage('home');
    };
    
    updatePage();
    window.addEventListener('popstate', updatePage);
    window.addEventListener('navigate', updatePage);
    
    return () => {
      window.removeEventListener('popstate', updatePage);
      window.removeEventListener('navigate', updatePage);
    };
  }, []);

  const renderPage = () => {
    console.log('Rendering page:', currentPage);
    switch (currentPage) {
      case 'reports':
        return <ReportsPage />;
      case 'about':
        return <AboutPage />;
      case 'analyze':
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product') || 'coca-cola';
        const productKey = productName.toLowerCase().replace(/\s+/g, '-');
        return <DynamicProductAnalysis initialProduct={productKey} />;
      default:
        return <SimpleHero />;
    }
  };

  const navigateTo = (page: string) => {
    console.log('Navigating to:', page);
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  };

  return (
    <div ref={currentPage === 'home' ? vantaRef : null} style={{ minHeight: '100vh', position: 'relative' }}>
      <SimpleHeader onNavigate={navigateTo} />
      <div style={{ position: 'relative', zIndex: 10 }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App