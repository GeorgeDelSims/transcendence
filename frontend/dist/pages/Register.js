var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ButtonComponent } from "../components/ButtonComponent.js";
import { InputComponent } from "../components/InputComponent.js";
import { FormComponent } from "../components/FormComponent.js";
import { createElementWithChildren } from "../utils/createElementWithChildren.js";
export function RegisterPage(rootElement) {
    rootElement.innerHTML = "";
    const heading = document.createElement("h2");
    heading.textContent = "Register";
    heading.className = "text-xl font-bold mb-4 text-white";
    const usernameInput = InputComponent("username", "Player name");
    const passwordInput = InputComponent("password", "Password", "password");
    const submitButton = ButtonComponent("Register", undefined, "submit");
    const form = FormComponent("register-form", [
        usernameInput,
        passwordInput,
        submitButton,
    ]);
    form.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const response = yield fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = yield response.json();
            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }
            alert("Registration successful! You can now login.");
            window.location.hash = "#/auth/login";
        }
        catch (error) {
            alert(error.message);
        }
    }));
    const page = createElementWithChildren("div", "p-8 text-white", [heading, form]);
    rootElement.appendChild(page);
}
