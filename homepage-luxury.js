/**
 * AERTHYS LUXURY HOMEPAGE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    // 1. Navbar Scroll Effect & Color Adapting
    const nav = document.querySelector('.nav-lux');

    const updateNav = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            nav.classList.remove('on-hero');
        } else {
            nav.classList.remove('scrolled');
            nav.classList.add('on-hero'); // White text when on top (over video)
        }
    };

    window.addEventListener('scroll', updateNav);
    updateNav(); // Init state

    // 2. Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .stat-item, .story-content, .variety-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s cubic-bezier(0.65, 0, 0.35, 1)';
        observer.observe(el);
    });

    // Helper helper class for observer
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Parallax Effect for Hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                heroBg.style.transform = `scale(1.1) translateY(${scroll * 0.5}px)`;
            }
        });
    }

    // 4. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle-lux');
    const menu = document.querySelector('.menu-lux');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            // Simple toggle for now, can be elaborated with an overlay
            if (menu.style.display === 'flex') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'flex';
                menu.style.flexDirection = 'column';
                menu.style.position = 'absolute';
                menu.style.top = '80px';
                menu.style.left = '0';
                menu.style.width = '100%';
                menu.style.background = '#1a3a2e';
                menu.style.padding = '2rem';
                menu.style.gap = '1.5rem';
            }
        });
    }

    // Init Icons
    if (window.lucide) lucide.createIcons();
});
