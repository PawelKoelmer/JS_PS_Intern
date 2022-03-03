const API_URL =
  'https://randomuser.me/api/?inc=gender,first,name,nat,location,registered,picture&noinfo';
const localStorageKeys = {
  USERS_TABLE: 'usersTable',
};
const classNames = {
  CONTAINER: 'container',
  BUTTON: 'generate-button',
  PERSON_DATA: 'person-data',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  NATIONALITY: 'nationality',
  REGISTER_DATE: 'registerDate',
  ADDRESS: 'locationAddress',
  CHECKBOX: 'address-checkbox',
  ICON_LIST: 'icons-list'
};

const fieldsTable = ['firstName','lastName','locationAddress','nationality','registerDate'];

//INITIALIZE

main();

function main() {
  appendElementToBody(createPersonContainer());
  appendElement(createPersonDataBody(),classNames.CONTAINER);
  appendElement(generateButton(),classNames.CONTAINER);
  appendElementToBody(createLinkToTable());
  appendElement(createIconsListContainer(),classNames.CONTAINER);
}

//FETCH PERSON

async function generatePerson() {
  try {
    const person = await fetchPerson();
    addCreatedPersonToList(person);
    appendPersonToBody(person);
  } catch (error) {
    console.log(error);
  }
}

async function fetchPerson() {
  try {
    const person = await fetch(API_URL).then((res) => res.json());
    return createPersonFromData(person.results[0]);
  } catch (error) {
    console.log('Failed to receive API data');
  }
}

function createPersonFromData(person) {
  try {
    return {
      firstName: person.name.first,
      lastName: person.name.last,
      registerDate: Date.parse(person.registered.date),
      nationality: person.nat,
      locationAddress: {
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
  } catch (error) {
    console.log('Person is invalid');
  }
}

function addCreatedPersonToList(person) {
  try {
    localStorage.setItem(
      localStorageKeys.USERS_TABLE,
      JSON.stringify([...readUsers(), person])
    );
  } catch (error) {
    console.log('Cannot add generated user to table');
  }
}






//DISPLAY ELEMENTS

function appendPersonToBody(createdPerson) {
  try {
    getByClassName(classNames.PERSON_DATA).remove();
    appendElement(createPersonDataBody(),classNames.CONTAINER);
    appendFieldsToPersonData(createdPerson);
    appendElement(createAddressCheckBox(),classNames.PERSON_DATA);
    appendElement(createLabelToCheckBox(),classNames.PERSON_DATA);
  } catch (error) {
    appendFieldsToPersonData(createdPerson);
    appendElement(createAddressCheckBox(),classNames.PERSON_DATA);
    appendElement(createLabelToCheckBox(),classNames.PERSON_DATA);
  }
}





//CREATE ELEMENTS

function createPersonContainer() {
  const personContainer = document.createElement('div');
  personContainer.className = classNames.CONTAINER;
  return personContainer;
}

function createPersonDataBody() {
  const personDataBody = document.createElement('div');
  personDataBody.className = classNames.PERSON_DATA;
  return personDataBody;
}

function createField(fieldClass, fieldText) {
  const field = document.createElement('div');
  field.className = fieldClass;
  if(fieldClass === classNames.REGISTER_DATE){
    field.innerHTML = timestampToDate(fieldText);
  }
  else if(fieldClass === classNames.ADDRESS){
    let text = '';
    for(const position in fieldText){
      text += `${fieldText[position]}<br>`;
    }
    field.innerHTML = text;
  }
  else{
    field.innerHTML = fieldText;
  }
  return field;
}

function createAddressCheckBox() {
  const checkBox = document.createElement('input');
  checkBox.id = 'check';
  checkBox.type = 'checkbox';
  checkBox.className = classNames.CHECKBOX;
  checkBox.addEventListener('click', isAddressChecked);
  checkBox.checked = true;
  return checkBox;
}

function createLabelToCheckBox() {
  const label = document.createElement('label');
  label.htmlFor = 'check';
  label.appendChild(document.createTextNode('Show/Hide Address'));
  return label;
}

function generateButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.addEventListener('click', generatePerson);
  button.textContent = 'Generate User';
  button.className = classNames.BUTTON;
  return button;
}

function isAddressChecked() {
  if(getByClassName(classNames.CHECKBOX).checked){
    getByClassName(classNames.ADDRESS).style.display = 'block';
  } else{
    getByClassName(classNames.ADDRESS).style.display = 'none';
  } 
}

function createIconsListContainer() {
  const ul = document.createElement('ul');
  ul.className = 'icons-list';
  return ul;
}

/* function createIcon(fieldName) {
  const li = document.createElement('li');
  li.innerHTML = fieldName;
  return li;
} */

function createLinkToTable() {
  const link = document.createElement('a');
  const linkText = document.createTextNode('Show last 10 registered users');
  link.appendChild(linkText);
  link.addEventListener('click', openPage);
  link.href = 'showRegisteredUsers.html';
  return link;
}

function saveTableToSession(tableToSession) {
  try {
    sessionStorage.setItem(
      localStorageKeys.USERS_TABLE,
      JSON.stringify(tableToSession)
    );
  } catch (error) {
    console.log('Cannot stringify data to session');
  }
}

async function openPage() {
  await sendTableToSession();
}

function sendTableToSession() {
  const registeredUsers = readUsers();
  return new Promise(function (resolve, reject) {
    try {
      if (registeredUsers.length > 10) {
        saveTableToSession(registeredUsers.slice(registeredUsers.length - 10));
      } else {
        saveTableToSession(registeredUsers);
      }
    } catch (error) {
      reject(console.log('Problems with sending data'));
    }
  });
}

function readUsers() {
  return readLocalStorageByKey(localStorageKeys.USERS_TABLE);
}

function appendFieldsToPersonData(createdPerson) {
  for(const field in fieldsTable){
    getByClassName(classNames.PERSON_DATA).appendChild(createField(fieldsTable[field],createdPerson[fieldsTable[field]]));
  }
}





//HELPERS

function readLocalStorageByKey(key) {
  try {
    const users = localStorage.getItem(key);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.log('Failed to read users', error);
  }
}

function timestampToDate(timestamp) {
  const date = new Date(timestamp);
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
