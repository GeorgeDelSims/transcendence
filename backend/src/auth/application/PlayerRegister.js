// Application Layer implements business rules and logic 
// (check if player exists, register player etc. )


// application/auth/usecases/PlayerRegister.js

import Player from "../domain/Player.js";

class PlayerRegister {
    constructor(playerRepository, jwt, passwordHasher) {
        this.playerRepository = playerRepository;
        this.jwt = jwt;
        this.passwordHasher = passwordHasher;
    }

    async execute(username, password) {
        const player = await Player.create({ 
                                username, 
                                password, 
                                playerRepository: this.playerRepository,
                                passwordHasher: this.passwordHasher });

        const savedPlayer = await this.playerRepository.save(player);

        const token = this.jwt.sign({ id: savedPlayer.id, username: savedPlayer.username });
        return token;
    }
}

export default PlayerRegister;


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