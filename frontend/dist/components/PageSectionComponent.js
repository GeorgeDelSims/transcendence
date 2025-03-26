import { createElementWithChildren } from "../utils/createElementWithChildren.js";
export function PageSectionComponent(className, children) {
    return createElementWithChildren("div", className, children);
}
