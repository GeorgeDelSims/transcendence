function HyperlinkComponent(
    labelText: string,
    linkString: string,
    onClickHandler?: (event: MouseEvent) => void,
    type: "hyperlink" | "navigate" = "hyperlink"
): HTMLAnchorElement {
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