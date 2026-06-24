 /* AMAZON CLONE CORE APPLICATION ENGINE
 * Pure Vanilla JavaScript with LocalStorage Persistence Optimization
 */

// 1. DATA REPOSITORY: Comprehensive array containing 12 high-end lifestyle products
const productsData = [
    {
        id: 1,
        title: "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
        price: 139900,
        rating: 4.7,
        reviewsCount: 3420,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
        price: 29990,
        rating: 4.5,
        reviewsCount: 8940,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "MacBook Air Laptop with M3 Chip: 13.6-inch Liquid Retina Display",
        price: 114900,
        rating: 4.8,
        reviewsCount: 1205,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Samsung Galaxy Watch 6 Bluetooth 44mm Smartwatch Premium Luxury Edition",
        price: 19999,
        rating: 4.2,
        reviewsCount: 563,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "Fujifilm Instax Mini 12 Instant Camera - Pastel Blue",
        price: 5999,
        rating: 4.4,
        reviewsCount: 2311,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        title: "Logitech MX Master 3S Wireless Performance Ergonomic Mouse",
        price: 9495,
        rating: 4.6,
        reviewsCount: 4510,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        title: "Kindle Paperwhite (16 GB) - Now with a 6.8-inch display and adjustable warm light",
        price: 14999,
        rating: 4.7,
        reviewsCount: 891,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        title: "Marshall Action III Wireless Bluetooth Home Speaker - Black",
        price: 24999,
        rating: 4.5,
        reviewsCount: 1102,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        title: "GoPro HERO12 Waterproof Action Camera with Front & Rear LCD Screens",
        price: 37990,
        rating: 4.3,
        reviewsCount: 650,
        image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        title: "Cosmic Byte CB-GK-26 Pandora TKL Mechanical Keyboard",
        price: 1599,
        rating: 4.1,
        reviewsCount: 15420,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        title: "Sony PlayStation 5 Console (Slim Model Group - Slim Digital Edition)",
        price: 44990,
        rating: 4.8,
        reviewsCount: 3105,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        title: "ASUS ROG Swift 32-inch 4K UHD Gaming Monitor (144Hz, 1ms IPS Panel)",
        price: 72490,
        rating: 4.6,
        reviewsCount: 233,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80"
    }
];

// 2. STATE APPLICATION CONTAINER
let cart = JSON.parse(localStorage.getItem('amazon_cart')) || [];

// 3. DOM ELEMENT SELECTORS
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const noProductsMessage = document.getElementById('no-products');
const sectionTitle = document.getElementById('section-title');

const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const cartCount = document.getElementById('cart-count');
const sidebarItemsContainer = document.getElementById('sidebar-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const clearCartBtn = document.getElementById('clear-cart-btn');

// ==========================================================================
// APPLICATION INITIALIZER & INTERACTIVE DOM RENDERERS
// ==========================================================================

/**
 * Renders the products array into the HTML Grid layout dynamically
 * @param {Array} productsList - Array containing structural product blueprints
 */
function renderProducts(productsList) {
    productsGrid.innerHTML = '';
    
    if (productsList.length === 0) {
        noProductsMessage.classList.remove('hidden');
        productsGrid.classList.add('hidden');
        return;
    }
    
    noProductsMessage.classList.add('hidden');
    productsGrid.classList.remove('hidden');

    productsList.forEach(product => {
        // Compute Star Ratings into scalable template blocks
        let starsHTML = '';
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<i class="fa-solid fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                starsHTML += '<i class="fa-regular fa-star"></i>';
            }
        }

        // Format system values for real Indian Rupee representations
        const formattedPrice = new Intl.NumberFormat('en-IN').format(product.price);

        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div>
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                </div>
                <h3 class="product-title" title="${product.title}">${product.title}</h3>
                <div class="product-rating">
                    ${starsHTML}
                    <span>(${new Intl.NumberFormat('en-IN').format(product.reviewsCount)})</span>
                </div>
            </div>
            <div>
                <div class="product-price-row">
                    <span class="currency-symbol">₹</span>
                    <span class="price-integer">${formattedPrice}</span>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// ==========================================================================
// CART FUNCTIONAL CONTROLLERS & ENGINE SUBSYSTEM
// ==========================================================================

/**
 * Synchronizes runtime calculations and persists changes cleanly into LocalStorage
 */
function updateCartUI() {
    // 1. Calculate instant product metrics
    const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItemsCount;

    // 2. Re-render dynamic components inside Sidebar template structure
    sidebarItemsContainer.innerHTML = '';
    let runningTotalPrice = 0;

    if (cart.length === 0) {
        sidebarItemsContainer.innerHTML = `
            <div style="text-align:center; margin-top:40px; color:#565959;">
                <i class="fa-solid fa-cart-arrow-down" style="font-size:40px; margin-bottom:10px;"></i>
                <p>Your Amazon Cart is empty.</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            runningTotalPrice += itemSubtotal;
            const formattedItemPrice = new Intl.NumberFormat('en-IN').format(item.price);

            const cartElement = document.createElement('div');
            cartElement.classList.add('cart-item');
            cartElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">₹${formattedItemPrice}</p>
                    <div class="cart-item-control-row">
                        <div class="quantity-control">
                            <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">Delete</button>
                    </div>
                </div>
            `;
            sidebarItemsContainer.appendChild(cartElement);
        });
    }

    // Update monetary totals formatting inside calculation viewports
    cartSubtotal.textContent = `₹${new Intl.NumberFormat('en-IN').format(runningTotalPrice)}`;
    
    // Save state back safely to client browser storage 
    localStorage.setItem('amazon_cart', JSON.stringify(cart));
}

