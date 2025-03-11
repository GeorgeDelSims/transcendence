import GameController from  "../controllers/GameController.js"

export default async function gameRoutes(fastify) {
    const gameController = new GameController(fastify);

    fastify.get('/games/:id', gameController.getGameById);
}
