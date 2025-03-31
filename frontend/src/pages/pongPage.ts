import ButtonComponent from "../components/ButtonComponent.js";
import InputComponent from "../components/InputComponent.js";

function PongPage(rootElement: HTMLElement): void {
    console.log("PongPage loaded");
    rootElement.innerHTML = "";
  
    // Connect to the websocket connection that was opened in the backend
    const socket = new WebSocket("ws://127.0.0.1:3000/ws/pong");

    // create the Heading (title)
    const heading = document.createElement("h2");
    heading.textContent = "Pong";
    heading.className = "text-xl font-bold mb-4 text-white";

    // use inputComponent for message to be typed 
    const input = InputComponent("pong-input", "type a message here");

    // create log component for the message to appear
    const log = document.createElement("div");
    log.className = "mt-4 text-white";

    // the button component will send the trimmed input value to the socket
    // then it resets input value to "" (empty)
    const sendButton = ButtonComponent("Send", () => {
        const text = input.value.trim();
        if (text) {
            socket.send(text);
            input.value = "";
        }
    });

    function logMessage(message: string) {
        const entry = document.createElement("div");
        entry.textContent = message;
        log.appendChild(entry);
    };

    // We have to create an eventListener for each type of event that could be sent to the websocket:
    socket.addEventListener("open", () => {
        logMessage("Websocket connected");
    });

    socket.addEventListener("message", (event) => {
        logMessage(`From Server: ${event.data}`);
    });

    socket.addEventListener("close", () => {
        logMessage("Websockket closed");
    });

    socket.addEventListener("error", (error) => {
        logMessage("WEbsocket error");
        console.log(error);
    });

    // add all elements to the DOM
    rootElement.append(heading, input, sendButton, log);

}  

export default PongPage;