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
    const input = container.querySelector("#pong-input");
    const sendButton = container.querySelector("#pong-send");
    const log = container.querySelector("#pong-log");
    // sets the WebSocket protocol 
    // based on whether the current webpage was loaded via HTTP or HTTPS
    // wss is used when using HTTPS protocol, ws when using HTTP
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const webSocket = new WebSocket(`${wsProtocol}://${window.location.host}/ws/pong-ws`);
    sendButton.addEventListener("click", () => {
        const text = input.value.trim();
        if (text) {
            webSocket.send(text);
            input.value = "";
        }
    });
    function logMessage(message) {
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
