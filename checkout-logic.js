/**
 * AERTHYS CHECKOUT LOGIC
 * Handles multi-step form, validation, and order placement.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCheckoutState();
    setupAddressAutocomplete(); // Sim
    setupPaymentOptions();
    lucide.createIcons();
});

// State
let order = {
    cart: JSON.parse(localStorage.getItem('aerthys_cart')) || [],
    paymentMethod: 'cod',
    details: {}
};

// === INIT ===
function initCheckoutState() {
    const totalEl = document.getElementById('checkout-total-display');
    const itemsCountEl = document.getElementById('items-count-display');
    const orderBtn = document.getElementById('place-order-btn');

    // Redirect if empty
    if (order.cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // Calc Total
    const subtotal = order.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    const delivery = subtotal >= 500 ? 0 : 50;
    const total = subtotal + delivery;

    if (totalEl) totalEl.textContent = `₹${total}`;
    if (itemsCountEl) itemsCountEl.textContent = `${order.cart.reduce((s, i) => s + i.quantity, 0)} items`;
    if (orderBtn) orderBtn.textContent = `Place Order - ₹${total}`;

    // Auto-fill from LocalStorage saved details (simulated persistence of form)
    const savedDetails = JSON.parse(localStorage.getItem('aerthys_user_details'));
    if (savedDetails) {
        Object.keys(savedDetails).forEach(key => {
            const field = document.getElementById(key);
            if (field) field.value = savedDetails[key];
        });
    }

    // Input Listeners for validation
    document.querySelectorAll('.checkout-input').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => saveDraftDetails());
    });
}

// === ADDRESS SIMULATION ===
function setupAddressAutocomplete() {
    const addressInput = document.getElementById('address');
    const suggestions = document.getElementById('address-suggestions');

    const areas = ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Singanallur', 'Saibaba Colony'];

    if (!addressInput) return;

    addressInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        if (val.length > 2 && val.length < 10) { // Show logic
            const match = areas.filter(a => a.toLowerCase().includes(val));
            if (match.length > 0) {
                // Ideally show custom dropdown, for now simple log or UI hint
                // In real implementation this would trigger the custom dropdown UI
            }
        }
    });
}

// === PAYMENT ===
function setupPaymentOptions() {
    const options = document.querySelectorAll('.payment-radio-label');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            if (opt.classList.contains('disabled')) return;

            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');

            const val = opt.dataset.value;
            order.paymentMethod = val;

            // Show/Hide relevant Sections
            document.getElementById('upi-section').style.display = val === 'upi' ? 'block' : 'none';
        });
    });
}

// === VALIDATION ===
function validateField(input) {
    let valid = true;
    if (input.required && !input.value.trim()) valid = false;

    if (input.type === 'email' && input.value) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }

    if (input.id === 'phone' && input.value) {
        valid = input.value.replace(/\D/g, '').length === 10;
        // Format
        let x = input.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,5})(\d{0,5})/);
        // input.value = !x[2] ? x[1] : ... (Simpler formatter for now)
    }

    // UI
    if (!valid && input.value) {
        input.style.borderColor = 'var(--error-red)';
    } else {
        input.style.borderColor = '#eee';
    }
    return valid;
}

function saveDraftDetails() {
    const details = {};
    document.querySelectorAll('.checkout-input').forEach(i => details[i.id] = i.value);
    localStorage.setItem('aerthys_user_details', JSON.stringify(details));
}

// === SUBMIT ORDER ===
window.placeOrder = () => {
    const btn = document.getElementById('place-order-btn');
    const form = document.getElementById('checkout-form');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Animate Button
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Processing...`;
    lucide.createIcons();

    // Simulate API
    setTimeout(() => {
        btn.innerHTML = `Confirming Details...`;
        setTimeout(() => {
            showSuccessModal();
            // Clear Cart
            localStorage.removeItem('aerthys_cart');
        }, 1500);
    }, 1500);
};

function showSuccessModal() {
    const overlay = document.querySelector('.modal-overlay');
    overlay.classList.add('active');

    // Auto Redirect Countdown logic could go here
    setTimeout(() => {
        // window.location.href = 'index.html'; // Or tracking page
    }, 10000);
}
