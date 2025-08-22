class ImageGallery {
    constructor() {
        this.lightbox = document.getElementById('ig-lightbox');
        this.lightboxImg = document.getElementById('ig-lightbox-img');
        this.lightboxCounter = document.getElementById('ig-lightbox-counter');
        this.lightboxCaption = document.getElementById('ig-lightbox-caption');
        this.prevBtn = document.getElementById('ig-lightbox-prev');
        this.nextBtn = document.getElementById('ig-lightbox-next');
        this.galleryItems = document.querySelectorAll('.ig-gallery-item img');
        this.currentIndex = 0;
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        // Add click events to gallery items
        this.galleryItems.forEach((img, index) => {
            img.addEventListener('click', () => this.openLightbox(index));
        });

        // Lightbox controls
        this.prevBtn.addEventListener('click', () => this.previousImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('ig-active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });

        // Touch/swipe support for mobile
        this.setupTouchEvents();
        
        // Mouse hover effects for shake
        this.setupMouseEffects();
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.lightboxImg.src = this.galleryItems[index].src;
        this.lightboxImg.alt = this.galleryItems[index].alt;
        this.updateCounter();
        this.updateCaption();
        this.lightbox.classList.add('ig-active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('ig-active');
        document.body.style.overflow = '';
        this.clearImageAnimations();
    }

    clearImageAnimations() {
        this.lightboxImg.classList.remove(
            'ig-shake-left', 
            'ig-shake-right', 
            'ig-slide-out-left', 
            'ig-slide-out-right', 
            'ig-slide-in-from-left', 
            'ig-slide-in-from-right'
        );
        this.lightboxImg.style.transform = '';
        this.lightboxImg.style.opacity = '';
    }

    nextImage() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Current image slides out to the left
        this.lightboxImg.classList.add('ig-slide-out-left');

        setTimeout(() => {
            // Update to next image
            this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
            this.lightboxImg.src = this.galleryItems[this.currentIndex].src;
            this.lightboxImg.alt = this.galleryItems[this.currentIndex].alt;
            this.updateCounter();
            this.updateCaption();
            this.updateCaption();
            
            // Clear previous animations and slide in from right
            this.clearImageAnimations();
            this.lightboxImg.classList.add('ig-slide-in-from-right');

            setTimeout(() => {
                this.clearImageAnimations();
                this.isAnimating = false;
            }, 400);
        }, 200);
    }

    previousImage() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Current image slides out to the right
        this.lightboxImg.classList.add('ig-slide-out-right');

        setTimeout(() => {
            // Update to previous image
            this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
            this.lightboxImg.src = this.galleryItems[this.currentIndex].src;
            this.lightboxImg.alt = this.galleryItems[this.currentIndex].alt;
            this.updateCounter();
            
            // Clear previous animations and slide in from left
            this.clearImageAnimations();
            this.lightboxImg.classList.add('ig-slide-in-from-left');

            setTimeout(() => {
                this.clearImageAnimations();
                this.isAnimating = false;
            }, 400);
        }, 200);
    }

    updateCounter() {
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.galleryItems.length}`;
    }

    updateCaption() {
        const currentImg = this.galleryItems[this.currentIndex];
        const caption = currentImg.getAttribute('data-caption');
        
        if (caption && caption.trim() !== '') {
            this.lightboxCaption.textContent = caption;
            this.lightboxCaption.classList.add('ig-show');
        } else {
            this.lightboxCaption.classList.remove('ig-show');
        }
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let minSwipeDistance = 50;

        this.lightboxImg.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        this.lightboxImg.addEventListener('touchend', (e) => {
            if (!this.lightbox.classList.contains('ig-active')) return;

            let endX = e.changedTouches[0].clientX;
            let endY = e.changedTouches[0].clientY;
            let deltaX = endX - startX;
            let deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.previousImage();
                } else {
                    this.nextImage();
                }
            }
        }, { passive: true });
    }

    setupMouseEffects() {
        this.lightbox.addEventListener('mousemove', (e) => {
            if (!this.lightbox.classList.contains('ig-active') || this.isAnimating) return;

            const prevRect = this.prevBtn.getBoundingClientRect();
            const nextRect = this.nextBtn.getBoundingClientRect();
            
            const nearPrev = (
                e.clientX >= prevRect.left - 30 &&
                e.clientX <= prevRect.right + 30 &&
                e.clientY >= prevRect.top - 30 &&
                e.clientY <= prevRect.bottom + 30
            );

            const nearNext = (
                e.clientX >= nextRect.left - 30 &&
                e.clientX <= nextRect.right + 30 &&
                e.clientY >= nextRect.top - 30 &&
                e.clientY <= nextRect.bottom + 30
            );

            this.lightboxImg.classList.remove('ig-shake-left', 'ig-shake-right');

            if (nearPrev) {
                this.lightboxImg.classList.add('ig-shake-left');
            } else if (nearNext) {
                this.lightboxImg.classList.add('ig-shake-right');
            }
        });

        this.lightbox.addEventListener('mouseleave', () => {
            if (!this.isAnimating) {
                this.lightboxImg.classList.remove('ig-shake-left', 'ig-shake-right');
            }
        });
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});