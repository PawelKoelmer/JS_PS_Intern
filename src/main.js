var apiURL =
  "https://randomuser.me/api/?inc=gender,first,name,nat,location,registered,picture&noinfo";
var result;
var userTable = new Array();

main();

function main() {
  if (window.localStorage.getItem("userTable")) {
    userTable = JSON.parse(window.localStorage.getItem("userTable"));
  }
  generateButton();
  generateLinkToTable();
}

async function generatePerson() {
  if (result == null) {
    result = await getData();
    createPerson(result);
  } else {
    result = await getData();
    updatePerson(result);
  }
}

function getData() {
  return new Promise(function (resolve, reject) {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        let createdPerson;
        let person = data.results;
        person.map(function (p) {
          console.log(p);
          createdPerson = {
            FirstName: p.name.first,
            LastName: p.name.last,
            RegisterDate: Date.parse(p.registered.date),
            Nationality: p.nat,
            LocationAdress: {
              country: p.location.country,
              city: p.location.city,
              state: p.location.state,
              postcode: p.location.postcode,
              street: p.location.street.name,
              houseNumber: p.location.street.number,
            },
            Picture: {
              large: p.picture.large,
              medium: p.picture.medium,
              thumbnail: p.picture.thumbnail,
            },
          };
        });
        userTable.push(createdPerson);
        window.localStorage.setItem("userTable", JSON.stringify(userTable));
        resolve(createdPerson);
      });
  });
}

function createPerson(createdPerson) {
  addField("firstName", createdPerson.FirstName);
  addField("lastName", createdPerson.LastName);
  addField(
    "address",
    `${createdPerson.LocationAdress.country}<br>
    ${createdPerson.LocationAdress.city}<br>
    ${createdPerson.LocationAdress.state}<br>
    ${createdPerson.LocationAdress.postcode}<br>
    ${createdPerson.LocationAdress.street}<br>
    ${createdPerson.LocationAdress.houseNumber}`
  );
  addField("nationality", createdPerson.Nationality);
  addField("registeredDate", timestampToDate(createdPerson.RegisterDate));
  generateCheckBox();
}

function updatePerson(createdPerson) {
  updateField("firstName", createdPerson.FirstName);
  updateField("lastName", createdPerson.LastName);
  updateField(
    "address",
    `${createdPerson.LocationAdress.country}<br>
    ${createdPerson.LocationAdress.city}<br>
    ${createdPerson.LocationAdress.state}<br>
    ${createdPerson.LocationAdress.postcode}<br>
    ${createdPerson.LocationAdress.street}<br>
    ${createdPerson.LocationAdress.houseNumber}`
  );
  updateField("nationality", createdPerson.Nationality);
  updateField("registeredDate", timestampToDate(createdPerson.RegisterDate));
}

function addImage() {}

function addField(fieldName, param) {
  var field = document.createElement("div");
  field.className = fieldName;
  field.innerHTML = param;
  document.getElementsByClassName("person-Generator")[0].appendChild(field);
}

function updateField(fieldName, param) {
  field = document.getElementsByClassName(fieldName)[0].innerHTML = param;
}

function generateCheckBox() {
  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "adress-checkbox";
  checkBox.onclick = checkCheckbox;
  checkBox.checked = true;
  document.getElementsByClassName("person-Generator")[0].appendChild(checkBox);
}

function generateButton() {
  var button = document.createElement("button");
  button.addEventListener("click", generatePerson);
  button.textContent = "Generuj osobę";
  button.setAttribute("class", "generate-Button");
  document.getElementsByClassName("person-Generator")[0].appendChild(button);
}

function checkCheckbox() {
  if (document.getElementsByClassName("adress-checkbox")[0].checked) {
    document.getElementsByClassName("address")[0].style.display = "block";
  } else document.getElementsByClassName("address")[0].style.display = "none";
}

function generateLinkToTable() {
  var link = document.createElement("a");
  var linkText = document.createTextNode("Tabela użytkowników");
  link.appendChild(linkText);
  link.onclick = openPage;
  link.title = "Tabela użytkowników";
  link.href = "wyswietlanie.html";
  document.getElementsByClassName("person-Generator")[0].appendChild(link);
}

async function openPage() {
  await sendTableToSesion();
}

function sendTableToSesion() {
  var tableToSession = new Array();
  return new Promise(function (resolve, reject) {
    if (userTable.length > 10) {
      tableToSession = userTable.slice(userTable.length - 10);
    } else {
      tableToSession = userTable;
    }
    console.log(tableToSession);
    resolve(
      window.sessionStorage.setItem("userTable", JSON.stringify(tableToSession))
    );
  });
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
