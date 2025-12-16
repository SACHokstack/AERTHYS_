/**
 * Product Detail Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        window.location.href = 'products.html'; // Redirect if no ID
        return;
    }

    // 2. Find Product Data
    // 'products' is available globally from product-data.js
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.querySelector('.detail-container').innerHTML = `
            <div style="text-align:center; padding: 4rem;">
                <h2>Product Not Found</h2>
                <a href="products.html" class="add-cart-lg" style="display:inline-block; width:auto; padding: 1rem 2rem; margin-top:1rem; text-decoration:none;">Return to Shop</a>
            </div>
        `;
        return;
    }

    // 3. Populate Page
    renderProductDetails(product);
    renderRelatedProducts(product);

    // Init Icons
    if (window.lucide) lucide.createIcons();
});

function renderProductDetails(product) {
    // Basic Info
    document.title = `${product.name} - Aerthys Premium`;
    document.getElementById('breadcrumb-current').textContent = product.name;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-category').textContent = product.category;
    document.getElementById('detail-price').textContent = `₹${product.price}`;
    document.getElementById('detail-unit').textContent = `/${product.unit}`;

    const descEl = document.getElementById('detail-desc');
    // Use longDescription if available, else standard description
    descEl.textContent = product.longDescription || product.description;

    // Image
    const imgEl = document.getElementById('detail-img');
    imgEl.src = product.image;
    imgEl.alt = product.name;

    // Badge Logic
    const badgesContainer = document.getElementById('detail-badges');
    if (product.badges && product.badges.length > 0) {
        badgesContainer.innerHTML = product.badges.map(b => {
            let colorClass = 'badge-mint'; // default
            if (b === 'bestseller') colorClass = 'badge-gold';
            if (b === 'chef') colorClass = 'badge-dark';
            return `<span class="badge-detail ${colorClass}" style="background:var(--forest-green); color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem;">${b}</span>`;
        }).join('');
    }

    // Nutrition
    const nutritionGrid = document.getElementById('nutrition-grid');
    if (product.nutrition) {
        Object.entries(product.nutrition).forEach(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1').trim(); // camelCase to Normal Text
            const div = document.createElement('div');
            div.className = 'nutrition-item';
            div.innerHTML = `
                <span class="nutri-label">${label}</span>
                <span class="nutri-value">${value}</span>
            `;
            nutritionGrid.appendChild(div);
        });
    } else {
        nutritionGrid.innerHTML = '<p class="text-gray" style="grid-column:1/-1; text-align:center;">Nutrition info specific to variety not available.</p>';
    }

    // Reviews
    if (product.reviews) {
        document.getElementById('detail-reviews').textContent = `(${product.reviews} Reviews)`;
    }

    // Button Event
    const addBtn = document.getElementById('add-to-cart-lg');
    addBtn.onclick = () => addToCartDetail(product);
}

function renderRelatedProducts(currentProduct) {
    const grid = document.getElementById('related-grid');
    // Filter related items (same category or similar tags), exclude current
    const related = products.filter(p => p.id !== currentProduct.id).slice(0, 3); // Just take first 3 others for now

    related.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card-premium';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${p.image}" class="product-img-premium" alt="${p.name}">
            </div>
            <div class="product-info-premium">
                <a href="product-detail.html?id=${p.id}" style="text-decoration:none">
                    <h3 class="product-name-premium">${p.name}</h3>
                </a>
                <div class="price-row">
                    <div class="price-main">₹${p.price}</div>
                </div>
                 <a href="product-detail.html?id=${p.id}" class="add-btn" style="text-decoration:none; justify-content:center;">
                    View Details
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Logic variables
let currentQty = 1;

function updateQty(delta) {
    const input = document.getElementById('detail-qty');
    let newVal = parseInt(input.value) + delta;
    if (newVal >= 1 && newVal <= 10) {
        input.value = newVal;
        currentQty = newVal;
    }
}

// Reuse Cart Logic Adapter
function addToCartDetail(product) {
    // We need to interact with the existing cart-logic or localStorage standard
    // Since we don't have modules, we can read/write localStorage directly just like products-premium.js

    let cart = JSON.parse(localStorage.getItem('aerthys_cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        if (existing.quantity + currentQty > 10) {
            alert('Max quantity limit reached!');
            return;
        }
        existing.quantity += currentQty;
    } else {
        cart.push({ ...product, quantity: currentQty });
    }

    localStorage.setItem('aerthys_cart', JSON.stringify(cart));

    // Animate Button
    const btn = document.getElementById('add-to-cart-lg');
    const originalText = btn.innerHTML;
    btn.style.background = 'var(--success)';
    btn.innerHTML = 'Added to Cart!';

    // Update Cart Badge if we can find it
    updateGlobalCartBadge();

    setTimeout(() => {
        btn.style.background = 'var(--forest-green)';
        btn.innerHTML = originalText;
    }, 2000);
}

function updateGlobalCartBadge() {
    let cart = JSON.parse(localStorage.getItem('aerthys_cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(b => {
        b.textContent = count;
        b.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Init Badge on Load
updateGlobalCartBadge();
