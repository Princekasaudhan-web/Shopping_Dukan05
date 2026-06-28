// ===============================
// Get Product ID from URL
// ===============================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productContainer = document.getElementById("product-details");

// Stop if this page is not product.html
if (!productContainer || !productId) {
    console.log("Product page not detected.");
} else {

    // ===============================
    // Fetch Product
    // ===============================

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load product.");
            }
            return response.json();
        })
        .then(product => {

            const price = Math.round(product.price * 86);
            let quantity = 1;

            productContainer.innerHTML = `
            <div class="product-page">

                <div class="image-section">
                    <img id="product-image"
                         src="${product.image}"
                         alt="${product.title}">
                </div>

                <div class="details-section">

                    <h1>${product.title}</h1>

                    <p>${product.description}</p>

                    <h2>Price: ₹${price}</h2>

                    <label>Color</label>

                    <select id="color">
                        <option>Black</option>
                        <option>Blue</option>
                        <option>White</option>
                    </select>

                    <br><br>

                    <label>Size</label>

                    <select id="size">
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>

                    <br><br>

                    <label>Quantity</label>

                    <div class="quantity-box">

                        <button id="minus">-</button>

                        <span id="qty">1</span>

                        <button id="plus">+</button>

                    </div>

                    <br>

                    <h2>Total : ₹<span id="total">${price}</span></h2>

                    <button id="cart-btn">
                        Add to Cart
                    </button>

                    <p id="message"></p>

                </div>

            </div>
            `;

            // ===============================
            // Image Zoom
            // ===============================

            const image = document.getElementById("product-image");

            image.addEventListener("mouseenter", () => {
                image.style.transform = "scale(1.3)";
                image.style.transition = ".3s";
            });

            image.addEventListener("mouseleave", () => {
                image.style.transform = "scale(1)";
            });

            // ===============================
            // Quantity
            // ===============================

            const qty = document.getElementById("qty");
            const total = document.getElementById("total");

            document.getElementById("plus").onclick = () => {

                if (quantity < 10) {

                    quantity++;

                    qty.textContent = quantity;

                    total.textContent = price * quantity;

                }

            };

            document.getElementById("minus").onclick = () => {

                if (quantity > 1) {

                    quantity--;

                    qty.textContent = quantity;

                    total.textContent = price * quantity;

                }

            };

            // ===============================
            // Add To Cart
            // ===============================

            document.getElementById("cart-btn").onclick = () => {

                const item = {

                    id: product.id,

                    title: product.title,

                    image: product.image,

                    price: price,

                    quantity: quantity,

                    color: document.getElementById("color").value,

                    size: document.getElementById("size").value

                };

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existing = cart.find(p =>
                    p.id === item.id &&
                    p.color === item.color &&
                    p.size === item.size
                );

                if (existing) {

                    existing.quantity += quantity;

                } else {

                    cart.push(item);

                }

                localStorage.setItem("cart", JSON.stringify(cart));

                updateCartCount();

                const message = document.getElementById("message");

                message.textContent = "✅ Product added to cart!";

                message.style.color = "green";

            };

        })
        .catch(error => {

            console.error(error);

            productContainer.innerHTML =
                "<h2>Unable to load product.</h2>";

        });

}

// ===============================
// Update Cart Count
// ===============================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(item => {

        count += item.quantity;

    });

    const badge = document.querySelector(".cart-count");

    if (badge) {

        badge.textContent = count;

    }

}

updateCartCount();