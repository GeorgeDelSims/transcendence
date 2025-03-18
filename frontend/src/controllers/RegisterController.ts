import { RegisterModel } from "../models/RegisterModel.js";


export class RegisterController {
    private model: RegisterModel;

    constructor(model: RegisterModel) {
        this.model = model;
    }

    setup(): void {
        const form = document.getElementById("register-form") as HTMLFormElement | null;
        if (!form) {
            return;
        }
        form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const usernameInput = document.getElementById("username") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;
        const username = usernameInput?.value.trim();
        const password = passwordInput?.value;

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const data = await this.model.register(username, password);
            alert("Registration successful. You can now log in.");
            window.location.hash = "#/login";
        } catch (error) {
            alert((error as Error).message);
        }
    }
}
