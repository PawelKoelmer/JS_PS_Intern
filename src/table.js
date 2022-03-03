let tableData = [];
const localStorageKeys = {
  DATA_TABLE: 'usersTable',
};

const classNames = {
  USERS_TABLE: 'users-table',
  HEADERS_ROW: 'headers-row',
  DATA_ROW: 'data-row',
};

showTable();

function showTable() {
  try {
    tableData = JSON.parse(
      sessionStorage.getItem(localStorageKeys.DATA_TABLE)
    );
  } catch (error) {
    console.log('Failed to obtain data from session');
  }
  createTable();
}

function createTableContainer() {
  const tableBody = document.createElement('table');
  tableBody.className = classNames.USERS_TABLE;
  return tableBody;
}

function createTable(){
  appendElementToBody(createTableContainer());
  appendElement(createHeaders(),classNames.USERS_TABLE);
  appendDataToTable();
}

function appendDataToTable() {
  for(i = tableData.length - 1; i >= 0; i--){
    getByClassName(classNames.USERS_TABLE).appendChild(createTableDataRow(tableData[i]));
  };
}

function createTableDataRow(dataToRow){
  const tableRow = createRow();
  tableRow.className = classNames.DATA_ROW;
  tableRow.appendChild(createCell(dataToRow.firstName));
  tableRow.appendChild(createCell(dataToRow.lastName));
  tableRow.appendChild(createCell(dataToRow.locationAddress.country));
  tableRow.appendChild(createCell(timestampToDate(dataToRow.registerDate)));
  return tableRow;
}

function createCell(textInCell) {
  const cell = document.createElement('td');
  cell.innerHTML = textInCell;
  return cell;
}

function createHeaderCellWithFunction(textInCell, param) {
  const header = document.createElement('td');
  header.value = false;
  header.addEventListener('click', function(){
    console.log(this.value);
    this.value = sortTable(param,this.value);
    console.log(this.value);
  });
  header.innerHTML = textInCell;
  return header;
}

function createRow(){
  return document.createElement('tr');
}

function createHeaders() {
  const headersRow = createRow();
  headersRow.className = classNames.HEADERS_ROW;
  headersRow.appendChild(createCell('First Name'));
  headersRow.appendChild(createHeaderCellWithFunction('Last Name', 'lastName'));
  headersRow.appendChild(createCell('Country'));
  headersRow.appendChild(createHeaderCellWithFunction('Register Date', 'date'));
  return headersRow;
}

function sortTable(param, isClicked) {
  let flag = isClicked;
  getAllElementsByClassName(classNames.DATA_ROW).forEach(function(elem){elem.remove()});
  if (param === 'lastName') {
    if(isClicked){
      tableData.sort(sortByLastNameAsc);
      flag = false;
    }else{
      tableData.sort(sortByLastNameDesc);
      flag =  true;
    }
  }
  if (param === 'date') {
    if(isClicked){
      tableData.sort(sortByDateAsc);
      flag = false;
    }else{
      tableData.sort(sortByDateDesc);
      flag = true;
    }
  }
  appendDataToTable();
  return flag;
}




//HELPERS

function sortByLastNameAsc(a, b) {
  return b.lastName.localeCompare(a.lastName);
}
function sortByLastNameDesc(a, b) {
  return a.lastName.localeCompare(b.lastName);
}

function sortByDateAsc(a, b) {
  return a.registerDate - b.registerDate;
}
function sortByDateDesc(a, b) {
  return b.registerDate - a.registerDate;
}

function timestampToDate(param) {
  const date = new Date(param);
  return (
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  );
}

function getByClassName(param) {
  return document.querySelector(`.${param}`);
}

function appendElement(elem,className){
  getByClassName(className).appendChild(elem);
}

function appendElementToBody(elem){
  document.body.appendChild(elem);
}

function getAllElementsByClassName(param){
  return document.querySelectorAll(`.${param}`);
}


