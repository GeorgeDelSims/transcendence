import path from 'path';
import { fileURLToPath } from 'url';
import fileSystem from 'fs'

// Need to construct a path to the index.html file in the ../frontend/dist/ dir
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        // read and serve the html file: 
        const indexPath = path.join(__dirname, "..", "frontend", "dist", "index.html");
        const html = fileSystem.readFileSync(indexPath, "utf-8");
        reply.type("text/html").send(html);
    })
}


