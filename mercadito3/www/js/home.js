const carouselImages = document.getElementById('carousel-images');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Mover Carrusel
const moveCarousel = (direction) => {
    const items = carouselImages.children.length;
    currentIndex = (currentIndex + direction + items) % items;
    carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
};

// Eventos de los botones
prevBtn.addEventListener('click', () => moveCarousel(-1));
nextBtn.addEventListener('click', () => moveCarousel(1));

// Movimiento automático
setInterval(() => moveCarousel(1), 5000);
