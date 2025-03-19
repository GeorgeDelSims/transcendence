/*
Dependencies for the docker:
  npm install fastify @fastify/jwt fastify-bcrypt @fastify/cookie better-sqlite3

test installation versions:
  npm list --depth=0

*/

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
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server running at ${address}`)
})
