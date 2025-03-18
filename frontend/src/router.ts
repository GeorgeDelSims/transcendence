import { renderLogin } from "./views/loginView.js";
import { LoginModel } from "./models/LoginModel.js";
import { LoginController } from "./controllers/LoginController.js";
import { RegisterModel } from "./models/RegisterModel.js";
import { RegisterController } from "./controllers/RegisterController.js";
import { renderRegister } from "./views/registerView.js";

// Routes object (like map or dict) with <"string" keytype; "void arrow function" valuetype> 
// the key is the uri, the value is the arrow function that calls the valid controller

const routes: Record<string, () => void> = {
  "/": () => {
    renderLogin();
    const model = new LoginModel();
    const controller = new LoginController(model);
    console.log("setting up login controller");
    controller.setup();
  },
  "/login": () => {
    renderLogin();
    const model = new LoginModel();
    const controller = new LoginController(model);
    console.log("setting up login controller");
    controller.setup();
  },
  "/register": () => {
    renderRegister(); // call view function 
    const model = new RegisterModel(); // create model 
    const controller = new RegisterController(model); // create controller
    console.log("setting up registration controller");
    controller.setup();
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
    // window is a JS global variable provided by the browser that represents the its API
    // window.location is the URL object 
    // The frontend files are getting rendered in the browser's environment,
    // so the browser is the one that supplies the variables for its API. 
    const path = window.location.hash.replace("#", "") || "";
    const render = routes[path];
    if (render) {
      render();
    } else {
      console.warn(`Unknown route: "${path}". Redirecting to /`);
      window.location.hash = "#/";
    }
  };

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}
