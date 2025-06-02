// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle (if needed)
// const createMobileMenu = () => {
//     const nav = document.querySelector('.nav-container');
//     const mobileMenuBtn = document.createElement('button');
//     mobileMenuBtn.classList.add('mobile-menu-btn');
//     mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
//     
//     nav.appendChild(mobileMenuBtn);
//     
//     mobileMenuBtn.addEventListener('click', () => {
//         const navLinks = document.querySelector('.nav-links');
//         navLinks.classList.toggle('show');
//     });
// };

// Initialize mobile menu if screen width is small
// if (window.innerWidth <= 768) {
//     createMobileMenu();
// }

// Carousel functionality
const carousel = {
    slides: document.querySelectorAll('.carousel-slide'),
    dots: document.querySelector('.carousel-dots'),
    currentSlide: 0,
    slideInterval: null,

    init() {
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dots.appendChild(dot);
        });

        // Add button event listeners
        document.querySelector('.carousel-button.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.carousel-button.next').addEventListener('click', () => this.nextSlide());

        // Start auto slide
        this.startAutoSlide();
    },

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots.children[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots.children[this.currentSlide].classList.add('active');
    },

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    },

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    },

    startAutoSlide() {
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    },

    stopAutoSlide() {
        clearInterval(this.slideInterval);
    }
};

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
}); 