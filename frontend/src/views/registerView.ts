import frontend from "../utils/frontend.js";
import registerComponent from "../components/registerComponent.js";

function RegisterView(): void {
  const registerView = frontend.create(`
    <div class="min-h-full">
      <nav class="bg-blue-400">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div id="navbar" class="flex items-baseline space-x-4"></div>
          </div>
        </div>
      </nav>
      <header class="bg-blue shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-xl font-bold tracking-tight text-blue">Register</h1>
        </div>
      </header>
      <main>
        <div id="register-component" class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>
      </main>
    </div>
  `);

  const registerForm = registerComponent();
  frontend.mountComponent(registerView, "register-component", registerForm);

  // clear the dom and add registerView
  document.body.innerHTML = "";
  document.body.appendChild(registerView);
}

export default RegisterView;
