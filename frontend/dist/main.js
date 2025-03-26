import { initRouter } from "./router/router.js";
import { subscribe } from "./state/AppState.js";
window.addEventListener("DOMContentLoaded", () => {
    initRouter("app");
    // Optional: React to state changes and re-render root
    subscribe(() => {
        // Just re-render current route
        const event = new HashChangeEvent("hashchange");
        window.dispatchEvent(event);
    });
});
