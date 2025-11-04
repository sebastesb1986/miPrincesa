// Textos románticos para cada imagen del cuento
const textos = [
    "Yo quiero que seas como Cenicienta, mi princesa de los cuentos de hadas",
    "Ser aquel que ponga en tu pie, la zapatilla de cristal del amor eterno",
    "Como un cuento de hadas, te quiero contar todo lo que siento por ti",
    "Esa mirada dulce y mágica a mí me congela el corazón de amor",
    "Quisiera ser el genio que concede todos tus deseos y sueños",
    "Yo quiero que tú seas mi princesa, que tú seas la bella y yo la bestia que se transforma con tu amor",
    "Y solo con tus besos me iluminas y me llenas de felicidad infinita",
    "Y que despiertes de tus sueños solo con mis besos de amor verdadero",
    "¿Quieres saber qué pasó recorriendo otros reinos? Todo lo hice por ti, mi amor",
    "En cada viaje que emprendo, llevo tu recuerdo como mi tesoro más preciado",
    "Cada lugar que visito, cada aventura que vivo, es un regalo que preparo para ti",
    "Aunque estemos cada quien en su casa, mi corazón esta contigo en cada paso",
    "¿Quieres conocer todos los lugares que he recorrido pensando en ti? Todo lo hice por amor"
];

// Elementos del DOM
const descripcion = document.getElementById('descripcion-text');
const descripcion_a = document.getElementById('descripcion-text-a');
const ourSpace = document.getElementById('our_space');

// Variables globales para los audios
let audioCuento = null;
let audioPienso = null;
let btnCuento = null;
let btnPienso = null;

// Nota: La función updateCarouselIndicators ya no es necesaria porque el carrusel fue reemplazado por la galería

// Función para detener todos los audios
function stopAllAudios() {
    if (audioCuento && !audioCuento.paused) {
        audioCuento.pause();
        audioCuento.currentTime = 0;
        btnCuento.innerHTML = '▶️ Cuéntame la Historia';
        btnCuento.style.background = 'linear-gradient(45deg, #DC2626, #B91C1C)';
    }
    
    if (audioPienso && !audioPienso.paused) {
        audioPienso.pause();
        audioPienso.currentTime = 0;
        btnPienso.innerHTML = '💝 ¿Qué Significas para Mí?';
        btnPienso.style.background = 'linear-gradient(45deg, #3B82F6, #1D4ED8)';
    }
}

// ===== FUNCIONALIDAD DE LA GALERÍA =====

// Función para abrir el modal de la galería con la imagen y texto correspondiente
function openGalleryModal(imageIndex, imageSrc) {
    // Obtener el modal de Bootstrap
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    
    // Obtener los elementos del modal
    const modalImage = document.getElementById('galleryModalImage');
    const modalText = document.getElementById('galleryModalText');
    const modalButtonContainer = document.getElementById('galleryModalButtonContainer');
    
    // Asegurarse de que el índice esté dentro del rango correcto
    if (imageIndex >= textos.length) {
        console.log('⚠️ Índice fuera de rango, reseteando a 0');
        imageIndex = 0;
    }
    
    // Establecer la imagen y el texto
    modalImage.src = imageSrc;
    modalImage.alt = `Imagen ${imageIndex + 1}`;
    modalText.textContent = textos[imageIndex];
    
    // Mostrar u ocultar el botón según si es la última imagen
    if (imageIndex === textos.length - 1) {
        // Mostrar el botón para la última imagen
        if (modalButtonContainer) {
            modalButtonContainer.style.display = 'block';
        }
    } else {
        // Ocultar el botón para las demás imágenes
        if (modalButtonContainer) {
            modalButtonContainer.style.display = 'none';
        }
    }
    
    // Abrir el modal
    galleryModal.show();
    
    console.log('🖼️ Abriendo galería - Imagen:', imageIndex + 1, 'Texto:', textos[imageIndex]);
}

// Event listeners para los items de la galería
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que el DOM esté completamente cargado
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    console.log('🖼️ Total de items en la galería:', galleryItems.length);
    console.log('📝 Total de textos disponibles:', textos.length);
    
    // Agregar event listener a cada item de la galería
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imageIndex = parseInt(this.getAttribute('data-index'));
            const imageSrc = this.getAttribute('data-image');
            
            // Abrir el modal con la imagen y texto correspondiente
            openGalleryModal(imageIndex, imageSrc);
        });
        
        // Verificar que las imágenes se carguen correctamente
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('load', function() {
                console.log(`✅ Imagen de galería ${index + 1} cargada:`, this.src);
            });
            img.addEventListener('error', function() {
                console.error(`❌ Error cargando imagen de galería ${index + 1}:`, this.src);
            });
        }
    });
    
    // Establecer el texto inicial en la descripción
    if (descripcion && textos.length > 0) {
        descripcion.textContent = textos[0];
    }
});

// Función para cambiar el texto de acuerdo a la imagen activa (mantener para compatibilidad)
function updateDescriptionText(index) {
    // Asegúrate de que el índice esté dentro del rango correcto
    if (index >= textos.length) {
        console.log('⚠️ Índice fuera de rango, reseteando a 0');
        index = 0;
    }

    // Cambiar el texto según el índice de la imagen con efecto de transición
    if (descripcion) {
        descripcion.style.opacity = '0';
        descripcion.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            descripcion.textContent = textos[index];
            descripcion.style.opacity = '1';
            descripcion.style.transform = 'translateY(0)';
        }, 300);
    }

    // Verificar si ya hemos insertado el contenido en #our_space, para evitar duplicados
    if (descripcion_a) {
        if (index === textos.length - 1) {
            // Cambiar el texto del párrafo por el nuevo contenido con estilo de enlace
            descripcion_a.innerHTML = `
                <div style="background: linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(59, 130, 246, 0.1)); 
                            padding: 20px; border-radius: 15px; border-left: 4px solid var(--accent-color);">
                    <p style="font-family: 'Dancing Script', cursive; font-size: 1.4rem; color: var(--primary-color); 
                              text-align: center; margin-bottom: 15px;">
                        ¡Descubre mis aventuras por el mundo!
                    </p>
                    <a href="pages/vida.html" class="nav-link" style="display: inline-block; margin: 0;">
                        🌍 Ver Mis Viajes por Ti
                    </a>
                </div>
            `;
        } else {
            // Volver al texto original si no estamos en el último texto
            descripcion_a.innerHTML = `
                <p style="font-family: 'Dancing Script', cursive; font-size: 1.4rem; color: var(--secondary-color); 
                          text-align: center; margin: 0;">
                    Léeme hasta el final para descubrir más...
                </p>
            `;
        }
    }
}

// Nota: El código del carrusel ha sido reemplazado por la galería. 
// Los eventos del carrusel ya no son necesarios.

// Función para reproducir el audio del cuento
document.addEventListener('DOMContentLoaded', function () {
    btnCuento = document.getElementById('btnPlayAudio');
    audioCuento = document.getElementById('audio-cuento');

    btnCuento.addEventListener('click', function () {
        if (audioCuento.paused) {
            // Trackear reproducción de audio
            trackUserActivity('Audio Historia Reproducido');
            
            // Detener el otro audio antes de reproducir este
            stopAllAudios();
            
            audioCuento.play()
                .then(() => {
                    btnCuento.innerHTML = '⏸️ Pausar Historia';
                    btnCuento.style.background = 'linear-gradient(45deg, #B91C1C, #991B1B)';
                    // Añadir efecto visual
                    btnCuento.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        btnCuento.style.transform = 'scale(1)';
                    }, 200);
                })
                .catch(error => {
                    console.error('No se pudo reproducir el audio:', error);
                    btnCuento.innerHTML = '❌ Error de Audio';
                    trackUserActivity('Error Audio Historia', { error: error.message });
                });
        } else {
            trackUserActivity('Audio Historia Pausado');
            audioCuento.pause();
            btnCuento.innerHTML = '▶️ Cuéntame la Historia';
            btnCuento.style.background = 'linear-gradient(45deg, #DC2626, #B91C1C)';
        }
    });

    // Evento para cuando el audio termine
    audioCuento.addEventListener('ended', function() {
        btnCuento.innerHTML = '🔄 Repetir Historia';
        btnCuento.style.background = 'linear-gradient(45deg, #059669, #047857)';
    });
});

// Función para reproducir el audio de "qué significas para mí"
document.addEventListener('DOMContentLoaded', function () {
    btnPienso = document.getElementById('btnPlayAudio2');
    audioPienso = document.getElementById('audio-pienso');

    btnPienso.addEventListener('click', function () {
        if (audioPienso.paused) {
            // Trackear reproducción de audio
            trackUserActivity('Audio Significado Reproducido');
            
            // Detener el otro audio antes de reproducir este
            stopAllAudios();
            
            audioPienso.play()
                .then(() => {
                    btnPienso.innerHTML = '⏸️ Pausar Significado';
                    btnPienso.style.background = 'linear-gradient(45deg, #1D4ED8, #1E40AF)';
                    // Añadir efecto visual
                    btnPienso.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        btnPienso.style.transform = 'scale(1)';
                    }, 200);
                })
                .catch(error => {
                    console.error('No se pudo reproducir el audio:', error);
                    btnPienso.innerHTML = '❌ Error de Audio';
                    trackUserActivity('Error Audio Significado', { error: error.message });
                });
        } else {
            trackUserActivity('Audio Significado Pausado');
            audioPienso.pause();
            btnPienso.innerHTML = '💝 ¿Qué Significas para Mí?';
            btnPienso.style.background = 'linear-gradient(45deg, #3B82F6, #1D4ED8)';
        }
    });

    // Evento para cuando el audio termine
    audioPienso.addEventListener('ended', function() {
        btnPienso.innerHTML = '🔄 Repetir Significado';
        btnPienso.style.background = 'linear-gradient(45deg, #059669, #047857)';
    });
});

// Nota: Los efectos visuales del carrusel ya no son necesarios porque el carrusel fue reemplazado por la galería

// Función para añadir efectos de partículas románticas
function createHeartParticle() {
    const heart = document.createElement('div');
    heart.innerHTML = '💙';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.transition = 'all 3s ease-out';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.top = '-50px';
        heart.style.opacity = '0';
        heart.style.transform = 'rotate(360deg)';
    }, 100);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 3000);
}

// Crear partículas de corazones cada cierto tiempo
setInterval(createHeartParticle, 5000);

// Función para añadir efectos de escritura al texto
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Función para añadir efectos de escritura al texto y mostrar imagen al final
function typeWriterWithImage(element, text, imgHTML, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        } else {
            // Cuando termine la animación, agregar la imagen
            if (imgHTML) {
                element.innerHTML = text + ' ' + imgHTML;
                console.log('Imagen de princesa agregada al DOM');
            }
        }
    }
    
    type();
}

