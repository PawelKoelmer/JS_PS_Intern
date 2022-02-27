var table = new Array();

showTable();

function showTable() {
  table = JSON.parse(window.sessionStorage.getItem("userTable"));
  console.log(table);
  generateTable();
}

function generateTable() {
  var tableBody = document.createElement("table");
  generateHeaders(tableBody);
  for (i = table.length - 1; i >= 0; i--) {
    var tableRow = document.createElement("tr");
    tableRow.appendChild(createCell(table[i].FirstName));
    tableRow.appendChild(createCell(table[i].LastName));
    tableRow.appendChild(createCell(table[i].LocationAdress.country));
    tableRow.appendChild(createCell(timestampToDate(table[i].RegisterDate)));
    tableBody.appendChild(tableRow);
  }
  document.body.appendChild(tableBody);
}

function createCell(textInCell) {
  var cell = document.createElement("td");
  cell.innerHTML = textInCell;
  return cell;
}

function createHeaderCellWithFunction(textInCell, param) {
  var cell = document.createElement("td");
  cell.addEventListener('click',function (){
    sortTable(param)
  } );
  cell.innerHTML = textInCell;
  return cell;
}

function generateHeaders(tableBody) {
  var tableRow = document.createElement("tr");
  tableRow.appendChild(createCell("First Name"));
  tableRow.appendChild(createHeaderCellWithFunction("Last Name", "LastName"));
  tableRow.appendChild(createCell("Country"));
  tableRow.appendChild(createHeaderCellWithFunction("Register Date","Date"));
  tableBody.appendChild(tableRow);
}

function sortTable(param) {
  if (param === "LastName") {
    table.sort(sortByLastName);
    document.getElementsByTagName('table')[0].remove();
    generateTable();
  }
  if (param === "Date"){
    table.sort(sortByDate);
    document.getElementsByTagName('table')[0].remove();
    generateTable();
  }
}

function sortByLastName(a, b) {
  return b.LastName.localeCompare(a.LastName);
}

function sortByDate(a,b){
    return a.RegisterDate-b.RegisterDate;
}

function timestampToDate(param){
    var date = new Date(param);
      return date.getDate()+
      "/"+(date.getMonth()+1)+
      "/"+date.getFullYear()+
      " "+date.getHours()+
      ":"+date.getMinutes()+
      ":"+date.getSeconds();
  }