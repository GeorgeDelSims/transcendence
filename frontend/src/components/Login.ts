import { setState } from "../state/AppState.js";

export function LoginComponent(root: HTMLElement) {
    root.innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
        <input id="username" placeholder="Username" required />
        <input id="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
    </form>`;

    // const form1 = document.createElement("form");
    //  const text = document.createElement("textarea");
    //  form1.appendChild(text);

    // access form element in DOM and add listener for the "submit" event
    const form = document.getElementById("login-form") as HTMLFormElement;
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // prevents browser from reloading page 

    const username = (document.getElementById("username") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    // Fetch request to the backend API: 
    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        // avoid hanging promises for the moment with await response
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        // if login is successful, go to index.html
        alert("Login successful");
        // setState merges user (partial object) to the global state, 
        // and notifies any subscribed components (listeners) to re-render or react to the login 
        setState({ user: { username } });
        window.location.hash = "#/"; 
    } catch (error) {
        alert((error as Error).message);
    }
});
}
