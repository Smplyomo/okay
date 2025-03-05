document.addEventListener("DOMContentLoaded", function () {
    const visitorName = document.getElementById("visitor-name");
    const visitorEmail = document.getElementById("visitor-email");
    const purpose = document.getElementById("purpose");
    const host = document.getElementById("host");
    const checkInTime = document.getElementById("check-in-time");
    const checkOutTime = document.getElementById("check-out-time");
    const badgeName = document.getElementById("badge-name");
    const badgeEmail = document.getElementById("badge-email");
    const badgePurpose = document.getElementById("badge-purpose");
    const receiptContainer = document.getElementById("receipt-container");
    const checkOutBtn = document.getElementById("check-out-btn");
    const selectedAsset = document.getElementById("selected-asset");

    let loggedInEmail = sessionStorage.getItem("loggedInUser");
    let storedVisitor = JSON.parse(localStorage.getItem(loggedInEmail));

    if (storedVisitor) {
        visitorName.textContent = storedVisitor.name;
        visitorEmail.textContent = storedVisitor.email;
        purpose.textContent = storedVisitor.purpose;
        host.textContent = storedVisitor.host;
        checkInTime.textContent = storedVisitor.checkInTime;
        checkOutTime.textContent = storedVisitor.checkOutTime ? storedVisitor.checkOutTime : "Still Checked In";
        selectedAsset.textContent = storedVisitor.asset || "None";

        // Display badge
        badgeName.textContent = `Name: ${storedVisitor.name}`;
        badgeEmail.textContent = `Email: ${storedVisitor.email}`;
        badgePurpose.textContent = `Purpose: ${storedVisitor.purpose}`;
    } else {
        alert("No visitor data found. Please register.");
        window.location.href = "visitor_registration.html";
    }

    // Generate Receipt
    document.getElementById("generate-receipt").addEventListener("click", function () {
        if (storedVisitor) {
            receiptContainer.innerHTML = `
                <h3>Visitor Receipt</h3>
                <p><strong>Name:</strong> ${storedVisitor.name}</p>
                <p><strong>Email:</strong> ${storedVisitor.email}</p>
                <p><strong>Purpose:</strong> ${storedVisitor.purpose}</p>
                <p><strong>Host:</strong> ${storedVisitor.host}</p>
                <p><strong>Check-in Time:</strong> ${storedVisitor.checkInTime}</p>
                <p><strong>Check-out Time:</strong> ${storedVisitor.checkOutTime ? storedVisitor.checkOutTime : "Still Checked In"}</p>
                <p><strong>Selected Asset:</strong> ${storedVisitor.asset || "None"}</p>
            `;
        }
    });

    // Handle Visitor Check-Out
    checkOutBtn.addEventListener("click", function () {
        if (storedVisitor && !storedVisitor.checkOutTime) {
            storedVisitor.checkOutTime = new Date().toLocaleString();
            localStorage.setItem(loggedInEmail, JSON.stringify(storedVisitor));

            alert("You have checked out successfully!");
            window.location.reload();
        } else {
            alert("You have already checked out.");
        }
    });

    // Logout
    document.getElementById("logout").addEventListener("click", function () {
        sessionStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });

    // Handle Visitor Registration
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let purpose = document.getElementById("purpose").value.trim();
            let host = document.getElementById("host").value.trim();

            let visitorData = { name, email, purpose, host };

            try {
                let response = await fetch("http://127.0.0.1:8000/api/visitors/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(visitorData)
                });

                if (response.ok) {
                    alert("Visitor registered successfully!");
                    window.location.href = "visitor dashboard.html";
                } else {
                    alert("Error registering visitor.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Network error.");
            }
        });
    }
});