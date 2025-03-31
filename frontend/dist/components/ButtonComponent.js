function ButtonComponent(labelText, onClickHandler, type = "button") {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = labelText;
    buttonElement.type = type;
    buttonElement.className =
        "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition";
    if (onClickHandler) {
        buttonElement.addEventListener("click", onClickHandler);
    }
    return buttonElement;
}
export default ButtonComponent;
