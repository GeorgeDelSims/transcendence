export function renderLogin(): void {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `
    <section class="login-section">
        <h2>Login</h2>
        <form id="login-form">
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#/register">Register here</a></p>
    </section>
    `;
}
