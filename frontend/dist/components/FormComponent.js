import { createElementWithChildren } from "../utils/createElementWithChildren.js";
export function FormComponent(id, children) {
    return createElementWithChildren("form", "flex flex-col gap-4 max-w-sm", children);
}
