import { useEffect, useState } from 'react';
import './Navbar.css';
import Dock from './Dock';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Inicio', onClick: () => window.location.hash = '#home' },
    { id: 'nosotros', label: 'Servicios', onClick: () => window.location.hash = '#services' },
    { id: 'gallery', label: 'Galería', onClick: () => window.location.hash = '#gallery' },
    { id: 'about', label: 'Nosotros', onClick: () => window.location.hash = '#about' },
    { id: 'contact', label: 'Contacto', onClick: () => window.location.hash = '#contact' }
  ];

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand">
            <img 
              className="logo-full" 
              src="/assets/tcnLogotipoB.svg" 
              alt="Territorio Centro de Negocios" 
            />
            <img 
              className="logo-compact" 
              src="tcnLogo.svg" 
              alt="Territorio" 
            />
          </div>
        </div>
      </header>

      <Dock
        items={navItems}
        panelHeight={68}
        baseItemSize={72}
        magnification={90}
      />
    </>
  );
};

export default Navbar;
