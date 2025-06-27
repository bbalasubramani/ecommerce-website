// Product Data
const products = [
    {
        id: 1,
        title: "Smart Watch Series 5",
        price: 299.99,
        oldPrice: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "electronics",
        rating: 4.5,
        description: "Track fitness, get notifications, and more with this smart watch",
        inWishlist: false,
        inCart: 0
    },
    {
        id: 2,
        title: "Wireless Earbuds Pro",
        price: 199.99,
        oldPrice: 249.99,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "electronics",
        rating: 4,
        description: "Premium sound quality with noise cancellation",
        inWishlist: false,
        inCart: 0
    },
    {
        id: 3,
        title: "Bluetooth Speaker",
        price: 89.99,
        oldPrice: 129.99,
        image: "https://images.unsplash.com/photo-1547052178-7f2c5a20c332?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "electronics",
        rating: 4.2,
        description: "Portable speaker with 20hr battery life",
        inWishlist: false,
        inCart: 0
    },
    {
        id: 4,
        title: "Men's Casual Shirt",
        price: 39.99,
        oldPrice: 49.99,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "clothing",
        rating: 4.1,
        description: "Comfortable cotton shirt for casual wear",
        inWishlist: false,
        inCart: 0
    },
    {
        id: 5,
        title: "Women's Running Shoes",
        price: 79.99,
        oldPrice: 99.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "clothing",
        rating: 4.7,
        description: "Lightweight running shoes with extra cushion",
        inWishlist: false,
        inCart: 0
    },
    {
        id: 6,
        title: "Coffee Maker",
        price: 59.99,
        oldPrice: 89.99,
        image: "https://images.unsplash.com/photo-1593368700062-1bae1e875d78?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "home",
        rating: 4.3,
        description: "Programmable coffee maker with timer",
        inWishlist: false,
        inCart: 0
    },
    {
        id: 7,
        title: "Facial Moisturizer",
        price: 24.99,
        oldPrice: 34.99,
        image: "https://images.unsplash.com/photo-1739979820570-575f81dbd0bc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "beauty",
        rating: 4.8,
        description: "Hydrating moisturizer for all skin types",
        inWishlist: false,
        inCart: 0
    },
    {
        id: 8,
        title: "Yoga Mat",
        price: 29.99,
        oldPrice: 39.99,
        image: "https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "sports",
        rating: 4.4,
        description: "Non-slip yoga mat with carrying strap",
        inWishlist: false,
        inCart: 0
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const overlay = document.getElementById('overlay');
const darkModeToggle = document.getElementById('darkModeToggle');
const wishlistBtn = document.querySelector('.wishlist-btn');
const wishlistCount = document.querySelector('.wishlist-count');
const cartCount = document.querySelector('.cart-btn .cart-count');
const categoryBtns = document.querySelectorAll('.category-btn');
const sortSelect = document.getElementById('sortSelect');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const priceRange = document.getElementById('priceRange');
const categoryFilters = document.querySelectorAll('.category-filter');
const ratingFilters = document.querySelectorAll('.rating-filter');
const applyFilters = document.getElementById('applyFilters');
const resetFilters = document.getElementById('resetFilters');

// State
let currentCategory = 'all';
let filteredProducts = [...products];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartCount();
    updateWishlistCount();
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Event Listeners
darkModeToggle.addEventListener('click', toggleDarkMode);
cartBtn.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
overlay.addEventListener('click', toggleCart);

// Filter Event Listeners
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        filterProducts();
    });
});

sortSelect.addEventListener('change', filterProducts);
priceRange.addEventListener('input', updatePriceInputs);
minPriceInput.addEventListener('change', updatePriceRange);
maxPriceInput.addEventListener('change', updatePriceRange);
applyFilters.addEventListener('click', filterProducts);
resetFilters.addEventListener('click', resetAllFilters);

// Functions
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products match your filters.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product-card';
        productEl.dataset.id = product.id;
        
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= Math.floor(product.rating) 
                    ? '<i class="fas fa-star"></i>' 
                    : (i - 0.5 <= product.rating ? '<i class="fas fa-star-half-alt"></i>' : '<i class="far fa-star"></i>')
            );
        }
        
        productEl.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                ${product.oldPrice ? '<span class="product-badge">Sale</span>' : ''}
                <div class="product-actions">
                    <button class="product-action-btn wishlist-action" data-id="${product.id}">
                        <i class="${product.inWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="product-action-btn" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-rating">
                    ${stars.join('')}
                    <span>(${Math.floor(Math.random() * 100) + 20})</span>
                </div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">
                    <div>
                        <span class="price-current">₹${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="price-old">₹${product.oldPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productEl);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
            e.stopPropagation();
        });
    });
    
    document.querySelectorAll('.wishlist-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            toggleWishlist(id);
            e.stopPropagation();
        });
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.product-action-btn') && !e.target.closest('.add-to-cart')) {
                const id = parseInt(card.dataset.id);
                viewProductDetails(id);
            }
        });
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function toggleCart() {
    cartModal.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    if (cartModal.classList.contains('active')) {
        renderCartItems();
    }
}

