import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navItems = [
    { id: 'home', label: 'Inicio', href: '#home' },
    { id: 'services', label: 'Servicios', href: '#services' },
    { id: 'gallery', label: 'Galería', href: '#gallery' },
    { id: 'about', label: 'Nosotros', href: '#about' },
    { id: 'contact', label: 'Contacto', href: '#contact' }
  ];

  const whatsappUrl = "https://api.whatsapp.com/send?phone=573176868555";

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="navbar-container">
        <div className="navbar-brand">
          <img 
            className="logo-full" 
            src="/images/territoriocentrodenegocios logo.png" 
            alt="Territorio Centro de Negocios" 
          />
          <img 
            className="logo-compact" 
            src="/images/logo.png" 
            alt="Territorio" 
          />
        </div>

        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={item.href} className="navbar-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-button"
        >
          Aparta tu Oficina
        </a>

        <button 
          className="mobile-menu-toggle"
          onClick={toggleDropdown}
          aria-label="Toggle menu"
        >
          <span className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </nav>

      <div className={`mobile-dropdown ${isDropdownOpen ? 'mobile-dropdown-open' : ''}`}>
        {navItems.map((item) => (
          <a 
            key={item.id}
            href={item.href} 
            className="mobile-dropdown-link"
            onClick={() => setIsDropdownOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-button mobile-cta"
        >
          Aparta tu Oficina
        </a>
      </div>
    </header>
  );
};

export default Navbar;
