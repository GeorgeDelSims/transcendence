// This function embeds one or more elements into a "parent" element 
export function createElementWithChildren(tagName, className, children = []) {
    const element = document.createElement(tagName);
    element.className = className;
    for (const child of children) {
        element.appendChild(child);
    }
    return element;
}