// Función para mostrar la burbuja de diálogo de la princesa (solo invitación inicial)
function showPrincessBubble() {
    console.log('🔵 Función showPrincessBubble() llamada');
    
    try {
        // Remover burbuja existente si hay una
        const existingBubble = document.querySelector('.princess-bubble');
        if (existingBubble) {
            console.log('🔵 Removiendo burbuja existente');
            existingBubble.remove();
        }
        
        // Mensaje de invitación inicial
        const mensajeInvitacion = "👑 ¡Pulsame!, tengo algo muy especial que decirte... 💕";
        console.log('🔵 Mensaje de invitación:', mensajeInvitacion);
        
        // Obtener la posición de la princesa
        const princessImg = document.querySelector('.princess-icon');
        console.log('🔵 Icono de princesa encontrado:', princessImg);
        
        // Verificar que el icono de la princesa exista
        if (!princessImg) {
            console.warn('⚠️ No se encontró el icono de la princesa, intentando de nuevo...');
            // Intentar de nuevo después de un delay
            setTimeout(() => {
                showPrincessBubble();
            }, 1000);
            return;
        }
        
        const princessRect = princessImg.getBoundingClientRect();
        console.log('🔵 Dimensiones del icono:', princessRect);
        
        // Verificar que el icono tenga dimensiones válidas
        if (princessRect.width === 0 || princessRect.height === 0) {
            console.warn('⚠️ El icono de la princesa no tiene dimensiones válidas, intentando de nuevo...');
            setTimeout(() => {
                showPrincessBubble();
            }, 1000);
            return;
        }
        
        // Crear la burbuja de diálogo
        const bubble = document.createElement('div');
        bubble.className = 'princess-bubble';
        bubble.innerHTML = `
            <div class="bubble-arrow-left"></div>
            <div class="bubble-text">
                "${mensajeInvitacion}"
            </div>
        `;
        
        // Detectar si es móvil
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        const isVerySmallMobile = window.innerWidth <= 360;
        
        // Calcular el ancho dinámico basado en la longitud del texto y tamaño de pantalla
        const textLength = mensajeInvitacion.length;
        let maxWidth;
        let bubbleWidth;
        let fontSize;
        
        if (isVerySmallMobile) {
            maxWidth = window.innerWidth - 20;
            bubbleWidth = Math.min(Math.max(textLength * 6, 180), maxWidth);
            fontSize = '0.85rem';
        } else if (isSmallMobile) {
            maxWidth = window.innerWidth - 30;
            bubbleWidth = Math.min(Math.max(textLength * 7, 200), maxWidth);
            fontSize = '0.9rem';
        } else if (isMobile) {
            maxWidth = Math.min(window.innerWidth - 40, 350);
            bubbleWidth = Math.min(Math.max(textLength * 8, 220), maxWidth);
            fontSize = '1rem';
        } else {
            maxWidth = 400;
            bubbleWidth = Math.min(Math.max(textLength * 8, 250), maxWidth);
            fontSize = '1.1rem';
        }
        
        // Calcular posición - SIEMPRE DEBAJO DE LA PRINCESA
        // En móviles, centrar mejor la burbuja
        let bubbleLeft, bubbleTop;
        
        if (isMobile) {
            // En móvil, centrar la burbuja en la pantalla o cerca del icono
            const princessCenterX = princessRect.left + (princessRect.width / 2);
            const screenCenterX = window.innerWidth / 2;
            const distanceFromCenter = Math.abs(princessCenterX - screenCenterX);
            
            if (distanceFromCenter > window.innerWidth * 0.3) {
                // Si el icono está muy a un lado, centrar la burbuja
                bubbleLeft = screenCenterX - (bubbleWidth / 2);
            } else {
                // Si está cerca del centro, colocar debajo del icono
                bubbleLeft = princessCenterX - (bubbleWidth / 2);
            }
            
            // Asegurar que no se salga de la pantalla
            bubbleLeft = Math.max(10, Math.min(bubbleLeft, window.innerWidth - bubbleWidth - 10));
            bubbleTop = princessRect.bottom + 20; // Más espacio en móvil
        } else {
            bubbleLeft = princessRect.left + (princessRect.width / 2) - (bubbleWidth / 2);
            bubbleTop = princessRect.bottom + 15;
            
            // Asegurar que no se salga de la pantalla horizontalmente
            const screenWidth = window.innerWidth;
            const minLeft = 10;
            const maxLeft = screenWidth - bubbleWidth - 10;
            bubbleLeft = Math.max(minLeft, Math.min(maxLeft, bubbleLeft));
        }
        
        // Calcular padding dinámico basado en el tamaño de pantalla
        let bubblePadding;
        if (isVerySmallMobile) {
            bubblePadding = '8px 12px';
        } else if (isSmallMobile) {
            bubblePadding = '10px 14px';
        } else if (isMobile) {
            bubblePadding = '12px 16px';
        } else {
            if (textLength > 150) {
                bubblePadding = '12px 18px';
            } else if (textLength > 100) {
                bubblePadding = '15px 20px';
            } else {
                bubblePadding = '18px 22px';
            }
        }
        
        // Verificar que la burbuja no se salga de la pantalla verticalmente (especialmente en móviles)
        // Primero agregar la burbuja al DOM temporalmente para calcular su altura
        bubble.style.cssText = `
            position: fixed !important;
            top: -1000px !important;
            left: ${bubbleLeft}px !important;
            background: white !important;
            border: ${isMobile ? '2px' : '3px'} solid #C2185B !important;
            border-radius: ${isMobile ? '15px' : '20px'} !important;
            padding: ${bubblePadding} !important;
            box-shadow: 0 ${isMobile ? '8px' : '10px'} ${isMobile ? '20px' : '30px'} rgba(194, 24, 91, 0.3) !important;
            z-index: 99999 !important;
            max-width: ${bubbleWidth}px !important;
            width: ${bubbleWidth}px !important;
            min-width: ${isMobile ? '180px' : '200px'} !important;
            font-family: 'Dancing Script', cursive !important;
            font-size: ${fontSize} !important;
            color: #2D1B69 !important;
            text-align: center !important;
            line-height: ${isMobile ? '1.4' : '1.2'} !important;
            pointer-events: none !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            white-space: normal !important;
            word-wrap: break-word !important;
            margin: 0 !important;
            box-sizing: border-box !important;
        `;
        
        // Agregar temporalmente al DOM para calcular altura
        document.body.appendChild(bubble);
        const bubbleHeight = bubble.offsetHeight || 80;
        
        // Verificar que la burbuja no se salga de la pantalla verticalmente
        const maxTop = window.innerHeight - bubbleHeight - 20;
        let finalTop = Math.min(bubbleTop, maxTop);
        
        // Si la burbuja se sale por abajo, colocarla arriba del icono
        if (finalTop !== bubbleTop && isMobile && bubbleTop > maxTop) {
            finalTop = princessRect.top - bubbleHeight - 20;
            // Asegurar que no se salga por arriba
            finalTop = Math.max(10, finalTop);
        }
        
        // Actualizar la posición final directamente
        bubble.style.setProperty('top', `${finalTop}px`, 'important');
        bubble.style.setProperty('left', `${bubbleLeft}px`, 'important');
        bubble.style.setProperty('transform', 'none', 'important');
        bubble.style.setProperty('animation', 'invitationPulse 2s ease-in-out infinite', 'important');
        
        // Agregar estilos para la flecha - SIEMPRE HACIA ARRIBA (o abajo si está arriba del icono)
        const arrow = bubble.querySelector('.bubble-arrow-left');
        if (arrow) {
            // Calcular la posición de la flecha para que apunte hacia la princesa
            const princessCenterX = princessRect.left + (princessRect.width / 2);
            const bubbleCenterX = bubbleLeft + (bubbleWidth / 2);
            const arrowOffset = princessCenterX - bubbleCenterX;
            
            // Determinar tamaño de la flecha según el dispositivo
            const arrowSize = isVerySmallMobile ? 5 : (isSmallMobile ? 6 : (isMobile ? 7 : 10));
            
            // Si la burbuja está arriba del icono, la flecha apunta hacia abajo
            const isAboveIcon = finalTop < princessRect.top;
            
            if (isAboveIcon) {
                // Flecha apuntando hacia abajo
                arrow.style.cssText = `
                    position: absolute !important;
                    left: calc(50% + ${arrowOffset}px) !important;
                    bottom: -${arrowSize}px !important;
                    transform: translateX(-50%) !important;
                    width: 0 !important;
                    height: 0 !important;
                    border-left: ${arrowSize}px solid transparent !important;
                    border-right: ${arrowSize}px solid transparent !important;
                    border-top: ${arrowSize}px solid #C2185B !important;
                    border-bottom: none !important;
                `;
            } else {
                // Flecha apuntando hacia arriba (normal)
                arrow.style.cssText = `
                    position: absolute !important;
                    left: calc(50% + ${arrowOffset}px) !important;
                    top: -${arrowSize}px !important;
                    transform: translateX(-50%) !important;
                    width: 0 !important;
                    height: 0 !important;
                    border-left: ${arrowSize}px solid transparent !important;
                    border-right: ${arrowSize}px solid transparent !important;
                    border-bottom: ${arrowSize}px solid #C2185B !important;
                    border-top: none !important;
                `;
            }
        }
        
        // Agregar estilos para el texto con mejor soporte para móviles
        const textElement = bubble.querySelector('.bubble-text');
        if (textElement) {
            textElement.style.cssText = `
                margin: 0 !important;
                padding: 0 !important;
                display: block !important;
                width: 100% !important;
                font-size: ${fontSize} !important;
                line-height: ${isMobile ? '1.4' : '1.2'} !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
                hyphens: auto !important;
            `;
        }
    
        // La burbuja ya está en el DOM desde antes, solo confirmar que está visible
        console.log('✅ Burbuja de invitación de la princesa mostrada exitosamente');
        console.log('✅ Posición final - Top:', finalTop, 'Left:', bubbleLeft);
        console.log('✅ Dimensiones - Width:', bubbleWidth, 'Height:', bubbleHeight);
        
        // Remover la burbuja después de 6 segundos si no se interactúa
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.style.opacity = '0';
                bubble.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (bubble.parentNode) {
                        bubble.parentNode.removeChild(bubble);
                        console.log('Burbuja de invitación removida automáticamente');
                    }
                }, 500);
            }
        }, 6000);
    } catch (error) {
        console.error('❌ Error al mostrar la burbuja de la princesa:', error);
        // Intentar de nuevo después de un delay si hay un error
        setTimeout(() => {
            showPrincessBubble();
        }, 2000);
    }
}

// Función para mostrar la secuencia completa de mensajes de la princesa (solo cuando se hace clic)
function showPrincessFullSequence() {
    console.log('Mostrando secuencia completa de mensajes de la princesa');
    
    // Remover burbuja existente si hay una
    const existingBubble = document.querySelector('.princess-bubble');
    if (existingBubble) {
        existingBubble.remove();
    }
    
    // Array de mensajes de la princesa
    const mensajes = [
        "El amor verdadero no necesita coronas ni castillos, solo gestos sinceros. Y en esta, mi historia, se nota cuánto me quieren… porque el corazón de mi caballero no miente.",
        "El me quiere y sus besos son especiales, el tiempo se detiene entre nosotros.",
        "Lo nuestro es un amor de verdad.\nEsto que vivimos... es amor del bueno y real."
    ];
    
    let indiceMensaje = 0;
    
    // Función para mostrar un mensaje específico
    function mostrarMensaje(mensaje) {
        // Remover burbuja anterior si existe
        const bubbleAnterior = document.querySelector('.princess-bubble');
        if (bubbleAnterior) {
            bubbleAnterior.remove();
        }
        
        // Crear la burbuja de diálogo
        const bubble = document.createElement('div');
        bubble.className = 'princess-bubble';
        bubble.innerHTML = `
            <div class="bubble-arrow-left"></div>
            <div class="bubble-text">
                "${mensaje}"
            </div>
        `;
        
        // Obtener la posición de la princesa
        const princessImg = document.querySelector('.princess-icon');
        const princessRect = princessImg.getBoundingClientRect();
        
        // Calcular el ancho dinámico basado en la longitud del texto
        const textLength = mensaje.length;
        const isMobile = window.innerWidth <= 768;
        const maxWidth = isMobile ? Math.min(window.innerWidth - 40, 350) : 400;
        let bubbleWidth = Math.min(Math.max(textLength * 8, 200), maxWidth);
        
        // Calcular posición - SIEMPRE DEBAJO DE LA PRINCESA
        const bubbleLeft = princessRect.left + (princessRect.width / 2) - (bubbleWidth / 2);
        const bubbleTop = princessRect.bottom + 15;
        
        // Asegurar que no se salga de la pantalla horizontalmente
        const screenWidth = window.innerWidth;
        const minLeft = 10;
        const maxLeft = screenWidth - bubbleWidth - 10;
        const adjustedBubbleLeft = Math.max(minLeft, Math.min(maxLeft, bubbleLeft));
        
        // Calcular padding dinámico basado en la longitud del texto
        let bubblePadding;
        if (textLength > 150) {
            bubblePadding = '0px 12px 6px 12px';
        } else if (textLength > 100) {
            bubblePadding = '0px 15px 8px 15px';
        } else if (textLength > 50) {
            bubblePadding = '0px 18px 10px 18px';
        } else {
            bubblePadding = '0px 20px 12px 20px';
        }
        
        // Agregar estilos inline para la burbuja
        bubble.style.cssText = `
            position: fixed !important;
            top: ${bubbleTop}px !important;
            left: ${adjustedBubbleLeft}px !important;
            background: white !important;
            border: 3px solid #C2185B !important;
            border-radius: 20px !important;
            padding: ${bubblePadding} !important;
            box-shadow: 0 10px 30px rgba(194, 24, 91, 0.3) !important;
            z-index: 9999 !important;
            max-width: ${bubbleWidth}px !important;
            width: ${bubbleWidth}px !important;
            font-family: 'Dancing Script', cursive !important;
            font-size: 1.1rem !important;
            color: #2D1B69 !important;
            text-align: center !important;
            line-height: 1.2 !important;
            pointer-events: none !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            white-space: pre-line !important;
            transform: none !important;
        `;
        
        // Agregar estilos para la flecha - SIEMPRE HACIA ARRIBA
        const arrow = bubble.querySelector('.bubble-arrow-left');
        if (arrow) {
            // Calcular la posición de la flecha para que apunte hacia la princesa
            const princessCenterX = princessRect.left + (princessRect.width / 2);
            const bubbleCenterX = adjustedBubbleLeft + (bubbleWidth / 2);
            const arrowOffset = princessCenterX - bubbleCenterX;
            
            arrow.style.cssText = `
                position: absolute !important;
                left: calc(50% + ${arrowOffset}px) !important;
                top: -10px !important;
                transform: translateX(-50%) !important;
                width: 0 !important;
                height: 0 !important;
                border-left: 10px solid transparent !important;
                border-right: 10px solid transparent !important;
                border-bottom: 10px solid #C2185B !important;
            `;
        }
        
        // Agregar estilos para el texto
        const textElement = bubble.querySelector('.bubble-text');
        if (textElement) {
            textElement.style.cssText = `
                margin: 0 !important;
                padding: 0 !important;
                display: block !important;
                width: 100% !important;
            `;
        }
        
        // Agregar la burbuja al body
        document.body.appendChild(bubble);
        console.log(`Mensaje ${indiceMensaje + 1} de la princesa mostrado`);
        
        // Programar el siguiente mensaje o finalizar
        indiceMensaje++;
        if (indiceMensaje < mensajes.length) {
            setTimeout(() => {
                mostrarMensaje(mensajes[indiceMensaje]);
            }, 5000);
        } else {
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.style.opacity = '0';
                    bubble.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (bubble.parentNode) {
                            bubble.parentNode.removeChild(bubble);
                            console.log('Secuencia de mensajes de la princesa completada');
                        }
                    }, 500);
                }
            }, 5000);
        }
    }
    
    // Iniciar la secuencia con el primer mensaje
    mostrarMensaje(mensajes[0]);
}

