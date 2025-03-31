import frontend from "../utils/frontend.js";
function PageSectionComponent(className, children) {
    return frontend.createElementWithChildren("div", className, children);
}
export default PageSectionComponent;
