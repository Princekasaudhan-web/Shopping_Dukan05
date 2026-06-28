// ==========================
// Login
// ==========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const validUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (!validUser) {
            message.style.color = "red";
            message.textContent = "Invalid email or password.";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        message.style.color = "green";
        message.textContent = "Login Successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });
}