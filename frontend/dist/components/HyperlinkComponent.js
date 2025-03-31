function HyperlinkComponent(labelText, linkString, onClickHandler, type = "hyperlink") {
    const hyperlink = document.createElement("a");
    hyperlink.href = linkString;
    hyperlink.textContent = labelText;
    hyperlink.className = "text-blue-400 hover:underline";
    if (onClickHandler) {
        hyperlink.addEventListener("click", onClickHandler);
    }
    return hyperlink;
}
export default HyperlinkComponent;
