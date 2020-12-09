// Write your JavaScript code here!
window.addEventListener("load", function() {
   init();
});

let pilotName = document.getElementById("pilotName");
let copilotName = document.getElementById("copilotName");
let fuelLevel = document.getElementById("fuelLevel");
let cargoMass = document.getElementById("cargoMass");
let formSubmit = document.getElementById("formSubmit");
let pilotStatus = document.getElementById("pilotStatus");
let copilotStatus = document.getElementById("copilotStatus");
let faultyItems = document.getElementById("faultyItems");
let fuelStatus = document.getElementById("fuelStatus");
let cargoStatus = document.getElementById("cargoStatus");
let launchStatus = document.getElementById("launchStatus");


function init() {

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {

         const missionTarget = document.querySelector("#missionTarget");
         
         for (let i = 0; i < json.length; i++) {
            let planet = json
            planet[i] = json[Math.floor((Math.random() * json.length))];
         
            missionTarget.innerHTML = `

               <h2> Mission Destination</h2>
               <ol>
                  <li>Name: ${planet[i].name}</li>
                  <li>Diameter: ${planet[i].diameter}</li>
                  <li>Star: ${planet[i].star}</li>
                  <li>Distance from Earth: ${planet[i].distance}</li>
                  <li>Number of Moons: ${planet[i].moons}</li>
               </ol>
               <img src="${planet[i].image}"></img>

            `;
         }
      });
   });

   
   formSubmit.addEventListener("click", function(event) {
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields required.");
      } else if (typeof pilotName.value !== "string" || typeof copilotName.value !== "string") {
         alert("Please enter a valid name.");
      } else if (isNaN(fuelLevel.value)) {
         alert("Please enter a valid number for fuel level.");
      } else if (isNaN(cargoMass.value)) {
         alert("Please enter a valid number for cargo mass.");
      } else {
         event.preventDefault();
         
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;

         if (fuelLevel.value < 10000) {
            faultyItems.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
         } else if (cargoMass.value > 10000) {
            faultyItems.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass too great for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
         } else {
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green";
         }
         
      }
      
   });

};



/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


