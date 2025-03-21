import AuthController from "../controllers/AuthController.js";
import BcryptPasswordHasher from '../../../../shared/utils/hash.js'

export default async function authRoutes(fastify) {
    
    // create an instance of each class / element needed for the flow
    // we start with low level (userRepo and hash) and finish with high-level (controllers)
    const userRepository = new fastify.UserRepository(fastify.db);
    const hash = new BcryptPasswordHasher(fastify.bcrypt);
    const authService = new fastify.AuthService(userRepository, hash);
    const registerUser = new fastify.RegisterUser(authService);
    const loginUser = new fastify.LoginUser(authService, fastify.jwt);
    const authController = new AuthController({ registerUser, loginUser });

    fastify.post('/register', authController.register);
    fastify.post('/login', authController.login);
    fastify.post('/logout', authController.logout);

    // preHandler runs the authenticate method from AuthMiddleware.js 
    // before handling the '/profile' route 
    fastify.get('/profile', { preHandler: fastify.authenticate }, async (request, reply) => {
        reply.send({ message: "Welcome to your profile", user: request.user });
    });
}
