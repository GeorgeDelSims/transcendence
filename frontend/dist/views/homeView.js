import frontend from "../utils/frontend.js";
import HelloComponent from "../components/helloComponent.js";
function HomeView() {
    const homeView = frontend.create(`
    <div class="p-8 space-y-4 text-black">
      <h2 class="text-2xl font-bold">Welcome</h2>
        <p class="text-black">
          Please <a href="#/auth/register" class="text-blue-400 underline">Register</a>.
        </p>
      <div id=hello-component></div>
      <div>
        <a href="#/ws/pong-ws" class="text-blue-400 underline">Go to Pong Game</a>
      </div>
    </div>
  `);
    const helloElement = HelloComponent();
    frontend.mountComponent(homeView, "hello-component", helloElement);
    document.body.innerHTML = "";
    document.body.appendChild(homeView);
}
export default HomeView;
