import frontend from "../utils/frontend.js";

function PageSectionComponent(
    className: string,
    children: HTMLElement[]
  ): HTMLDivElement {
    return frontend.createElementWithChildren("div", className, children) as HTMLDivElement;
  }
  
  export default PageSectionComponent;