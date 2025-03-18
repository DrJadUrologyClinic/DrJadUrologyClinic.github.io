// Encapsulate in IIFE to avoid polluting global scope
(() => {
  // DOM Cache
  const dom = {
    slides: document.getElementsByClassName("clinicSlides"),
    dots: document.getElementsByClassName("demo"),
    caption: document.getElementById("caption"),
    prevButton: document.getElementById("prev-week"),
    nextButton: document.getElementById("next-week")
  };

  // State
  let slideIndex = 1;
  const totalSlides = dom.slides.length;

  // Configuration
  const config = {
    transitionDuration: 500,
    autoAdvance: true,
    autoAdvanceInterval: 5000
  };

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    if (config.autoAdvance) startAutoAdvance();
    addEventListeners();
  });

  // Core Functions
  function showSlides(n) {
    // Validate slide index
    slideIndex = n > totalSlides ? 1 : n < 1 ? totalSlides : n;

    // Update slides
    Array.from(dom.slides).forEach(slide => {
      slide.style.opacity = 0;
      setTimeout(() => {
        slide.style.display = "none";
      }, config.transitionDuration);
    });

    // Fade-in effect
    dom.slides[slideIndex - 1].style.display = "block";
    setTimeout(() => {
      dom.slides[slideIndex - 1].style.opacity = 1;
    }, 50);

    // Update indicators
    Array.from(dom.dots).forEach(dot => 
      dot.classList.remove("active"));
    dom.dots[slideIndex - 1].classList.add("active");

    // Update caption
    if (dom.caption) {
      dom.caption.textContent = dom.dots[slideIndex - 1].alt;
    }
  }

  // Navigation Controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
    if (config.autoAdvance) resetAutoAdvance();
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
    if (config.autoAdvance) resetAutoAdvance();
  }

  // Auto-Advance Feature
  let autoAdvanceInterval;
  function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
      plusSlides(1);
    }, config.autoAdvanceInterval);
  }

  function resetAutoAdvance() {
    clearInterval(autoAdvanceInterval);
    startAutoAdvance();
  }

  // Event Listeners
  function addEventListeners() {
    // Navigation buttons
    if (dom.prevButton) {
      dom.prevButton.addEventListener('click', () => plusSlides(-1));
    }
    if (dom.nextButton) {
      dom.nextButton.addEventListener('click', () => plusSlides(1));
    }

    // Dot indicators
    Array.from(dom.dots).forEach((dot, index) => {
      dot.addEventListener('click', () => currentSlide(index + 1));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === "ArrowLeft") plusSlides(-1);
      if (e.key === "ArrowRight") plusSlides(1);
    });
  }

  // Public API
  window.slideshowAPI = {
    next: () => plusSlides(1),
    prev: () => plusSlides(-1),
    goto: currentSlide
  };
})();

// Add this to your reservations.js

document.getElementById('share-reservation').addEventListener('click', async function() {
  try {
    // Capture the confirmation card
    const confirmationCard = document.getElementById('confirmation-details');
    
    // Use html2canvas to create an image
    const canvas = await html2canvas(confirmationCard);
    
    // Convert canvas to data URL
    const imageData = canvas.toDataURL('image/png');
    
    // Create a temporary link
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'reservation-confirmation.png';
    
    // Create WhatsApp message with image
    const message = encodeURIComponent("تم تأكيد الحجز، يرجى الاطلاع على التفاصيل في الصورة المرفقة");
    const whatsappURL = `https://wa.me/962778089234?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Automatically trigger download of the image
    link.click();
    
  } catch (error) {
    console.error('Error sharing reservation:', error);
    alert('حدث خطأ أثناء مشاركة الحجز، يرجى المحاولة مرة أخرى');
  }
});