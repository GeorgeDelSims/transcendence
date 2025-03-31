import frontend from "../utils/frontend.js";

function registerComponent(): HTMLFormElement {
  const container = frontend.create(`
    <form class="flex flex-col space-y-4" data-component="register">
      <h2 class="text-xl font-bold mb-2 text-white">Register</h2>
      <input 
        name="username"
        type="text" 
        placeholder="Player name"
        class="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        name="password"
        type="password" 
        placeholder="Password"
        class="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Register
      </button>
    </form>
  `) as HTMLFormElement;

  container.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(container);
    const username = (formData.get("username") as string).trim();
    const password = formData.get("password") as string;

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

  return container;
}

export default registerComponent;


/*
function RegisterPage(rootElement: HTMLElement): void {
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

export default RegisterPage;
*/