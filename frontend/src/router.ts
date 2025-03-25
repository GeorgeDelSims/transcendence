import { LoginComponent } from "./components/Login.js";
import { RegisterComponent } from "./components/Register.js";
import { HomeComponent } from "./components/Home.js";


// Route Map: (Record is the typescript equivalent of a Dictionary)
// Keys = strings // values = functions that take HTMLElement and return void (i.e. Components)
const routes: Record<string, (root: HTMLElement) => void> = {
  "/": HomeComponent,
  "/auth/login": LoginComponent,
  "/auth/register": RegisterComponent,
};

// Initialise the router (optional parameter rootId has a default value of "app")
export function initRouter(rootId = "app") {
  // get the root DOM element
  const root = document.getElementById(rootId);
  
  if (!root) {
    throw new Error(`Root element #${rootId} not found`);
  }

  const render = () => {
    // get the url and remove the hash
    const path = window.location.hash.replace("#", "") || "/";
    // match the url to the root map and run the corresponding function 
    const component = routes[path];
    if (component) {
      component(root);
    } else {
      // change to using a 404 object later? 
      root.innerHTML = `<h2>404 - Not Found</h2>`;
    }
  };

  // add an event listener to the window (so the url bar at the top of the browser) at the beginning of the program
  window.addEventListener("hashchange", render);
  // also run a render() first thing 
  render();
}
