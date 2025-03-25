var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setState } from "../state/AppState.js";
export function LoginComponent(root) {
    root.innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
        <input id="username" placeholder="Username" required />
        <input id="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
    </form>`;
    // access form element in DOM and add listener for the "submit" event
    const form = document.getElementById("login-form");
    form.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault(); // prevents browser from reloading page 
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }
        // Fetch request to the backend API: 
        try {
            const response = yield fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            // avoid hanging promises for the moment with await response
            const data = yield response.json();
            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }
            // if login is successful, go to index.html
            alert("Login successful");
            // setState merges user (partial object) to the global state, 
            // and notifies any subscribed components (listeners) to re-render or react to the login 
            setState({ user: { username } });
            window.location.hash = "#/";
        }
        catch (error) {
            alert(error.message);
        }
    }));
}
