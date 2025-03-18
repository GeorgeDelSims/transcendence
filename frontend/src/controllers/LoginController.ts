import { LoginModel } from "../models/LoginModel.js";

export class LoginController {
    private model: LoginModel;

    constructor(model: LoginModel) {
        this.model = model;
    }

    setup(): void {
        const form = document.getElementById("login-form") as HTMLFormElement | null;
        if (!form) {
            return;
        }
        form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault(); // prevents browser's default behaviour of reloading page 

        const usernameInput = document.getElementById("username") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;
        const username = usernameInput?.value.trim();
        const password = passwordInput?.value;

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const data = await this.model.login(username, password);
            alert("Login successful");
            window.location.hash = "#/";
        } catch (error) {
            alert((error as Error).message);
        }
    }
}
