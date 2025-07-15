import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className={`hero-content ${isVisible ? 'hero-content-visible' : ''}`}>
          <h1 className="hero-title">
            Territorio Centro de Negocios
          </h1>
          <h3 className="hero-subtitle">
            Vive un nuevo concepto de <span className="hero-highlight">Oficina</span>
          </h3>
          <div className="hero-actions">
            <a 
              href="https://api.whatsapp.com/send?phone=573176868555" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-cta-primary"
            >
              Reserva Ahora
            </a>
            <a 
              href="#services" 
              className="hero-cta-secondary"
            >
              Ver Servicios
            </a>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
