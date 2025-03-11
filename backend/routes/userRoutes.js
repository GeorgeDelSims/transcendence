import UserController from "../controllers/UserController.js"

export default async function userRoutes(fastify, options) {
    const userController = new UserController(fastify.log);

    fastify.get('/users', (request, reply) => userController.getUsers(request, reply));
    fastify.post('/users', (request, reply) => userController.addUser(request, reply));
    fastify.delete('/users', (request, reply) => userController.deleteUser(request, reply));
}

