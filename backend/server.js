import Fastify from 'fastify';
import registerRoutes from './src/index/index.js';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import databasePlugin from './database.js';
import fastifyBcrypt from 'fastify-bcrypt';

const fastify = Fastify({ logger: true });

fastify.register(cookie);
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

fastify.listen({ port: 3000, host: '0.0.0.0' }, function (error, address) {
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }
  console.log(`server running at ${address}`)
})




/*
Dependencies for the docker:
  npm install fastify @fastify/jwt fastify-bcrypt @fastify/cookie better-sqlite3

test installation versions:
  npm list --depth=0

  
  // Plugin imports (files are in the node_modules directory)
  import fastifyStatic from '@fastify/static'
  import path from 'path'
  import { fileURLToPath } from 'url'

  import Fastify from 'fastify'
  import databasePlugin from './database.js'
  import indexRoute from './routes/indexRoute.js'
  import authRoutes from './routes/authRoutes.js'
  import fastifyJwt from '@fastify/jwt'
  import fastifyBcrypt from 'fastify-bcrypt'
  import fastifyCookie from '@fastify/cookie'
  import AuthMiddleware from './middleware/AuthMiddleware.js'
  
  const   fastify = Fastify({ logger: true })
  
  // setup for serving static files:
  const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// register frontend static file serving from the root "/"
// configures dist directory to take all static file requests
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'frontend/dist'), // (frontend output)
  prefix: '/', 
});

fastify.register(databasePlugin);
fastify.register(indexRoute);
fastify.register(authRoutes);
fastify.register(fastifyJwt, { secret: "secret_key" }); // Check this out
fastify.register(fastifyBcrypt);
fastify.register(fastifyCookie);

// Register authentification middleware
const   authMiddleware = new AuthMiddleware(fastify);
fastify.decorate("authenticate", authMiddleware.authenticate);

// Manage unfound GET requests that should be served by the frontend rather than the backend:
fastify.setNotFoundHandler((request, reply) => {
  const url = request.raw.url;
  const method = request.method;

  if (method === 'GET') {
    return reply.type('text/html').sendFile('index.html');
  }
  return reply.code(404).send({ message: 'Route not found' });
});

// Run server:
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (error, address) {
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }
  console.log(`server running at ${address}`)
})

*/