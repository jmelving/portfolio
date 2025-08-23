// Configuration
const VIMEO_VIDEO_ID = '802238375'; // Your Vimeo video ID
const VIMEO_EMBED_URL = `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`;

// ============================================
// SLIDESHOW CONFIGURATION
// Set ENABLE_SLIDESHOW to false to disable slideshow and show video immediately
// ============================================
const ENABLE_SLIDESHOW = false; // Change to false to disable slideshow
const SLIDE_DURATION = 1500; // Time each image shows (1.5 seconds)
const TOTAL_CYCLES = 1; // Number of times to cycle through images before video

// Elements
const showreelContainer = document.getElementById('showreelContainer');
const customCursor = document.getElementById('customCursor');
const modalOverlay = document.getElementById('modalOverlay');
const vimeoIframe = document.getElementById('vimeoIframe');
const closeButton = document.getElementById('closeButton');
const backgroundVideo = document.getElementById('backgroundVideo');
const imageSlideshow = document.getElementById('imageSlideshow');
const slideImages = document.querySelectorAll('.slide-image');

// Slideshow state
let currentSlide = 0;
let cycleCount = 0;
let slideshowInterval;
let videoTransitioned = false;

// ============================================
// SLIDESHOW FUNCTIONS (commented out when disabled)
// ============================================

// /* SLIDESHOW CODE - UNCOMMENT TO ENABLE */
function nextSlide() {
    slideImages[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideImages.length;
    
    // Check if we've completed a full cycle
    if (currentSlide === 0) {
        cycleCount++;
        if (cycleCount >= TOTAL_CYCLES && !videoTransitioned) {
            transitionToVideo();
            return;
        }
    }
    
    slideImages[currentSlide].classList.add('active');
}

function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, SLIDE_DURATION);
}
/* END SLIDESHOW CODE */

function transitionToVideo() {
    videoTransitioned = true;
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    // Start video loading
    backgroundVideo.load();
    
    backgroundVideo.addEventListener('loadeddata', () => {
        backgroundVideo.play().then(() => {
            // Fade out slideshow, fade in video
            backgroundVideo.style.opacity = '1';
            imageSlideshow.style.transition = 'opacity 0.8s ease';
            imageSlideshow.style.opacity = '0';
            
            setTimeout(() => {
                imageSlideshow.style.display = 'none';
            }, 800);
        });
    });
}

function loadVideoDirectly() {
    // Hide slideshow immediately and show video
    imageSlideshow.style.display = 'none';
    backgroundVideo.style.opacity = '1';
    backgroundVideo.load();
    backgroundVideo.addEventListener('loadeddata', () => {
        backgroundVideo.play();
    });
}

// Custom cursor tracking - Desktop only
let mouseX = 0;
let mouseY = 0;
let isDesktop = window.innerWidth > 768;

if (isDesktop) {
    showreelContainer.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        customCursor.style.left = mouseX + 'px';
        customCursor.style.top = mouseY + 'px';
    });
}

// Open modal on click
showreelContainer.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    vimeoIframe.src = VIMEO_EMBED_URL;
    modalOverlay.classList.add('active');
});

// Close modal functions
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Stop video by clearing src
    setTimeout(() => {
        vimeoIframe.src = '';
    }, 300);
}

// Close on button click
closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
});

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

// Background video loading
backgroundVideo.addEventListener('error', () => {
    console.log('Video failed to load, continuing with slideshow');
});

// Touch support for mobile
let touchStartX = 0;
let touchStartY = 0;

showreelContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

showreelContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const touchDistance = Math.sqrt(
        Math.pow(touchEndX - touchStartX, 2) + 
        Math.pow(touchEndY - touchStartY, 2)
    );

    // Only trigger if it's a tap (not a scroll)
    if (touchDistance < 10) {
        document.body.style.overflow = 'hidden';
        vimeoIframe.src = VIMEO_EMBED_URL;
        modalOverlay.classList.add('active');
    }
});

// ============================================
// INITIALIZATION
// ============================================
// Check slideshow setting and initialize accordingly
if (ENABLE_SLIDESHOW) {
    // /* SLIDESHOW ENABLED - UNCOMMENT TO ACTIVATE */
    startSlideshow();
    /* */
} else {
    // Slideshow disabled - load video directly
    loadVideoDirectly();
}

// Original gallery hover effect
document.querySelectorAll('.hover-cycle').forEach(container => {
    const images = container.querySelectorAll('.image-stack img');
    let currentIndex = 0;
    let interval;

    container.addEventListener('mouseenter', () => {
        interval = setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 800);
    });

    container.addEventListener('mouseleave', () => {
        clearInterval(interval);
        images[currentIndex].classList.remove('active');
        currentIndex = 0;
        images[currentIndex].classList.add('active');
    });
});