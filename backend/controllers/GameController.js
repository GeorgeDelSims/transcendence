import Game from '../models/GameModel.js'

class GameController {
    constructor(fastify) {
        this.fastify = fastify;
        this.gameModel = new Game(fastify);
    }

    getGameById = async (request, reply) => {
        const { id } = request.params;
        const game = this.gameModel.getGameById(id);
        if (!game)
            return reply.code(404).send({ error: "Game not found" });
        reply.send(game);
    }

    createGame = async (request, reply) => {
        const { player1_id, player2_id } = request.body;
        const game = this.gameModel.createGame(player1_id, player2_id);
        reply.code(201).send(game);
    }
}

export default GameController;