import chatComponent from "../components/chatComponent.js";
import frontend from "../utils/frontend.js"

function chatView(): void {
    const chatView = frontend.create(`
        <main data-page="chat" class="p-8 max-w-xl mx-auto text-white space-y-6">
            <h1 class="text-3xl font-bold">Chat Page</h1>
            <section id="chat-container" class="bg-gray-800 p-6 rounded-lg shadow"></section>
        </main>
    `);

    const chatElement = chatComponent();
    frontend.mountComponent(chatView, "chat-container", chatElement);

    // clear and copy: 
    document.body.innerHTML = "";
    document.body.append(chatView);
}

export default chatView;
