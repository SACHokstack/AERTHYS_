/**
 * AERTHYS PREMIUM SHOP CONTROLLER
 * Handles product data, cart logic, filtering, and UI interactions with a premium feel.
 */

// === PRELOADED PRODUCT DATA ===
// === PRELOADED PRODUCT DATA ===
// Data is now loaded from product-data.js
// products array is available globally
if (typeof products === 'undefined') {
    console.error('Product data not loaded! Check script imports.');
}

// === STATE MANAGEMENT ===
let state = {
    cart: JSON.parse(localStorage.getItem('aerthys_cart')) || [],
    filter: 'all'
};

// === DOM ELEMENTS ===
const grid = document.querySelector('.premium-grid');
const cartContainer = document.querySelector('.cart-items-container');
const cartTotalEl = document.querySelector('.price-summary-total span');
const fabCount = document.querySelector('.fab-cart-count');
const filterPills = document.querySelectorAll('.filter-pill');

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateCartUI();
    setupFilters();
    setupMobileCart();
});

// === RENDER FUNCTIONS ===
function renderProducts(filterCategory) {
    if (!grid) return;

    // 1. Filter Data
    const filtered = filterCategory === 'all'
        ? products
        : products.filter(p => p.category === filterCategory || p.tags.includes(filterCategory));

    // 2. Clear Grid with Fade Out (if needed)
    grid.innerHTML = '';

    // 3. Generate HTML
    filtered.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card-premium fade-in-up';
        card.style.animationDelay = `${index * 100}ms`;

        // Badges HTML
        let badgesHtml = '';
        if (product.badges.includes('bestseller')) {
            badgesHtml += `<div class="badge-premium badge-gold"><i data-lucide="star" width="12"></i> Bestseller</div>`;
        } else if (product.badges.includes('new')) {
            badgesHtml += `<div class="badge-premium badge-mint"><i data-lucide="sparkles" width="12"></i> New</div>`;
        } else if (product.badges.includes('chef')) {
            badgesHtml += `<div class="badge-premium badge-dark"><i data-lucide="chef-hat" width="12"></i> Chef's Choice</div>`;
        }

        // Tags HTML
        const tagsHtml = product.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');

        // Card HTML
        card.innerHTML = `
            <div class="product-img-wrapper">
                ${badgesHtml}
                <img src="${product.image}" alt="${product.name}" class="product-img-premium" loading="lazy">
            </div>
            <div class="product-info-premium">
                <a href="product-detail.html?id=${product.id}" class="product-link-wrapper" style="text-decoration:none">
                    <h3 class="product-name-premium">${product.name}</h3>
                </a>
                <div class="tags-row">${tagsHtml}</div>
                <p class="product-desc-premium">${product.description}</p>
                
                <div class="price-row">
                    <div class="price-main">₹${product.price}<span class="price-unit">/${product.unit}</span></div>
                </div>

                <div class="interaction-row">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="adjustQty('${product.id}', -1)" aria-label="Decrease quantity">
                            <i data-lucide="minus" width="14"></i>
                        </button>
                        <input type="number" class="qty-input" value="1" min="1" max="10" id="qty-${product.id}" readonly>
                        <button class="qty-btn" onclick="adjustQty('${product.id}', 1)" aria-label="Increase quantity">
                            <i data-lucide="plus" width="14"></i>
                        </button>
                    </div>
                    <button class="add-btn" onclick="addToCart('${product.id}')" id="add-${product.id}">
                        <i data-lucide="shopping-bag" width="18"></i> Add
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Re-initialize icons for new elements
    if (window.lucide) lucide.createIcons();
}

// === INTERACTION LOGIC ===
window.adjustQty = (id, delta) => {
    const input = document.getElementById(`qty-${id}`);
    let newVal = parseInt(input.value) + delta;
    if (newVal >= 1 && newVal <= 10) {
        input.value = newVal;
    }
};

window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const qtyInput = document.getElementById(`qty-${id}`);
    const quantity = parseInt(qtyInput.value);
    const btn = document.getElementById(`add-${id}`);

    // Feedback Animation - Scale Down
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = 'scale(1)', 150);

    // Add to State
    const existing = state.cart.find(item => item.id === id);
    if (existing) {
        if (existing.quantity + quantity > 10) {
            showToast('Max quantity (10) reached for this item!', 'error');
            return;
        }
        existing.quantity += quantity;
    } else {
        state.cart.push({ ...product, quantity });
    }

    // Persist
    saveCart();

    // UI Feedback
    btn.classList.add('added');
    btn.innerHTML = `<i data-lucide="check" width="18"></i> Added`;
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = `<i data-lucide="shopping-bag" width="18"></i> Add`;
        if (window.lucide) lucide.createIcons();
    }, 2000);

    updateCartUI();
    showToast(`Added ${quantity} ${product.name} to cart`, 'success');
};

window.removeFromCart = (id) => {
    state.cart = state.cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
};

window.updateCartItemQty = (id, newQty) => {
    const item = state.cart.find(i => i.id === id);
    if (item && newQty > 0 && newQty <= 10) {
        item.quantity = newQty;
        saveCart();
        updateCartUI(false); // Don't re-render full list to keep focus, just totals usually... but simplified re-render here
    }
};

// === FILTER LOGIC ===
function setupFilters() {
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // UI
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Logic
            state.filter = pill.dataset.filter;

            // Animation out
            grid.classList.add('fade-out');
            setTimeout(() => {
                grid.classList.remove('fade-out');
                renderProducts(state.filter);
            }, 300);
        });
    });
}

// === CART UI LOGIC ===
function updateCartUI(fullRender = true) {
    // Save to LocalStorage
    localStorage.setItem('aerthys_cart', JSON.stringify(state.cart));

    // Calculate Totals
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal > 500 ? 0 : 50;
    const total = subtotal + delivery;
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update Sidebar HTML
    if (fullRender && cartContainer) {
        if (state.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart-state">
                    <i data-lucide="shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <small>Add some fresh greens!</small>
                </div>
            `;
        } else {
            cartContainer.innerHTML = state.cart.map(item => `
                <div class="cart-item slide-in">
                    <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-meta">
                            <span>₹${item.price} x ${item.quantity}</span>
                            <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">×</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        if (window.lucide) lucide.createIcons();
    }

    // Update Totals
    if (cartTotalEl) cartTotalEl.textContent = `₹${total}`;

    // Update Floating Badge
    if (fabCount) {
        fabCount.textContent = count;
        fabCount.style.display = count > 0 ? 'flex' : 'none';
        fabCount.classList.add('bounce');
        setTimeout(() => fabCount.classList.remove('bounce'), 300);
    }

    // Delivery Fee Logic Display
    const deliveryEl = document.querySelector('.delivery-fee-display');
    if (deliveryEl) {
        deliveryEl.innerHTML = delivery === 0
            ? '<span style="color:var(--success)">Free</span>'
            : `₹${delivery}`;
    }
}

function saveCart() {
    localStorage.setItem('aerthys_cart', JSON.stringify(state.cart));
}

function setupMobileCart() {
    const fab = document.querySelector('.fab-cart');
    const sidebar = document.querySelector('.cart-sidebar');

    // Simple toggle for now, ideal would be a full modal overlay for mobile
    fab?.addEventListener('click', () => {
        // Toggle sidebar visibility on mobile
        if (sidebar.style.display === 'flex') {
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = 'flex';
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0';
            sidebar.style.right = '0';
            sidebar.style.height = '100vh';
            sidebar.style.width = '100%';
            sidebar.style.zIndex = '1000';
        }
    });
}

// === UTILS ===
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--forest-green)' : '#ff4d4f'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideInTop 0.5s ease;
        font-family: var(--font-sans);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    toast.innerHTML = type === 'success'
        ? `<i data-lucide="check-circle" width="18"></i> ${message}`
        : `<i data-lucide="alert-circle" width="18"></i> ${message}`;

    document.body.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Global style for toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInTop {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    .fade-in-up {
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    @keyframes fadeInUp {
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
