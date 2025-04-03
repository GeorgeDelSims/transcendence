import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
// import socketIo from 'fastify-socket.io'
import registerRoutes from './src/index/index.js';
import jwt from '@fastify/jwt';
import databasePlugin from './database.js';
import fastifyBcrypt from 'fastify-bcrypt';

// Create Fastify instance 
const fastify = Fastify({ logger: true });

// Register plugins: 
fastify.register(fastifyWebsocket);
// fastify.register(socketIo);
fastify.register(jwt, { secret: 'supersecret' });

await fastify.register(databasePlugin);
await fastify.register(fastifyBcrypt);

// import shared utils, services, and repositories to the Fastify instance
import BcryptPasswordHasher from './src/shared/utils/hash.js';
import PlayerRepositorySQLite from './src/auth/infrastructure/PlayerRepositorySQLite.js';
import PlayerRegister from './src/auth/application/PlayerRegister.js';

// Create real instances
const passwordHasher = new BcryptPasswordHasher(fastify.bcrypt);
const playerRepository = new PlayerRepositorySQLite(fastify.db);
const playerRegister = new PlayerRegister(playerRepository, fastify.jwt, passwordHasher);

// Decorate with actual instances
fastify.decorate('playerRepository', playerRepository);
fastify.decorate('playerRegister', playerRegister);
fastify.decorate('bcryptPasswordHasher', passwordHasher);

// Register routes
try {
  await registerRoutes(fastify);
} catch (error) {
  console.error('Error in registerRoutes:', error);
  process.exit(1);
}

// Listen on port
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (error, address) {
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }
  console.log(`server running at ${address}`)
})


