/*
import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import wsRoute from './src/shared/websocket/wsRoute.js';
import authRoutes from './src/auth/infrastructure/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, './frontend/dist');

const fastify = Fastify({ logger: true });

// Plugins
fastify.register(fastifyWebsocket);
fastify.register(fastifyStatic, {
  root: frontendDistPath,
  prefix: '/',
});

// Routes
await wsRoute(fastify);
await fastify.register(authRoutes);

// Fallback for SPA (serves index.html for frontend routes)
fastify.setNotFoundHandler(async (request, reply) => {
  if (
    request.raw.method === 'GET' &&
    request.headers.accept?.includes('text/html')
  ) {
    const indexPath = path.join(frontendDistPath, 'index.html');
    return reply.type('text/html').send(fs.readFileSync(indexPath, 'utf-8'));
  } else {
    reply.code(404).send({ error: 'Not Found' });
  }
});

// Start
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Backend running at ${address}`);
});

*/

import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import registerRoutes from './src/index/index.js';
import jwt from '@fastify/jwt';
import databasePlugin from './database.js';
import fastifyBcrypt from 'fastify-bcrypt';

// Create Fastify instance 
const fastify = Fastify({ logger: true });

// Register plugins: 
fastify.register(fastifyWebsocket);
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

