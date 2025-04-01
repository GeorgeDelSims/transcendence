import pongComponent from "../components/pongComponent.js";
import frontend from "../utils/frontend.js"

function PongView(): void {
    const pongView = frontend.create(`
        <main data-page="pong" class="p-8 max-w-xl mx-auto text-white space-y-6">
            <h1 class="text-3xl font-bold">Pong Page</h1>
            <section id="pong-container" class="bg-gray-800 p-6 rounded-lg shadow"></section>
        </main>
    `);

    const pongElement = pongComponent();
    frontend.mountComponent(pongView, "pong-container", pongElement);

    // clear and copy: 
    document.body.innerHTML = "";
    document.body.append(pongView);
}

export default PongView;
