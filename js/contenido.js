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
    "¿Quieres saber qué pasó recorriendo otros reinos? Todo lo hice por ti, mi amor"
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

// Función para actualizar los indicadores del carrusel
function updateCarouselIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.carousel-indicators button');
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

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

// Función para cambiar el texto de acuerdo a la imagen activa
document.getElementById('carouselExampleAutoplaying').addEventListener('slide.bs.carousel', function (event) {
    // Obtener el índice de la imagen activa
    let index = event.to;
    
    // Asegúrate de que el índice esté dentro del rango correcto
    if (index >= textos.length) {
        index = 0;
    }

    // Actualizar los indicadores del carrusel
    updateCarouselIndicators(index);

    // Cambiar el texto según el índice de la imagen con efecto de transición
    descripcion.style.opacity = '0';
    descripcion.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        descripcion.textContent = textos[index];
        descripcion.style.opacity = '1';
        descripcion.style.transform = 'translateY(0)';
    }, 300);

    // Verificar si ya hemos insertado el contenido en #our_space, para evitar duplicados
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
});

// Evento para cuando el carrusel termine de cambiar
document.getElementById('carouselExampleAutoplaying').addEventListener('slid.bs.carousel', function (event) {
    // Obtener el índice de la imagen activa después del cambio
    let index = event.to;
    
    // Asegurarse de que los indicadores estén sincronizados
    updateCarouselIndicators(index);
});

// Función para reproducir el audio del cuento
document.addEventListener('DOMContentLoaded', function () {
    btnCuento = document.getElementById('btnPlayAudio');
    audioCuento = document.getElementById('audio-cuento');

    btnCuento.addEventListener('click', function () {
        if (audioCuento.paused) {
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
                });
        } else {
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
                });
        } else {
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

// Función para añadir efectos visuales al carrusel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carouselExampleAutoplaying');
    
    carousel.addEventListener('slide.bs.carousel', function (event) {
        // Añadir efecto de brillo a la imagen activa
        const activeItem = carousel.querySelector('.carousel-item.active');
        if (activeItem) {
            activeItem.style.boxShadow = '0 0 30px rgba(30, 58, 138, 0.6)';
            activeItem.style.transform = 'scale(1.02)';
        }
    });
    
    carousel.addEventListener('slid.bs.carousel', function (event) {
        // Remover efectos de la imagen anterior
        const allItems = carousel.querySelectorAll('.carousel-item');
        allItems.forEach(item => {
            item.style.boxShadow = 'none';
            item.style.transform = 'scale(1)';
        });
        
        // Aplicar efectos a la nueva imagen activa
        const newActiveItem = carousel.querySelector('.carousel-item.active');
        if (newActiveItem) {
            newActiveItem.style.boxShadow = '0 0 30px rgba(30, 58, 138, 0.6)';
            newActiveItem.style.transform = 'scale(1.02)';
        }
    });
});

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

// Aplicar efecto de escritura al título principal cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('h1');
    if (title) {
        const originalText = title.textContent;
        typeWriter(title, originalText, 100);
    }
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

// Inicializar los indicadores del carrusel al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Establecer el primer indicador como activo por defecto
    updateCarouselIndicators(0);
});
