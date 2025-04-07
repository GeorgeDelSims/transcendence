// Application Layer implements business rules and logic 
// (check if User exists, register User etc. )


// application/auth/usecases/UserRegister.js

import User from "../domain/User.js";

class UserRegister {
    constructor(userRepository, jwt, passwordHasher) {
        this.userRepository = userRepository;
        this.jwt = jwt;
        this.passwordHasher = passwordHasher;
    }

    async execute(username, password) {
        const User = await User.create({ 
                                username, 
                                password, 
                                userRepository: this.userRepository,
                                passwordHasher: this.passwordHasher });

        const savedUser = await this.userRepository.save(User);

        const token = this.jwt.sign({ id: savedUser.id, username: savedUser.username });
        return token;
    }
}

export default UserRegister;


/*
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



*/