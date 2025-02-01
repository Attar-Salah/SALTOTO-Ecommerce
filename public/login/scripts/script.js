let email = document.getElementById('logemail');
let password = document.getElementById('logpass');
let button = document.querySelector(".btn");

function loginFunction(emailInput, passwordInput) {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        if (!emailValue || !passwordValue) {
            console.log("Email or Password must be filled");
            alert("Email or Password must be filled");
            return;
        }

        // const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
        // if (!emailPattern.test(emailValue)) {
        //     console.log("Invalid Email Format");
        //     alert("Please enter a valid email address");
        //     return;
        // }
     
        // const path = 'https://10b0-119-40-120-242.ngrok-free.app';
        fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailValue, password: passwordValue }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Login successful') {
                    console.log("Login successful:", data);
                    alert("Login successful! Redirecting...");
                    window.location.href = '/protected/dashboard.html'; 
                } else {
                    console.log("Login failed:", data.message);
                    alert("Invalid credentials. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error while connecting to the server:", error);
                alert("An error occurred. Please try again later.");
            });
    });
}

// Initialize login function
loginFunction(email, password);
