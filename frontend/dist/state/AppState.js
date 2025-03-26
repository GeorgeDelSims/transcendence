// Create an instance of the state
const state = {
    player: null,
    listeners: []
};
// Update state object 
// Partial = Typescript utility type which makes properties optional
// Allows updates to be made on just one element of the state at a time 
// For example: change username for a User but not password
export function setState(partial) {
    Object.assign(state, partial);
    // loop through all registered listeners (notifies all listening functions of the change)
    state.listeners.forEach(fn => fn());
}
// return state object 
export function getState() {
    return state;
}
// add listener to the state 
export function subscribe(listener) {
    state.listeners.push(listener);
}
