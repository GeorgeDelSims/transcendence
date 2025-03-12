export default class Game {
    constructor(fastify) {
        this.log = fastify.log;
        this.db = fastify.db;
    }
    
    createGame(player1_id, player2_id) {
      const sqlStatement = this.db.prepare(`
        INSERT INTO games (player1_id, player2_id, player1_score, player2_score)
        VALUES (?, ?, ?, ?)
      `);
      const result = sqlStatement.run(player1_id, player2_id, 0, 0);
      this.log.info(`Game created with ID ${result.lastInsertRowid}`);
      return { id: result.lastInsertRowid };
    }
  
    finishGame(gameId, winnerId, player1_score, player2_score) {
      const sqlStatement = this.db.prepare(`
        UPDATE games
        SET winner_id = ?, player1_score = ?, player2_score = ?
        WHERE id = ?
      `);
      sqlStatement.run(winnerId, player1_score, player2_score, gameId);
      this.log.info(`Game ${gameId} finished`);
    }
  
    getGameById(id) {
      return this.db.prepare('SELECT * FROM games WHERE id = ?').get(id);
    }
  
    getGamesForUser(userId) {
      return this.db.prepare(`
        SELECT * FROM games
        WHERE player1_id = ? OR player2_id = ?
        ORDER BY created_at DESC
        LIMIT 10
      `).all(userId, userId);
    }
  }
  