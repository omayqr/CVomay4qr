// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// REVEAL ON SCROLL ANIMATION
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ============================================
// CERTIFICATE LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxSubtitle = document.getElementById('lightboxSubtitle');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxButton = document.getElementById('lightboxButton');
const certCards = document.querySelectorAll('.cert-card');

// Open lightbox
certCards.forEach(card => {
    card.addEventListener('click', () => {
        const imageSrc = card.getAttribute('data-image');
        const title = card.getAttribute('data-title');
        const subtitle = card.getAttribute('data-subtitle');
        const fileSrc = card.getAttribute('data-file');

        lightboxTitle.textContent = title;
        lightboxSubtitle.textContent = subtitle;
        lightboxImage.src = imageSrc;
        lightboxButton.href = fileSrc;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ============================================
// SMOOTH SCROLL WITH OFFSET
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// CARD HOVER EFFECTS (MICRO-INTERACTIONS)
// ============================================
const linkCards = document.querySelectorAll('.link-card');

linkCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 40px rgba(167, 139, 250, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ============================================
// PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('.reveal, .animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-fade-in-delay-3').forEach(element => {
        element.style.animation = 'none';
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
}

// ============================================
// LOADING STATE HANDLER
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// ERROR HANDLING FOR IMAGES
// ============================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const parent = this.closest('.cert-image') || this.closest('.lightbox-image-container');
        if (parent) {
            parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            if (!parent.querySelector('.error-text')) {
                const errorText = document.createElement('div');
                errorText.className = 'error-text';
                errorText.style.color = 'white';
                errorText.style.textAlign = 'center';
                errorText.innerHTML = '<i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem;"></i><br>Image not available';
                parent.appendChild(errorText);
            }
        }
    });
});

// ============================================
// CONSOLE SIGNATURE
// ============================================
console.log('%c CV Attachments Page ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Built with ❤️ by Omar Al-Madhagi ', 'color: #a78bfa; font-size: 12px;');
