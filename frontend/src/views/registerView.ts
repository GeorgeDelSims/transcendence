export function renderRegister(): void {
    const app = document.getElementById("app");
    if (!app){
        return;
    }
    app.innerHTML = `
    <section class="register-section">
        <h2>Register</h2>
        <form id="register-form">
        <div>
            <label for="username">Username:</label>
            <input type="username" id="username" name="username" required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="#/login">Login</a></p>
    </section>
    `;
}