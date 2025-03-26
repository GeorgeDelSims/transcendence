import { createElementWithChildren } from "../utils/createElementWithChildren.js";

export function PageSectionComponent(
    className: string,
    children: HTMLElement[]
  ): HTMLDivElement {
    return createElementWithChildren("div", className, children) as HTMLDivElement;
  }
  