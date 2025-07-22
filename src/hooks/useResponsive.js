import { useState, useEffect } from 'react';

// Breakpoints estándar para responsividad
const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200
};

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      // Determinar el tipo de dispositivo basado en el ancho
      if (width < breakpoints.mobile) {
        setDeviceType('mobile');
      } else if (width < breakpoints.tablet) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Ejecutar al montar el componente
    handleResize();

    // Agregar event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Funciones de utilidad para verificar el tipo de dispositivo
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  
  // Funciones para verificar rangos específicos
  const isMobileOrTablet = isMobile || isTablet;
  const isTabletOrDesktop = isTablet || isDesktop;
  
  // Función para verificar si el ancho es menor a un breakpoint específico
  const isBelow = (breakpoint) => {
    return screenSize.width < (breakpoints[breakpoint] || breakpoint);
  };
  
  // Función para verificar si el ancho es mayor a un breakpoint específico
  const isAbove = (breakpoint) => {
    return screenSize.width > (breakpoints[breakpoint] || breakpoint);
  };

  return {
    // Información del tamaño de pantalla
    screenSize,
    width: screenSize.width,
    height: screenSize.height,
    
    // Tipo de dispositivo
    deviceType,
    
    // Verificaciones de tipo de dispositivo
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
    isTabletOrDesktop,
    
    // Funciones de utilidad
    isBelow,
    isAbove,
    
    // Breakpoints para referencia
    breakpoints
  };
};

export default useResponsive;
