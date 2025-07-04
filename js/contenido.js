// Textos para cada imagen
const textos = [
    "Érase una vez, hace muchos años, cuando te vi por primera vez.",
    "Muchos años después, una amena charla entre risas y una simple pregunta: “¿Estás bien?” se convirtió en la entrada hacia algo muy especial.",
    "A medida que pasaban los días, un día me preguntaste si te veías mejor en blanco y negro o a color. Yo respondí, sin dudarlo, que te veías como la mejor.",
    "Sin darnos cuenta, el tiempo pasaba, y entre un caballero y esta hermosa princesa algo comenzó a florecer... hasta que llegó el día de su cumpleaños.",
    "Y un pequeño detalle llegó a sus manos de forma imprevista, alegrando inmensamente la jornada de la princesa.",
    "Aquel caballero hizo una aparición ante su princesa, y desde la distancia percibió el amor que nacía entre ellos... y le dio un nombre: VIDA.",
    "Juntos crearon algo llamado 'Nuestro Espacio', donde se imaginaban cómo se verían compartiendo la vida, uno al lado del otro.",
    "Pasaban los días, y la princesa sonreía más. Sus ojos brillaban con una luz especial, y su caballero podía leer en ellos lo feliz que ella se sentía.",
    "El caballero la admiraba en cada instante. Hablaban durante horas y horas, acompañándose en decenas de madrugadas.",
    "Mientras los días seguían su curso, la princesa le contaba sus sueños, y cómo se imaginaba viviendo momentos especiales a su lado.",
    "Hasta que un día, el caballero decidió organizar su vida, y con determinación fue a visitarla. Se encontraron, fueron juntos a la casita de Dios, y allí surgió una química especial, una conexión profunda.",
    "Desde entonces, se miran como uno solo. Son felices, sonrientes, y comparten incluso los más pequeños detalles... como una auténtica princesa y su caballero.",
    "Su amor es evidente, limpio, sano y honesto. Y un día, sellaron tanta espera, ansiedad y sorpresa con una relación: 16-06-2025.",
    "No había dragones que combatir, ni nadie que rescatar, pero el caballero juró proteger a su princesa mientras su amor y sus fuerzas se lo permitieran.",
    "Algo hermoso comenzó a cambiar en ella... La princesa se volvió aún más elegante, especial y bonita. Tanto, que su caballero decidió retratarla con amor, para el mundo... y para su corazón.",
    "Hasta el sol de hoy, ella brilla más que nunca. Es la luz que ilumina el desenlace de esta historia.",
    "Y aunque parece un final, esta historia... no termina aquí. Al decir verdad, apenas comienza. Continuará..."
];

// Elemento donde se va a cambiar el texto
const descripcion = document.getElementById('descripcion-text');

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

