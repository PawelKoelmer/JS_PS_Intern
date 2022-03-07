import { classNames } from "../../enums";
import { timestampToFormattedDateString } from "../../helpers";
import { createRow, createCell } from "../createTableBody/createHeadersForTable";


export function createTableDataRow(dataToRow){
    const tableRow = createRow();
    tableRow.className = classNames.DATA_ROW;
    tableRow.appendChild(createCell(dataToRow.userName.firstName));
    tableRow.appendChild(createCell(dataToRow.userName.lastName));
    tableRow.appendChild(createCell(dataToRow.locationAddress.country));
    tableRow.appendChild(createCell(timestampToFormattedDateString(dataToRow.registerDate)));
    return tableRow;
  }

  
