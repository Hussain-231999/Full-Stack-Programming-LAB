// Store products in an array
const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Headphones", price: 149 },
    { id: 3, name: "Keyboard", price: 79 },
    { id: 4, name: "Mouse", price: 49 }
];

// Initialize cart as empty array
let cart = [];

// Rest operator function to add multiple items to cart
function addToCart(...items) {
    // Use Spread operator to clone the cart and add new items
    cart = [...cart, ...items];
    return cart;
}

// Function to display products
function displayProducts() {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = products.map(product => `
        <div class="product-item">
            <h4>${product.name}</h4>
            <p>$${product.price}</p>
        </div>
    `).join('');
}

// Function to display cart items
function displayCart() {
    const cartDisplay = document.getElementById('cart-display');
    
    if (cart.length === 0) {
        cartDisplay.innerHTML = '<div class="empty-cart">Cart is empty</div>';
        return;
    }
    
    cartDisplay.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <span>${index + 1}. ${item.name}</span>
            </div>
            <span>$${item.price}</span>
        </div>
    `).join('');
}

// Function to demonstrate Array Destructuring
function demonstrateDestructuring() {
    if (cart.length === 0) {
        document.getElementById('destructuring-result').innerHTML = '<p>Add items to cart first</p>';
        return;
    }
    
    // Use Array Destructuring to extract first product and remaining products
    const [firstProduct, ...remainingProducts] = cart;
    
    const resultDiv = document.getElementById('destructuring-result');
    resultDiv.innerHTML = `
        <div class="demo-item">
            <h4>Original Cart Array:</h4>
            <p>${JSON.stringify(cart.map(item => item.name))}</p>
        </div>
        <div class="demo-item">
            <h4>Array Destructuring:</h4>
            <p><code>const [firstProduct, ...remainingProducts] = cart;</code></p>
        </div>
        <div class="demo-item">
            <h4>First Product (extracted):</h4>
            <p>Name: <strong>${firstProduct.name}</strong> | Price: <strong>$${firstProduct.price}</strong></p>
        </div>
        <div class="demo-item">
            <h4>Remaining Products (using Rest operator):</h4>
            <p>Count: <strong>${remainingProducts.length}</strong></p>
            <p>Items: ${remainingProducts.map(item => item.name).join(', ')}</p>
        </div>
    `;
}

// Function to demonstrate Spread operator for cloning
function demonstrateSpread() {
    if (cart.length === 0) {
        document.getElementById('cart-clone-info').innerHTML = '<p>Add items to cart first</p>';
        return;
    }
    
    // Use Spread operator to clone the cart
    const cartClone = [...cart];
    
    const cloneInfo = document.getElementById('cart-clone-info');
    cloneInfo.innerHTML = `
        <h4>🔄 Spread Operator Demo - Cloning Cart</h4>
        <p><code>const cartClone = [...cart];</code></p>
        <p>Original cart length: <strong>${cart.length}</strong></p>
        <p>Cloned cart length: <strong>${cartClone.length}</strong></p>
        <p>Are they equal objects? <strong>${cart === cartClone ? 'No (different references)' : 'No'}</strong></p>
        <p>Clone is independent copy: <strong>Yes</strong></p>
    `;
}

// Function to update all displays
function updateDisplays() {
    // Display total items
    document.getElementById('total-items').textContent = cart.length;
    
    // Display first item
    if (cart.length > 0) {
        document.getElementById('first-item').textContent = cart[0].name;
    } else {
        document.getElementById('first-item').textContent = 'No items';
    }
    
    // Update cart display
    displayCart();
    
    // Demonstrate destructuring
    demonstrateDestructuring();
    
    // Demonstrate spread
    demonstrateSpread();
}

// Event listener for add button
document.getElementById('add-products-btn').addEventListener('click', () => {
    // Use Rest operator to add multiple items
    addToCart(...products);
    updateDisplays();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCart();
    demonstrateDestructuring();
    demonstrateSpread();
});