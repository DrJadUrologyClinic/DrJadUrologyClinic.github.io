const testimonialsSlider = document.querySelector('.testimonials-slider-inner');
const testimonialsNext = document.querySelector('.testimonials-next');
const testimonialsPrev = document.querySelector('.testimonials-prev');

let testimonialsDirection = -1;
let testimonialsStartX;
let testimonialsIsDragging = false;

function updateTestimonialsCarousel() {
    testimonialsSlider.style.transition = 'transform 0.3s ease';
    testimonialsSlider.style.transform = `translateX(${testimonialsDirection * 100}%)`;
}

function resetTestimonialsCarousel() {
    testimonialsSlider.style.transition = 'none';
    if (testimonialsDirection === -1) {
        testimonialsSlider.appendChild(testimonialsSlider.firstElementChild);
    } else {
        testimonialsSlider.prepend(testimonialsSlider.lastElementChild);
    }
    testimonialsSlider.style.transform = 'translateX(0)';
    setTimeout(() => {
        testimonialsSlider.style.transition = 'transform 0.3s ease';
    }, 0);
}

testimonialsNext.addEventListener('click', () => {
    testimonialsDirection = -1;
    updateTestimonialsCarousel();
});

testimonialsPrev.addEventListener('click', () => {
    testimonialsDirection = 1;
    updateTestimonialsCarousel();
});

testimonialsSlider.addEventListener('transitionend', resetTestimonialsCarousel);

window.onload = () => {
    testimonialsNext.click();
};

// Optional: Auto-slide every 5 seconds
setInterval(() => {
    testimonialsNext.click();
}, 5000);

// Touch responsiveness for testimonials
testimonialsSlider.addEventListener('touchstart', (e) => {
    testimonialsStartX = e.touches[0].clientX;
    testimonialsIsDragging = true;
    testimonialsSlider.style.transition = 'none';
});

testimonialsSlider.addEventListener('touchmove', (e) => {
    if (!testimonialsIsDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - testimonialsStartX;
    testimonialsSlider.style.transform = `translateX(${diff}px)`;
});

testimonialsSlider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - testimonialsStartX;
    testimonialsIsDragging = false;
    if (diff < -50) {
        testimonialsNext.click();
    } else if (diff > 50) {
        testimonialsPrev.click();
    } else {
        testimonialsSlider.style.transform = 'translateX(0)';
        testimonialsSlider.style.transition = 'transform 0.3s ease';
    }
});




