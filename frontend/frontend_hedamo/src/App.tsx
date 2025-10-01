import { useEffect, useRef } from 'react'
import './index.css'

function App() {
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((window as any).VANTA && vantaRef.current) {
        (window as any).VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          backgroundColor: 0xffffff,
          color1: 0xff0000,
          color2: 0x0affff,
          quantity: 5
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={vantaRef} style={{ width: '100vw', height: '100vh' }}>
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        color: 'black', 
        textAlign: 'center', 
        paddingTop: '50vh'
      }}>
        <h1>Hedamo </h1>
        <p>Welcome </p>
      </div>
    </div>
  );
}

export default App