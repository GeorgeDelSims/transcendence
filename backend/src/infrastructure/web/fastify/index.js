import path from 'path';
// does what the name says, it's a Node.js function
import { fileURLToPath } from 'url'; 
// plugin for serving static files
// Since we're building a SPA we only need to use this once 
import fastifyStatic from '@fastify/static'; 
import authRoutes from './routes/AuthRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, '../../../../frontend/dist');

export default async function registerRoutes(fastify) {
  // Serve static file from frontend build dir
  fastify.register(fastifyStatic, {
    root: frontendDistPath,
    prefix: '/',
  });

  // Register API routes
  fastify.register(authRoutes, { prefix: '/auth' });


  // Catch-all fallback: serve index.html for any GET request not handled
  fastify.setNotFoundHandler({ preHandler: fastify.staticServe }, async (req, reply) => {
    
    if (req.raw.method === 'GET' && req.headers.accept?.includes('text/html')) {
      const indexFilePath = path.join(frontendDistPath, 'index.html');
      return reply.type('text/html').send(fastify.staticFS.readFileSync(indexFilePath, 'utf-8'));
    } else {
      reply.code(404).send({ error: 'Not Found' });
    }
  });
}
