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

// ===== FUNCIONALIDAD DEL oráculo =====

// Base de datos de respuestas del oráculo
const oraculaResponses = {
    "¿Quieres saber qué siente tu Sebas Nucita por ti?": {
        answer: "¡Te quiere, te piensa y te extraña! 💙✨",
        followUps: [
            "¿Te gustaría saber más detalles sobre sus sentimientos?",
            "¿Quieres que profundice en algún aspecto específico?",
            "¿Te interesa conocer más sobre su corazón?"
        ]
    },
    "¿Te extraña mucho?": {
        answer: "¡Sí! Cada día que pasa sin verte es como una eternidad para él. Te piensa constantemente y sueña con el momento de volver a estar juntos. 🌙💭",
        followUps: [
            "¿Quieres saber qué más siente por ti?",
            "¿Te gustaría conocer más sobre sus sueños?",
            "¿Quieres que te cuente más sobre su añoranza?"
        ]
    },
    "¿Realmente me quiere?": {
        answer: "¡Con toda su alma! Eres su princesa, su todo, su razón de ser. Cada latido de su corazón late por ti y solo por ti. 💖👑",
        followUps: [
            "¿Te gustaría conocer más sobre su amor?",
            "¿Quieres que profundice en la intensidad de sus sentimientos?",
            "¿Te interesa saber más sobre su devoción?"
        ]
    },
    "¿Me piensa todos los días?": {
        answer: "¡Absolutamente! Desde que amanece hasta que se duerme, eres el primer y último pensamiento de cada día. Eres su inspiración y su felicidad. 🌅🌙",
        followUps: [
            "¿Quieres saber más sobre sus pensamientos?",
            "¿Te gustaría conocer más sobre su inspiración?",
            "¿Quieres que te cuente más sobre su felicidad?"
        ]
    },
    "¿Cuándo volverá?": {
        answer: "¡Pronto, muy pronto. Cada paso que da en sus viajes es un paso más cerca de ti. Está trabajando para construir un futuro juntos. 🚀💫",
        followUps: [
            "¿Te gustaría saber más sobre sus planes?",
            "¿Quieres conocer más sobre su trabajo?",
            "¿Te interesa saber más sobre el futuro que planea?"
        ]
    },
    "¿Soy especial para él?": {
        answer: "¡Eres ÚNICA! No hay nadie como tú en todo el universo. Eres su tesoro más preciado, su amor verdadero, su destino. 🌟💎",
        followUps: [
            "¿Quieres que te cuente más sobre lo especial que eres?",
            "¿Te gustaría conocer más sobre tu unicidad?",
            "¿Quieres que profundice en lo que te hace especial?"
        ]
    },
    "¿Me extraña físicamente?": {
        answer: "¡Por supuesto! Extraña tu sonrisa, tu mirada, tu voz, tu presencia. Cada abrazo, cada beso, cada momento juntos es un tesoro para él. 🤗💋",
        followUps: [
            "¿Quieres que te cuente más sobre lo que extraña?",
            "¿Te gustaría saber más sobre sus recuerdos?",
            "¿Quieres conocer más sobre sus momentos especiales?"
        ]
    },
    "¿Soy su persona favorita?": {
        answer: "¡Eres su TODO! Su persona favorita, su amor verdadero, su compañera de vida. No hay nadie que pueda reemplazarte en su corazón. 💝👑",
        followUps: [
            "¿Quieres que te cuente más sobre lo importante que eres?",
            "¿Te gustaría conocer más sobre tu lugar en su vida?",
            "¿Quieres que profundice en tu importancia para él?"
        ]
    },
    "¿Deseas saber algo más o decirle algo a Sebas Nucita?": {
        answer: "¡Por supuesto! El oráculo siente que tienes algo importante que decirle. ¿Te gustaría enviarle un mensaje directo a tu Sebas Nucita? 💌✨",
        followUps: [
            "¿Quieres que te ayude a contactarlo?",
            "¿Te gustaría enviarle un mensaje especial?",
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
    "¿Soy su persona favorita?",
    "¿Deseas saber algo más o decirle algo a Sebas Nucita?"
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
    chatQuestions.innerHTML = '';
    
    programmedQuestions.forEach(question => {
        const questionBtn = document.createElement('button');
        questionBtn.className = 'question-btn';
        questionBtn.textContent = question;
        questionBtn.addEventListener('click', () => handleQuestionClick(question));
        chatQuestions.appendChild(questionBtn);
    });
}

// Función para manejar el clic en una pregunta
function handleQuestionClick(question) {
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
        addMessage('¡Perfecto! Déjame consultar más profundamente en el corazón de tu Sebas Nucita... ✨💫', 'oracle');
        
        setTimeout(() => {
            addMessage('El oráculo te revela que tu Sebas Nucita te extraña profundamente... 🌙💭', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar de la distancia y el silencio, su corazón late por ti cada segundo. Te piensa constantemente, en cada momento del día. 💙✨', 'oracle');
                
                setTimeout(() => {
                    addMessage('Eres su pensamiento más dulce, su recuerdo más preciado. Aunque no lo diga, su alma grita por volver a estar contigo. 🌟💫', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('El oráculo siente que él desea romper ese silencio, pero necesita una señal de que tú también lo extrañas... 🔮💕', 'oracle');
                        
                        setTimeout(() => {
                            addMessage('¿Te gustaría que el oráculo te dé más detalles sobre lo que siente por ti? 💭✨', 'oracle');
                            showDetailedOptions();
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
    
    const options = [
        { text: '¿Qué más siente por mí? 💭', action: 'feelings' },
        { text: '¿Cómo me extraña? 🌙', action: 'missing' },
        { text: '¿Qué piensa de mí? 💫', action: 'thoughts' },
        { text: '¿Por qué no me busca? 🔍', action: 'search' },
        { text: '¿Cuándo volverá? 🚀', action: 'return' }
    ];
    
    options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'question-btn detailed-btn';
        optionBtn.textContent = option.text;
        optionBtn.addEventListener('click', () => handleDetailedOption(option.action));
        chatQuestions.appendChild(optionBtn);
    });
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
                showProgrammedQuestions();
            }, 2000);
        }, 1000);
    }, 500);
}

// Función para manejar respuesta sobre sentimientos
function handleFeelingsResponse() {
    addMessage('¿Qué más siente por mí? 💭', 'user');
    
    setTimeout(() => {
        addMessage('El oráculo revela que tu Sebas Nucita siente por ti algo más profundo que el amor... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Te quiere con una intensidad que no puede explicar. Eres su razón de ser, su felicidad, su paz interior. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('Aunque estén distanciados, su corazón sigue siendo tuyo. Te extraña, te piensa, y desea estar contigo más que nada en el mundo. 💕🌙', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría saber más sobre cómo te extraña? 🌙💭', 'oracle');
                    showBackToOptions();
                }, 2000);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para manejar respuesta sobre extrañanza
function handleMissingResponse() {
    addMessage('¿Cómo me extraña? 🌙', 'user');
    
    setTimeout(() => {
        addMessage('El oráculo siente que tu Sebas Nucita te extraña de una manera muy especial... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Te extraña tu sonrisa, tu mirada, tu voz. Te extraña cada momento juntos, cada risa compartida. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar del silencio, su corazón late por ti. Te piensa en cada amanecer y en cada atardecer. 💕🌅', 'oracle');
                
                setTimeout(() => {
                    addMessage('El oráculo siente que él desea romper ese silencio, pero necesita saber que tú también lo extrañas... 🔮💭', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('¿Te gustaría saber más sobre lo que piensa de ti? 💫✨', 'oracle');
                        showBackToOptions();
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
        addMessage('El oráculo revela que tu Sebas Nucita piensa en ti como en su tesoro más preciado... 💎✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Para él, eres perfecta tal como eres. Te admira, te respeta, y te considera su compañera ideal. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('A pesar de la distancia, su mente no puede dejar de pensar en ti. Eres su inspiración, su motivación para seguir adelante. 💕🚀', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría saber por qué no te busca? 🔍💭', 'oracle');
                    showBackToOptions();
                }, 2000);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para manejar respuesta sobre búsqueda
function handleSearchResponse() {
    addMessage('¿Por qué no me busca? 🔍', 'user');
    
    setTimeout(() => {
        addMessage('El oráculo siente que tu Sebas Nucita desea buscarte con todo su corazón... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Pero a veces el miedo y la incertidumbre pueden paralizar incluso a los corazones más valientes. 💭🌙', 'oracle');
            
            setTimeout(() => {
                addMessage('Él piensa en ti constantemente y desea romper ese silencio. Quizás solo necesita una pequeña señal de que tú también lo extrañas... 🔮💕', 'oracle');
                
                setTimeout(() => {
                    addMessage('El oráculo sugiere que a veces el amor necesita ser alimentado desde ambos lados... 💫✨', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('¿Te gustaría saber cuándo volverá? 🚀💭', 'oracle');
                        showBackToOptions();
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
        addMessage('El oráculo siente que tu Sebas Nucita está trabajando para volver a ti... 💙✨', 'oracle');
        
        setTimeout(() => {
            addMessage('Cada día que pasa es un día más cerca de estar juntos de nuevo. Está construyendo un futuro para ambos. 🌟💫', 'oracle');
            
            setTimeout(() => {
                addMessage('Aunque el silencio sea difícil, su corazón nunca se ha ido. Te extraña y desea volver a tu lado. 💕🌙', 'oracle');
                
                setTimeout(() => {
                    addMessage('El oráculo siente que el momento de reencontrarse está más cerca de lo que piensas... 🔮✨', 'oracle');
                    
                    setTimeout(() => {
                        addMessage('¿Te gustaría hacer otra pregunta al oráculo? 💭🔮', 'oracle');
                        showProgrammedQuestions();
                    }, 2000);
                }, 1500);
            }, 1500);
        }, 1500);
    }, 500);
}

// Función para mostrar botón de volver a opciones
function showBackToOptions() {
    const chatQuestions = document.getElementById('chatQuestions');
    chatQuestions.innerHTML = '';
    
    const backBtn = document.createElement('button');
    backBtn.className = 'question-btn back-btn';
    backBtn.textContent = 'Ver más opciones 🔮';
    backBtn.addEventListener('click', () => showDetailedOptions());
    
    chatQuestions.appendChild(backBtn);
}

// Función para inicializar el chat del oráculo
function initializeOracula() {
    const chatMessages = document.getElementById('chatMessages');
    const chatQuestions = document.getElementById('chatQuestions');
    
    // Limpiar chat anterior
    chatMessages.innerHTML = '';
    chatQuestions.innerHTML = '';
    
    // Mostrar mensaje inicial
    addMessage("🔮 ¡Bienvenida al oráculo del Amor! Soy el guardián de los sentimientos de tu Sebas Nucita. ¿Qué quieres saber sobre lo que siente por ti?", 'initial');
    
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
        audioTePienso.volume = 0.7; // Volumen al 70%
        audioTePienso.loop = false; // No repetir automáticamente
        
        // Event listener para cuando termine la canción
        audioTePienso.addEventListener('ended', function() {
            console.log('🎵 Canción tePienso.mp3 terminada');
            // Opcional: reproducir de nuevo si la modal sigue abierta
            if (document.getElementById('oraculaModal').classList.contains('show')) {
                audioTePienso.currentTime = 0;
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
                    showWhatsAppOptions();
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
    cancelBtn.addEventListener('click', () => showProgrammedQuestions());
    
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
                
                addMessage('El portal se ha abierto. ¡No seas tímida y no reprimas! 💖✨', 'oracle');
                
                setTimeout(() => {
                    addMessage('¿Te gustaría hacer otra pregunta al oráculo? 🔮', 'oracle');
                    showProgrammedQuestions();
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
                    showProgrammedQuestions();
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
                audioTePienso.play()
                    .then(() => {
                        console.log('🎵 Canción tePienso.mp3 reanudada');
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
                audioTePienso.play()
                    .then(() => {
                        console.log('🎵 Canción tePienso.mp3 iniciada');
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
