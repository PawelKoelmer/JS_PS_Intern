let tableData = [];
const localStorageKeys = {
  DATA_TABLE: 'usersTable',
};

const classNames = {
  USERS_TABLE: 'users-table',
};

/*  generateHeaders(tableBody);
  appendDataToTable(tableBody);
  document.body.appendChild(tableBody); */

showTable();

function showTable() {
  try {
    tableData = JSON.parse(
      sessionStorage.getItem(localStorageKeys.DATA_TABLE)
    );
  } catch (error) {
    console.log('Failed to obtain data from session');
  }
  appendElementToBody(createTableContainer());
  appendElement(createHeaders(),classNames.USERS_TABLE);
  appendDataToTable()
}

function createTableContainer() {
  const tableBody = document.createElement('table');
  tableBody.className = classNames.USERS_TABLE;
  return tableBody;
}

function appendDataToTable(tableBody) {
  for (i = tableData.length - 1; i >= 0; i--) {
    const tableRow = createRow();
    tableRow.appendChild(createCell(tableData[i].firstName));
    tableRow.appendChild(createCell(tableData[i].lastName));
    tableRow.appendChild(createCell(tableData[i].locationAddress.country));
    tableRow.appendChild(
      createCell(timestampToDate(tableData[i].registerDate))
    );
    tableBody.appendChild(tableRow);
  }
}

function createCell(textInCell) {
  const cell = document.createElement('td');
  cell.innerHTML = textInCell;
  return cell;
}

function createHeaderCellWithFunction(textInCell, param) {
  const cell = document.createElement('td');
  cell.addEventListener('click', function(){
    sortTable(param);
  });
  cell.innerHTML = textInCell;
  return cell;
}

function createRow(){
  return document.createElement('tr');
}

function createHeaders() {
  const headersRow = createRow();
  headersRow.appendChild(createCell('First Name'));
  headersRow.appendChild(createHeaderCellWithFunction('Last Name', 'lastName'));
  headersRow.appendChild(createCell('Country'));
  headersRow.appendChild(createHeaderCellWithFunction('Register Date', 'date'));
  return headersRow;
}

function sortTable(param) {
  if (param === 'lastName') {
    tableData.sort(sortByLastName);
    getByClassName(classNames.USERS_TABLE).remove();
    createTableContainer();
  }
  if (param === 'date') {
    tableData.sort(sortByDate);
    getByClassName(classNames.USERS_TABLE).remove();
    createTableContainer();
  }
}

//HELPERS

function sortByLastName(a, b) {
  return b.lastName.localeCompare(a.lastName);
}

function sortByDate(a, b) {
  return a.registerDate - b.registerDate;
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