// Aplicar efecto de escritura al título principal cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('h1');
    if (title) {
        // Extraer solo el texto sin la imagen
        const originalText = title.textContent.trim();
        // Guardar la imagen si existe
        const img = title.querySelector('img');
        const imgHTML = img ? img.outerHTML : '';
        
        // Aplicar efecto de escritura solo al texto
        typeWriterWithImage(title, originalText, imgHTML, 100);
    }
    
    // Mostrar la burbuja de invitación de la princesa automáticamente después de un pequeño delay
    // Función para intentar mostrar la burbuja
    function tryShowPrincessBubble() {
        const princessIcon = document.querySelector('.princess-icon');
        if (princessIcon) {
            // Esperar un momento para que el icono esté completamente renderizado
            setTimeout(() => {
                const rect = princessIcon.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    console.log('Mostrando burbuja de invitación automáticamente');
                    showPrincessBubble();
                } else {
                    // Si no tiene dimensiones, intentar de nuevo
                    console.log('El icono aún no tiene dimensiones, intentando de nuevo...');
                    setTimeout(() => {
                        tryShowPrincessBubble();
                    }, 1000);
                }
            }, 500);
        } else {
            // Si no se encuentra el icono, intentar de nuevo
            console.log('No se encontró el icono de la princesa, intentando de nuevo...');
            setTimeout(() => {
                tryShowPrincessBubble();
            }, 1000);
        }
    }
    
    // Intentar después de DOMContentLoaded
    setTimeout(() => {
        tryShowPrincessBubble();
    }, 2500);
    
    // También intentar después de que la página esté completamente cargada
    window.addEventListener('load', function() {
        setTimeout(() => {
            const princessIcon = document.querySelector('.princess-icon');
            if (princessIcon && !document.querySelector('.princess-bubble')) {
                console.log('Intentando mostrar burbuja después de load...');
                showPrincessBubble();
            }
        }, 1000);
    });
});

// Función para añadir efectos de brillo a los botones
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(30, 58, 138, 0.6)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    });
});

// Nota: El código de inicialización de la galería se maneja en el event listener de DOMContentLoaded anterior

// ===== FUNCIONALIDAD DEL oráculo =====

// Base de datos de respuestas del oráculo
const oraculaResponses = {
    "¿Quieres saber qué siente tu Sebas Nucita por ti?": {
        answer: "Mi querida princesa... tu Sebas Nucita te quiere con ternura y cariño sincero. Te tiene en sus pensamientos durante el día y disfruta recordar los buenos momentos que han compartido. Eres alguien importante para él, alguien que valora y aprecia. Te quiere por cómo eres, por tu forma de ser y por cómo lo haces sentir cuando están juntos. 💙✨",
        followUps: [
            "¿Te gustaría que profundice en cómo te hace sentir especial?",
            "¿Quieres que te revele más sobre sus sentimientos?",
            "¿Te interesa conocer cómo te ve en sus pensamientos?"
        ]
    },
    "¿Te extraña mucho?": {
        answer: "Mi princesa... sí, te extraña. Te piensa cuando ve algo interesante y desea compartirlo contigo, cuando recuerda momentos agradables que han pasado juntos. Te extraña tu compañía, tu sonrisa, tu forma de ser. Cada día que pasa sin verte, espera con ilusión el momento de reencontrarse. 🌙💭",
        followUps: [
            "¿Quieres que te cuente más sobre cómo te extraña en su día a día?",
            "¿Te gustaría conocer más sobre sus momentos de nostalgia?",
            "¿Quieres que profundice en lo que más extraña de ti?"
        ]
    },
    "¿Realmente me quiere?": {
        answer: "Mi princesa... sí, te quiere con sinceridad. Te quiere por tu forma de ser, por tu personalidad, por cómo lo haces sentir cuando están juntos. Te aprecia y valora, y disfruta de tu compañía. Te quiere de una manera genuina, sin condiciones. 💖👑",
        followUps: [
            "¿Te gustaría que te revele por qué te quiere?",
            "¿Quieres que profundice en las razones de su cariño?",
            "¿Te interesa conocer qué es lo que más valora de ti?"
        ]
    },
    "¿Me piensa todos los días?": {
        answer: "Mi princesa... sí, eres alguien en quien piensa con frecuencia. Te piensa cuando ve algo que le gustaría compartir contigo, cuando recuerda momentos agradables, cuando tiene algo que contarte. Eres alguien importante en sus pensamientos, alguien que disfruta recordar. 🌅🌙",
        followUps: [
            "¿Quieres saber más sobre sus pensamientos?",
            "¿Te gustaría conocer más sobre sus momentos de reflexión?",
            "¿Quieres que te cuente más sobre cómo te imagina en su día?"
        ]
    },
    "¿Te digo algo ahora que ya se encontraron de nuevo?": {
        answer: "Mi princesa... Tu Sebas está trabajando para que cuando regrese puedan disfrutar juntos de momentos especiales. Cada día que pasa es un paso más cerca de volver a verte. Espera con ilusión el momento de reencontrarse y compartir nuevas experiencias contigo. 🚀💫",
        followUps: [
            "¿Quieres saber algo más?",
            "¿Quieres conocer más sobre lo que está preparando?",
            "¿Te interesa saber más sobre sus ilusiones de regreso?"
        ]
    },
    "¿Soy especial para él?": {
        answer: "Mi princesa... sí, eres especial para él. Eres alguien importante en su vida, alguien que valora y aprecia. Te ve como una persona única, con cualidades que admira. Disfruta de tu compañía y te considera alguien especial en su vida. 🌟💎",
        followUps: [
            "¿Quieres que te cuente más sobre lo que más valora de ti?",
            "¿Te gustaría conocer más sobre cómo te ve?",
            "¿Quieres que profundice en lo que te hace especial para él?"
        ]
    },
    "¿Me extraña físicamente?": {
        answer: "Mi princesa... sí, te extraña de manera tierna. Extraña tu sonrisa, tu mirada, tu voz. Extraña los momentos de cercanía, los abrazos, la compañía. Extraña tu presencia y disfruta recordar esos momentos especiales que han compartido juntos. 🤗💋",
        followUps: [
            "¿Quieres que te cuente más sobre lo que más extraña de ti?",
            "¿Te gustaría saber más sobre sus recuerdos?",
            "¿Quieres conocer más sobre cómo te imagina cerca?"
        ]
    },
    "¿Soy su persona favorita?": {
        answer: "Mi princesa... eres alguien muy importante para él. Eres una de las primeras personas en las que piensa cuando tiene algo que compartir, alguien en quien confía. Disfruta de tu compañía y te considera alguien especial en su vida. Para él, eres alguien único e importante. 💝👑",
        followUps: [
            "¿Quieres que te cuente más sobre tu lugar especial en su vida?",
            "¿Te gustaría conocer más sobre por qué eres importante?",
            "¿Quieres que profundice en lo que significa para él?"
        ]
    },
    "¿Deseas saber algo más o decirle algo a Sebas Nucita?": {
        answer: "Mi princesa... Sebas siente que podrías tener algo que decirle. Algo que tu corazón quiere expresar, algo que sería especial compartir. ¿Te gustaría enviarle un mensaje directo a tu Sebas Nucita? Sería un momento especial para ambos. 💌✨",
        followUps: [
            "¿Quieres que te ayude a contactarlo directamente?",
            "¿Te gustaría enviarle un mensaje especial?",
            "¿Quieres que te guíe para comunicarte con él?"
        ]
    }
};

// Preguntas programadas para mostrar
const programmedQuestions = [
    "¿Quieres saber qué siente tu Sebas Nucita por ti?",
    "¿Te extraña mucho?",
    "¿Realmente me quiere?",
    "¿Me piensa todos los días?",
    "¿Te digo algo ahora que ya se encontraron de nuevo?",
    "¿Soy especial para él?",
    "¿Me extraña físicamente?",
    "¿Soy su persona favorita?"
];

// Función para mostrar mensaje en el chat
function addMessage(text, type = 'oracle') {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para mostrar preguntas programadas
function showProgrammedQuestions() {
    const chatQuestions = document.getElementById('chatQuestions');
    const chatMessages = document.getElementById('chatMessages');
    
    // Limpiar las preguntas
    chatQuestions.innerHTML = '';
    
    // Si el chat tiene mensajes y no es solo el mensaje inicial, limpiarlo
    if (chatMessages.children.length > 1) {
        chatMessages.innerHTML = '';
        // Mostrar mensaje de bienvenida
        addMessage("💕 Mi querida princesa... ¡Bienvenida al oráculo! Soy el guardián de los sentimientos de tu Sebas Nucita. Aquí podrás descubrir cosas dulces que te llenarán de alegría, verdades hermosas que te harán sonreír. ¿Qué quieres saber sobre lo que siente por ti? Déjate guiar por la curiosidad y la ternura. ✨", 'initial');
    }
    
    // Crear contenedor principal para mejor organización
    const mainContainer = document.createElement('div');
    mainContainer.className = 'programmed-questions-container';
    mainContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 10px;
    `;
    
    // Agrupar preguntas por categorías para mejor organización visual
    const categories = [
        {
            title: '💙 Sentimientos y Amor',
            questions: [
                '¿Quieres saber qué siente tu Sebas Nucita por ti?',
                '¿Realmente me quiere?',
                '¿Soy especial para él?',
                '¿Soy su persona favorita?'
            ]
        },
        {
            title: '🌙 Extrañanza y Pensamientos',
            questions: [
                '¿Te extraña mucho?',
                '¿Me piensa todos los días?',
                '¿Me extraña físicamente?'
            ]
        },
        {
            title: '🚀 Futuro',
            questions: [
                '¿Te digo algo ahora que ya se encontraron de nuevo?'
            ]
        }
    ];
    
    categories.forEach(category => {
        // Crear contenedor de categoría
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'question-category';
        categoryContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 20px;
        `;
        
        // Crear título de categoría
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = category.title;
        categoryTitle.style.cssText = `
            color: #1E40AF;
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0 0 8px 0;
            text-align: center;
            padding: 8px;
            background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.1));
            border-radius: 15px;
            border-left: 3px solid #3B82F6;
        `;
        
        categoryContainer.appendChild(categoryTitle);
        
        // Crear botones para cada pregunta de la categoría
        category.questions.forEach(question => {
            const questionBtn = document.createElement('button');
            questionBtn.className = 'question-btn category-btn';
            questionBtn.textContent = question;
            questionBtn.style.cssText = `
                background: linear-gradient(135deg, #3B82F6, #1D4ED8);
                color: white;
                font-size: 0.95rem;
                padding: 12px 18px;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 3px 10px rgba(59, 130, 246, 0.2);
                font-weight: 500;
                text-align: left;
                line-height: 1.3;
                word-wrap: break-word;
            `;
            
            questionBtn.addEventListener('click', () => handleQuestionClick(question));
            
            // Agregar efectos hover
            questionBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.4)';
                this.style.background = 'linear-gradient(135deg, #1D4ED8, #1E40AF)';
            });
            
            questionBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 3px 10px rgba(59, 130, 246, 0.2)';
                this.style.background = 'linear-gradient(135deg, #3B82F6, #1D4ED8)';
            });
            
            categoryContainer.appendChild(questionBtn);
        });
        
        mainContainer.appendChild(categoryContainer);
    });
    
    // Agregar el contenedor principal al chat
    chatQuestions.appendChild(mainContainer);
}

