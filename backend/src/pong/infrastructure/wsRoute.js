// prints the received message in the console log and responds with generic msg
function handleMessage(socket, message) {
  const text = message.toString();
  console.log('REceived from client: ', text);

  socket.send(text);
}

// opens the socket 
function handleSocket(socket, request) {
  console.log('new websocket connection');

  // handle connection
  socket.on('message', (message) => {
    handleMessage(socket, message)
  })
  // handle disconnection as well
  socket.on('close', () => {
    console.log('websocket connection closed');
  })
}

// export the route that works with the socket 
export default async function wsRoute(fastify) {
  
  fastify.get('/ws/pong-ws', { websocket: true }, handleSocket)
}
