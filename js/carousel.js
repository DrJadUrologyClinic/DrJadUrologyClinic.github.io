// Carousel functionality
const track = document.querySelector('.carousel-track');  // select the ul
const slides = Array.from(track.children);
const slidesLength = slides.length; // get length of array (number of images)
var counter = 0; // check position in slides 
const nextButton = document.querySelector('.carousel-button--right');
const prevButton = document.querySelector('.carousel-button--left');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width; // get size of the first slide (same for all slides),  get only width of the first slide

const totalWidth = slideWidth * (slidesLength - 1) + 'px'; // get total width of all images (when placed next to each other)

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';  // change style --> move slide from the left (shift from absolute pos.)
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; // shift ul
    currentSlide.classList.remove('current-slide'); // remove .current-slide CSS on current slide
    targetSlide.classList.add('current-slide'); // add .current-slide CSS on next slide 
};

const updateDots = (currentDot, targetDot) => {
    if (currentDot && targetDot) {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    } else {
        console.warn('One of the dots is null:', { currentDot, targetDot });
    }
};

// When next clicked, move to slide on the right
nextButton.addEventListener('click', e => {
    counter++; // Increment counter for moving to the next slide
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling; // Move to the next slide
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot ? currentDot.nextElementSibling : null; // Define next dot, handle null case

    if (!nextSlide) {
        const firstSlide = slides[0]; // Loop to the first slide
        const firstDot = dots[0];
        moveToSlide(track, currentSlide, firstSlide);
        updateDots(currentDot, firstDot);
        counter = 0; // Reset the counter to 0
    } else {
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }
});

// When prev clicked, move to slide on the left
prevButton.addEventListener('click', e => {
    counter--; // Decrement counter for moving to the previous slide
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling; // Move to the previous slide
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot ? currentDot.previousElementSibling : null; // Define previous dot, handle null case

    if (!prevSlide) {
        const lastSlide = slides[slides.length - 1]; // Loop to the last slide
        const lastDot = dots[dots.length - 1];
        moveToSlide(track, currentSlide, lastSlide);
        updateDots(currentDot, lastDot);
        counter = slides.length - 1; // Reset the counter to the last index
    } else {
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    }
});

// When I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button'); // Prevents event when carousel__nav clicked (not near carousel__nav buttons)
    if (!targetDot) return; // If !targetDot... exit function

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot); // Get index of dot clicked on
    counter = targetIndex;
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});

// When window is resized --> get new carousel slide length and total width then reset track pos so that only the current slide is seen
window.addEventListener('resize', slideResize);

function slideResize() {
    var newSlideWidth = slides[0].getBoundingClientRect().width; // Get size of the first slide (same for all slides), get only width of the first slide
    var totalWidth = slideWidth * (slidesLength - 1) + 'px'; // Get total length of all slides next to each other

    const setSlidePosition = (slide, index) => { // Reset slide positions for new window size
        slide.style.left = newSlideWidth * index + 'px';
    };

    slides.forEach(setSlidePosition);

    const currentSlide = track.querySelector('.current-slide');
    var currentIndex = slides.indexOf(currentSlide);
    var currentTrackPos = newSlideWidth * currentIndex + 'px';
    track.style.transform = 'translateX(-' + currentTrackPos + ')'; // Shift ul
}

// Enable touch scrolling (swiping)
let startX;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
}, { passive: true });

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    if (deltaX > 50) {
        prevButton.click(); // Swipe right
        isDragging = false;
    } else if (deltaX < -50) {
        nextButton.click(); // Swipe left
        isDragging = false;
    }
}, { passive: true });

track.addEventListener('touchend', () => {
    isDragging = false;
}, { passive: true });

// Enable mouse scrolling
track.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
        prevButton.click(); // Scroll up (previous slide)
    } else if (e.deltaY > 0) {
        nextButton.click(); // Scroll down (next slide)
    }
}, { passive: true });