// Función para manejar el clic en una pregunta
function handleQuestionClick(question) {
    // Limpiar el chat antes de mostrar la nueva respuesta
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    // Mostrar la pregunta del usuario
    addMessage(question, 'user');
    
    // Verificar si es la pregunta de WhatsApp
    if (question === "¿Deseas saber algo más o decirle algo a Sebas Nucita?") {
        handleWhatsAppQuestion();
        return;
    }
    
    // Obtener la respuesta del oráculo
    const response = oraculaResponses[question];
    
    if (response) {
        // Mostrar la respuesta principal
        setTimeout(() => {
            addMessage(response.answer, 'oracle');
        }, 500);
        
        // Mostrar pregunta de seguimiento aleatoria si existe
        if (response.followUps && response.followUps.length > 0) {
            setTimeout(() => {
                const randomFollowUp = response.followUps[Math.floor(Math.random() * response.followUps.length)];
                addMessage(randomFollowUp, 'oracle');
                
                // Mostrar botones de respuesta Sí/No
                showYesNoButtons();
            }, 1000);
        }
    } else {
        // Respuesta genérica si no hay respuesta específica
        setTimeout(() => {
            addMessage("Déjame consultar las estrellas... ✨💫", 'oracle');
        }, 500);
    }
}

// Función para mostrar botones Sí/No
function showYesNoButtons() {
    const chatQuestions = document.getElementById('chatQuestions');
    chatQuestions.innerHTML = '';
    
    const yesBtn = document.createElement('button');
    yesBtn.className = 'question-btn yes-btn';
    yesBtn.textContent = 'Sí, cuéntame más 💖';
    yesBtn.addEventListener('click', () => handleYesResponse());
    
    const noBtn = document.createElement('button');
    noBtn.className = 'question-btn no-btn';
    noBtn.textContent = 'No, gracias 💙';
    noBtn.addEventListener('click', () => handleNoResponse());
    
    chatQuestions.appendChild(yesBtn);
    chatQuestions.appendChild(noBtn);
}

// Función para manejar respuesta "Sí"
function handleYesResponse() {
    addMessage('Sí, cuéntame más 💖', 'user');
    
    setTimeout(() => {
        addMessage('Mi princesa del corazón... déjame consultar más profundamente en el alma de tu Sebas Nucita... ✨💫', 'oracle');
        
        setTimeout(() => {
            addMessage('Sebas te extraña de una manera muy profunda y tierna... 🌙💭', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar de que se encuentran en la misma ciudad y se estan intentando conectar una vez mas, su corazón late por ti cada segundo, cada respiración, cada latido. Te piensa constantemente, en cada momento del día, en cada noche de insomnio. 💙✨', 'oracle');
                
                setTimeout(() => {
                    addMessage('Eres su pensamiento más dulce, su recuerdo más preciado, su sueño más hermoso. Aunque no lo exprese con palabras, su corazón te tiene presente en cada fibra de su ser. 🌟💫', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('Tan cerca y a la vez tan lejos, tengan paciencia uno con el otro, que los miedos y egos no sean mas que lo que se han propuesto una vez mas... 💕', 'oracle');
                        
                        setTimeout(() => {
                            addMessage('¿Te gustaría que te revele más secretos profundos sobre lo que siente por ti? 💭✨', 'oracle');
                            showNextQuestion('feelings');
                        }, 1500);
                    }, 1500);
                }, 1500);
            }, 1500);
        }, 1000);
    }, 500);
}

