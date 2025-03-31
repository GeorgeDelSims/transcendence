function mountComponent(root: HTMLElement, 
                        targetId: string, 
                        component: HTMLElement) {
    const target = root.querySelector(`#${targetId}`);
    if (target) {
      target.appendChild(component);
    } else {
      console.warn(`No element with id "${targetId}" found.`);
    }
}

// Returns a DOM element from an HTML string
function create(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const first = template.content.firstElementChild;
  if (!first) {
    throw new Error("frontend.create(): HTML string must have at least one root element.");
  }
  return first.cloneNode(true) as HTMLElement;
}

// This function embeds one or more elements into a "parent" element 
function createElementWithChildren(
  tagName: string,
  className: string,
  children: HTMLElement[] = []
): HTMLElement {
  
  const element = document.createElement(tagName);
  element.className = className;

  for (const child of children) {
    element.appendChild(child);
  }

  return element;
}

const frontend = { mountComponent, create, createElementWithChildren };

export default frontend;
