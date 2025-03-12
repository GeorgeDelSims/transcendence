export default class Tournament {
    constructor(fastify) {
        this.log = fastify.log;
        this.db = fastify.db;
    }

    createTournament(name, created_by) {
        const sqlStatement = this.db.prepare(`
            INSERT INTO tournaments (name, created_by)
            VALUES (?, ?)
        `);
        const result = sqlStatement.run(name, created_by);
        const id = result.lastInsertRowId;
        this.log.info(`Tournament created with ID ${ id }`);
        return { id, name };
    }

    getTournamentById(id) {
        return this.db.prepare(`SELECT * FROM tournaments WHERE id = ?`).get(id);
    }
}