import { ButtonComponent } from "../components/ButtonComponent.js";
import { InputComponent } from "../components/InputComponent.js";
import { FormComponent } from "../components/FormComponent.js";
import { createElementWithChildren } from "../utils/createElementWithChildren.js";

export function RegisterPage(rootElement: HTMLElement): void {
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("Registration successful! You can now login.");
      window.location.hash = "#/auth/login";
    } catch (error) {
      alert((error as Error).message);
    }
  });

  const page = createElementWithChildren("div", "p-8 text-white", [heading, form]);
  rootElement.appendChild(page);
}
