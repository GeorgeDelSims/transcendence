import { renderLogin } from "./views/loginView";
import { renderRegister } from "./views/registerView";
import { setupLoginController } from "./controllers/loginController";
import { setupRegisterController } from "./controllers/registerController";


// Routes object (like map or dict) with <"string" keytype; "void arrow function" valuetype> 
// the key is the uri, the value is the arrow function that calls the valid controller

const routes: Record<string, () => void> = {
  "/login": () => {
    renderLogin();
    setupLoginController();
  },
  "/register": () => {
    renderRegister();
    setupRegisterController();
  },
  "": () => {
    window.location.hash = "#/login"; 
  }
};

/*
Hash changes don't reload the page, which is why they are used in Single Page Applications (SPAs).
A hash url can look like this : http://localhost/#/login 
When you add an event listener for the hash change, 
you're actually asking the browser to render a different component or html view without reloading the page. 
*/

export function initRouter() {
  const handleRoute = () => {
    const path = window.location.hash.replace("#", "") || "";
    const render = routes[path];
    if (render) render();
    else window.location.hash = "#/login";
  };

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}
