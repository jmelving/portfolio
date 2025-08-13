// ===================================================================
// Projects - JAVASCRIPT FUNCTIONALITY
// ===================================================================

// VIDEO CONFIGURATION - You can use either YouTube or Vimeo

// For YouTube: Use the video ID from the URL
// Example: https://www.youtube.com/watch?v=zH8ladtiEsE -> VIDEO_ID = 'zH8ladtiEsE'
const YOUTUBE_VIDEO_ID = 'zH8ladtiEsE'; // Your YouTube video ID
const USE_YOUTUBE = true; // Set to false if you want to use Vimeo instead

// For Vimeo: Use the video ID from the URL  
// Example: https://vimeo.com/123456789 -> VIDEO_ID = '123456789'
const VIMEO_VIDEO_ID = '802238375'; // Your Vimeo video ID (if using Vimeo)

// Generate embed URLs - CLEAN YouTube URLs for full functionality
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`;
const VIMEO_EMBED_URL = `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`;

const VIDEO_EMBED_URL = USE_YOUTUBE ? YOUTUBE_EMBED_URL : VIMEO_EMBED_URL;

// ===================================================================
// SLIDESHOW CONFIGURATION
// ===================================================================

const SLIDE_DURATION = 2000; // Time each image shows (2 seconds)
const TOTAL_CYCLES = 2; // Number of times to cycle through images

// ===================================================================
// DOM ELEMENTS
// ===================================================================

// Elements
const heroSection = document.getElementById('heroSection');
const customCursor = document.getElementById('customCursor');
const modalOverlay = document.getElementById('modalOverlay');
const videoIframe = document.getElementById('videoIframe');
const closeButton = document.getElementById('closeButton');
const imageSlideshow = document.getElementById('imageSlideshow');
const backgroundImage = document.getElementById('backgroundImage');
const slideImages = document.querySelectorAll('.slide-image');

// ===================================================================
// SLIDESHOW FUNCTIONALITY
// ===================================================================

// Slideshow state
let currentSlide = 0;
let cycleCount = 0;
let slideshowInterval;
let backgroundTransitioned = false;

// Slideshow functions
function nextSlide() {
    slideImages[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideImages.length;
    
    // Check if we've completed a full cycle
    if (currentSlide === 0) {
        cycleCount++;
        if (cycleCount >= TOTAL_CYCLES && !backgroundTransitioned) {
            transitionToBackground();
            return;
        }
    }
    
    slideImages[currentSlide].classList.add('active');
}

function transitionToBackground() {
    backgroundTransitioned = true;
    clearInterval(slideshowInterval);
    
    // Fade out slideshow, show background image
    backgroundImage.classList.add('video-loaded');
    imageSlideshow.style.transition = 'opacity 0.8s ease';
    imageSlideshow.style.opacity = '0';
    
    setTimeout(() => {
        imageSlideshow.style.display = 'none';
    }, 800);
}

function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, SLIDE_DURATION);
}

// ===================================================================
// CUSTOM CURSOR FUNCTIONALITY
// ===================================================================

// Custom cursor tracking - Desktop only
let mouseX = 0;
let mouseY = 0;
let isDesktop = window.innerWidth > 768;

if (isDesktop) {
    heroSection.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        customCursor.style.left = mouseX + 'px';
        customCursor.style.top = mouseY + 'px';
    });
}

// ===================================================================
// MODAL VIDEO FUNCTIONALITY
// ===================================================================

// Open modal on click
heroSection.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    videoIframe.src = VIDEO_EMBED_URL;
    modalOverlay.classList.add('active');
});

// Close modal functions
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Stop video by clearing src
    setTimeout(() => {
        videoIframe.src = '';
    }, 300);
}

// Close on button click
if (closeButton) {
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });
}

// Close on overlay click (outside video)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// ===================================================================
// TOUCH SUPPORT FOR MOBILE
// ===================================================================

let touchStartX = 0;
let touchStartY = 0;

heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

heroSection.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const touchDistance = Math.sqrt(
        Math.pow(touchEndX - touchStartX, 2) + 
        Math.pow(touchEndY - touchStartY, 2)
    );

    // Only trigger if it's a tap (not a scroll)
    if (touchDistance < 10) {
        document.body.style.overflow = 'hidden';
        videoIframe.src = VIDEO_EMBED_URL;
        modalOverlay.classList.add('active');
    }
});

// ===================================================================
// SCROLL ANIMATIONS
// ===================================================================

// Simple scroll animations without parallax
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = Math.random() * 0.2 + 's';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// ===================================================================
// INITIALIZATION
// ===================================================================

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.animationDelay = (index * 0.05) + 's';
        observer.observe(el);
    });
});

// Initialize slideshow
startSlideshow();