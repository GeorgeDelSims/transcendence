import TournamentController from "../controllers/TournamentController.js";

export default async function tournamentRoutes(fastify) {
    const tournamentController = new TournamentController(fastify);

    fastify.get('/tournaments/:id', tournamentController.getTournamentById);
}