// ==========================
// Signup
// ==========================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("signupMessage");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!emailRegex.test(email)) {
            message.style.color = "red";
            message.textContent = "Invalid email address.";
            return;
        }

        if (!passwordRegex.test(password)) {
            message.style.color = "red";
            message.textContent = "Password must contain uppercase, lowercase, number and at least 8 characters.";
            return;
        }

        if (password !== confirmPassword) {
            message.style.color = "red";
            message.textContent = "Passwords do not match.";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find((user) => user.email === email);

        if (userExists) {
            message.style.color = "red";
            message.textContent = "Email already registered.";
            return;
        }

        users.push({ fullName, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        message.style.color = "green";
        message.textContent = "Signup Successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    });
}