import { getState } from "../state/AppState.js";

export function HomeComponent(root: HTMLElement) {
    const state = getState();

    root.innerHTML = state.user
        ? `<h2>Welcome, ${state.user.username}</h2><p>This is the home page.</p>`
        : `<h2>Welcome</h2><p>Please <a href="#/auth/register">register</a>.</p>`;
}
