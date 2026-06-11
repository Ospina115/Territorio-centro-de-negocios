import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('oficina_fisica');
  const [messageText, setMessageText] = useState('');

  const templates = {
    oficina_fisica: 'Hola, estoy interesado en una oficina física. Por favor indícame disponibilidad y tarifas.',
    oficina_virtual: 'Hola, quisiera información sobre la oficina virtual. ¿Qué incluye el servicio?',
    direccion_comercial: 'Hola, necesito una dirección comercial. ¿Cuáles son los requisitos y costos?'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // sincroniza el texto con la plantilla cuando cambie el servicio seleccionado
    setMessageText(templates[selectedService]);
  }, [selectedService]);

  const openModal = () => {
    setModalOpen(true);
    setSelectedService('oficina_fisica');
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSend = () => {
    const phone = '573176868555';
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
    setModalOpen(false);
  };

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
            <button
              type="button"
              className="hero-cta-primary"
              onClick={openModal}
            >
              Aparta tu Oficina
            </button>
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

      {modalOpen && (
        <div className="reservation-modal-overlay" role="dialog" aria-modal="true">
          <div className="reservation-modal">
            <button className="reservation-close" onClick={closeModal} aria-label="Cerrar">×</button>
            <h2 className="reservation-title">¿Qué servicio te interesa?</h2>

            <div className="reservation-options">
              <button
                className={`service-option ${selectedService === 'oficina_fisica' ? 'active' : ''}`}
                onClick={() => setSelectedService('oficina_fisica')}
              >
                Oficina física
              </button>
              <button
                className={`service-option ${selectedService === 'oficina_virtual' ? 'active' : ''}`}
                onClick={() => setSelectedService('oficina_virtual')}
              >
                Oficina virtual
              </button>
              <button
                className={`service-option ${selectedService === 'direccion_comercial' ? 'active' : ''}`}
                onClick={() => setSelectedService('direccion_comercial')}
              >
                Dirección comercial
              </button>
            </div>

            <label className="reservation-label">Mensaje (personaliza antes de enviar)</label>
            <textarea
              className="reservation-textarea"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={4}
            />

            <div className="reservation-actions">
              <button className="hero-cta-secondary" onClick={closeModal}>Cancelar</button>
              <button className="hero-cta-primary" onClick={handleSend}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
