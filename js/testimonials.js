const slider = document.querySelector('.slider');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let direction = -1;
let startX;
let isDragging = false;

function updateCarousel() {
    slider.style.transition = 'transform 0.3s ease';
    slider.style.transform = `translateX(${direction * 100}%)`;
}

function resetCarousel() {
    slider.style.transition = 'none';
    if (direction === -1) {
        slider.appendChild(slider.firstElementChild);
    } else {
        slider.prepend(slider.lastElementChild);
    }
    slider.style.transform = 'translateX(0)';
    setTimeout(() => {
        slider.style.transition = 'transform 0.3s ease';
    }, 0);
}

next.addEventListener('click', () => {
    direction = -1;
    updateCarousel();
});

prev.addEventListener('click', () => {
    direction = 1;
    updateCarousel();
});

slider.addEventListener('transitionend', resetCarousel);

window.onload = () => {
    next.click();
};

setInterval(() => {
    next.click();
}, 5000); // Optional: Auto-slide every 5 seconds

// Touch responsiveness
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    slider.style.transition = 'none';
});

slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    slider.style.transform = `translateX(${diff}px)`;
});

slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    isDragging = false;
    if (diff < -50) {
        next.click();
    } else if (diff > 50) {
        prev.click();
    } else {
        slider.style.transform = 'translateX(0)';
        slider.style.transition = 'transform 0.3s ease';
    }
});
