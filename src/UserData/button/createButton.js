import { classNames } from "../../enums";
import { handleCreateUserClick } from "./buttonHandler";

export function createUserButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = 'Generate User';
    button.className = classNames.CREATE_PERSON_BUTTON;
    button.addEventListener('click', handleCreateUserClick);
    return button;
  }