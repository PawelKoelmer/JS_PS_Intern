import { classNames } from "../../enums";
import { handleSortTable } from "../tableFunctions/sortingFunctions";

export function createRow(){
  return document.createElement('tr');
}

export function createHeaders() {
    const headersRow = createRow();
    headersRow.className = classNames.HEADERS_ROW;
    headersRow.appendChild(createHeaderCell('First Name'));
    headersRow.appendChild(createHeaderCellWithFunction('Last Name', 'lastName'));
    headersRow.appendChild(createHeaderCell('Country'));
    headersRow.appendChild(createHeaderCellWithFunction('Register Date', 'date'));
    return headersRow;
  }

  function createHeaderCell(textInCell) {
    const cell = document.createElement('th');
    cell.innerHTML = textInCell;
    return cell;
  }

  function createHeaderCellWithFunction(textInCell, param) {
    const header = document.createElement('th');
    header.value = false;
    header.addEventListener('click', function(){
      console.log(this.value);
      this.value = handleSortTable(param,this.value);
      console.log(this.value);
    });
    header.innerHTML = textInCell;
    return header;
  }  

export function createCell(textInCell) {
    const cell = document.createElement('td');
    cell.innerHTML = textInCell;
    return cell;
  }