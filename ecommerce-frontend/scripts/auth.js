// ==========================
// Show / Hide Password
// ==========================

import{auth}from"../firebase.js";

function togglePassword(inputId, icon) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// ==========================
// Password Strength
// ==========================

const signupPassword = document.getElementById("signupPassword");

if (signupPassword) {

    signupPassword.addEventListener("input", function () {

        const password = this.value;

        const strength = document.getElementById("strengthMessage");

        const strongRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (password.length === 0) {

            strength.textContent = "";

        }
        else if (!strongRegex.test(password)) {

            strength.style.color = "red";
            strength.textContent =
                "Weak Password (8+ chars, uppercase, lowercase & number required)";

        }
        else {

            strength.style.color = "green";
            strength.textContent = "Strong Password";

        }

    });

}

// ==========================
// Signup
// ==========================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("signupMessage");

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!emailRegex.test(email)) {

            message.style.color = "red";
            message.textContent = "Invalid email address.";
            return;

        }

        if (!passwordRegex.test(password)) {

            message.style.color = "red";
            message.textContent =
                "Password must contain uppercase, lowercase, number and at least 8 characters.";

            return;

        }

        if (password !== confirmPassword) {

            message.style.color = "red";
            message.textContent = "Passwords do not match.";
            return;

        }

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const userExists =
            users.find(user => user.email === email);

        if (userExists) {

            message.style.color = "red";
            message.textContent = "Email already registered.";

            return;

        }

        users.push({

            fullName,
            email,
            password

        });

        localStorage.setItem("users", JSON.stringify(users));

        message.style.color = "green";
        message.textContent =
            "Signup Successful! Redirecting...";

        setTimeout(() => {

            window.location.href = "login.html";

        }, 2000);

    });

}

// ==========================
// Login
// ==========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const validUser =
            users.find(user =>
                user.email === email &&
                user.password === password
            );

        if (!validUser) {

            message.style.color = "red";
            message.textContent =
                "Invalid email or password.";

            return;

        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(validUser)
        );

        message.style.color = "green";
        message.textContent =
            "Login Successful! Redirecting...";

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1500);

    });

}

import {

signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const login=document.getElementById("login-form");

login.addEventListener("submit",(e)=>{

e.preventDefault();

const email=document.getElementById("login-email").value;

const password=document.getElementById("login-password").value;

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("Login Successful");

window.location="index.html";

})

.catch(error=>{

alert(error.message);

});

});

import {auth} from "../firebase.js";

import {

createUserWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const signup=document.getElementById("signup-form");

signup.addEventListener("submit",(e)=>{

e.preventDefault();

const email=document.getElementById("signup-email").value;

const password=document.getElementById("signup-password").value;

createUserWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("Signup Successful");

window.location="login.html";

})

.catch(error=>{

alert(error.message);

});

});