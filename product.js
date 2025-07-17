const products = JSON.parse(localStorage.getItem('products'));
const productDetailContainer = document.querySelector('.product-detail-container');

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

function displayProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);

    if (product) {
        productDetailContainer.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    } else {
        productDetailContainer.innerHTML = '<p>Product not found.</p>';
    }
}

displayProductDetails();

const addToCartBtn = document.querySelector('.product-detail-info button');
addToCartBtn.addEventListener('click', () => {
    const productId = parseInt(addToCartBtn.dataset.id);
    // This is where you would typically add the product to the cart.
    // For now, we'll just log it to the console.
    console.log(`Product ${productId} added to cart.`);
});
