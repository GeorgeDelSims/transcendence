import path from 'path';
// plugin for serving static files
// Since we're building a SPA we only need to use this once 
import fastifyStatic from '@fastify/static'; 
import authRoutes from '../auth/infrastructure/AuthRoutes.js';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../../../app/frontend/dist');


export default async function registerRoutes(fastify) {
  // Serve static file from frontend build dir
  fastify.register(fastifyStatic, {
    root: frontendDistPath,
    prefix: '/',
  });
  
  // fastify.log.info("frontendDistPath : ", frontendDistPath);
  console.log("frontendDistPath : ", frontendDistPath);
  // Register API routes
  fastify.register(authRoutes, { prefix: '/' });

  // Catch-all fallback: serve index.html for any GET request not handled
  fastify.setNotFoundHandler({ preHandler: fastify.staticServe }, async (request, response) => {
    
    if (request.raw.method === 'GET' && request.headers.accept?.includes('text/html')) {
      const indexFilePath = path.join(frontendDistPath, 'index.html');
      return response.type('text/html').send(fs.readFileSync(indexFilePath, 'utf-8'));
    } else {
      response.code(404).send({ error: 'Not Found' });
    }
  });
}
