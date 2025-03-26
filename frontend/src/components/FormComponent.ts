import { createElementWithChildren } from "../utils/createElementWithChildren.js";

export function FormComponent(
    id: string,
    children: HTMLElement[]
  ): HTMLFormElement {
    return createElementWithChildren("form", "flex flex-col gap-4 max-w-sm", children) as HTMLFormElement;
  }
  