var apiURL = "https://randomuser.me/api/";
function generateButton() {
  var button = document.createElement("button");
  button.addEventListener("click", generatePerson);
  button.textContent = "Generuj osobę";
  button.setAttribute("class", "generate-Button");
  document.getElementById("personGenerator").appendChild(button);
}

async function generatePerson() {
  var result = await getData();
  createPerson(result);
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
            RegisterDate: p.registered.date,
            Nationality: p.nat,
            LocationAdress: {
              city: p.location.city,
              strate: p.location.state,
              postcode: p.location.postcode,
              street: p.location.street.name,
              houseNumber: p.location.street.number,
            },
            Picture: {
              large: p.picture.large,
              medium: p.picture.medium,
              thumbnail: p.picture.thumbnail
            }
          };
        });
        resolve(createdPerson);
      });
  });
}

function createPerson(createdPerson) {
  const generatedPerson = document.createElement("div");
  generatedPerson.textContent = JSON.stringify(createdPerson);
  document.getElementById("personGenerator").appendChild(generatedPerson);
}

