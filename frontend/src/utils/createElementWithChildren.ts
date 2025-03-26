// This function embeds one or more elements into a "parent" element 
export function createElementWithChildren(
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
  