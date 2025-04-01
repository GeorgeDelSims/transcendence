import frontend from "../utils/frontend.js";

function pongComponent() {
  
  const container = frontend.create(`
    <section data-component="pong" class="space-y-4 text-white">
    <h2 class="text-xl font-bold">Pong</h2>
    <input id="pong-input" placeholder="Type a message here" class="w-full p-2 rounded bg-gray-800 border border-gray-600" />
      <button id="pong-send" class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">Send</button>
      <div id="pong-log" class="mt-4 space-y-1"></div>
      </section>
  `);
      
  const input = container.querySelector("#pong-input") as HTMLInputElement;
  const sendButton = container.querySelector("#pong-send") as HTMLElement;
  const log = container.querySelector("#pong-log") as HTMLElement;
  
  const webSocket = new WebSocket("ws://localhost:3000/ws/pong-ws");
  // webSocket.onerror()

  sendButton.addEventListener("click", () => {
    const text = input.value.trim();
    if (text) {
      webSocket.send(text);
      input.value = "";
    }
  });

  function logMessage(message: string) {
    const entry = document.createElement("div");
    entry.textContent = message;
    log.appendChild(entry);
  }

  // Event listeners : 

  webSocket.addEventListener("open", () => {
    logMessage("WebSocket connected");
    webSocket.send("test message from frontend");
  });

  webSocket.addEventListener("message", (event) => logMessage(`From server: ${event.data}`));
  
  webSocket.addEventListener("close", (event) => {
    logMessage(`WebSocket closed (code: ${event.code}, reason: ${event.reason})`);
  });

  webSocket.addEventListener("error", (error) => {
    logMessage("WebSocket error");
    console.error(error);
  });

  return container;
}

export default pongComponent;


