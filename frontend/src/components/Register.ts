export function RegisterComponent(root: HTMLElement) {
    root.innerHTML = `
        <h2>Register here </h2>
        <form id="register-form">
            <input id="username" placeholder="Username" required />
            <input id="password" type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>`;
  
    const form = document.getElementById("register-form") as HTMLFormElement;
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("add listener event, getting elements by Id");
        const username = (document.getElementById("username") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value;
  
        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }

        console.log("Sending registration request with:", { username, password });
        
        try {
            const response = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
  
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }
            
            console.log("Got response:", response);

            alert("Registration successful! You can now login.");
            window.location.hash = "#/login";
        } catch (error) {
            alert((error as Error).message);
        }
    });
}
  

/*

WARNING 


inner.HTML on an input field is a security breach (allows injections)

text.content is safer 

*/