// Stateful Component Needs to have a render function as it changes according to state
// A component that manages its own state (internal data) and updates the UI based on it.
import appState from "../state/AppState.js";
import frontend from "../utils/frontend.js";

function HelloComponent(): HTMLElement { 
    const container = frontend.create(`
      <div class="text-black text-xl cursor-pointer mb-4">
        <span id="hello-text"></span>
      </div>
    `);

    const textElement = container.querySelector("#hello-text")!;
    const { helloMessage } = appState.getState();
    textElement.textContent = helloMessage;


    // Re-render on state updates
    const updateText = () => {
      const { helloMessage } = appState.getState();
      container.textContent = helloMessage;
    };

    // subscribe as listener to appState
    appState.subscribe(updateText);
  
    // Handle click to toggle message
    const handleClick = () => {
      const { helloMessage } = appState.getState();
      const next = helloMessage === "Hello" ? "Goodbye" : "Hello";
      appState.setState({ helloMessage: next });
    };

    container.addEventListener("click", handleClick);

    return container;
}

export default HelloComponent;
