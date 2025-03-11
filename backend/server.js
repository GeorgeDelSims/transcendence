/*
Dependencies for the docker:
  npm install fastify @fastify/jwt fastify-bcrypt @fastify/cookie better-sqlite3

test installation versions:
  npm list --depth=0

*/

// Plugin imports (files are in the node_modules directory)
import Fastify from 'fastify'
import databasePlugin from './database.js'
import firstRoute from './routes/indexRoute.js'
import usersRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import fastifyJwt from '@fastify/jwt'
import fastifyBcrypt from 'fastify-bcrypt'
import fastifyCookie from '@fastify/cookie'
import AuthMiddleware from './middleware/AuthMiddleware.js'

const   fastify = Fastify({ logger: true })

fastify.register(databasePlugin);
fastify.register(firstRoute);
fastify.register(usersRoutes);
fastify.register(authRoutes);
fastify.register(gameRoutes);
fastify.register(fastifyJwt, { secret: "secret_key" }); // Check this out
fastify.register(fastifyBcrypt);
fastify.register(fastifyCookie);

// Register authentification middleware
const   authMiddleware = new AuthMiddleware(fastify);
fastify.decorate("authenticate", authMiddleware.authenticate);

// Run server:
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server running at ${address}`)
})
