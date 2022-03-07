import { createUserButton } from "../button/createButton";
import { createContainer, createUserContainer } from "../userContainers/createContainerFunctions";
import { getByClassName } from "../../helpers";
import { classNames } from "../../enums";

export function renderContainer() {
    const container = createContainer();
    document.body.appendChild(container);
    container.appendChild(createUserButton());
  }

export function renderUserContainer() {
    let container = getByClassName(classNames.USER_DATA_CONTAINER);
    if (container) {
      container.remove();
    }
    container = createUserContainer();
    getByClassName(classNames.USER_CONTAINER).appendChild(container);
    return container;
  }
 
  