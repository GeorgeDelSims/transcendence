function mountComponent(root, targetId, component) {
    const target = root.querySelector(`#${targetId}`);
    if (target) {
        target.appendChild(component);
    }
    else {
        console.warn(`No element with id "${targetId}" found.`);
    }
}
export default mountComponent;
