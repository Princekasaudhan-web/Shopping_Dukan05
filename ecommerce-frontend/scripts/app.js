
// Mobile Navigation


const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

if (hamburger && navbar) {
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

// ==========================
// Product Grid
// ==========================

const productGrid = document.getElementById("product-grid");

if (productGrid) {
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load products.");
      }
      return response.json();
    })
    .then((products) => {
      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const inrPrice = Math.round(product.price * 86);

        card.innerHTML = `
          <a href="product.html?id=${product.id}" class="product-link">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="product-info">
              <h3>${product.title}</h3>
              <p class="price">₹${inrPrice}</p>
            </div>
          </a>

          <button class="add-cart"
                  data-id="${product.id}"
                  data-title="${product.title}"
                  data-price="${inrPrice}"
                  data-image="${product.image}">
            Add to Cart
          </button>
        `;

        productGrid.appendChild(card);
      });

      updateCartCount();
    })
    .catch((error) => {
      console.error(error);
      productGrid.innerHTML = "<p>Unable to load products.</p>";
    });
}

// ==========================
// Add to Cart
// ==========================

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-cart")) {
    const product = {
      id: e.target.dataset.id,
      title: e.target.dataset.title,
      price: e.target.dataset.price,
      image: e.target.dataset.image,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Product added to cart!");
  }
});

// ==========================
// Cart Count
// ==========================

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.querySelector(".cart-count");

  if (badge) {
    badge.textContent = cart.length;
  }
}

updateCartCount();

// ==========================
// Logout
// ==========================

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
}