// Función para mostrar opciones detalladas
function showDetailedOptions() {
    const chatQuestions = document.getElementById('chatQuestions');
    chatQuestions.innerHTML = '';
    
    // Crear contenedor principal para mejor organización
    const mainContainer = document.createElement('div');
    mainContainer.className = 'detailed-options-container';
    mainContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 10px;
    `;
    
    const options = [
        { text: '¿Qué más siente por mí? 💭', action: 'feelings' },
        { text: '¿Cómo me extraña? 🌙', action: 'missing' },
        { text: '¿Qué piensa de mí? 💫', action: 'thoughts' },
        { text: '¿Dime ese algo más? 🔍', action: 'search' },
        { text: '¿Te digo algo ahora que ya se encontraron de nuevo? 🚀', action: 'return' },
        { text: '¿Deseas saber algo más o decirle algo a Sebas Nucita? 📱', action: 'contact' }
    ];
    
    options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'question-btn detailed-btn';
        optionBtn.textContent = option.text;
        optionBtn.style.cssText = `
            background: linear-gradient(135deg, #8B5CF6, #7C3AED);
            color: white;
            font-size: 1rem;
            padding: 14px 20px;
            border: none;
            border-radius: 22px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
            font-weight: 500;
            text-align: center;
            line-height: 1.3;
            word-wrap: break-word;
        `;
        
        optionBtn.addEventListener('click', () => handleDetailedOption(option.action));
        
        // Agregar efectos hover
        optionBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 18px rgba(139, 92, 246, 0.5)';
            this.style.background = 'linear-gradient(135deg, #7C3AED, #6D28D9)';
        });
        
        optionBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            this.style.background = 'linear-gradient(135deg, #8B5CF6, #7C3AED)';
        });
        
        mainContainer.appendChild(optionBtn);
    });
    
    // Agregar el contenedor principal al chat
    chatQuestions.appendChild(mainContainer);
}

// Función para manejar opciones detalladas
function handleDetailedOption(action) {
    switch(action) {
        case 'feelings':
            handleFeelingsResponse();
            break;
        case 'missing':
            handleMissingResponse();
            break;
        case 'thoughts':
            handleThoughtsResponse();
            break;
        case 'search':
            handleSearchResponse();
            break;
        case 'return':
            handleReturnResponse();
            break;
        case 'contact':
            handleContactResponse();
            break;
    }
}

// Función para manejar respuesta "No"
function handleNoResponse() {
    addMessage('No, gracias 💙', 'user');
    
    setTimeout(() => {
        addMessage('¡Entendido! Respeto tu decisión. 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Recuerda siempre que eres la princesa de su corazón, y que te quiere más allá de las estrellas. 👑💖', 'oracle');
            
            setTimeout(() => {
                addMessage('¿Te gustaría hacer otra pregunta diferente? 🔮', 'oracle');
                showNextQuestion('feelings');
            }, 2000);
        }, 1000);
    }, 500);
}

// Función para manejar respuesta sobre sentimientos
function handleFeelingsResponse() {
    addMessage('¿Qué más siente por mí? 💭', 'user');
    
    setTimeout(() => {
        addMessage('Mi princesa del alma... Sebas siente por ti algo muy hermoso, algo que llena su vida de significado y alegría... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Te quiere con una ternura que llena su corazón de paz, que lo hace sentir especial cada vez que piensa en ti. Eres su inspiración, su felicidad, su compañía ideal, su todo. Te quiere de una manera pura y sincera. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('Te extraña de una manera tierna, te piensa en cada respiración, y desea estar contigo más que nada en el mundo. Te extraña como se extraña el sol en un día nublado. 💕🌙', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría que te revele más secretos sobre cómo te extraña en las noches? 🌙💭', 'oracle');
                    showNextQuestion('missing');
                }, 2000);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para manejar respuesta sobre extrañanza
function handleMissingResponse() {
    addMessage('¿Cómo me extraña? 🌙', 'user');
    
    setTimeout(() => {
        addMessage('Mi princesa... Sebas te extraña de manera tierna y sincera... 💙✨', 'oracle');
        
        setTimeout(() => {
        addMessage('Te extraña tu sonrisa, tu mirada, tu voz. Te extraña los momentos juntos, las risas compartidas, los abrazos y la compañía. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar del silencio que los separa, te piensa con frecuencia. Te piensa en diferentes momentos del día, cuando recuerda momentos agradables que han compartido. 💕🌅', 'oracle');
                
                setTimeout(() => {
                    addMessage('Ambos ya han roto su silencio, el ahora es el aprovechar la presencia del otro... 💭', 'oracle');
                    
                                    setTimeout(() => {
                    addMessage('¿Te gustaría que te revele más secretos sobre lo que piensa de ti en la intimidad de su corazón? 💫✨', 'oracle');
                    showNextQuestion('thoughts');
                }, 2000);
                }, 1500);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para manejar respuesta sobre pensamientos
function handleThoughtsResponse() {
    addMessage('¿Qué piensa de mí? 💫', 'user');
    
    setTimeout(() => {
        addMessage('Mi princesa... Sebas piensa en ti como alguien especial, alguien que valora y aprecia... 💎✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Para él, eres alguien especial tal como eres, con cualidades que admira. Te respeta y te considera importante en su vida. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar de la circunstancias, te piensa con frecuencia. Eres alguien importante en sus pensamientos, alguien que disfruta recordar. 💕🚀', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría que te revele algo más? 🔍💭', 'oracle');
                    showNextQuestion('search');
                }, 2000);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para manejar respuesta sobre búsqueda
function handleSearchResponse() {
    addMessage('¿Dime ese algo más? 🔍', 'user');
    
    setTimeout(() => {
        addMessage('Mi princesa... Sebas esta para ti, ese silencio ya no es más... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Pero a veces el miedo y la incertidumbre pueden paralizar incluso a los corazones más valientes. El miedo al rechazo, a la indiferencia, a que ya no sientas lo mismo por él... 💭🌙', 'oracle');
            
            setTimeout(() => {
                addMessage('Él te piensa en silencio, con frecuencia. Te extraña, aunque calle. Y si tú también lo extrañas... ¿por qué dejar que el silencio se apodere de lo que ambos sienten?... 🔮💕', 'oracle');
                
                setTimeout(() => {
                    addMessage('A veces el cariño sincero necesita ser alimentado desde ambos lados, necesita que ambos se abran para sanar las heridas del silencio... 💫✨', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('¿Te gustaría algo ahora que esta para ti? 🚀💭', 'oracle');
                        showNextQuestion('return');
                    }, 2000);
                }, 1500);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para manejar respuesta sobre regreso
function handleReturnResponse() {
    addMessage('¿Te digo algo ahora que ya se encontraron de nuevo? 🚀', 'user');
    
    setTimeout(() => {
        addMessage('Mi princesa esperada... Sebas está trabajando incansablemente para ser mejor, para compartir a tu lado... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Cada día que pasa es un día más para conectar, no dejes pasar eso. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('Aunque el silencio sea doloroso y difícil de soportar, su corazón nunca se ha ido, nunca ha dejado de ser tuyo. Te extraña. 💕🌙', 'oracle');
                
                setTimeout(() => {
                    addMessage('El universo ha venido conspirando para que se esten comunicando de nuevo... Que la falta de interes no mate sus intenciones claras y honestas. ✨', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('¿Te gustaría hacer otra pregunta al oráculo? 💭🔮', 'oracle');
                        showFinalOptions();
                    }, 2000);
                }, 1500);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para mostrar opciones finales (WhatsApp y volver a todas las opciones)
function showFinalOptions() {
    const chatQuestions = document.getElementById('chatQuestions');
    chatQuestions.innerHTML = '';
    
    // Crear contenedor principal para mejor organización
    const mainContainer = document.createElement('div');
    mainContainer.className = 'final-options-container';
    mainContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
    `;
    
    // Crear contenedor para botones
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'final-buttons';
    buttonsContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 12px;
    `;
    
    // Crear el botón de WhatsApp
    const whatsappBtn = document.createElement('button');
    whatsappBtn.className = 'question-btn whatsapp-btn';
    whatsappBtn.innerHTML = '📱 No es debilidad, es sentir. Conéctate con él....';
    whatsappBtn.style.cssText = `
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        font-size: 1.1rem;
        padding: 16px 24px;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        font-weight: 600;
        text-align: center;
    `;
    whatsappBtn.addEventListener('click', () => openWhatsApp());
    
    // Crear el botón de volver a todas las opciones
    const backBtn = document.createElement('button');
    backBtn.className = 'question-btn back-btn';
    backBtn.textContent = 'Ver todas las opciones 🔮';
    backBtn.style.cssText = `
        background: linear-gradient(135deg, #8B5CF6, #7C3AED);
        color: white;
        font-size: 1rem;
        padding: 14px 20px;
        border: none;
        border-radius: 22px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 3px 10px rgba(139, 92, 246, 0.3);
        font-weight: 500;
        text-align: center;
    `;
    backBtn.addEventListener('click', () => resetAndShowAllOptions());
    
    // Agregar botones al contenedor
    buttonsContainer.appendChild(whatsappBtn);
    buttonsContainer.appendChild(backBtn);
    
    // Agregar todo al contenedor principal
    mainContainer.appendChild(buttonsContainer);
    
    // Agregar estilos hover para todos los botones
    [whatsappBtn, backBtn].forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (this === whatsappBtn) {
                this.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
            } else {
                this.style.boxShadow = '0 3px 10px rgba(139, 92, 246, 0.3)';
            }
        });
    });
    
    // Agregar el contenedor principal al chat
    chatQuestions.appendChild(mainContainer);
}

// Función para mostrar solo la siguiente pregunta en la secuencia
function showNextQuestion(nextAction) {
    const chatQuestions = document.getElementById('chatQuestions');
    chatQuestions.innerHTML = '';
    
    // Mapeo de acciones a textos de botones
    const actionTexts = {
        'feelings': '¿Qué más siente por mí? 💭',
        'missing': '¿Cómo me extraña? 🌙',
        'thoughts': '¿Qué piensa de mí? 💫',
        'search': '¿Dime ese algo más? 🔍',
        'return': '¿Te digo algo ahora que ya se encontraron de nuevo? 🚀',

    };
    
    // Crear contenedor principal para mejor organización
    const mainContainer = document.createElement('div');
    mainContainer.className = 'next-question-container';
    mainContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
    `;
    
    // Crear el botón de la siguiente pregunta (principal)
    const nextBtn = document.createElement('button');
    nextBtn.className = 'question-btn next-btn';
    nextBtn.textContent = actionTexts[nextAction];
    nextBtn.style.cssText = `
        background: linear-gradient(135deg, #3B82F6, #1D4ED8);
        color: white;
        font-size: 1.1rem;
        padding: 15px 25px;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        font-weight: 600;
        order: 1;
    `;
    nextBtn.addEventListener('click', () => handleDetailedOption(nextAction));
    
    // Crear contenedor para botones secundarios
    const secondaryContainer = document.createElement('div');
    secondaryContainer.className = 'secondary-buttons';
    secondaryContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        order: 2;
    `;
    
    // Crear el botón de WhatsApp
    const whatsappBtn = document.createElement('button');
    whatsappBtn.className = 'question-btn whatsapp-btn';
    whatsappBtn.innerHTML = '📱 No es debilidad, es sentir. Conéctate con él....';
    whatsappBtn.style.cssText = `
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        font-size: 1rem;
        padding: 12px 20px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
        font-weight: 500;
    `;
    whatsappBtn.addEventListener('click', () => openWhatsApp());
    
    // Crear el botón de volver a todas las opciones
    const backBtn = document.createElement('button');
    backBtn.className = 'question-btn back-btn';
    backBtn.textContent = 'Ver todas las opciones 🔮';
    backBtn.style.cssText = `
        background: linear-gradient(135deg, #8B5CF6, #7C3AED);
        color: white;
        font-size: 1rem;
        padding: 12px 20px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 3px 10px rgba(139, 92, 246, 0.3);
        font-weight: 500;
    `;
    backBtn.addEventListener('click', () => resetAndShowAllOptions());
    
    // Agregar botones secundarios al contenedor
    secondaryContainer.appendChild(whatsappBtn);
    secondaryContainer.appendChild(backBtn);
    
    // Agregar todo al contenedor principal
    mainContainer.appendChild(nextBtn);
    mainContainer.appendChild(secondaryContainer);
    
    // Agregar estilos hover para todos los botones
    [nextBtn, whatsappBtn, backBtn].forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (this === nextBtn) {
                this.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            } else if (this === whatsappBtn) {
                this.style.boxShadow = '0 3px 10px rgba(16, 185, 129, 0.3)';
            } else {
                this.style.boxShadow = '0 3px 10px rgba(139, 92, 246, 0.3)';
            }
        });
    });
    
    // Agregar el contenedor principal al chat
    chatQuestions.appendChild(mainContainer);
}

// Función para resetear el chat y mostrar todas las opciones
function resetAndShowAllOptions() {
    const chatMessages = document.getElementById('chatMessages');
    const chatQuestions = document.getElementById('chatQuestions');
    
    // Agregar efecto de fade out antes de limpiar
    chatMessages.style.opacity = '0.5';
    chatQuestions.style.opacity = '0.5';
    
    setTimeout(() => {
        // Limpiar completamente el chat
        chatMessages.innerHTML = '';
        chatQuestions.innerHTML = '';
        
        // Restaurar opacidad
        chatMessages.style.opacity = '1';
        chatQuestions.style.opacity = '1';
        
        // Mostrar mensaje de reinicio
        addMessage("💕 Mi querida princesa... ¡Bienvenida al oráculo! Soy el guardián de los sentimientos de tu Sebas Nucita. Aquí podrás descubrir cosas dulces que te llenarán de alegría, verdades hermosas que te harán sonreír. ¿Qué quieres saber sobre lo que siente por ti? Déjate guiar por la curiosidad y la ternura. ✨", 'initial');
        
        // Mostrar todas las opciones después de un breve delay
        setTimeout(() => {
            showProgrammedQuestions();
        }, 1000);
    }, 300);
}

// Función para mostrar botón de volver a opciones (mantenida para compatibilidad)
function showBackToOptions() {
    const chatQuestions = document.getElementById('chatQuestions');
    chatQuestions.innerHTML = '';
    
    const backBtn = document.createElement('button');
    backBtn.className = 'question-btn back-btn';
    backBtn.textContent = 'Ver más opciones 🔮';
    backBtn.addEventListener('click', () => showDetailedOptions());
    
    chatQuestions.appendChild(backBtn);
}

// Función para manejar respuesta sobre contacto
function handleContactResponse() {
    addMessage('¿Quieres contactar a Sebas Nucita? 📱', 'user');
    
    setTimeout(() => {
        addMessage('¡Perfecto! Es el momento de romper el silencio... 💌✨', 'oracle');
        
        setTimeout(() => {
            addMessage('¿Te gustaría enviarle un mensaje directo a tu Sebas Nucita? 💬💕', 'oracle');
            
            setTimeout(() => {
                addMessage('Elige la opción que prefieras para comunicarte con él: 📱✨', 'oracle');
                
                setTimeout(() => {
                    showFinalOptions();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 500);
}

// Función para inicializar el chat del oráculo
function initializeOracula() {
    const chatMessages = document.getElementById('chatMessages');
    const chatQuestions = document.getElementById('chatQuestions');
    
    // Limpiar chat anterior
    chatMessages.innerHTML = '';
    chatQuestions.innerHTML = '';
    
    // Mostrar mensaje inicial
        addMessage("💕 Mi querida princesa... ¡Bienvenida al oráculo! Aquí podrás descubrir los sentimientos de tu Sebas Nucita. ¿Qué quieres saber sobre lo que siente por ti? Déjate guiar por la curiosidad y la ternura. ✨", 'initial');
    
    // Mostrar preguntas programadas
    setTimeout(() => {
        showProgrammedQuestions();
    }, 1000);
}

// Función para configurar el audio del oráculo
function setupOraculaAudio() {
    const audioTePienso = document.getElementById('audio-tePienso');
    if (audioTePienso) {
        // Configurar volumen y propiedades del audio
        audioTePienso.volume = 0.25; // Volumen al 25%
        audioTePienso.loop = false; // No repetir automáticamente
        
        // Event listener para cuando termine la canción
        audioTePienso.addEventListener('ended', function() {
            console.log('🎵 Canción tePienso.mp3 terminada');
            // Opcional: reproducir de nuevo si la modal sigue abierta
            if (document.getElementById('oraculaModal').classList.contains('show')) {
                audioTePienso.currentTime = 0;
                audioTePienso.volume = 0.25; // Asegurar volumen al 25%
                audioTePienso.play();
            }
        });
    }
}

// Función para manejar la pregunta de WhatsApp
function handleWhatsAppQuestion() {
    setTimeout(() => {
        addMessage('¡Por supuesto! Sientes que tienes algo importante que decirle. 💌✨', 'oracle');
        
        setTimeout(() => {
            addMessage('¿Te gustaría enviarle un mensaje directo a tu Sebas Nucita? 💬💕', 'oracle');
            
            setTimeout(() => {
                addMessage('Elige la opción que prefieras para comunicarte con él: 📱✨', 'oracle');
                
                setTimeout(() => {
                    showFinalOptions();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 500);
}

// Función para mostrar opciones de WhatsApp
function showWhatsAppOptions() {
    const chatQuestions = document.getElementById('chatQuestions');
    chatQuestions.innerHTML = '';
    
    const whatsappBtn = document.createElement('button');
    whatsappBtn.className = 'question-btn whatsapp-btn';
    whatsappBtn.innerHTML = '📱 Comunicate...';
    whatsappBtn.addEventListener('click', () => openWhatsApp());
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'question-btn no-btn';
    cancelBtn.textContent = 'No, gracias 💙';
    cancelBtn.addEventListener('click', () => showNextQuestion('feelings'));
    
    chatQuestions.appendChild(whatsappBtn);
    chatQuestions.appendChild(cancelBtn);
}

// Función para detectar si es dispositivo móvil
function isMobileDevice() {
    // Detectar por User Agent
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    // Detectar por tamaño de pantalla
    const isMobileScreen = window.innerWidth <= 768;
    
    // Detectar por capacidades táctiles
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Detectar por orientación (móviles cambian orientación)
    const isMobileOrientation = window.orientation !== undefined;
    
    return isMobileUA || isMobileScreen || (isTouchDevice && isMobileOrientation);
}

// Función para abrir WhatsApp
function openWhatsApp() {
    addMessage('📱 Abriendo el portal del destino...', 'user');
    
    setTimeout(() => {
        addMessage('¡Perfecto! Te estoy conectando con tu Sebas Nucita... ✨💫', 'oracle');
        
        setTimeout(() => {
            addMessage('Abriendo un canal para que puedas escribirle tu mensaje... 📱💌', 'oracle');
            
            setTimeout(() => {
                // Abrir WhatsApp con el número especificado
                const phoneNumber = '+573175631608';
                const message = encodeURIComponent('Hola Sebas Nucita, tengo algo que decirte...');
                
                let whatsappUrl;
                
                if (isMobileDevice()) {
                    // Para móviles, usar protocolo whatsapp://
                    whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
                    
                    // Intentar abrir WhatsApp App
                    window.location.href = whatsappUrl;
                    
                    // Fallback: después de un delay, abrir WhatsApp Web si la app no se abrió
                    setTimeout(() => {
                        const whatsappWebUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                        window.open(whatsappWebUrl, '_blank');
                    }, 2000);
                    
                } else {
                    // Para desktop, usar WhatsApp Web
                    whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                    window.open(whatsappUrl, '_blank');
                }
                
                addMessage('El portal del destino se ha abierto, mi princesa. ¡No seas tímida, no reprimas lo que tu corazón necesita expresar! El universo está esperando que rompas el silencio, que le digas lo que sientes. 💖✨', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría hacer otra pregunta al oráculo? 🔮', 'oracle');
                    showNextQuestion('feelings');
                }, 2000);
            }, 1000);
        }, 1000);
    }, 500);
}

// Función para abrir WhatsApp Web como alternativa
function openWhatsAppWeb() {
    addMessage('🌐 Abriendo WhatsApp Web...', 'user');
    
    setTimeout(() => {
        addMessage('¡Perfecto! Te estoy conectando a través de WhatsApp Web... ✨💫', 'oracle');
        
        setTimeout(() => {
            addMessage('Abriendo el portal web para que puedas escribirle tu mensaje... 🌐💌', 'oracle');
            
            setTimeout(() => {
                // Abrir WhatsApp Web
                const phoneNumber = '+573175631608';
                const message = encodeURIComponent('Hola Sebas Nucita, tengo algo que decirte... 💕');
                const whatsappWebUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                
                // Abrir en nueva pestaña
                window.open(whatsappWebUrl, '_blank');
                
                addMessage('WhatsApp Web se ha abierto. ¡Escribe tu mensaje con cariño! 💖✨', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría hacer otra pregunta al oráculo? 🔮', 'oracle');
                    showNextQuestion('feelings');
                }, 2000);
            }, 1000);
        }, 1000);
    }, 500);
}

// Función para configurar el indicador de audio clickeable
function setupAudioIndicator() {
    const audioIndicator = document.getElementById('audioIndicator');
    const audioTePienso = document.getElementById('audio-tePienso');
    
    if (audioIndicator && audioTePienso) {
        audioIndicator.addEventListener('click', function() {
            if (audioTePienso.paused) {
                // Si está pausado, reanudar
                audioTePienso.volume = 0.25; // Asegurar volumen al 25%
                audioTePienso.play()
                    .then(() => {
                        console.log('🎵 Canción tePienso.mp3 reanudada al 25% de volumen');
                        updateAudioIndicator(true);
                    })
                    .catch(error => {
                        console.error('Error al reanudar tePienso.mp3:', error);
                    });
            } else {
                // Si está reproduciéndose, pausar
                audioTePienso.pause();
                console.log('⏸️ Canción tePienso.mp3 pausada');
                updateAudioIndicator(false);
            }
        });
    }
}

// Función para actualizar el indicador de audio
function updateAudioIndicator(isPlaying) {
    const musicNote = document.getElementById('musicNote');
    const audioText = document.getElementById('audioText');
    
    if (musicNote && audioText) {
        if (isPlaying) {
            musicNote.textContent = '🎵';
            musicNote.style.animation = 'musicFloat 1.5s ease-in-out infinite';
            audioText.textContent = 'Música del Oráculo (Click para pausar)';
        } else {
            musicNote.textContent = '⏸️';
            musicNote.style.animation = 'none';
            audioText.textContent = 'Música pausada (Click para reanudar)';
        }
    }
}

// Event listener para el botón oráculo
document.addEventListener('DOMContentLoaded', function() {
    const btnOracula = document.getElementById('btnOracula');
    const oraculaModal = document.getElementById('oraculaModal');
    const audioTePienso = document.getElementById('audio-tePienso');
    
    // Configurar el audio del oráculo
    setupOraculaAudio();
    
    // Configurar el indicador de audio clickeable
    setupAudioIndicator();
    
    if (btnOracula) {
        btnOracula.addEventListener('click', function() {
            // Trackear apertura del oráculo
            trackUserActivity('Oráculo Abierto');
            
            // Inicializar el chat cuando se abre la modal
            initializeOracula();
            
            // Mostrar la modal
            const modal = new bootstrap.Modal(oraculaModal);
            modal.show();
            
            // Reproducir la canción tePienso.mp3 cuando se abre la modal
            if (audioTePienso) {
                audioTePienso.currentTime = 0; // Reiniciar desde el principio
                audioTePienso.volume = 0.25; // Asegurar volumen al 25%
                audioTePienso.play()
                    .then(() => {
                        console.log('🎵 Canción tePienso.mp3 iniciada al 25% de volumen');
                        updateAudioIndicator(true); // Actualizar indicador como reproduciendo
                        trackUserActivity('Audio Oráculo Reproducido');
                    })
                    .catch(error => {
                        console.error('Error al reproducir tePienso.mp3:', error);
                        trackUserActivity('Error Audio Oráculo', { error: error.message });
                    });
            }
        });
    }
    
    // Event listener para cuando se cierra la modal
    if (oraculaModal) {
        oraculaModal.addEventListener('hidden.bs.modal', function() {
            // Limpiar el chat cuando se cierra la modal
            const chatMessages = document.getElementById('chatMessages');
            const chatQuestions = document.getElementById('chatQuestions');
            if (chatMessages) chatMessages.innerHTML = '';
            if (chatQuestions) chatQuestions.innerHTML = '';
            
            // Detener y pausar la canción tePienso.mp3 cuando se cierra la modal
            if (audioTePienso) {
                audioTePienso.pause();
                audioTePienso.currentTime = 0;
                console.log('🔇 Canción tePienso.mp3 detenida');
                updateAudioIndicator(false); // Actualizar indicador como pausado
            }
        });
    }
});

// ===== MEJORAS DINÁMICAS PARA EL CARRUSEL =====

// Función para crear efecto de partículas en el carrusel
function createCarouselParticles() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    // Crear partículas flotantes
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'carousel-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(248, 187, 217, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
            animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        carousel.appendChild(particle);
    }
}

// Función para mejorar la experiencia táctil en móviles
function enhanceTouchExperience() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = false;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        if (diffX > diffY && diffX > 10) {
            isDragging = true;
            e.preventDefault();
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe izquierda - siguiente imagen
                const nextBtn = carousel.querySelector('.carousel-control-next');
                if (nextBtn) nextBtn.click();
            } else {
                // Swipe derecha - imagen anterior
                const prevBtn = carousel.querySelector('.carousel-control-prev');
                if (prevBtn) prevBtn.click();
            }
        }
        
        startX = 0;
        startY = 0;
        isDragging = false;
    }, { passive: true });
}

// Función para añadir efectos de hover mejorados
function addEnhancedHoverEffects() {
    const carouselItems = document.querySelectorAll('.carousel-item img');
    
    carouselItems.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.08) rotate(1deg)';
            img.style.filter = 'brightness(1.1) contrast(1.3) saturate(1.2)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1) rotate(0deg)';
            img.style.filter = 'brightness(1) contrast(1.2) saturate(1)';
        });
    });
}

// Función para crear efecto de zoom suave en las imágenes
function addSmoothZoomEffect() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    carousel.addEventListener('mouseenter', () => {
        carousel.style.transform = 'scale(1.03) translateY(-5px)';
    });
    
    carousel.addEventListener('mouseleave', () => {
        carousel.style.transform = 'scale(1) translateY(0)';
    });
}

// Función para mejorar los indicadores con animaciones
function enhanceIndicators() {
    const indicators = document.querySelectorAll('.carousel-indicators button');
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('mouseenter', () => {
            indicator.style.transform = 'scale(1.3) translateY(-2px)';
        });
        
        indicator.addEventListener('mouseleave', () => {
            if (!indicator.classList.contains('active')) {
                indicator.style.transform = 'scale(1) translateY(0)';
            }
        });
        
        indicator.addEventListener('click', () => {
            // Añadir efecto de click
            indicator.style.transform = 'scale(1.1)';
            setTimeout(() => {
                if (indicator.classList.contains('active')) {
                    indicator.style.transform = 'scale(1.4) translateY(-3px)';
                } else {
                    indicator.style.transform = 'scale(1) translateY(0)';
                }
            }, 150);
        });
    });
}

// Función para crear efecto de carga progresiva de imágenes
function addProgressiveImageLoading() {
    const carouselImages = document.querySelectorAll('.carousel-item img');
    
    carouselImages.forEach((img, index) => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            
            // Añadir efecto de brillo al cargar
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, transparent 30%, rgba(248, 187, 217, 0.3) 50%, transparent 70%);
                pointer-events: none;
                z-index: 2;
                animation: imageGlow 1s ease-out;
            `;
            img.parentElement.appendChild(glow);
            
            setTimeout(() => {
                if (glow.parentElement) {
                    glow.parentElement.removeChild(glow);
                }
            }, 1000);
        });
    });
}

