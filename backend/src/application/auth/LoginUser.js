// Application Layer implements business rules and logic
class LoginUser {
    constructor(authService, jwt) {
        this.authService = authService;
        this.jwt = jwt;
    }

    async execute(username, password) {
        const user = await this.authService.login(username, password);
        // jwt.sign creates Json Web Token
        // jwt.verify is to check the token on protected routes
        const token = this.jwt.sign({ id: user.id, username: user.username });
        return token;
    }
}

export default LoginUser;
