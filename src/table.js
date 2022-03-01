let tableData = [];
const localStorageKeys = {
  USERS_TABLE: "usersTable",
};
// Jeżeli wiem że jest tylko jedene taki element i nie ma więcej to: document.querySelector('#id' lub '.className')
//Jeżeli wiem że jest więcej elementów to używam document.querySelectorAll() - zaznacza wiele elementów
//Dobrze napisać osobną metodę do wrapowania z try catchem

showTable();

function showTable() {
  try {
    tableData = JSON.parse(
      sessionStorage.getItem(localStorageKeys.USERS_TABLE)
    );
  } catch (error) {
    console.log("Failed to obtain data from session");
  }
  generateTableContainer();
}

function generateTableContainer() {
  const tableBody = document.createElement("table");
  generateHeaders(tableBody);
  generateTableData(tableBody);
  document.body.appendChild(tableBody);
}

function generateTableData(tableBody) {
  for (i = tableData.length - 1; i >= 0; i--) {
    const tableRow = document.createElement("tr");
    tableRow.appendChild(createCell(tableData[i].firstName));
    tableRow.appendChild(createCell(tableData[i].lastName));
    tableRow.appendChild(createCell(tableData[i].locationAdress.country));
    tableRow.appendChild(
      createCell(timestampToDate(tableData[i].registerDate))
    );
    tableBody.appendChild(tableRow);
  }
}

function createCell(textInCell) {
  const cell = document.createElement("td");
  cell.innerHTML = textInCell;
  return cell;
}

function createHeaderCellWithFunction(textInCell, param) {
  const cell = document.createElement("td");
  cell.addEventListener("click", function () {
    sortTable(param);
  });
  cell.innerHTML = textInCell;
  return cell;
}

function generateHeaders(tableBody) {
  const tableRow = document.createElement("tr");
  tableRow.appendChild(createCell("First Name"));
  tableRow.appendChild(createHeaderCellWithFunction("Last Name", "lastName"));
  tableRow.appendChild(createCell("Country"));
  tableRow.appendChild(createHeaderCellWithFunction("Register Date", "date"));
  tableBody.appendChild(tableRow);
}

function sortTable(param) {
  if (param === "lastName") {
    tableData.sort(sortByLastName);
    document.getElementsByTagName("table")[0].remove();
    generateTableContainer();
  }
  if (param === "date") {
    tableData.sort(sortByDate);
    document.getElementsByTagName("table")[0].remove();
    generateTable();
  }
}

function sortByLastName(a, b) {
  return b.lastName.localeCompare(a.lastName);
}

function sortByDate(a, b) {
  return a.registerDate - b.registerDate;
}

function timestampToDate(param) {
  let date = new Date(param);
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}
