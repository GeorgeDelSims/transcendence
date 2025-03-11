import Tournament from '../models/TournamentModel.js'

class TournamentController { 
    constructor(fastify) { 
        this.fastify = fastify;
        this.tournamentModel = new Tournament(fastify);
    }

    createTournament = async (request, reply) => {
        const { name } = request.body;
        const userId = request.user?.id;
      
        if (!name) {
            return reply.code(400).send({ error: 'Missing tournament name' });
        }

        if (!userId) {
            return reply.code(400).send({ error: 'Missibg Tournament User ID'});
        }

        try {
          const tournament = this.tournamentModel.createTournament(name, userId);
          reply.code(201).send(tournament);
        } catch (err) {
          this.fastify.log.error(err);
          reply.code(500).send({ error: 'Could not create tournament' });
        }
    }
}

export default TournamentController;

// Docker architecture 
// Regles de programmation / syntaxe JavaScript 
// schema arborescence du site 
// choix des modules / base d'abord