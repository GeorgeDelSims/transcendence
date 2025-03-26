export function InputComponent(
    id: string,
    placeholder: string,
    type: "text" | "password" = "text"
  ): HTMLInputElement {
    const inputElement = document.createElement("input");
    inputElement.id = id;
    inputElement.placeholder = placeholder;
    inputElement.required = true;
    inputElement.type = type;
  
    inputElement.className =
      "p-2 rounded bg-gray-800 text-white border border-gray-600";
  
    return inputElement;
  }
  