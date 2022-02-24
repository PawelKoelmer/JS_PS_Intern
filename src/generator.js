var apiURL = "https://randomuser.me/api/";
var cachedData;

function generateButton() {
  var button = document.createElement("button");
  button.addEventListener("click", generatePerson);
  button.textContent = "Generuj osobę";
  button.setAttribute("class", "generate-Button");
  document.getElementById("personGenerator").appendChild(button);
}

function generatePerson() {
  getData();
}

function getData() {
  return fetch(apiURL)
    .then((res) => res.json())
    .then( data =>{
      let person = data.results;

      person.map(function(p){
          console.log(p.gender)
      })
    }
      
      
    )
}