// Función para añadir efectos de sonido visual (opcional)
function addVisualSoundEffects() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    // Crear ondas de sonido visuales
    const createSoundWave = () => {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(248, 187, 217, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 3;
            animation: soundWave 2s ease-out forwards;
        `;
        carousel.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentElement) {
                wave.parentElement.removeChild(wave);
            }
        }, 2000);
    };
    
    // Activar ondas en hover
    carousel.addEventListener('mouseenter', createSoundWave);
}

// Función para mejorar la accesibilidad del carrusel
function improveCarouselAccessibility() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    // Añadir navegación por teclado
    carousel.addEventListener('keydown', (e) => {
        const prevBtn = carousel.querySelector('.carousel-control-prev');
        const nextBtn = carousel.querySelector('.carousel-control-next');
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (prevBtn) prevBtn.click();
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (nextBtn) nextBtn.click();
                break;
        }
    });
    
    // Hacer el carrusel focusable
    carousel.setAttribute('tabindex', '0');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Carrusel de imágenes románticas');
}

// Función para crear efecto de parallax sutil
function addParallaxEffect() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    carousel.addEventListener('mousemove', (e) => {
        const rect = carousel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        carousel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    carousel.addEventListener('mouseleave', () => {
        carousel.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
}

// Inicializar todas las mejoras del carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que Bootstrap inicialice el carrusel
    setTimeout(() => {
        createCarouselParticles();
        enhanceTouchExperience();
        addEnhancedHoverEffects();
        addSmoothZoomEffect();
        enhanceIndicators();
        addProgressiveImageLoading();
        addVisualSoundEffects();
        improveCarouselAccessibility();
        addParallaxEffect();
        
        console.log('🎠 Mejoras dinámicas del carrusel inicializadas');
    }, 1000);
});

// Añadir estilos CSS dinámicos para las animaciones
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes floatParticle {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.8;
        }
        25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 1;
        }
        50% { 
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
            opacity: 0.6;
        }
        75% { 
            transform: translateY(-30px) translateX(5px) rotate(270deg);
            opacity: 0.9;
        }
    }
    
    @keyframes imageGlow {
        0% { 
            transform: translateX(-100%);
            opacity: 0;
        }
        50% { 
            opacity: 1;
        }
        100% { 
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes soundWave {
        0% { 
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
    
    .carousel-particle {
        will-change: transform, opacity;
    }
`;
document.head.appendChild(dynamicStyles);

// ===== FUNCIONALIDAD DEL MODAL DE ESTRELLAS =====

// Función para actualizar los indicadores del carrusel de estrellas
function updateStarsCarouselIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.stars-indicators button');
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Función para crear partículas de estrellas
function createStarParticle() {
    const star = document.createElement('div');
    star.innerHTML = '⭐';
    star.style.position = 'fixed';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = window.innerHeight + 'px';
    star.style.fontSize = '20px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '1000';
    star.style.transition = 'all 3s ease-out';
    star.style.color = '#3B82F6';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.style.top = '-50px';
        star.style.opacity = '0';
        star.style.transform = 'rotate(360deg) scale(1.5)';
    }, 100);
    
    setTimeout(() => {
        if (document.body.contains(star)) {
            document.body.removeChild(star);
        }
    }, 3000);
}

// Función simplificada para el carrusel de estrellas
function addStarsCarouselEffects() {
    // Esta función ahora está integrada en addStarsCarouselNavigation
    // Solo mantener para compatibilidad
}

// Función de touch removida - Bootstrap maneja el touch nativamente

// Funciones de efectos removidas para mejor funcionalidad del carrusel

// Función para mejorar los indicadores del carrusel de estrellas con animaciones
function enhanceStarsIndicators() {
    const indicators = document.querySelectorAll('.stars-indicators button');
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('mouseenter', () => {
            indicator.style.transform = 'scale(1.3) translateY(-2px)';
        });
        
        indicator.addEventListener('mouseleave', () => {
            if (!indicator.classList.contains('active')) {
                indicator.style.transform = 'scale(1) translateY(0)';
            }
        });
        
        indicator.addEventListener('click', () => {
            // Añadir efecto de click
            indicator.style.transform = 'scale(1.1)';
            setTimeout(() => {
                if (indicator.classList.contains('active')) {
                    indicator.style.transform = 'scale(1.4) translateY(-3px)';
                } else {
                    indicator.style.transform = 'scale(1) translateY(0)';
                }
            }, 150);
        });
    });
}

// Función de navegación removida - ahora integrada en initStarsCarousel

// Funciones de efectos adicionales removidas para mejor funcionalidad

