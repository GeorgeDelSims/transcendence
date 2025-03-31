// Create an instance of the state
const state = {
    page: { title: "homePage" },
    user: null,
    helloMessage: "Hello",
    listeners: []
};
// Update state object 
// Partial = Typescript utility type which makes properties optional
// Allows updates to be made on just one element of the state at a time 
// For example: change username for a User but not password
function setState(partial) {
    Object.assign(state, partial);
    // loop through all registered listeners (notifies all listening functions of the change)
    state.listeners.forEach(fn => fn());
}
// return state object 
function getState() {
    return state;
}
// add listener to the state 
function subscribe(listener) {
    state.listeners.push(listener);
}
const appState = { setState, getState, subscribe };
export default appState;
