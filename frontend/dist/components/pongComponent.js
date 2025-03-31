import ButtonComponent from "../components/ButtonComponent.js";
import InputComponent from "../components/InputComponent.js";
function pongComponent() {
    const socket = new WebSocket("ws://127.0.0.1:3000/ws/pong");
    const container = document.createElement("section");
    container.className = "space-y-4 text-white";
    const heading = document.createElement("h2");
    heading.textContent = "Pong";
    heading.className = "text-xl font-bold";
    const input = InputComponent("pong-input", "Type a message here");
    const log = document.createElement("div");
    log.className = "mt-4 space-y-1";
    const sendButton = ButtonComponent("Send", () => {
        const text = input.value.trim();
        if (text) {
            socket.send(text);
            input.value = "";
        }
    });
    function logMessage(message) {
        const entry = document.createElement("div");
        entry.textContent = message;
        log.appendChild(entry);
    }
    socket.addEventListener("open", () => {
        logMessage("WebSocket connected");
    });
    socket.addEventListener("message", (event) => {
        logMessage(`From server: ${event.data}`);
    });
    socket.addEventListener("close", () => {
        logMessage("WebSocket closed");
    });
    socket.addEventListener("error", (error) => {
        logMessage("WebSocket error");
        console.error(error);
    });
    container.append(heading, input, sendButton, log);
    return container;
}
export default pongComponent;