function renderCartItems() {
    const cartProducts = products.filter(p => p.inCart > 0);
    
    if (cartProducts.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '₹0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cartProducts.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.id = product.id;
        
        total += product.price * product.inCart;
        
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${product.title}</h4>
                <p class="cart-item-price">₹${product.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                    <input type="number" class="quantity-input" value="${product.inCart}" min="1" data-id="${product.id}">
                    <button class="quantity-btn increase" data-id="${product.id}">+</button>
                    <button class="remove-item" data-id="${product.id}">Remove</button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `₹${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            changeQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            changeQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(input.dataset.id);
            const newQuantity = parseInt(input.value);
            if (newQuantity > 0) {
                setQuantity(id, newQuantity);
            } else {
                input.value = 1;
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        });
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.inCart += 1;
        updateCartCount();
        showToast(`${product.title} added to cart`);
    }
}

function removeFromCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.inCart = 0;
        updateCartCount();
        renderCartItems();
        showToast(`${product.title} removed from cart`);
    }
}

function changeQuantity(id, change) {
    const product = products.find(p => p.id === id);
    if (product) {
        const newQuantity = product.inCart + change;
        if (newQuantity > 0) {
            product.inCart = newQuantity;
            updateCartCount();
            renderCartItems();
        }
    }
}

function setQuantity(id, quantity) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.inCart = quantity;
        updateCartCount();
        renderCartItems();
    }
}

function updateCartCount() {
    const count = products.reduce((total, product) => total + product.inCart, 0);
    cartCount.textContent = count;
}

function toggleWishlist(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.inWishlist = !product.inWishlist;
        updateWishlistCount();
        
        const btn = document.querySelector(`.wishlist-action[data-id="${id}"] i`);
        if (btn) {
            btn.className = product.inWishlist ? 'fas fa-heart' : 'far fa-heart';
        }
        
        showToast(product.inWishlist 
            ? `${product.title} added to wishlist` 
            : `${product.title} removed from wishlist`);
    }
}

function updateWishlistCount() {
    const count = products.filter(p => p.inWishlist).length;
    wishlistCount.textContent = count;
}

function viewProductDetails(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        alert(`Viewing details for ${product.title}\nPrice: ₹${product.price.toFixed(2)}`);
        // In a real app, you would show a modal or navigate to a product page
    }
}

function filterProducts() {
    // Filter by category
    let results = [...products];
    
    if (currentCategory !== 'all') {
        results = results.filter(p => p.category === currentCategory);
    }
    
    // Filter by price range
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || 9999;
    
    results = results.filter(p => p.price >= minPrice && p.price <= maxPrice);
    
    // Filter by categories from checkboxes
    const checkedCategories = Array.from(categoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    if (checkedCategories.length > 0) {
        results = results.filter(p => checkedCategories.includes(p.category));
    }
    
    // Filter by ratings from checkboxes
    const checkedRatings = Array.from(ratingFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.value));
    
    if (checkedRatings.length > 0) {
        results = results.filter(p => checkedRatings.some(r => Math.floor(p.rating) === r));
    }
    
    // Sort results
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
        case 'price-low':
            results.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            results.sort((a, b) => b.id - a.id); // Using ID as proxy for "newest"
            break;
        case 'rating':
            results.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Recommended/default order
            break;
    }
    
    filteredProducts = results;
    renderProducts(results);
}

function resetAllFilters() {
    currentCategory = 'all';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    priceRange.value = 1000;
    
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === 'all') {
            btn.classList.add('active');
        }
    });
    
    categoryFilters.forEach(cb => cb.checked = false);
    ratingFilters.forEach(cb => cb.checked = false);
    sortSelect.value = 'recommended';
    
    filterProducts();
    showToast('Filters reset');
}

function updatePriceInputs() {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || 1000;
    priceRange.value = maxPrice;

    // Update the price range slider
    priceRange.min = minPrice;
    priceRange.max = 1000; // Assuming 1000 is the max price
}

function updatePriceRange() {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || 1000;
    
    if (minPrice > maxPrice) {
        maxPriceInput.value = minPrice; // Ensure max is not less than min
    }
    
    priceRange.value = maxPrice;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize the product display
renderProducts(products);
