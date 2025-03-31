import frontend from "../utils/frontend.js";
import registerComponent from "../components/RegisterComponent.js";

function page(): HTMLElement {
  return frontend.create(`
    <div class="min-h-full">
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div id="navbar" class="flex items-baseline space-x-4"></div>
          </div>
        </div>
      </nav>
      <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Register</h1>
        </div>
      </header>
      <main>
        <div id="content" class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>
      </main>
    </div>
  `);
}

function RegisterPage(): void {
  const root = page();
  const form = registerComponent();

  frontend.mountComponent(root, "content", form);

  document.body.innerHTML = ""; // Clear existing page
  document.body.appendChild(root);
}

export default RegisterPage;
