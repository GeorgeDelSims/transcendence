import UserRepository from '../../domain/auth/repositories/UserRepository.js'
import User from '../../domain/auth/entities/User.js'

class SQLiteUserRepository extends UserRepository {
    constructor(db) {
        // super() calls the constructor of the "super" (=parent) class 
        // and grants access to its methods
        super(); 
        this.db = db;
    }

    async getByUsername(username) {
        // SELECT statement returns the row that is asked for 
        const row = this.db.prepare("SELECT * FROM users WHERE username = ?").get(username);
        if (!row) {
            return null;
        }
        return new User({
            id: row.id,
            username: row.username,
            password: row.password
        });
    }

    async save(user) {
        // INSERT statement does not return the given row
        // so it needs to be extracted after the query
        const result = this.db
                        .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
                        .run(user.username, user.password);
        
        return new User({
            id: result.lastInsertRowId,
            username: user.username,
            password: user.hashedPassword
        })
    }
}

export default SQLiteUserRepository;
