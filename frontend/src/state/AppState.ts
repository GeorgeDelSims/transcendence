
// Application global state, has users (string username) and listeners (array of functions)
type AppState = {
    page: {title: string;}
    user: null | { username: string };
    helloMessage: string;
    listeners: (() => void)[];
};

// Create an instance of the state
const state: AppState = {
    page: {title: "homePage"},
    user: null,
    helloMessage: "Hello",
    listeners: []
};
  
// Update state object 
// Partial = Typescript utility type which makes properties optional
// Allows updates to be made on just one element of the state at a time 
// For example: change username for a User but not password
function setState(partial: Partial<AppState>) {
    Object.assign(state, partial);
    // loop through all registered listeners (notifies all listening functions of the change)
    state.listeners.forEach(fn => fn());
}
  
// return state object 
function getState(): AppState {
    return state;
}
  
// add listener to the state 
function subscribe(listener: () => void) {
    state.listeners.push(listener);
}

const appState = { setState, getState, subscribe };

export default appState;