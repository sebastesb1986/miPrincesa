# 📚 Libro de Cuento Romántico - Mi Princesa

Un hermoso libro digital de cuento romántico creado con HTML, CSS y JavaScript, diseñado especialmente para expresar amor y romance de manera elegante y mágica con una paleta de colores medievales.

## ✨ Características

### 🎨 Diseño de Libro Elegante
- **Layout de libro clásico**: Texto a la izquierda, imágenes a la derecha
- **Estilo medieval romántico**: Colores blancos, azules y tonos elegantes
- **Responsivo**: Se adapta perfectamente a todos los dispositivos
- **Animaciones suaves**: Efectos visuales que dan vida al cuento

### 🌹 Elementos Románticos
- **Tipografías elegantes**: Playfair Display y Dancing Script
- **Paleta de colores medieval**: Blancos, azules profundos y azules celestes
- **Decoraciones temáticas**: Coronas, corazones azules y elementos de cuento
- **Efectos visuales**: Partículas flotantes y transiciones suaves

### 📱 Funcionalidades
- **Carrusel de imágenes**: Navegación suave entre fotos con indicadores funcionales
- **Audio integrado**: Botones para reproducir mensajes de audio
- **Navegación entre páginas**: Enlaces elegantes entre secciones
- **Efectos interactivos**: Hover effects y animaciones

## 🚀 Cómo Usar

### 1. Abrir el Libro Principal
- Abre `index.html` en tu navegador
- Disfruta de la portada romántica con colores medievales
- Usa los botones de audio para escuchar mensajes

### 2. Navegar por el Cuento
- Las imágenes cambian automáticamente
- Cada imagen tiene su texto romántico correspondiente
- Los indicadores del carrusel se sincronizan con las imágenes activas
- Al final encontrarás un enlace a la página de viajes

### 3. Explorar los Viajes
- Haz clic en "Ver Mis Viajes por Ti"
- Descubre la página `pages/vida.html`
- Explora las aventuras alrededor del mundo

## 🎯 Estructura del Proyecto

```
webSalgado/
├── index.html              # Página principal del libro
├── css/
│   ├── styles.css         # Estilos principales del libro
│   └── world.css          # Estilos para la página de viajes
├── js/
│   └── contenido.js       # Funcionalidades y efectos
├── images/                # Imágenes del cuento principal
│   ├── 1.png
│   ├── 2.png
│   └── ...
├── images/world/          # Imágenes de viajes
│   ├── 1.jpeg
│   ├── 2.jpeg
│   └── ...
├── audio/                 # Archivos de audio
│   ├── miPrincesa.mp3
│   └── miPersonaFavorita.mp3
└── pages/
    └── vida.html          # Página de viajes
```

## 🎨 Personalización

### Cambiar Colores
Los colores se pueden modificar en las variables CSS:
```css
:root {
    --primary-color: #1E3A8A;    /* Azul medieval principal */
    --secondary-color: #3B82F6;  /* Azul secundario */
    --accent-color: #60A5FA;     /* Azul celeste acento */
    --medieval-blue: #1E40AF;    /* Azul medieval profundo */
    --medieval-light-blue: #93C5FD; /* Azul medieval claro */
    --medieval-white: #FEFEFE;   /* Blanco medieval */
    --medieval-cream: #F8FAFC;   /* Crema medieval */
}
```

### Cambiar Textos
Los textos románticos se pueden editar en `js/contenido.js`:
```javascript
const textos = [
    "Tu primer mensaje romántico aquí",
    "Tu segundo mensaje romántico aquí",
    // ... más mensajes
];
```

### Cambiar Imágenes
- Reemplaza las imágenes en la carpeta `images/`
- Ajusta las rutas en el HTML si es necesario
- Mantén las mismas dimensiones para mejor resultado

## 📱 Responsividad

El libro se adapta automáticamente a:
- **Desktop**: Layout de dos columnas (texto + imágenes)
- **Tablet**: Layout de una columna con elementos apilados
- **Mobile**: Diseño optimizado para pantallas pequeñas

## 🌟 Efectos Especiales

- **Partículas flotantes**: Corazones azules que aparecen aleatoriamente
- **Animaciones de entrada**: El libro aparece con un efecto suave
- **Transiciones de texto**: Los mensajes cambian con efectos visuales
- **Hover effects**: Elementos interactivos que responden al mouse
- **Efectos de brillo**: Botones y enlaces con efectos especiales
- **Indicadores del carrusel**: Sincronizados perfectamente con las imágenes

## 🎨 Paleta de Colores Medieval

### Colores Principales
- **Azul Profundo**: #1E3A8A (azul medieval principal)
- **Azul Medio**: #3B82F6 (azul secundario)
- **Azul Celeste**: #60A5FA (azul acento)
- **Blanco Medieval**: #FEFEFE (blanco puro)
- **Crema Medieval**: #F8FAFC (crema suave)

### Botones Especiales
- **"Cuéntame la Historia"**: Rojo pasión (#DC2626)
- **"¿Qué Significas para Mí?"**: Azul celeste (#3B82F6)

## 💝 Ideas para Personalizar

1. **Cambiar la historia**: Modifica los textos para contar tu propia historia
2. **Añadir más páginas**: Crea nuevas secciones del libro
3. **Incluir música de fondo**: Añade una melodía romántica medieval
4. **Crear más efectos**: Añade confeti, fuegos artificiales, etc.
5. **Personalizar colores**: Usa los colores favoritos de tu princesa

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos avanzados, animaciones y responsive design
- **JavaScript ES6+**: Funcionalidades interactivas y efectos
- **Bootstrap 5**: Framework para componentes y grid system
- **Google Fonts**: Tipografías elegantes y románticas

## 📄 Licencia

Este proyecto es de uso personal y romántico. ¡Comparte el amor con tu princesa! 💕

---

**Creado con ❤️ para hacer realidad los cuentos de hadas medievales**

*"El amor verdadero no conoce fronteras, idiomas ni distancias. Solo conoce el corazón que late por ti."*
