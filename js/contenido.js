// Textos para cada imagen
const textos = [
    "Yo quiero que seas como cenicienta",
    "Ser aquel que ponga en tu pie, la zapatilla",
    "Como un cuento de hadas, te quiero contar todo lo que siento",
    "Esa mirada dulce y mágica a mí me congela",
    "Quisiera ser el genio que concede tus deseos",
    "Yo quiero que tú seas mi princesa, que tú seas la bella y yo la bestia",
    "Y solo con tus besos me iluminas y me llenas",
    "Y que despiertes de tus sueños solo con mis besos",
    "¿Quien es mi princesa?"
];

// Elemento donde se va a cambiar el texto
const descripcion = document.getElementById('descripcion-text');
const ourSpace = document.getElementById('our_space');

// Función para cambiar el texto de acuerdo a la imagen activa
document.getElementById('carouselExampleAutoplaying').addEventListener('slide.bs.carousel', function (event) {
    // Cambiar el texto de acuerdo al índice de la imagen activa
    let index = event.to;  // Obtiene el índice de la imagen activa (comienza desde 0)

    // Si el índice excede el número de textos, lo volvemos a ajustar a 0
    if (index >= textos.length) {
        index = 0;
    }

    // Cambiar el texto según el índice de la imagen
    descripcion.textContent = textos[index];

       if (index === textos.length - 1) {
        // Verificar si ya hemos insertado el contenido en #our_space, para evitar duplicados
        if (!ourSpace.innerHTML.includes('Recorri cada reino y obtuve algo para ti')) {
            const extraText = document.createElement('p');
            extraText.id = 'descripcion-text';
            extraText.innerHTML = `Pulsame y mira lo que adquiri Recorriendo cada reino para ti: <a href="pages/vida.html">Vamos!</a>`;
            ourSpace.appendChild(extraText);
        }
    }
    
});

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btnPlayAudio');
    const audio = document.getElementById('audio-cuento');

    btn.addEventListener('click', function () {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    btn.textContent = 'Pausar historia';
                })
                .catch(error => {
                    console.error('No se pudo reproducir el audio:', error);
                });
        } else {
            audio.pause();
            btn.textContent = 'Iniciar historia';
        }
    });
});
