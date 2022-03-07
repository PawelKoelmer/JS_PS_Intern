import { renderUserContainer } from "../userContainers/renderContainer";
import { getByClassName } from "../../helpers";
import { classNames } from "../../enums";
import { createUserField, createToggleUserAddressVisibilityCheckbox, createToggleUserAddressVisibilityCheckboxLabel } from "./createUserFieldFunctions";


export function renderUser(user) {
    const userContainer = renderUserContainer();
    renderUserFields(user);
    renderToggleUserAddressVisibilityCheckbox(userContainer); 
  }

  function renderUserFields(user) {
    const userDataElem = getByClassName(classNames.USER_DATA_CONTAINER);
    for (const key in user) {
      if (!user.hasOwnProperty(key)) {
        continue;
      }
      userDataElem.appendChild(createUserField({
        className: key,
        data: user[key]
      }));
    }
  }

  function renderToggleUserAddressVisibilityCheckbox(userContainer) {
    userContainer.appendChild(createToggleUserAddressVisibilityCheckbox());
    userContainer.appendChild(createToggleUserAddressVisibilityCheckboxLabel());
  }