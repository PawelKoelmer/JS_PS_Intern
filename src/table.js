let dataTable = [];

const localStorageKeys = {
  DATA_TABLE: 'usersTable',
};

const classNames = {
  USERS_TABLE: 'users-table',
  HEADERS_ROW: 'headers-row',
  DATA_ROW: 'data-row',
};




//INITIALIZE

initialize();

function initialize() {
  renderTable();
}




//EVENT HANDLERS

function sortTable(param, isClicked) {
  let flag = isClicked;
  getAllElementsByClassName(classNames.DATA_ROW).forEach(function(elem){elem.remove();});
  if (param === 'lastName') {
    if(isClicked){
      dataTable.sort(sortByLastNameAsc);
      flag = false;
    }else{
      dataTable.sort(sortByLastNameDesc);
      flag =  true;
    }
  }
  if (param === 'date') {
    if(isClicked){
      dataTable.sort(sortByDateAsc);
      flag = false;
    }else{
      dataTable.sort(sortByDateDesc);
      flag = true;
    }
  }
  appendDataToTable();
  return flag;
}





//RENDER

function renderTable(){
  const container = createTableContainer();
  container.appendChild(createHeaders());
  document.body.appendChild(container);
  appendDataToTable(getDataFromLocalStorage());
}

function appendDataToTable() {
  for(i = dataTable.length - 1; i >= 0; i--){
    getByClassName(classNames.USERS_TABLE).appendChild(createTableDataRow(dataTable[i]));
  }
}







//CREATE FUNCTIONS

function createTableContainer() {
  const tableBody = document.createElement('table');
  tableBody.className = classNames.USERS_TABLE;
  return tableBody;
}

function createRow(){
  return document.createElement('tr');
}

function createHeaderCell(textInCell) {
  const cell = document.createElement('th');
  cell.innerHTML = textInCell;
  return cell;
}

function createCell(textInCell) {
  const cell = document.createElement('td');
  cell.innerHTML = textInCell;
  return cell;
}

function createHeaders() {
  const headersRow = createRow();
  headersRow.className = classNames.HEADERS_ROW;
  headersRow.appendChild(createHeaderCell('First Name'));
  headersRow.appendChild(createHeaderCellWithFunction('Last Name', 'lastName'));
  headersRow.appendChild(createHeaderCell('Country'));
  headersRow.appendChild(createHeaderCellWithFunction('Register Date', 'date'));
  return headersRow;
}

function createTableDataRow(dataToRow){
  const tableRow = createRow();
  tableRow.className = classNames.DATA_ROW;
  tableRow.appendChild(createCell(dataToRow.firstName));
  tableRow.appendChild(createCell(dataToRow.lastName));
  tableRow.appendChild(createCell(dataToRow.locationAddress.country));
  tableRow.appendChild(createCell(timestampToFormattedDateString(dataToRow.registerDate)));
  return tableRow;
}

function createHeaderCellWithFunction(textInCell, param) {
  const header = document.createElement('th');
  header.value = false;
  header.addEventListener('click', function(){
    console.log(this.value);
    this.value = sortTable(param,this.value);
    console.log(this.value);
  });
  header.innerHTML = textInCell;
  return header;
}




//HELPERS

function getDataFromLocalStorage(){
  try {
    dataTable = JSON.parse(
      sessionStorage.getItem(localStorageKeys.DATA_TABLE)
    );
  } catch (error) {
    console.log('Failed to obtain data from session');
  }
}

function getSpeificDataFromLocalStorage(){
  const users = getDataFromLocalStorage();
  const latestUsersCount = 10;
  return users.length > latestUsersCount
    ? users.slice(users.length - latestUsersCount)
    : users;
}

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

function timestampToFormattedDateString(param) {
  const date = new Date(param);
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDay()+1;

  if(month < 10) month = '0'+month;
  if(day < 10) day = '0' + day;
   
  return `${day}.${month}.${year}`;
}

function getByClassName(param) {
  return document.querySelector(`.${param}`);
}

function getAllElementsByClassName(param){
  return document.querySelectorAll(`.${param}`);
}


