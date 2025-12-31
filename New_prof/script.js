document.addEventListener('DOMContentLoaded', () => {
    // --- Banner Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 5 seconds
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Auto-play functionality
    const startInterval = () => {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    };

    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Initialize
    startInterval();


    // --- FAQ Accordion Logic ---
    const accordionItems = document.querySelectorAll('.accordion .item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            // Close other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });


    // --- Why Microgreens Scroll Logic ---
    const scrollSection = document.querySelector('.why-microgreens-scroll');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const scrollDots = document.querySelectorAll('.scroll-dots .dot');
    const triggers = document.querySelectorAll('.scroll-triggers .trigger');

    if (scrollSection && triggers.length > 0) {
        let currentIndex = 0;

        const updateActiveItem = (index) => {
            if (index === currentIndex) return;
            currentIndex = index;

            // Update content items
            scrollItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });

            // Update dots
            scrollDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        // Scroll-based detection using Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index);
                    updateActiveItem(index);
                }
            });
        }, observerOptions);

        triggers.forEach(trigger => observer.observe(trigger));

        // Click on dots to scroll to that section
        scrollDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const targetTrigger = triggers[index];
                if (targetTrigger) {
                    targetTrigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }


    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