/**
 * Maps incoming action triggers to push elements cleanly into cart storage arrays
 * @param {number} productId - Raw unique key index matching individual object mapping
 */
function addToCart(productId) {
    const coreProductData = productsData.find(p => p.id === productId);
    const existingCartItem = cart.find(item => item.id === productId);

    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({
            id: coreProductData.id,
            title: coreProductData.title,
            price: coreProductData.price,
            image: coreProductData.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    openCartSidebar(); // Instant conversion UX reinforcement loop
}

/**
 * Handles operations updating quantity properties inside computational cart arrays
 */
function updateQuantity(productId, operation) {
    const targetItem = cart.find(item => item.id === productId);
    if (!targetItem) return;

    if (operation === 'increment') {
        targetItem.quantity += 1;
    } else if (operation === 'decrement') {
        targetItem.quantity -= 1;
        if (targetItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    updateCartUI();
}

/**
 * Erases specific matched elements clean from application data arrays
 */
function removeCartItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// ==========================================================================
// REAL-TIME SEARCH FILTER SYSTEM
// ==========================================================================

/**
 * Compares current input value thresholds directly to dataset titles
 */
function handleSearch() {
    const rawQuery = searchInput.value.trim().toLowerCase();
    
    if (rawQuery === "") {
        sectionTitle.textContent = "Trending Products";
        renderProducts(productsData);
        return;
    }

    const filteredDataset = productsData.filter(product => 
        product.title.toLowerCase().includes(rawQuery)
    );

    sectionTitle.textContent = `Results for "${searchInput.value}"`;
    renderProducts(filteredDataset);
}

// ==========================================================================
// VIEW PORT OVERLAY CONTROL TOGGLES
// ==========================================================================
function openCartSidebar() {
    cartSidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock base document axis scroll loops
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Release interaction layer constraints
}

// ==========================================================================
// APPLICATION DELEGATED SYSTEM EVENT LISTENERS
// ==========================================================================

// Global Event Bubbling Mapper targeting Dynamic Grid element triggers
productsGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const targetId = parseInt(e.target.getAttribute('data-id'));
        addToCart(targetId);
    }
});

// Sidebar Controls Component Mapper
sidebarItemsContainer.addEventListener('click', (e) => {
    const targetId = parseInt(e.target.getAttribute('data-id'));
    if (!targetId) return;

    if (e.target.classList.contains('plus-btn')) {
        updateQuantity(targetId, 'increment');
    } else if (e.target.classList.contains('minus-btn')) {
        updateQuantity(targetId, 'decrement');
    } else if (e.target.classList.contains('remove-item-btn')) {
        removeCartItem(targetId);
    }
});

// Real-time Keystroke Tracking Input Filter
searchInput.addEventListener('input', handleSearch);
searchBtn.addEventListener('click', handleSearch);

// Navigation Drawer Interactivity Toggles
cartToggle.addEventListener('click', openCartSidebar);
closeSidebar.addEventListener('click', closeCartSidebar);
sidebarOverlay.addEventListener('click', closeCartSidebar);

// Purge Complete Array Subsystem
clearCartBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        cart = [];
        updateCartUI();
    }
});

// Initialization Thread
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(productsData);
    updateCartUI();
});
