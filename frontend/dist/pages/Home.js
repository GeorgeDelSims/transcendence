import { HyperlinkComponent } from "../components/HyperlinkComponent.js";
import { getState } from "../state/AppState.js";
import { createElementWithChildren } from "../utils/createElementWithChildren.js";
export function HomePage(rootElement) {
    // Clear the existing page content
    rootElement.innerHTML = "";
    // Get current state (player info)
    const { player } = getState();
    // Create heading
    const heading = document.createElement("h2");
    heading.className = "text-2xl font-bold text-white mb-2";
    // Create paragraph
    const paragraph = document.createElement("p");
    paragraph.className = "text-white";
    if (player) {
        heading.textContent = `Welcome, ${player.username}`;
        paragraph.textContent = "This is the home page.";
    }
    else {
        heading.textContent = "Welcome";
        // Create link 
        paragraph.textContent = "Please ";
        const registerLink = HyperlinkComponent("Register", "#/auth/register");
        paragraph.appendChild(registerLink);
        paragraph.appendChild(document.createTextNode("."));
    }
    // wrap the content in a styled container
    const pageContainer = createElementWithChildren("div", "p-8", [
        heading,
        paragraph,
    ]);
    rootElement.appendChild(pageContainer);
}
