const products = [
    { id: 1, name: 'Organic Bananas', category: 'fruits', price: 1.29, image: 'images/bananas.jpg', expressDelivery: true },
    { id: 2, name: 'Free-Range Eggs', category: 'dairy', price: 3.99, image: 'images/eggs.jpg', expressDelivery: false },
    { id: 3, name: 'Avocado', category: 'fruits', price: 2.49, image: 'images/avocado.jpg', expressDelivery: true },
    { id: 4, name: 'Organic Spinach', category: 'vegetables', price: 4.99, image: 'images/spinach.jpg', expressDelivery: true },
    { id: 5, name: 'Almond Milk', category: 'dairy', price: 3.49, image: 'images/almond-milk.jpg', expressDelivery: false },
    { id: 6, name: 'Whole Wheat Bread', category: 'bakery', price: 2.99, image: 'images/bread.jpg', expressDelivery: true },
];

const productGrid = document.querySelector('.product-grid');

function displayProducts(productsToDisplay) {
    productGrid.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.id = product.id;
        productCard.innerHTML = `
            ${product.expressDelivery ? '<span class="express-delivery">Express</span>' : ''}
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

let cart = [];

const cartContainer = document.querySelector('.cart-container');
const cartCount = document.querySelector('.cart-count');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');
const cartItemsContainer = document.querySelector('.cart-items');
const closeCartBtn = document.querySelector('.close-cart-btn');

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function displayCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${product.name} - $${product.price.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    cartModalOverlay.style.display = 'flex';
}

productGrid.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const productCard = e.target.closest('.product-card');
        const productId = parseInt(productCard.dataset.id);
        addToCart(productId);
    }
});

cartContainer.addEventListener('click', () => {
    displayCart();
});

closeCartBtn.addEventListener('click', () => {
    cartModalOverlay.style.display = 'none';
});

const searchInput = document.querySelector('.filter-container input');
const categorySelect = document.querySelector('.filter-container select');

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const filteredProducts = products.filter(product => {
        const nameMatches = product.name.toLowerCase().includes(searchTerm);
        const categoryMatches = selectedCategory === 'all' || product.category === selectedCategory;
        return nameMatches && categoryMatches;
    });

    displayProducts(filteredProducts);
}

searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);

displayProducts(products);
