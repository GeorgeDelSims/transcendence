// Application Layer implements business rules and logic 
// (check if user exists, register user etc. )


// application/auth/usecases/RegisterUser.js

class RegisterUser {
    constructor(authService, jwt) {
        this.authService = authService;
        this.jwt = jwt;
    }

    async execute(username, password) {
        const user = await this.authService.register(username, password);
        const token = this.jwt.sign({ id: user.id, username: user.username });
        return token;
    }
}

export default RegisterUser;
