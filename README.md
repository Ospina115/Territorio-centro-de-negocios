# Territorio Centro de Negocios

Este proyecto es un sitio web corporativo de presentación para Territorio Centro de Negocios, construido con React y Vite.

## Interfaz principal

La aplicación muestra una estructura sencilla de una sola página con los siguientes componentes clave:

- `Navbar`: encabezado fijo con el logo y una barra de navegación interactiva.
- `Dock`: un panel flotante tipo "dock" en la parte inferior que utiliza animaciones de magnificación con base en la posición del cursor.
- `Hero`: sección principal con título, subtítulo, botón de llamada a la acción y un modal de reserva que abre un mensaje preformateado para WhatsApp.

### Comportamiento visual

- El `Navbar` cambia su estilo cuando el usuario hace scroll más de 50px.
- El `Dock` expande su altura al pasar el cursor sobre él y agranda dinámicamente cada ítem según la distancia del puntero.
- El `Hero` aplica una clase de aparición progresiva después de un retraso breve para animar la entrada de contenido.

## Cómo funciona el patrón interactivo

La aplicación usa React y animaciones con `motion/react` para mantener el estado local y evitar recargas completas de la página.

### Estado y actualizaciones

- `Hero` usa estado local con `useState` para controlar:
  - `isVisible`: activa la animación de aparición del contenido.
  - `modalOpen`: muestra u oculta el modal de reserva.
  - `selectedService`: guarda el servicio seleccionado para el mensaje.
  - `messageText`: almacena el texto del mensaje, que se sincroniza automáticamente con la plantilla cuando cambia el servicio seleccionado.
- El estado se actualiza en respuesta a eventos del usuario, como clics en botones, cambios en el textarea o selección de un servicio.
- Al presionar "Enviar", se construye una URL de WhatsApp con el mensaje codificado y se abre en una nueva pestaña. No hay recarga de la aplicación web.

### Patrón interactivo del `Dock`

- `Dock` mantiene `mouseX` y `isHovered` usando `useMotionValue` para trackear la posición del cursor y si el dock está activo.
- Cada `DockItem` calcula su tamaño objetivo en función de la distancia entre el cursor y el centro del elemento.
- `useTransform` convierte esa distancia en un tamaño dinámico, y `useSpring` suaviza la animación para lograr un efecto de lupa fluido.
- Cuando el cursor abandona el `Dock`, `isHovered` se restablece y `mouseX` se pone en `Infinity`, lo que hace que los ítems vuelvan a su tamaño base sin recargar la página.

### Qué se recarga y qué no se recarga

- La aplicación no recarga la página completa en ninguna interacción.
- Las acciones del usuario solo actualizan el estado local de React y las propiedades animadas de `motion/react`.
- El modal de reserva se muestra u oculta mediante renderizado condicional basado en `modalOpen`.
- El cambio de secciones usando el `navbar` simplemente modifica `window.location.hash`; esto no recarga la página, solo navega dentro de la misma vista.

## Flujo de eventos de UI en la sección `home`

1. Carga inicial
   - `Hero` monta con `isVisible` en `false`.
   - `useEffect` programa un `setTimeout` de 500ms que cambia `isVisible` a `true`.
   - Al activarse, el contenido principal agrega la clase `hero-content-visible` para animar su aparición.

2. Click en "Aparta tu Oficina"
   - Se ejecuta `openModal()`.
   - `modalOpen` se establece en `true` y el modal se renderiza.
   - `selectedService` se reinicia a `oficina_fisica` para asegurar la plantilla inicial.

3. Selección de un servicio
   - Al hacer click en un botón de servicio, se actualiza `selectedService`.
   - Un segundo `useEffect` detecta el cambio y asigna `messageText` a la plantilla correspondiente.
   - El textarea se actualiza instantáneamente con el mensaje nuevo sin recargar la página.

4. Edición del mensaje
   - El usuario escribe en el `textarea`.
   - `onChange` actualiza `messageText` en tiempo real.
   - Este cambio solo modifica el estado local de `Hero`; ningún otro componente se vuelve a cargar.

5. Enviar el mensaje
   - Al presionar el botón "Enviar", se ejecuta `handleSend()`.
   - Se construye la URL de WhatsApp con `encodeURIComponent(messageText)`.
   - Se abre una nueva pestaña con la URL y el modal se cierra (`modalOpen` se vuelve `false`).

6. Cerrar modal sin enviar
   - Al click en "Cancelar" o en el botón de cerrar, `closeModal()` establece `modalOpen` en `false`.
   - El modal desaparece por renderizado condicional.

Este flujo mantiene el comportamiento de la sección `home` totalmente reactivo y basado en estado local, sin recargas de página ni navegación forzada. 

## Carpeta de código principal

- `src/App.jsx`: punto de entrada del componente principal.
- `src/components/navbar/Navbar.jsx`: barra de navegación y `Dock` interactivo.
- `src/components/navbar/Dock.jsx`: lógica de animación y comportamiento de los elementos del dock.
- `src/components/home/Hero.jsx`: contenido de inicio y modal de reserva.
- `src/main.jsx`: inicializa React con `createRoot`.

## Instalación rápida

1. `npm install`
2. `npm run dev`

Esto inicia el servidor de desarrollo de Vite y habilita recarga en caliente sin pérdida del estado de los componentes.
