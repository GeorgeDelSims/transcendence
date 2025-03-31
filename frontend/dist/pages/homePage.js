import HyperlinkComponent from "../components/HyperlinkComponent.js";
import appState from "../state/AppState.js";
import frontend from "../utils/frontend.js";
import HelloComponent from "../components/HelloComponent.js";
function HomePage(rootElement) {
    // Clear the existing page content
    rootElement.innerHTML = "";
    // Get current state (user info)
    const { user } = appState.getState();
    // Create heading
    const heading = document.createElement("h2");
    heading.className = "text-2xl font-bold text-white mb-2";
    // Create paragraph
    const paragraph = document.createElement("p");
    paragraph.className = "text-white";
    if (user) {
        heading.textContent = `Welcome, ${user.username}`;
        paragraph.textContent = "This is the home page.";
    }
    else {
        heading.textContent = "Welcome";
        // Create link 
        paragraph.textContent = "Please ";
        const registerLink = HyperlinkComponent("Register", "#/auth/register");
        // const registerLink = `<a href="#/auth/register">Register</a>`;
        paragraph.appendChild(registerLink);
        paragraph.appendChild(document.createTextNode("."));
    }
    const helloMessage = HelloComponent();
    const pongLink = HyperlinkComponent("Go to Pong Game", "#/ws/pong");
    // wrap the content in a styled container
    const pageContainer = frontend.createElementWithChildren("div", "p-8", [
        heading,
        paragraph,
        helloMessage,
        pongLink,
    ]);
    rootElement.appendChild(pageContainer);
}
export default HomePage;
