// import fastifyWebsocket from '@fastify/websocket';

// prints the received message in the console log and responds with generic msg
function handleMessage(socket, message) {
  const text = message.toString();
  console.log('REceived from client: ', text);

  try {
    const data = JSON.parse(text);

    // Echo back the same message (simulating backend processing)
    socket.send(JSON.stringify({
      type: data.type,
      echo: true,
      received: data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error("Failed to parse incoming message as JSON:", error);
    socket.send(JSON.stringify({
      type: "error",
      message: "Invalid JSON received"
    }));
  }
}

// opens the socket 
function handleSocket(socket, req) {
  console.log('new websocket connection:', socket);
  socket.send(JSON.stringify({ type: 'connected', timestamp: Date.now() }));

  // handle connection
  socket.on('message', (message) => {
    handleMessage(socket, message)
  })

  // handle disconnection as well
  socket.on('close', () => {
    console.log('WebSocket connection closed');
  })
}

// export the route that works with the socket 
export default async function wsRoute(fastify) {
  // plugin only needs to be registered within the scope of the ws route
  // await fastify.register(fastifyWebsocket);
  
  fastify.get('/ws/main-ws', { websocket: true }, handleSocket)
  console.log("Websocket route mounted at /ws/main-ws");
}
