/**
 * AERTHYS CART LOGIC
 * Handles table rendering, quantity updates, and summary calculations.
 */

document.addEventListener('DOMContentLoaded', () => {
    renderCartTable();
    updateSummary();
    lucide.createIcons();
});

// State
let cart = JSON.parse(localStorage.getItem('aerthys_cart')) || [];

function getData() {
    return JSON.parse(localStorage.getItem('aerthys_cart')) || [];
}

function saveData(data) {
    localStorage.setItem('aerthys_cart', JSON.stringify(data));
    cart = data;
}

// === RENDER TABLE ===
function renderCartTable() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('empty-state');
    const tableHeader = document.querySelector('.cart-table-header');

    if (!container) return;

    if (cart.length === 0) {
        container.style.display = 'none';
        tableHeader.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    container.style.display = 'block';

    // Only show header on desktop handled by CSS media query
    // But logic-wise we assume items exist
    emptyState.style.display = 'none';

    container.innerHTML = cart.map(item => `
        <div class="cart-row fade-in">
            <div class="product-cell">
                <img src="${item.image}" alt="${item.name}" class="cart-thumb">
                <div class="product-meta">
                    <h3>${item.name}</h3>
                    <div class="product-tags">
                        ${item.tags ? item.tags.slice(0, 2).map(t => `<span class="mini-pill">${t}</span>`).join('') : ''}
                    </div>
                </div>
            </div>
            
            <div class="price-cell">
                 ₹${item.price} <span style="font-size:0.8em; color:#999">/ ${item.unit}</span>
            </div>
            
            <div class="qty-cell">
                <div class="qty-group">
                    <button class="qty-btn-mini" onclick="updateQty('${item.id}', -1)" ${item.quantity <= 1 ? 'disabled' : ''}>
                        <i data-lucide="minus" width="12"></i>
                    </button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn-mini" onclick="updateQty('${item.id}', 1)" ${item.quantity >= 10 ? 'disabled' : ''}>
                        <i data-lucide="plus" width="12"></i>
                    </button>
                </div>
            </div>
            
            <div class="total-cell" style="text-align:right; font-weight:600;">
                ₹${item.price * item.quantity}
                <button class="remove-btn" onclick="removeItem('${item.id}')" style="margin-left:1rem;">
                    <i data-lucide="x" width="16"></i>
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// === ACTIONS ===
window.updateQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty >= 1 && newQty <= 10) {
        item.quantity = newQty;
        saveData(cart);
        // Optimized re-render: ideal world we update DOM nodes directly, but full re-render is fine for small list
        renderCartTable();
        updateSummary();
    }
};

window.removeItem = (id) => {
    if (confirm('Remove this item from your cart?')) {
        const newCart = cart.filter(i => i.id !== id);
        saveData(newCart);
        renderCartTable();
        updateSummary();
        showToast('Item removed');
    }
};

// === SUMMARY ===
function updateSummary() {
    const subtotalEl = document.getElementById('subtotal');
    const deliveryEl = document.getElementById('delivery');
    const discountEl = document.getElementById('discount'); // If applicable
    const totalEl = document.getElementById('final-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 500 ? 0 : 50;
    const total = subtotal + delivery;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (deliveryEl) {
        if (delivery === 0) {
            deliveryEl.innerHTML = `<span style="color:var(--success-green)">FREE 🎉</span>`;
        } else {
            deliveryEl.textContent = `₹${delivery}`;
        }
    }

    if (totalEl) totalEl.textContent = `₹${total}`;

    if (checkoutBtn) {
        checkoutBtn.textContent = `Proceed to Checkout (₹${total})`;
        if (cart.length === 0) checkoutBtn.style.display = 'none';
        else checkoutBtn.style.display = 'flex';
    }
}

// Utils
function showToast(msg) {
    // Reuse toast logic if available globally, or simple alert for now
    // Assuming products-premium.js global toast might act here but separate file context
    // Simple console log for verification step
    console.log(msg);
}
