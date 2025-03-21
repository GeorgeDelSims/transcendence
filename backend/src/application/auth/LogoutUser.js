// Application Layer implements business rules and logic
class LogoutUser { 
    constructor(authService, jwt) {
        this.authService = authService;
        this.jwt = jwt;
    }

    async execute(username, password) {

    }

}

export default LogoutUser;
