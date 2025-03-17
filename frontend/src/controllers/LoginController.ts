export function setupLoginController(): void {
    const form = document.getElementById("login-form") as HTMLFormElement | null;

    if (!form) 
        return;

    // The HTMLFormElement interface has a "submit" event/method, which the controller listens for
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // prevents default browser behaviour (no page refresh)

        const emailInput = document.getElementById("email") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;

        // get the email and password values from the HTMLInputElements
        const email = emailInput?.value.trim();
        const password = passwordInput?.value;

        if (!email || !password) {
            alert("Please fill in all fields.");
        return;
        }

        try {
            const response = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            // if backend responded with error status code (404 / 401)
            throw new Error(data.error || "login failed");
        }
        // Here we could store the token in local storage for cookies
        alert("login successful");
        window.location.hash = "#/"

        } catch (error) {
            alert((error as Error).message);
        }
    });
}