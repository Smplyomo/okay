document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();
            let role = document.getElementById("role").value;

            if (!name || !email || !password || !role) {
                alert("All fields are required!");
                return;
            }

            let existingUser = localStorage.getItem(email);
            if (existingUser) {
                alert("User with this email already exists! Please log in.");
                return;
            }

            let user = { name, email, password, role };
            localStorage.setItem(email, JSON.stringify(user)); // Store user data

            alert("Registration successful! Redirecting...");

            // Redirect visitors to the visitor registration page
            if (role === "visitor") {
                window.location.href = "visitor registration.html";
            } else {
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "dashboard.html";
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();

            let storedUser = JSON.parse(localStorage.getItem(email));

            if (storedUser && storedUser.password === password) {
                sessionStorage.setItem("loggedInUser", JSON.stringify(storedUser));
                if (storedUser.role === "admin" || storedUser.role === "employee") {
                    alert(`Welcome ${storedUser.role}, ${storedUser.name}! Redirecting to dashboard...`);
                    window.location.href = "dashboard.html";
                } else {
                    alert("❌ Visitors cannot log in. Please contact the admin.");
                }
            } else {
                alert("Invalid email or password!");
            }
        });
    }

    // Display user profile at the top right
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        const userProfile = document.createElement("div");
        userProfile.style.position = "absolute";
        userProfile.style.top = "10px";
        userProfile.style.right = "10px";
        userProfile.style.backgroundColor = "#f4f4f4";
        userProfile.style.padding = "10px";
        userProfile.style.borderRadius = "5px";
        userProfile.innerHTML = `Logged in as: ${loggedInUser.name} (${loggedInUser.role})`;
        document.body.appendChild(userProfile);

        // Restrict visitors from accessing admin and employee pages
        if (loggedInUser.role === "visitor" && window.location.pathname.includes("dashboard.html")) {
            alert("❌ Visitors are not allowed to access this page.");
            window.location.href = "visitor registration.html";
        }
    }
});