// Event listener para el botón de estrellas
document.addEventListener('DOMContentLoaded', function() {
    const btnStars = document.getElementById('btnStars');
    const starsModal = document.getElementById('starsModal');
    
    if (btnStars) {
        btnStars.addEventListener('click', function() {
            // Mostrar la modal
            const modal = new bootstrap.Modal(starsModal);
            modal.show();
            
            // Crear partículas de estrellas
            createStarParticle();
            
            console.log('⭐ Modal de estrellas abierta');
        });
    }
    
    // Event listener para cuando se abre la modal
    if (starsModal) {
        starsModal.addEventListener('shown.bs.modal', function() {
            // Inicializar el carrusel cuando la modal esté completamente visible
            setTimeout(() => {
                initStarsCarousel();
            }, 100);
        });
        
        // Event listener para cuando se cierra la modal
        starsModal.addEventListener('hidden.bs.modal', function() {
            console.log('⭐ Modal de estrellas cerrada');
        });
    }
});

// Función para inicializar el carrusel de estrellas
function initStarsCarousel() {
    const starsCarousel = document.getElementById('starsCarousel');
    if (!starsCarousel) {
        console.error('❌ Carrusel no encontrado');
        return;
    }
    
    // Destruir instancia existente si existe
    const existingCarousel = bootstrap.Carousel.getInstance(starsCarousel);
    if (existingCarousel) {
        existingCarousel.dispose();
    }
    
    // Inicializar el carrusel de Bootstrap
    const carousel = new bootstrap.Carousel(starsCarousel, {
        interval: 5000,
        wrap: true,
        touch: true
    });
    
    console.log('✅ Carrusel inicializado:', carousel);
    
    // Verificar que los elementos existen
    const prevBtn = starsCarousel.querySelector('.carousel-control-prev');
    const nextBtn = starsCarousel.querySelector('.carousel-control-next');
    const indicators = starsCarousel.querySelectorAll('.carousel-indicators button');
    
    console.log('🔍 Elementos encontrados:', {
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        indicators: indicators.length
    });
    
    // Añadir event listeners manuales
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('⬅️ Botón anterior clickeado');
            carousel.prev();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('➡️ Botón siguiente clickeado');
            carousel.next();
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Indicador clickeado:', index);
            carousel.to(index);
        });
    });
    
    // Event listener para actualizar indicadores y clases
    starsCarousel.addEventListener('slid.bs.carousel', function(event) {
        const activeIndex = event.to;
        console.log('📸 Slide cambiada a:', activeIndex);
        
        // Remover clase active de todos los items
        const allItems = starsCarousel.querySelectorAll('.carousel-item');
        allItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Añadir clase active al item actual
        if (allItems[activeIndex]) {
            allItems[activeIndex].classList.add('active');
        }
        
        updateStarsCarouselIndicators(activeIndex);
    });
    
    // Asegurar que el primer item tenga la clase active
    const firstItem = starsCarousel.querySelector('.carousel-item');
    if (firstItem) {
        firstItem.classList.add('active');
    }
}

// Crear partículas de estrellas cada cierto tiempo cuando la modal esté abierta
setInterval(() => {
    if (document.getElementById('starsModal').classList.contains('show')) {
        createStarParticle();
    }
}, 3000);

// ===== FUNCIONALIDAD DEL BOTÓN DE DESCARGA =====

// Función para crear partículas de corazones para el botón de descarga
function createDownloadHeartParticle() {
    const heart = document.createElement('div');
    heart.innerHTML = '💚';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.transition = 'all 3s ease-out';
    heart.style.color = '#4CAF50';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.top = '-50px';
        heart.style.opacity = '0';
        heart.style.transform = 'rotate(360deg) scale(1.5)';
    }, 100);
    
    setTimeout(() => {
        if (document.body.contains(heart)) {
            document.body.removeChild(heart);
        }
    }, 3000);
}

// Función para añadir efectos especiales al botón de descarga
function addDownloadButtonEffects() {
    const downloadBtn = document.getElementById('btnDownload');
    if (!downloadBtn) return;
    
    // Efecto de hover con partículas
    downloadBtn.addEventListener('mouseenter', function() {
        // Crear partícula de corazón
        createDownloadHeartParticle();
        
        // Añadir efecto de brillo
        this.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.6)';
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    downloadBtn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.3)';
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Efecto de click
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir descarga inmediata
        
        // Trackear intento de descarga
        trackUserActivity('Intento de Descarga APK');
        
        // Crear múltiples partículas de corazones
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createDownloadHeartParticle();
            }, i * 200);
        }
        
        // Efecto de click visual
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        }, 150);
        
        // Mostrar alerta de 5 segundos
        showDownloadAlert();
    });
    
    // Efecto de focus para accesibilidad
    downloadBtn.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.3)';
    });
    
    downloadBtn.addEventListener('blur', function() {
        this.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.3)';
    });
}

// Función para mostrar alerta de descarga con mensaje sobre fuentes desconocidas
function showDownloadAlert() {
    // Crear elemento de alerta
    const alert = document.createElement('div');
    alert.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px;">
            <div style="font-size: 2rem; margin-bottom: 10px;">📱</div>
            <h4 style="color: #FCE4EC; margin-bottom: 10px; font-family: 'Playfair Display', serif;">¡Preparando tu descarga!</h4>
            <p style="color: #333; margin-bottom: 15px; font-size: 1rem; line-height: 1.5;">
                <strong>Importante:</strong> Para instalar la aplicación en tu teléfono, necesitarás permitir la instalación de fuentes desconocidas en la configuración de seguridad.
            </p>
            <div style="background: #FCE4EC; padding: 10px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #E91E63;">
                <p style="margin: 0; font-size: 0.9rem; color: #C2185B;">
                    <strong>💡 Consejo:</strong> Ve a Configuración > Seguridad > Fuentes desconocidas y actívala para instalar.
                </p>
                <p style="margin: 0; font-size: 0.9rem; color: #C2185B;">
                    <strong>IMPORTANTE:</strong> Apenas descargues, instales y abras la aplicación, pulsa en permitir para recibir notiticaciones(En caso de que lo pida).
                </p>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; margin-top: 15px;">
                <div style="width: 20px; height: 20px; border: 3px solid #FCE4EC; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 10px;"></div>
            </div>
        </div>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #E91E63, #F06292);
        color: white;
        padding: 25px;
        border-radius: 20px;
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 15px 35px rgba(233, 30, 99, 0.4);
        border: 3px solid rgba(255, 255, 255, 0.3);
        animation: downloadAlert 8.5s ease-out forwards;
        text-align: center;
        max-width: 350px;
        width: 85%;
    `;
    
    // Añadir estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes downloadAlert {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            10% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.05);
            }
            90% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alert);
    
    // Contador regresivo
    let countdown = 8.5;
    const countdownElement = alert.querySelector('#countdown');
    
    const countdownInterval = setInterval(() => {
        countdown -= 0.5;
        if (countdownElement) {
            countdownElement.textContent = countdown.toFixed(1);
        }
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            // Descarga directa sin ventana emergente
            const downloadLink = document.createElement('a');
            downloadLink.href = 'https://drive.google.com/drive/folders/1XmvFviMmfro9O_tKrIUSoxdGRPNwO3LM';
            downloadLink.download = 'Elizabeth_Una_Princesa.apk';
            downloadLink.target = '_self';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }, 500);
    
    // Remover después de 8.5 segundos
    setTimeout(() => {
        if (document.body.contains(alert)) {
            document.body.removeChild(alert);
        }
        if (document.head.contains(style)) {
            document.head.removeChild(style);
        }
    }, 8500);
}

// Función para detectar si es dispositivo móvil y mostrar mensaje especial
function detectMobileAndShowMessage() {
    const downloadBtn = document.getElementById('btnDownload');
    if (!downloadBtn) return;
    
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (isMobile) {
        // Cambiar el texto del botón para móviles
        downloadBtn.innerHTML = '📱 Descárgame en tu teléfono';
        
        // Añadir evento especial para móviles
        downloadBtn.addEventListener('click', function(e) {
            // Crear partículas especiales para móviles
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createDownloadHeartParticle();
                }, i * 100);
            }
            
            // Mostrar mensaje especial para móviles
            const mobileMessage = document.createElement('div');
            mobileMessage.innerHTML = '💚 ¡Perfecto! Me llevas contigo a donde vayas 💚';
            mobileMessage.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(45deg, #4CAF50, #66BB6A);
                color: white;
                padding: 15px 25px;
                border-radius: 20px;
                font-family: 'Playfair Display', serif;
                font-size: 1rem;
                font-weight: 700;
                z-index: 10000;
                box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5);
                border: 2px solid rgba(255, 255, 255, 0.3);
                animation: mobileMessage 4s ease-out forwards;
                text-align: center;
                max-width: 90%;
            `;
            
            // Añadir animación para móviles
            const mobileStyle = document.createElement('style');
            mobileStyle.textContent = `
                @keyframes mobileMessage {
                    0% {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    20% {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                    80% {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                }
            `;
            document.head.appendChild(mobileStyle);
            
            document.body.appendChild(mobileMessage);
            
            // Remover después de 4 segundos
            setTimeout(() => {
                if (document.body.contains(mobileMessage)) {
                    document.body.removeChild(mobileMessage);
                }
                if (document.head.contains(mobileStyle)) {
                    document.head.removeChild(mobileStyle);
                }
            }, 4000);
        });
    }
}

// Función para inicializar el carrusel de princess correctamente
function initializePrincessCarousel() {
    const carousel = document.getElementById('princessCarousel');
    if (carousel) {
        // Limpiar cualquier instancia previa
        const existingCarousel = bootstrap.Carousel.getInstance(carousel);
        if (existingCarousel) {
            existingCarousel.dispose();
        }
        
        // Asegurar que solo la primera imagen esté activa
        const allItems = carousel.querySelectorAll('.carousel-item');
        allItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === 0) {
                item.classList.add('active');
            }
        });
        
        // Inicializar el carrusel con configuración específica
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 4000,
            ride: 'carousel',
            wrap: true
        });
        
        // Forzar que vaya al primer slide
        bsCarousel.to(0);
        
        console.log('🎠 Carrusel de Princess inicializado correctamente');
        console.log('📸 Total de imágenes:', allItems.length);
        console.log('🖼️ Imagen activa:', allItems[0].querySelector('img').alt);
    }
}


// Función para abrir el modal de princess automáticamente
function openPrincessModal() {
    // Esperar un poco para que la página se cargue completamente
    setTimeout(() => {
        const princessModal = new bootstrap.Modal(document.getElementById('princessModal'));
        princessModal.show();
        console.log('👑 Modal de Princess abierto automáticamente');
    }, 1000); // 1 segundo de delay para que se vea mejor
}

// Función para abrir el modal de princess desde el botón Tour de Amor
function openPrincessModalFromTour() {
    // Crear partículas de corazones azules antes de abrir la modal
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createTourHeartParticle();
        }, i * 100);
    }
    
    // Abrir la modal de Princess inmediatamente
    const princessModal = new bootstrap.Modal(document.getElementById('princessModal'));
    princessModal.show();
    
    // Inicializar el carrusel cuando la modal esté completamente visible
    setTimeout(() => {
        initializePrincessCarousel();
    }, 200);
    
    console.log('💙 Modal de Princess abierto desde Tour de Amor');
}

// Inicializar efectos del botón de descarga
document.addEventListener('DOMContentLoaded', function() {
    // Sistema de notificaciones simplificado (sin envío de email)
    
    // Trackear que la aplicación se abrió
    trackUserActivity('Aplicación Abierta', {
        timestamp: new Date().toLocaleString('es-ES'),
        device: getDeviceInfo(),
        url: window.location.href
    });
    
    addDownloadButtonEffects();
    detectMobileAndShowMessage();
    
    // Configurar evento para reinicializar carrusel cuando se abra el modal
    const princessModal = document.getElementById('princessModal');
    if (princessModal) {
        princessModal.addEventListener('shown.bs.modal', function() {
            console.log('🎠 Modal de Princess abierto, inicializando carrusel...');
            trackUserActivity('Modal Princess Abierto', { source: 'automático' });
            setTimeout(() => {
                initializePrincessCarousel();
            }, 200);
        });
        
        princessModal.addEventListener('hidden.bs.modal', function() {
            trackUserActivity('Modal Princess Cerrado');
        });
    }
    
    
    console.log('📱 Botón de descarga inicializado');
    
    // Inicializar botón de tour de amor
    initializeTourButton();
    
    // Enviar resumen cada 5 minutos
    setInterval(sendActivitySummary, 5 * 60 * 1000);
    
    // Enviar resumen cuando se cierre la página
    window.addEventListener('beforeunload', function() {
        sendActivitySummary();
    });
});

