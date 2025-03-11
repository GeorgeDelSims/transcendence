export default class User {
    constructor(fastify) {
        this.db = fastify.db;
        this.logger = fastify.logger;
    }

    getAllUsers() {
        try {
            const users = db.prepare('SELECT * FROM users').all();
            this.logger.info(`Fetched ${users.length} users`);
            return users;

        } catch (error) {
            this.logger.error(`Error fetching users: ${error.message}`);
            throw error;
        }
    }

    addUser(name) {
        try {
            const result = db.prepare('INSERT INTO users (name) VALUES (?)').run(name);
            this.logger.info(`User added with ID: ${result.lastInsertRowid}`);
            return { id: result.lastInsertRowid, name };
        } catch (error) {
            this.logger.error(`Error adding user: ${error.message}`);
            throw error;
        }
    }

    deleteUser(name) {
        try {
            const result = db.prepare('DELETE FROM users WHERE name = ?').run(name);
    
            if (result.changes === 0) {
                this.logger.warn(`User ${name} not found`);
                return { message: `User '${name}' not found` };
            }
            
            this.logger.info(`User ${name} successfully deleted`);
            return { message: `User '${name}' deleted successfully` };
        } catch (error) {
            this.logger.error(`Error deleting user: ${error.message}`);
            throw error;
        }
    }
    
}
