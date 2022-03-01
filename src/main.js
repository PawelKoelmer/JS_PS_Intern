const API_URL =
  "https://randomuser.me/api/?inc=gender,first,name,nat,location,registered,picture&noinfo";
const localStorageKeys = {
  USERS_TABLE: "usersTable",
};

main();

function main() {
  createPersonDiv();
  createPersonDataBody();
  generateButton();
  generateLinkToTable();
  generateCheckBox();
}

async function generatePerson() {
  try {
    const person = await getData();
    addCreatedPersonToList(person);
    createPerson(person);
  } catch (error) {
    console.log(error);
  }
}

function getData() {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const person = data.results[0];
      const createdPerson = createPersonFromData(person);
      return createdPerson;
    });
}

function createPerson(createdPerson) {
  try {
    document.querySelector(".person-data").remove();
    createPersonDataBody();
    addFieldsToPersonData(createdPerson);
  } catch (error) {
    addFieldsToPersonData(createdPerson);
  }
}

function addImage() {}

function addField(fieldName, param) {
  let field = document.createElement("div");
  field.className = fieldName;
  field.innerHTML = param;
  document.querySelector(".person-data").appendChild(field);
}

function generateCheckBox() {
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "adress-checkbox";
  checkBox.onclick = checkCheckbox;
  checkBox.checked = true;
  document.body.appendChild(checkBox);
}

function generateButton() {
  let button = document.createElement("button");
  button.addEventListener("click", generatePerson);
  button.textContent = "Generate User";
  button.setAttribute("class", "generate-button");
  document.body.appendChild(button);
}

function checkCheckbox() {
  if (document.getElementsByClassName("adress-checkbox")[0].checked) {
    document.getElementsByClassName("address")[0].style.display = "block";
  } else document.getElementsByClassName("address")[0].style.display = "none";
}

function generateLinkToTable() {
  let link = document.createElement("a");
  let linkText = document.createTextNode("Tabela użytkowników");
  link.appendChild(linkText);
  link.onclick = openPage;
  link.title = "Tabela użytkowników";
  link.href = "showRegisteredUsers.html";
  document.body.appendChild(link);
}

async function openPage() {
  const tableTosession = await sendTableToSesion();
}

function sendTableToSesion() {
  const registeredUsers = readUsers();
  return new Promise(function (resolve, reject) {
    if (registeredUsers.length > 10) {
      tableToSession = registeredUsers.slice(registeredUsers.length - 10);
      addTableToSession(tableToSession);
    } else {
      tableToSession = registeredUsers;
      addTableToSession(tableToSession);
    }
  });
}

function timestampToDate(timestamp) {
  let date = new Date(timestamp);
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

function readUsers() {
  return readLocalStorageByKey(localStorageKeys.USERS_TABLE);
}

function readLocalStorageByKey(key) {
  try {
    const users = localStorage.getItem(key);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.log("Failed to read users", error);
  }
}

function addTableToSession(tableToSession) {
  console.log(tableToSession);
  sessionStorage.setItem(
    localStorageKeys.USERS_TABLE,
    JSON.stringify(tableToSession)
  );
}

function addCreatedPersonToList(person) {
  localStorage.setItem(
    localStorageKeys.USERS_TABLE,
    JSON.stringify([...readUsers(), person])
  );
}

function createPersonFromData(person) {
  return {
    firstName: person.name.first,
    lastName: person.name.last,
    registerDate: Date.parse(person.registered.date),
    nationality: person.nat,
    locationAdress: {
      country: person.location.country,
      city: person.location.city,
      state: person.location.state,
      postcode: person.location.postcode,
      street: person.location.street.name,
      houseNumber: person.location.street.number,
    },
    picture: {
      large: person.picture.large,
      medium: person.picture.medium,
      thumbnail: person.picture.thumbnail,
    },
  };
}

function createPersonDiv() {
  const personFieldBody = document.createElement("div");
  personFieldBody.className = "person-container";
  document.body.appendChild(personFieldBody);
}

function createPersonDataBody() {
  const personDataBody = document.createElement("div");
  personDataBody.className = "person-data";
  document.querySelector(".person-container").appendChild(personDataBody);
}

function addFieldsToPersonData(createdPerson) {
  addField("firstName", createdPerson.firstName);
  addField("lastName", createdPerson.lastName);
  addField(
    "address",
    `${createdPerson.locationAdress.country}<br>
    ${createdPerson.locationAdress.city}<br>
    ${createdPerson.locationAdress.state}<br>
    ${createdPerson.locationAdress.postcode}<br>
    ${createdPerson.locationAdress.street}<br>
    ${createdPerson.locationAdress.houseNumber}`
  );
  addField("nationality", createdPerson.nationality);
  addField("registeredDate", timestampToDate(createdPerson.registerDate));
}
