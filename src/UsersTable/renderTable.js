import { createTableContainer } from "./createTableBody/createTableContainer";
import { createHeaders } from "./createTableBody/createHeadersForTable";
import { classNames } from "../enums";
import { getByClassName, getSpecificDataFromLocalStorage } from "../helpers";
import { createTableDataRow } from "./tableFunctions/createTableFunctions";
import { renderBackNavigationLink } from "../navigation/renderNavigationLink";

export function renderTable(){
    const container = createTableContainer();
    container.appendChild(createHeaders());
    document.body.appendChild(container);
    appendDataToTable(getSpecificDataFromLocalStorage());
    renderBackNavigationLink();
  }

export function appendDataToTable(dataTable) {
    for(let i = (dataTable.length - 1); i >= 0; i--){
      getByClassName(classNames.USERS_TABLE).appendChild(createTableDataRow(dataTable[i]));
    }
  }

