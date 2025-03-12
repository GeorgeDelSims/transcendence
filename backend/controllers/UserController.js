import User from '../models/UserModel.js';

export default class UserController {
    constructor(fastify) {
        this.fastify = fastify;
        this.userModel = new User(fastify);
    }

    async getUsers(request, reply) {
        try {
            this.fastify.log.info('GET /users request received');
            const users = this.userModel.getAllUsers();
            reply.send(users);
        } catch (error) {
            this.fastify.log.error(`GET /users failed: ${error.message}`);
            reply.status(500).send();
        }
    }

    async addUser(request, reply) {
        try {
            this.fastify.log.info('POST /users request received');
            const { name } = request.body;

            if (!name) {
                this.fastify.log.warn('POST /users: Name is required');
                return reply.status(400).send({ error: 'Name is required' });
            }

            const user = this.userModel.addUser(name);
            this.fastify.log.info(`User created: ${user.name} (ID: ${user.id})`);
            reply.send({ message: 'User added successfully', user });
        } catch (error) {
            this.fastify.log.error(`POST /users failed: ${error.message}`);
            reply.status(500).send({ error: 'Failed to add user' });
        }
    }

    async deleteUser(request, reply) {
        try {
            this.fastify.log.info('DELETE /users request received');
            const { name } = request.body;

            if (!name) {
                this.fastify.log.warn('DELETE /users: Name is required');
                return (reply.status(400).send({ error: 'Name is required'}));
            }

            const user = this.userModel.deleteUser(name);
            this.fastify.log.info(`User deleted: ${ user.name } (ID: ${user.id})`);
            reply.send({ message: 'User deleted successfully', user });
        } catch (error) {
            this.fastify.log.error(500).send({ error: 'Failed to delete user'})
        }
    }
}
