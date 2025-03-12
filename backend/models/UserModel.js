export default class User {
    constructor(fastify) {
        this.db = fastify.db;
        this.log = fastify.log;
    }

    getAllUsers() {
        try {
            const users = this.db.prepare('SELECT * FROM users').all();
            this.log.info(`Fetched ${users.length} users`);
            return users;

        } catch (error) {
            this.log.error(`Error fetching users: ${error.message}`);
            throw error;
        }
    }

    addUser(name) {
        try {
            const result = this.db.prepare('INSERT INTO users (name) VALUES (?)').run(name);
            this.log.info(`User added with ID: ${result.lastInsertRowid}`);
            return { id: result.lastInsertRowid, name };
        } catch (error) {
            this.log.error(`Error adding user: ${error.message}`);
            throw error;
        }
    }

    deleteUser(name) {
        try {
            const result = this.db.prepare('DELETE FROM users WHERE name = ?').run(name);
    
            if (result.changes === 0) {
                this.log.warn(`User ${name} not found`);
                return { message: `User '${name}' not found` };
            }
            
            this.log.info(`User ${name} successfully deleted`);
            return { message: `User '${name}' deleted successfully` };
        } catch (error) {
            this.log.error(`Error deleting user: ${error.message}`);
            throw error;
        }
    }
    
}
