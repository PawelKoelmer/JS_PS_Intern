import { classNames } from "../enums";
import { getByClassName } from "../helpers";
import { renderContainer } from "../UserData/userContainers/renderContainer";
import { renderTable } from "../UsersTable/renderTable";

export function handleLinkClick(){
    event.preventDefault();
    removeUserDataContainer();
    removeLinkToTable();
    renderTable();
}

export function handleBackLinkClick(){
  event.preventDefault();
  removeTable();
  renderContainer();
}

function removeTable(){
    getByClassName(classNames.USERS_TABLE).remove();
}

function removeUserDataContainer(){
    getByClassName(classNames.USER_CONTAINER).remove();
  }

  function removeLinkToTable(){
    getByClassName(classNames.LINK_TO_TABLE).remove();
  };