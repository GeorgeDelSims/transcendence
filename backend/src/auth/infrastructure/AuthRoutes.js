import AuthController from "./AuthController.js";
// import PlayerRegister from "../application/PlayerRegister.js";
// import PlayerRepositorySQLite from "../infrastructure/PlayerRepositorySQLite.js";

export default async function authRoutes(fastify) {
    
    // create an instance of each class / element needed for the flow
    // we start with low level (userRepo and passwordHasher) and finish with high-level (controllers)
    // const loginUser = new fastify.LoginUser(authService, fastify.jwt);
    
    // const playerRepository = new PlayerRepositorySQLite(fastify.db);
    // const playerRegister = new PlayerRegister(playerRepository, fastify.jwt);
    const authController = new AuthController({ playerRegister: fastify.playerRegister, logger: fastify.log });

    fastify.post('/auth/register', authController.register);
}

    // preHandler runs the authenticate method from AuthMiddleware.js 
    // before handling the '/profile' route 
    // fastify.get('/profile', { preHandler: fastify.authenticate }, async (request, reply) => {
    //     reply.send({ message: "Welcome to your profile", player: request.player });
    // });
