import { classNames } from "../../enums";

export function createTableContainer() {
    const tableBody = document.createElement('table');
    tableBody.className = classNames.USERS_TABLE;
    return tableBody;
  }