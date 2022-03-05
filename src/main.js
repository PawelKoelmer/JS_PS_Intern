const API_URL =
  'https://randomuser.me/api/?inc=gender,first,name,nat,location,registered,picture&noinfo';
const localStorageKeys = {
  USERS_TABLE: 'usersTable',
};

const classNames = {
  CONTAINER: 'container',
  CREATE_PERSON_BUTTON: 'generate-button',
  USER_CONTAINER: 'user',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  NATIONALITY: 'nationality',
  REGISTER_DATE: 'registerDate',
  ADDRESS: 'locationAddress',
  CHECKBOX: 'address-checkbox',
  ICON_LIST: 'icons-list'
};

//INITIALIZE

initialize();

function initialize() {
  renderContainer();
  renderNavigation();
}



//FETCH PERSON

async function fetchUser() {
  try {
    const person = await fetch(API_URL).then((res) => res.json());
    return createUser(person.results[0]);
  } catch (error) {
    console.log('Failed to receive API data');
  }
}

// EVENT HANDLERS

async function handleCreateUserClick() {
  try {
    const user = await fetchUser();
    saveUserToLocalStorage(user);
    renderUser(user);
  } catch (error) {
    console.log(error);
  }
}

function handleAddressToggleClick() {
  getByClassName(classNames.ADDRESS).style.display = getByClassName(classNames.CHECKBOX).checked ? 'block' : 'none';
}





function createUser(data) {
  try {
    return {
      firstName: data.name.first,
      lastName: data.name.last,
      registerDate: Date.parse(data.registered.date),
      nationality: data.nat,
      locationAddress: {
        country: data.location.country,
        city: data.location.city,
        state: data.location.state,
        postcode: data.location.postcode,
        street: data.location.street.name,
        houseNumber: data.location.street.number,
      },
      picture: {
        large: data.picture.large,
        medium: data.picture.medium,
        thumbnail: data.picture.thumbnail,
      },
    };
  } catch (error) {
    console.log('Person is invalid');
  }
}

function saveUserToLocalStorage(user) {
  try {
    localStorage.setItem(
      localStorageKeys.USERS_TABLE,
      JSON.stringify([...readUsers(), user])
    );
  } catch (error) {
    console.log('Cannot add generated user to table');
  }
}





// RENDER

function renderContainer() {
  const container = createContainer();
  document.body.appendChild(container);
  container.appendChild(createUserButton());
}

function renderNavigation(){
  document.body.appendChild(createUserListPageLink());  
}

function renderUserContainer() {
  let container = getByClassName(classNames.USER_CONTAINER);
  if (container) {
    container.remove();
  }
  container = createUserContainer();
  getByClassName(classNames.CONTAINER).appendChild(container);
  return container;
}

function renderUser(user) {
  const userContainer = renderUserContainer();
  renderUserFields(user);
  renderToggleUserAddressVisibilityCheckbox(userContainer); 
}

function renderToggleUserAddressVisibilityCheckbox(userContainer) {
  userContainer.appendChild(createToggleUserAddressVisibilityCheckbox());
  userContainer.appendChild(createToggleUserAddressVisibilityCheckboxLabel());
}

function renderUserFields(user) {
  const userDataElem = getByClassName(classNames.USER_CONTAINER);
  for (const key in user) {
    if (!user.hasOwnProperty(key)) {
      continue;
    }
    userDataElem.appendChild(createUserField({
      className: key,
      data: user[key]
    }));
  }
}




// CREATE ELEMENTS

function createContainer() {
  const container = document.createElement('div');
  container.className = classNames.CONTAINER;
  return container;
}

function createUserContainer() {
  const container = document.createElement('div');
  container.className = classNames.USER_CONTAINER;
  return container;
}

function createUserField({ className, data }) {
  const field = document.createElement('div');
  field.className = className;

  if (className === classNames.REGISTER_DATE) {
    field.innerText = timestampToFormattedDateString(data);
  } 
  else if (className === classNames.ADDRESS) {
    createUserAddressFields(data).forEach((addressField) => field.appendChild(addressField));
  }
  else {
    field.innerText = data;
  }
  return field;
}

function createUserAddressFields(address) {
  const fields = [];
  for (const key in address) {
    if (!address.hasOwnProperty(key)) {
      continue;
    }
    const field = document.createElement('div');
    field.className = key;
    field.innerText = address[key];
    fields.push(field);
  }
  return fields;
}

function createToggleUserAddressVisibilityCheckbox() {
  const checkBox = document.createElement('input');
  checkBox.id = 'check';
  checkBox.type = 'checkbox';
  checkBox.className = classNames.CHECKBOX;
  checkBox.checked = true;
  checkBox.addEventListener('click', handleAddressToggleClick);
  return checkBox;
}

function createToggleUserAddressVisibilityCheckboxLabel() {
  const label = document.createElement('label');
  label.htmlFor = 'check';
  label.innerText = 'Show/Hide Address';
  return label;
}

function createUserButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.innerText = 'Generate User';
  button.className = classNames.CREATE_PERSON_BUTTON;
  button.addEventListener('click', handleCreateUserClick);
  return button;
}

function createUserListPageLink() {
  const link = document.createElement('a');
  link.innerText = 'Show last 10 registered users';
  link.href = 'showRegisteredUsers.html';
  return link;
}




// HELPERS

function readUsers() {
  return readLocalStorageByKey(localStorageKeys.USERS_TABLE);
}

function readLocalStorageByKey(key) {
  try {
    const users = localStorage.getItem(key);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.log('Failed to read users', error);
  }
}

function timestampToFormattedDateString(timestamp) {
  const date = new Date(timestamp);
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

