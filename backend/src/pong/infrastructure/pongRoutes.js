export default async function pongRoutes(fastify) {

    // This is a test websocket route that just sends a message back and forth
    fastify.get('/ws/pong', { websocket: true }, (connection /*, request */) => {
        console.log('New WebSocket connection');
    
        // Handle incoming messages
        connection.socket.on('message', (message) => {
          const data = message.toString();
          console.log('Received from client:', data);
      
          // Respond back
          connection.socket.send(`Echo: ${data}`);
        });
      
        // Handle disconnect
        connection.socket.on('close', () => {
          console.log('WebSocket client disconnected');
        });
    });
      
}