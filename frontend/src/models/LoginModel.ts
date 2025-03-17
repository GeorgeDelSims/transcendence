export class LoginModel {
    
    async login(email: string, password: string): Promise<any> {
        const response = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }
        return data;
    }
}
