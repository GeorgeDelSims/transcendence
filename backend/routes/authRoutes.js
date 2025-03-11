
import AuthController from "../controllers/AuthController.js";

export default async function authRoutes(fastify) {
    const authController = new AuthController(fastify);

    fastify.post('/register', authController.register);
    fastify.post('/login', authController.login);
    fastify.post('/logout', authController.logout);

    fastify.get('/profile', { preHandler: fastify.authenticate }, async (request, reply) => {
        reply.send({ message: "Welcome to your profile.", user: request.user });
    });
}

