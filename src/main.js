var apiURL =
  "https://randomuser.me/api/?inc=gender,first,name,nat,location,registered,picture&noinfo";
var result;

main();

function main() {
  generateButton();
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
          createdPerson = {
            FirstName: p.name.first,
            LastName: p.name.last,
            RegisterDate: p.registered.date,
            Nationality: p.nat,
            LocationAdress: {
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
        resolve(createdPerson);
      });
  });
}

function createPerson(createdPerson) {
  addField("firstName", createdPerson.FirstName);
  addField("lastName", createdPerson.LastName);
  addField(
    "address",
    `${createdPerson.LocationAdress.city}<br>${createdPerson.LocationAdress.state}<br>${createdPerson.LocationAdress.postcode}<br>${createdPerson.LocationAdress.street}<br>${createdPerson.LocationAdress.houseNumber}`
  );
  addField("nationality", createdPerson.Nationality);
  addField("registeredDate", createdPerson.RegisterDate);
  generateCheckBox();
}

function updatePerson(createdPerson) {
  updateField("firstName", createdPerson.FirstName);
  updateField("lastName", createdPerson.LastName);
  updateField(
    "address",
    `${createdPerson.LocationAdress.city}<br>${createdPerson.LocationAdress.state}<br>${createdPerson.LocationAdress.postcode}<br>${createdPerson.LocationAdress.street}<br>${createdPerson.LocationAdress.houseNumber}`
  );
  updateField("nationality", createdPerson.Nationality);
  updateField("registeredDate", createdPerson.RegisterDate);
  generateCheckBox()
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

function checkCheckbox(){
  if(document.getElementsByClassName("adress-checkbox")[0].checked){
    document.getElementsByClassName("address")[0].style.display = "block";
  }else
    document.getElementsByClassName("address")[0].style.display = "none";
}
