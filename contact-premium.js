/**
 * AERTHYS PREMIUM CONTACT CONTROLLER
 * Handles form validation, split layout interactions, and success states.
 */

document.addEventListener('DOMContentLoaded', () => {
    setupFormValidation();
    setupCustomSelect();
    setupSuccessState();
    lucide.createIcons();
});

// === 1. REAL-TIME FORM VALIDATION ===
function setupFormValidation() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = document.querySelector('.submit-btn');

    // Progress Dots
    const dots = document.querySelectorAll('.dot');

    function updateProgress() {
        let filledCount = 0;
        const totalRequired = 4; // Name, Email, Type, Message (Phone is optional technically but usually good)
        // Check core fields
        if (isValid('name')) filledCount++;
        if (isValid('email')) filledCount++;
        if (isValid('message')) filledCount++;

        // Custom order type check
        const selectedType = document.querySelector('.option.selected');
        if (selectedType) filledCount++;

        // Update dots
        dots.forEach((dot, idx) => {
            if (idx < filledCount) dot.classList.add('active');
            else dot.classList.remove('active');
        });

        // Enable Submit?
        if (filledCount >= 4) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Input Listeners
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
            updateProgress();
        });

        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    // Formatting Phone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,5})(\d{0,5})/);
            e.target.value = !x[2] ? x[1] : '+' + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
        });
    }

    // Initial check
    updateProgress();
}

function validateInput(input) {
    const parent = input.closest('.form-group');
    const error = parent.querySelector('.error-msg');
    let valid = true;

    if (input.required && !input.value.trim()) valid = false;

    // Specific checks
    if (input.type === 'email' && input.value) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }

    // UI Update
    if (!valid && input.value) { // Only show error if typed something or blurred empty
        error.style.display = 'block';
        input.style.borderColor = 'var(--error-red)';
    } else {
        error.style.display = 'none';
        input.style.borderColor = input.value ? 'var(--success-green)' : 'transparent';
    }

    return valid;
}

function isValid(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    if (el.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
    return el.value.trim().length > 0;
}

// === 2. CUSTOM SELECT DROPDOWN ===
function setupCustomSelect() {
    const wrapper = document.querySelector('.custom-select-wrapper');
    const trigger = document.querySelector('.custom-select-trigger span');
    const options = document.querySelectorAll('.option');
    const hiddenInput = document.getElementById('order-type');
    const dots = document.querySelectorAll('.dot');
    const submitBtn = document.querySelector('.submit-btn');

    wrapper.addEventListener('click', () => {
        wrapper.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();

            // UI Update
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            wrapper.classList.remove('open');
            trigger.textContent = option.querySelector('.option-text').textContent;
            trigger.style.color = 'var(--forest-premium)';
            trigger.style.fontWeight = '600';

            // Value Update
            hiddenInput.value = option.dataset.value;

            // Trigger Validation Check manually since it's custom
            // (Re-using check logic from SetupFormValidation scope would be cleaner, but simple toggle here works)
            const submitCheck = document.getElementById('name').value &&
                document.getElementById('email').value &&
                document.getElementById('message').value;

            // Show address if delivery logic needed
            const addressGroup = document.getElementById('address-group');
            if (option.dataset.value === 'inquiry') {
                addressGroup.style.display = 'none';
            } else {
                addressGroup.style.display = 'block';
                addressGroup.classList.add('fade-in');
            }

            // Trigger global progress update simulation
            document.getElementById('name').dispatchEvent(new Event('input'));
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) wrapper.classList.remove('open');
    });
}

// === 3. SUCCESS STATE ANIMATION ===
function setupSuccessState() {
    const form = document.getElementById('contact-form');
    const formCard = document.querySelector('.form-card-inner'); // Wrap form content
    const successCard = document.querySelector('.success-card');
    const submitBtn = document.querySelector('.submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Loading State
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Sending...';
        submitBtn.disabled = true;
        lucide.createIcons();

        // Simulate API
        setTimeout(() => {
            // Success!
            form.style.opacity = '0';
            form.style.transform = 'translateY(20px)';

            setTimeout(() => {
                form.style.display = 'none';
                successCard.style.display = 'block';
                // Trigger reflow
                void successCard.offsetWidth;
                successCard.classList.add('visible');

                // Show confetti if we had a library, or simple CSS celebration
                createConfetti();
            }, 500);

        }, 1500);
    });
}

function createConfetti() {
    // Simple CSS dot explosion
    const colors = ['#a8d5ba', '#d4af37', '#1a3d2e'];
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            left: 50%; top: 50%;
            width: 8px; height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            animation: explode 1s ease forwards;
        `;
        // Random angle
        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + Math.random() * 100;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;

        // This requires style injection for keyframes which we handled in CSS ideally
        // But let's just do a simple DOM cleanup
        document.body.appendChild(dot);

        dot.animate([
            { transform: 'translate(-50%, -50%)', opacity: 1 },
            { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => dot.remove();
    }
}
