export default async function pongRoutes(fastify) {

  fastify.get('/ws/pong-ws', { websocket: true }, (connection, req) => {
    console.log('New WebSocket connection');

    connection.socket.on('message', (message) => {
      const data = message.toString();
      console.log('Received from client:', data);
      connection.socket.send(`Echo: ${data}`);
    });

    connection.socket.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
}


