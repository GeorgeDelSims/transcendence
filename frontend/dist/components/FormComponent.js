// Simple Stateless Component:
// A component that does not manage its own state — it relies entirely on props (inputs) or external state.
import frontend from "../utils/frontend.js";
function FormComponent(id, children) {
    return frontend.createElementWithChildren("form", "flex flex-col gap-4 max-w-sm", children);
}
export default FormComponent;
