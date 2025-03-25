var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function RegisterComponent(root) {
    root.innerHTML = `
        <h2>Register here </h2>
        <form id="register-form">
            <input id="username" placeholder="Username" required />
            <input id="password" type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>`;
    const form = document.getElementById("register-form");
    form.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        console.log("add listener event, getting elements by Id");
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }
        console.log("Sending registration request with:", { username, password });
        try {
            const response = yield fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = yield response.json();
            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }
            console.log("Got response:", response);
            alert("Registration successful! You can now login.");
            window.location.hash = "#/login";
        }
        catch (error) {
            alert(error.message);
        }
    }));
}
/*

WARNING


inner.HTML on an input field is a security breach (allows injections)

text.content is safer

*/ 
