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



        // 모바일 메뉴 토글
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // 메뉴 링크 클릭 시 메뉴 닫기
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Fixed CTA 버튼 스크롤 제어
        const fixedCta = document.querySelector('.fixed-cta');
        const heroSection = document.querySelector('.hero');
        const footer = document.querySelector('footer');
        
        function handleCtaVisibility() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const footerTop = footer.offsetTop;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // 히어로 섹션을 지나고 footer가 화면에 나타나기 전까지 CTA 버튼 표시
            if (scrollY > heroBottom && scrollY + windowHeight < footerTop + 100) {
                fixedCta.classList.add('show');
            } else {
                fixedCta.classList.remove('show');
            }
        }
        
        // 스크롤 이벤트 리스너
        window.addEventListener('scroll', handleCtaVisibility);
        
        // 페이지 로드 시 초기 상태 설정
        handleCtaVisibility();

        // EmailJS 초기화
        emailjs.init("4U-kWWrEspBqY76yy");
        
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitButton = this.querySelector('.submit-button');
            const statusDiv = document.getElementById('form-status');
            
            // 버튼 비활성화 및 로딩 상태 표시
            submitButton.disabled = true;
            submitButton.textContent = '전송 중...';
            
            // EmailJS를 사용하여 이메일 전송
            emailjs.sendForm('service_8qkqk8k', 'template_8qkqk8k', this)
                .then(function() {
                    statusDiv.textContent = '메시지가 성공적으로 전송되었습니다.';
                    statusDiv.style.color = 'green';
                    document.getElementById('contact-form').reset();
                }, function(error) {
                    statusDiv.textContent = '메시지 전송에 실패했습니다. 다시 시도해 주세요.';
                    statusDiv.style.color = 'red';
                })
                .finally(function() {
                    // 버튼 상태 복원
                    submitButton.disabled = false;
                    submitButton.textContent = '문의하기';
                });
        });