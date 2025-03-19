export function RegisterComponent(root: HTMLElement) {
    root.innerHTML = `
        <h2>Register</h2>
        <form id="register-form">
            <input id="username" placeholder="Username" required />
            <input id="password" type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>`;
  
    const form = document.getElementById("register-form") as HTMLFormElement;
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const username = (document.getElementById("username") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value;
  
        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }
  
        try {
            const response = await fetch("http://127.0.0.1:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
  
            const data = await response.json();
  
            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }
  
            alert("Registration successful! You can now login.");
            window.location.hash = "#/login";
        } catch (error) {
            alert((error as Error).message);
        }
    });
}
  