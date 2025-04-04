var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import frontend from "../utils/frontend.js";
function registerComponent() {
    const container = frontend.create(`
    <form class="flex flex-col space-y-4" data-component="register">
      <h2 class="text-xl font-bold mb-2 text-white">Register</h2>
      <input 
        name="username"
        type="text" 
        placeholder="Player name"
        class="px-4 py-2 bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        name="password"
        type="password" 
        placeholder="Password"
        class="px-4 py-2 rounded bg-gray-800 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Register
      </button>
    </form>
  `);
    container.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const formData = new FormData(container);
        const username = formData.get("username").trim();
        const password = formData.get("password");
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
    return container;
}
export default registerComponent;
