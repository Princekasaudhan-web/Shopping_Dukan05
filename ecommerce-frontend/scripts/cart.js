// ===============================
// Load Cart Items
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.querySelector(".cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

// ===============================
// Display Cart
// ===============================

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <h2>Your Cart is Empty</h2>
        `;

        cartTotal.textContent = "0";

        cartCount.textContent = "0";

        checkoutBtn.disabled = true;

        return;
    }

    checkoutBtn.disabled = false;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        totalItems += item.quantity;

        const card = document.createElement("div");

        card.className = "cart-card";

        card.innerHTML = `

        <img src="${item.image}" alt="${item.title}">

        <div class="cart-details">

            <h3>${item.title}</h3>

            <p><strong>Price:</strong> ₹${item.price}</p>

            <p><strong>Color:</strong> ${item.color}</p>

            <p><strong>Size:</strong> ${item.size}</p>

            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>

            </div>

        </div>

        <button class="remove-btn"
        onclick="removeItem(${index})">

        Remove

        </button>

        `;

        cartItems.appendChild(card);

    });

    cartTotal.textContent = total;

    cartCount.textContent = totalItems;

}

// ===============================
// Increase Quantity
// ===============================

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();

}

// ===============================
// Decrease Quantity
// ===============================

function decreaseQuantity(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }

    saveCart();

}

// ===============================
// Remove Item
// ===============================

function removeItem(index){

    cart.splice(index,1);

    saveCart();

}

// ===============================
// Save Cart
// ===============================

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

// ===============================
// Checkout Button
// ===============================

checkoutBtn.addEventListener("click",()=>{

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    alert("Proceeding to Checkout...");

    window.location.href="checkout.html";

});

// ===============================
// Load Cart
// ===============================

displayCart();