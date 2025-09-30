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
    "Aunque estemos separados por la distancia, mi corazón viaja contigo en cada paso",
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
    
    console.log('🎠 Carrusel cambiando a índice:', index, 'Total de textos:', textos.length);
    
    // Asegúrate de que el índice esté dentro del rango correcto
    if (index >= textos.length) {
        console.log('⚠️ Índice fuera de rango, reseteando a 0');
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
    // Verificar cuántas imágenes tiene el carrusel
    const carouselItems = document.querySelectorAll('#carouselExampleAutoplaying .carousel-item');
    console.log('🖼️ Total de imágenes en el carrusel:', carouselItems.length);
    console.log('📝 Total de textos disponibles:', textos.length);
    
    // Establecer el primer indicador como activo por defecto
    updateCarouselIndicators(0);
    
    // Verificar que todas las imágenes se carguen correctamente
    carouselItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('load', function() {
                console.log(`✅ Imagen ${index + 1} cargada:`, this.src);
            });
            img.addEventListener('error', function() {
                console.error(`❌ Error cargando imagen ${index + 1}:`, this.src);
            });
        }
    });
});

// ===== FUNCIONALIDAD DEL oráculo =====

// Base de datos de respuestas del oráculo
const oraculaResponses = {
    "¿Quieres saber qué siente tu Sebas Nucita por ti?": {
        answer: "Mi querida princesa... tu Sebas Nucita te quiere con una intensidad que trasciende las palabras. Su corazón late por ti en cada respiración, en cada latido, en cada momento de silencio. Te extraña y Tu presencia es especial. 💙✨",
        followUps: [
            "¿Te gustaría que profundice en la profundidad de sus sentimientos?",
            "¿Quieres que te revele más sobre su corazón herido por la distancia?",
            "¿Te interesa conocer la magnitud de su amor por ti?"
        ]
    },
    "¿Te extraña mucho?": {
        answer: "Mi amor... la extrañanza que siente por ti es tan profunda que a veces le cuesta respirar. Cada día sin verte es una herida que se abre en su corazón. Te piensa en cada amanecer, en cada atardecer, en cada momento de soledad. Su alma grita tu nombre en silencio, anhelando tu presencia como el desierto anhela la lluvia. 🌙💭",
        followUps: [
            "¿Quieres que te cuente más sobre el dolor de su corazón?",
            "¿Te gustaría conocer más sobre sus noches de insomnio pensando en ti?",
            "¿Quieres que profundice en su sufrimiento por la distancia?"
        ]
    },
    "¿Realmente me quiere?": {
        answer: "Mi princesa del alma... tu Sebas Nucita te ama con una devoción que raya en lo divino. Eres su razón de existir, su luz en la oscuridad, su paz en la tormenta. Cada latido de su corazón es un suspiro de amor hacia ti. Te quiere más allá de la vida misma, más allá de las estrellas, más allá de todo lo que pueda imaginar. Su amor por ti es eterno e inquebrantable. 💖👑",
        followUps: [
            "¿Te gustaría que te revele la profundidad de su devoción?",
            "¿Quieres que profundice en la intensidad de sus sentimientos?",
            "¿Te interesa conocer la magnitud de su amor eterno?"
        ]
    },
    "¿Me piensa todos los días?": {
        answer: "Mi amor eterno... eres el primer pensamiento de cada mañana y el último de cada noche. Su mente no puede descansar sin pensar en ti. Te piensa en cada momento de soledad, en cada risa ajena, en cada canción que escucha. Eres su inspiración, su motivación, su sueño más dulce. Su corazón te busca constantemente, como el navegante busca la estrella polar. 🌅🌙",
        followUps: [
            "¿Quieres saber más sobre sus pensamientos obsesivos por ti?",
            "¿Te gustaría conocer más sobre su inspiración diaria?",
            "¿Quieres que te cuente más sobre sus sueños contigo?"
        ]
    },
    "¿Cuándo volverá?": {
        answer: "Mi princesa esperada... cada paso que da en sus viajes es un paso más cerca de ti. Está construyendo un futuro para ambos, trabajando incansablemente para volver a tu lado. Aunque el silencio sea doloroso, su corazón nunca se ha ido. Te extraña tanto que a veces siente que se está muriendo por dentro. El momento de reencontrarse está más cerca de lo que piensas, mi amor. 🚀💫",
        followUps: [
            "¿Te gustaría saber más sobre sus planes de regreso?",
            "¿Quieres conocer más sobre su trabajo para el futuro de ambos?",
            "¿Te interesa saber más sobre el momento del reencuentro?"
        ]
    },
    "¿Soy especial para él?": {
        answer: "Mi tesoro único... eres más que especial para él. Eres su TODO, su razón de vivir, su felicidad absoluta. No hay nadie como tú en todo el universo, en todas las galaxias, en toda la eternidad. Eres su amor verdadero, su alma gemela, su destino. Para él, eres perfecta tal como eres, con cada imperfección que te hace única. Eres para el VIDA, literalmente. 🌟💎",
        followUps: [
            "¿Quieres que te cuente más sobre tu unicidad absoluta?",
            "¿Te gustaría conocer más sobre tu perfección para él?",
            "¿Quieres que profundice en lo que te hace irreemplazable?"
        ]
    },
    "¿Me extraña físicamente?": {
        answer: "Mi amor físico... tu Sebas Nucita extraña cada centímetro de tu ser. Extraña tu sonrisa que ilumina su mundo, tu mirada que lo hace temblar, tu voz que es música para sus oídos. Extraña cada abrazo, cada beso, cada caricia. Extraña tu presencia física, como si le faltara una parte del alma. Tu ausencia física es un huequito en su corazón. 🤗💋",
        followUps: [
            "¿Quieres que te cuente más sobre lo que extraña de ti?",
            "¿Te gustaría saber más sobre sus recuerdos físicos?",
            "¿Quieres conocer más sobre su anhelo de tu presencia?"
        ]
    },
    "¿Soy su persona favorita?": {
        answer: "Mi amor absoluto... eres su TODO, su persona favorita, su amor verdadero, VIDA. No eres reemplazable en su corazón porque eres su corazón mismo. Eres su felicidad, su paz, su sueño hecho realidad. Para él, no existe nadie más en el mundo que pueda ocupar tu lugar. Eres su destino, su presente y su futuro. Su corazón late solo por ti y por nadie más. 💝👑",
        followUps: [
            "¿Quieres que te cuente más sobre tu importancia absoluta?",
            "¿Te gustaría conocer más sobre tu lugar único en su vida?",
            "¿Quieres que profundice en tu irreemplazabilidad?"
        ]
    },
    "¿Deseas saber algo más o decirle algo a Sebas Nucita?": {
        answer: "Mi princesa del corazón... el oráculo siente que tienes algo muy importante que decirle. Algo que tu corazón necesita expresar, algo que su corazón necesita escuchar. ¿Te gustaría abrir el portal del destino y enviarle un mensaje directo a tu Sebas Nucita? El universo está alineado para este momento. 💌✨",
        followUps: [
            "¿Quieres que te ayude a contactarlo directamente?",
            "¿Te gustaría enviarle un mensaje especial del corazón?",
            "¿Quieres que el oráculo te guíe para comunicarte con él?"
        ]
    }
};