// ===== SISTEMA SIMPLIFICADO (SIN ENVÍO DE EMAIL) =====

// Función para obtener información del dispositivo
function getDeviceInfo() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    const screenSize = `${window.innerWidth}x${window.innerHeight}`;
    
    return {
        type: isMobile ? (isTablet ? 'Tablet' : 'Móvil') : 'Desktop',
        screen: screenSize,
        platform: navigator.platform,
        language: navigator.language
    };
}

// Función para trackear actividad del usuario
function trackUserActivity(action, details = {}) {
    const activity = {
        action: action,
        timestamp: new Date().toISOString(),
        details: details,
        sessionId: getSessionId()
    };
    
    // Guardar en localStorage para persistencia
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    activities.push(activity);
    
    // Mantener solo las últimas 50 actividades
    if (activities.length > 50) {
        activities.splice(0, activities.length - 50);
    }
    
    localStorage.setItem('userActivities', JSON.stringify(activities));
    
    // Sin envío de email para evitar errores 400
    
    console.log('📊 Actividad registrada:', activity);
}

// Función para generar ID de sesión
function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

// Función para enviar resumen de actividades
function sendActivitySummary() {
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    if (activities.length === 0) return;
    
    const summary = {
        totalActivities: activities.length,
        sessionId: getSessionId(),
        firstActivity: activities[0].timestamp,
        lastActivity: activities[activities.length - 1].timestamp,
        activities: activities.map(a => ({
            action: a.action,
            time: new Date(a.timestamp).toLocaleString('es-ES')
        }))
    };
    
    // Sin envío de email para evitar errores 400
    console.log('📊 Resumen de actividades:', summary);
    
    // Limpiar actividades después de enviar
    localStorage.removeItem('userActivities');
}

// ===== FUNCIONALIDAD DEL BOTÓN TOUR DE AMOR =====

// Función para crear partículas de corazones azules para el botón de tour
function createTourHeartParticle() {
    const heart = document.createElement('div');
    heart.innerHTML = '💙';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.transition = 'all 3s ease-out';
    heart.style.color = '#87CEEB';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.top = '-50px';
        heart.style.opacity = '0';
        heart.style.transform = 'rotate(360deg) scale(1.5)';
    }, 100);
    
    setTimeout(() => {
        if (document.body.contains(heart)) {
            document.body.removeChild(heart);
        }
    }, 3000);
}


// Función para inicializar el botón de tour
function initializeTourButton() {
    const tourBtn = document.getElementById('btnTour');
    if (!tourBtn) return;
    
    // Efecto de hover con partículas
    tourBtn.addEventListener('mouseenter', function() {
        // Crear partícula de corazón azul
        createTourHeartParticle();
        
        // Añadir efecto de brillo
        this.style.boxShadow = '0 0 20px rgba(135, 206, 235, 0.6)';
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    tourBtn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(135, 206, 235, 0.3)';
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Efecto de click
    tourBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Trackear click en tour de amor
        trackUserActivity('Tour de Amor Clicked');
        
        // Crear múltiples partículas de corazones azules
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createTourHeartParticle();
            }, i * 200);
        }
        
        // Efecto de click visual
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        }, 150);
        
        // Abrir la modal de Princess
        openPrincessModalFromTour();
    });
    
    // Efecto de focus para accesibilidad
    tourBtn.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.3)';
    });
    
    tourBtn.addEventListener('blur', function() {
        this.style.boxShadow = '0 5px 15px rgba(135, 206, 235, 0.3)';
    });
    
    console.log('💙 Botón Tour de Amor inicializado - Abre la modal de Princess');
}


// Inicializar directamente el modal de bienvenida cuando el DOM esté listo


// Reposicionar burbuja de la princesa cuando cambie el tamaño de la ventana
window.addEventListener('resize', function() {
    // Reposicionar burbuja de la princesa si está visible
    const existingBubble = document.querySelector('.princess-bubble');
    if (existingBubble) {
        // Recalcular posición - SIEMPRE DEBAJO DE LA PRINCESA
        const princessImg = document.querySelector('.princess-icon');
        if (princessImg) {
            const princessRect = princessImg.getBoundingClientRect();
            const bubbleWidth = existingBubble.offsetWidth;
            
            const bubbleLeft = princessRect.left + (princessRect.width / 2) - (bubbleWidth / 2);
            const bubbleTop = princessRect.bottom + 15;
            
            // Asegurar que no se salga de la pantalla horizontalmente
            const screenWidth = window.innerWidth;
            const minLeft = 10;
            const maxLeft = screenWidth - bubbleWidth - 10;
            const adjustedBubbleLeft = Math.max(minLeft, Math.min(maxLeft, bubbleLeft));
            
            existingBubble.style.left = adjustedBubbleLeft + 'px';
            existingBubble.style.top = bubbleTop + 'px';
            existingBubble.style.transform = 'none';
            
            // Reposicionar la flecha para que apunte hacia la princesa
            const arrow = existingBubble.querySelector('.bubble-arrow-left');
            if (arrow) {
                const princessCenterX = princessRect.left + (princessRect.width / 2);
                const bubbleCenterX = adjustedBubbleLeft + (bubbleWidth / 2);
                const arrowOffset = princessCenterX - bubbleCenterX;
                
                arrow.style.left = `calc(50% + ${arrowOffset}px)`;
            }
            
            console.log('💬 Burbuja de la princesa reposicionada');
        }
    }
});

// ===== FUNCIONES PARA EL MODAL DE BIENVENIDA =====

// Variable para rastrear si el usuario ha interactuado
let userHasInteracted = false;
let welcomeVideo = null;
let modalClosing = false;

// Detectar interacción del usuario y activar audio inmediatamente
function detectUserInteraction() {
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    
    events.forEach(event => {
        document.addEventListener(event, function() {
            if (!userHasInteracted) {
                userHasInteracted = true;
                console.log('👤 Usuario ha interactuado - activando audio...');
                
                // Activar audio inmediatamente cuando el usuario interactúe
                if (welcomeVideo) {
                    welcomeVideo.muted = false;
                    welcomeVideo.volume = 1.0;
                    console.log('🔊 Audio activado por interacción del usuario');
                }
            }
        }, { once: true });
    });
}

// Configurar el modal de bienvenida
function setupWelcomeModal() {
    console.log('🎬 Configurando modal de bienvenida...');
    
    // Detectar interacción del usuario
    detectUserInteraction();
    
    // Mostrar el modal inmediatamente
    showWelcomeModal();
    
    // Configurar eventos del video
    const welcomeVideo = document.getElementById('welcomeModalVideo');
    if (welcomeVideo) {
        // Mostrar botón de cerrar cuando el video termine
        welcomeVideo.addEventListener('ended', function() {
            console.log('🎬 Video de bienvenida terminado');
            
            // Cerrar automáticamente el modal después de 2 segundos
            setTimeout(() => {
                hideWelcomeModal();
            }, 2000);
        });
        
        // Manejar errores de video
        welcomeVideo.addEventListener('error', function() {
            console.error('❌ Error cargando video de bienvenida');
            // El botón cerrar ya está visible, no necesitamos hacer nada más
        });
        
        // Manejar cuando el video esté listo para reproducir
        welcomeVideo.addEventListener('canplaythrough', function() {
            console.log('🎬 Video de bienvenida listo para reproducir');
        });
        
    }
    
    // Configurar botón de cerrar manual
    const closeBtn = document.getElementById('welcomeModalClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            console.log('❌ Cerrando modal de bienvenida...');
            hideWelcomeModal();
        });
    }
    
    // Configurar evento cuando el modal se cierre completamente
    const modalElement = document.getElementById('welcomeModal');
    modalElement.addEventListener('hidden.bs.modal', function() {
        console.log('✅ Modal completamente cerrado - limpiando estado...');
        
        // Limpiar estado adicional
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.style.pointerEvents = '';
        
        // Remover cualquier backdrop residual
        const modalBackdrops = document.querySelectorAll('.modal-backdrop');
        modalBackdrops.forEach(backdrop => backdrop.remove());
        
        console.log('✅ Estado del modal completamente restaurado');
    });
}

// Mostrar el modal de bienvenida
function showWelcomeModal() {
    console.log('🎬 Mostrando modal de bienvenida...');
    
    // Resetear el estado de cierre
    modalClosing = false;
    
    const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();
    
    // Configurar el video para reproducción automática
    welcomeVideo = document.getElementById('welcomeModalVideo');
    if (welcomeVideo) {
        // Configurar atributos para reproducción automática
        welcomeVideo.muted = true; // Empezar silenciado para garantizar reproducción
        welcomeVideo.autoplay = true;
        welcomeVideo.loop = false;
        welcomeVideo.playsInline = true; // Importante para móviles
        welcomeVideo.controls = true; // Mostrar controles desde el inicio
        welcomeVideo.volume = 1.0; // Volumen máximo
        
        console.log('🎵 Reproduciendo video silenciado - audio se activará con interacción del usuario');
        
        // Reproducir inmediatamente (silenciado) con manejo de errores mejorado
        const playVideo = () => {
            // Verificar que el video aún existe, el modal está abierto y no se está cerrando
            if (!welcomeVideo || welcomeVideo.paused === false || modalClosing) {
                return;
            }
            
            welcomeVideo.play().then(() => {
                console.log('🎬 Video reproduciéndose silenciado - esperando interacción del usuario para audio');
                
                // Mostrar indicador sutil de audio
                const audioIndicator = document.createElement('div');
                audioIndicator.innerHTML = '🔊';
                audioIndicator.style.cssText = `
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    z-index: 15;
                    animation: pulseAudio 2s ease-in-out infinite;
                    cursor: pointer;
                `;
                
                // Agregar animación CSS
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes pulseAudio {
                        0%, 100% { opacity: 0.6; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.1); }
                    }
                `;
                document.head.appendChild(style);
                
                welcomeVideo.parentElement.style.position = 'relative';
                welcomeVideo.parentElement.appendChild(audioIndicator);
                
                // Remover indicador cuando se active el audio
                const removeIndicator = () => {
                    if (audioIndicator.parentElement) {
                        audioIndicator.remove();
                    }
                };
                
                // Escuchar cuando se active el audio
                const checkAudio = () => {
                    if (!welcomeVideo.muted) {
                        removeIndicator();
                    } else {
                        setTimeout(checkAudio, 100);
                    }
                };
                checkAudio();
                
            }).catch(error => {
                // Solo mostrar error si no es por interrupción
                if (error.name !== 'AbortError') {
                    console.warn('⚠️ No se pudo reproducir el video:', error);
                } else {
                    console.log('🎬 Reproducción interrumpida (normal)');
                }
            });
        };
        
        // Intentar reproducir después de un pequeño delay para evitar conflictos
        setTimeout(playVideo, 100);
    }
}

// Ocultar el modal de bienvenida
function hideWelcomeModal() {
    console.log('🎬 Ocultando modal de bienvenida...');
    
    // Marcar que el modal se está cerrando
    modalClosing = true;
    
    // Pausar el video antes de cerrar de manera segura
    if (welcomeVideo) {
        try {
            welcomeVideo.pause();
            welcomeVideo.currentTime = 0; // Reiniciar el video
        } catch (error) {
            console.log('🎬 Video ya pausado o no disponible');
        }
    }
    
    // Obtener la instancia del modal
    const welcomeModal = bootstrap.Modal.getInstance(document.getElementById('welcomeModal'));
    if (welcomeModal) {
        welcomeModal.hide();
    } else {
        // Si no hay instancia, crear una nueva y cerrarla
        const modalElement = document.getElementById('welcomeModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.hide();
    }
    
    // Limpiar inmediatamente el estado del modal
    const modalElement = document.getElementById('welcomeModal');
    modalElement.classList.remove('show');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.style.display = 'none';
    
    // Asegurar que el overlay se elimine completamente
    setTimeout(() => {
        // Remover todos los backdrops
        const modalBackdrops = document.querySelectorAll('.modal-backdrop');
        modalBackdrops.forEach(backdrop => backdrop.remove());
        
        // Restaurar completamente el body
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Remover cualquier estilo inline que pueda estar bloqueando
        document.body.style.pointerEvents = '';
        document.body.style.position = '';
        
        // Forzar reflow para asegurar que los cambios se apliquen
        document.body.offsetHeight;
        
        console.log('✅ Modal cerrado completamente - interacción restaurada');
    }, 100);
}

// Llamar a setupWelcomeModal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupWelcomeModal();
});
