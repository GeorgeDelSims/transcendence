import PlayerRepository from '../domain/PlayerRepository.js'
import Player from '../domain/Player.js'

class PlayerRepositorySQLite extends PlayerRepository {
    constructor(db) {
        // super() calls the constructor of the "super" (=parent) class 
        // and grants access to its methods
        super(); 
        this.db = db;
    }

    async getByUsername(username) {
        // SELECT statement returns the row that is asked for 
        const row = this.db.prepare("SELECT * FROM players WHERE username = ?").get(username);
        if (!row) {
            return null;
        }
        return new Player({
            id: row.id,
            username: row.username,
            password: row.password
        });
    }

    async save(player) {
        // INSERT statement does not return the given row
        // so it needs to be extracted after the query
        const result = this.db
                        .prepare("INSERT INTO players (username, password) VALUES (?, ?)")
                        .run(player.username, player.password);
        
        return new Player({
            id: result.lastInsertRowId,
            username: player.username,
            password: player.password
        })
    }
}

export default PlayerRepositorySQLite;