// Preguntas programadas para mostrar
const programmedQuestions = [
    "¿Quieres saber qué siente tu Sebas Nucita por ti?",
    "¿Te extraña mucho?",
    "¿Realmente me quiere?",
    "¿Me piensa todos los días?",
    "¿Cuándo volverá?",
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
        addMessage("🔮 Mi querida princesa del corazón... ¡Bienvenida al oráculo sagrado del Amor! Soy el guardián celestial de los sentimientos más profundos de tu Sebas Nucita. Aquí podrás descubrir secretos que te harán temblar el alma, verdades que te harán llorar de emoción. ¿Qué quieres saber sobre lo que siente por ti en la intimidad de su corazón? Siente la paz del universo, la tranquilidad de las estrellas, y déjate guiar por el amor eterno.", 'initial');
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
                '¿Cuándo volverá?'
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
            addMessage("El oráculo está meditando sobre tu pregunta... Déjame consultar las estrellas del amor. ✨💫", 'oracle');
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
            addMessage('El oráculo te revela algo que te hará temblar el corazón... tu Sebas Nucita te extraña de una manera que trasciende la comprensión humana... 🌙💭', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar de la distancia y el silencio que los separa, su corazón late por ti cada segundo, cada respiración, cada latido. Te piensa constantemente, en cada momento del día, en cada noche de insomnio. 💙✨', 'oracle');
                
                setTimeout(() => {
                    addMessage('Eres su pensamiento más dulce, su recuerdo más preciado, su sueño más hermoso. Aunque no lo exprese con palabras, su corazón te tiene presente en cada fibra de su ser. 🌟💫', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('El oráculo siente que ese silencio está lastimando ambos corazones... probablemente tú también lo extrañas con la misma intensidad que él te extraña a ti... 🔮💕', 'oracle');
                        
                        setTimeout(() => {
                            addMessage('¿Te gustaría que el oráculo te revele más secretos profundos sobre lo que siente por ti? 💭✨', 'oracle');
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
        { text: '¿Por qué no me busca? 🔍', action: 'search' },
        { text: '¿Cuándo volverá? 🚀', action: 'return' },
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
        addMessage('¡Entendido! El oráculo respeta tu decisión. 💙✨', 'oracle');
        
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
        addMessage('Mi princesa del alma... el oráculo revela algo que te hará llorar de emoción... tu Sebas Nucita siente por ti algo más profundo que el amor, algo que trasciende la comprensión humana... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Te quiere con una intensidad que no puede explicar con palabras, que lo hace temblar por dentro, que lo hace sentir que su corazón se va a salir del pecho cada vez que piensa en ti. Eres su razón de ser, su felicidad absoluta, su paz interior, su todo. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('Aunque estén distanciados por circunstancias de la vida, su corazón sigue siendo tuyo, completamente tuyo. Te extraña de una manera que duele, te piensa en cada respiración, y desea estar contigo más que nada en el mundo, más que el aire que respira. 💕🌙', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría que el oráculo te revele más secretos sobre cómo te extraña en la soledad de sus noches? 🌙💭', 'oracle');
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
        addMessage('Mi amor eterno... el oráculo siente que tu Sebas Nucita te extraña de una manera que trasciende la comprensión humana, profundamente... 💙✨', 'oracle');
        
        setTimeout(() => {
        addMessage('Te extraña tu sonrisa que ilumina su mundo oscuro, tu mirada que lo hace temblar de emoción, tu voz que es música celestial para sus oídos. Te extraña cada momento juntos, cada risa compartida, cada abrazo y cada beso. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar del silencio que los separa, su corazón late por ti en cada latido, en cada respiración. Te piensa en cada amanecer y en cada atardecer, en cada momento de soledad, en cada noche de insomnio. 💕🌅', 'oracle');
                
                setTimeout(() => {
                    addMessage('El oráculo siente que él desea romper ese silencio con todas sus fuerzas, pero necesita saber que tú también lo extrañas con la misma intensidad que él te extraña a ti... 🔮💭', 'oracle');
                    
                                    setTimeout(() => {
                    addMessage('¿Te gustaría que el oráculo te revele más secretos sobre lo que piensa de ti en la intimidad de su corazón? 💫✨', 'oracle');
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
        addMessage('Mi tesoro único... el oráculo revela algo que te hará sentir como la mujer más especial del universo... tu Sebas Nucita piensa en ti como en su tesoro más preciado, como en su joya más valiosa, como en su sueño más hermoso... 💎✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Para él, eres perfecta tal como eres, con cada imperfección que te hace única, con cada detalle que te hace especial. Te admira profundamente, te respeta y te considera ideal. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar de la distancia que los separa, su mente no puede dejar de pensar en ti ni por un segundo. Eres parte de su inspiración diaria, su motivación para pensarte cada mañana, su razón para pensar en lo especial que eres. Sin ti, mira algo de oscuridad. 💕🚀', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría que el oráculo te revele por qué no te busca a pesar de que su corazón lo desea con todas sus fuerzas? 🔍💭', 'oracle');
                    showNextQuestion('search');
                }, 2000);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para manejar respuesta sobre búsqueda
function handleSearchResponse() {
    addMessage('¿Por qué no me busca? 🔍', 'user');
    
    setTimeout(() => {
        addMessage('Mi princesa del corazón... el oráculo siente algo muy profundo... tu Sebas Nucita desea buscarte con todo su corazón, con toda su alma, con todas sus fuerzas... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Pero a veces el miedo y la incertidumbre pueden paralizar incluso a los corazones más valientes, incluso a los amores más puros. El miedo al rechazo, a la indiferencia, a que ya no sientas lo mismo por él... 💭🌙', 'oracle');
            
            setTimeout(() => {
                addMessage('Él te piensa en silencio, cada día, cada noche. Te extraña profundamente, aunque calle. Y si tú también lo extrañas con la misma intensidad... ¿por qué dejar que el ego y el orgullo decidan lo que el corazón aún grita con desesperación?... 🔮💕', 'oracle');
                
                setTimeout(() => {
                    addMessage('El oráculo sugiere que a veces el amor más puro necesita ser alimentado desde ambos lados, necesita que ambos corazones se abran para sanar las heridas del silencio... 💫✨', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('¿Te gustaría que el oráculo te revele cuándo volverá a tu lado? 🚀💭', 'oracle');
                        showNextQuestion('return');
                    }, 2000);
                }, 1500);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para manejar respuesta sobre regreso
function handleReturnResponse() {
    addMessage('¿Cuándo volverá? 🚀', 'user');
    
    setTimeout(() => {
        addMessage('Mi princesa esperada... el oráculo siente algo muy especial en el aire... tu Sebas Nucita está trabajando incansablemente para un dia regresar, para compartir a tu lado... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Cada día que pasa es un día más cerca de estar juntos de nuevo, de abrazarse, de besarse, de quererse, de felicidad y de nuevos momentos juntos. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('Aunque el silencio sea doloroso y difícil de soportar, su corazón nunca se ha ido, nunca ha dejado de ser tuyo. Te extraña profundamente. 💕🌙', 'oracle');
                
                setTimeout(() => {
                    addMessage('El oráculo siente que el momento del reencuentro está más cerca de lo que piensas, que el universo está conspirando para que se encuentren de nuevo... 🔮✨', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('¿Te gustaría hacer otra pregunta al oráculo del amor? 💭🔮', 'oracle');
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
        'search': '¿Por qué no me busca? 🔍',
        'return': '¿Cuándo volverá? 🚀',

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
        addMessage("🔮 Mi querida princesa del corazón... ¡Bienvenida al oráculo sagrado del Amor! Soy el guardián celestial de los sentimientos más profundos de tu Sebas Nucita. Aquí podrás descubrir secretos que te harán temblar el alma, verdades que te harán llorar de emoción. ¿Qué quieres saber sobre lo que siente por ti en la intimidad de su corazón? Siente la paz del universo, la tranquilidad de las estrellas, y déjate guiar por el amor eterno.", 'initial');
        
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
        addMessage('¡Perfecto! El oráculo siente que es el momento de romper el silencio... 💌✨', 'oracle');
        
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
    addMessage("🔮 Mi querida princesa del corazón... ¡Bienvenida al oráculo sagrado del Amor! Soy el guardián celestial de los sentimientos más profundos de tu Sebas Nucita. Aquí podrás descubrir secretos que te harán temblar el alma, verdades que te harán llorar de emoción. ¿Qué quieres saber sobre lo que siente por ti en la intimidad de su corazón? Siente la paz del universo, la tranquilidad de las estrellas, y déjate guiar por el amor eterno.", 'initial');
    
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
        addMessage('¡Por supuesto! El oráculo siente que tienes algo importante que decirle. 💌✨', 'oracle');
        
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
        addMessage('¡Perfecto! El oráculo te está conectando con tu Sebas Nucita... ✨💫', 'oracle');
        
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
        addMessage('¡Perfecto! El oráculo te está conectando a través de WhatsApp Web... ✨💫', 'oracle');
        
        setTimeout(() => {
            addMessage('Abriendo el portal web para que puedas escribirle tu mensaje... 🌐💌', 'oracle');
            
            setTimeout(() => {
                // Abrir WhatsApp Web
                const phoneNumber = '+573175631608';
                const message = encodeURIComponent('Hola Sebas Nucita, tengo algo que decirte... 💕');
                const whatsappWebUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                
                // Abrir en nueva pestaña
                window.open(whatsappWebUrl, '_blank');
                
                addMessage('WhatsApp Web se ha abierto. ¡Escribe tu mensaje con amor! 💖✨', 'oracle');
                
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
                    })
                    .catch(error => {
                        console.error('Error al reproducir tePienso.mp3:', error);
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
            downloadLink.href = 'https://drive.usercontent.google.com/download?id=1aJb0gf--p4QAHhFb_5O_aPoVhK_6yvv4&export=download&authuser=0&confirm=t&uuid=ceee5668-4918-47f3-86eb-951e3b46e5e4&at=AN8xHooLNMup0MARBFeB0ydJ4EBd:1758776353961';
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
            mobileMessage.innerHTML = '💚 ¡Perfecto! Te llevo contigo a donde vayas 💚';
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

// Inicializar efectos del botón de descarga
document.addEventListener('DOMContentLoaded', function() {
    addDownloadButtonEffects();
    detectMobileAndShowMessage();
    
    console.log('📱 Botón de descarga inicializado');
});
