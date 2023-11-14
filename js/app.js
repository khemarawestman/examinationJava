async function getAPIKey() {
  // Gör en POST-förfrågan för att hämta API-nyckeln
  const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
    method: "POST"
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  console.log(data);
  // Returnerar API-nyckeln från datan
  return data.key;
}

// Hämtar planetdata
async function fetchPlanets() {
  // Hämtar API-nyckeln
  const key = await getAPIKey();
  if (!key) {
    console.log('No API key retrieved');
  }
  const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
    headers: { "x-zocom": `${key}` }
  });
  if (!response.ok) {
    console.log(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data.bodies);
  return data.bodies; 
}

// Hämtar planetdata och ställer in händelsehantering
async function setup() {
   // Hämtar planetdata
  const planetData = await fetchPlanets();
  // Om planetdata finns, ställ in klickhändelser och modalfönsterhändelser
  if (planetData) {
    setupClicks(planetData);
    setupModal();
  }
}
// Eventlistener som väntar tills DOM är helt laddad
document.addEventListener('DOMContentLoaded', () => {

  setup();
});

// Ställer in klickhändelser för varje planet-element

function setupClicks(planetsData) {
   // Lägger till en klickhändelse som visar planetinformation
  document.querySelectorAll('.planet').forEach(planetElement => {
    planetElement.addEventListener('click', () => showInfo(planetsData, planetElement.id));
  });
}
// Visar detaljerad information om en planet när en planet-element klickas
function showInfo (planetsData, planetId) {
  const planet = planetsData.find(p => p.name.toLowerCase() === planetId);
  if (!planet) return;

  const planetInfoHtml =
  `
  <div class = containinfo>
    <h3> ${planet.name}</h3>
    <p class="latin-name">${planet.latinName}</p>
    <p class="description"> ${planet.desc}</p>
  </div>
    <div class=footer >
    <p class="circumference underborder">CIRCUMFERENCE<br><span>${planet.circumference}</span></p>
    <p class="day-temperature underborder">MAX TEMPERATURE (Day)<br> <span>${planet.temp.day}°C</span></p>
    <p class="month ">MÅNAR<br> <span>${planet.moons.join(", ")} </span></p>
    </div>
    
    <div class="distance-from-sun">
   
    <p class="distance underborder">DISTANCE FROM THE SUN <br> <span>${planet.distance} KM</span></p>
    <p class="night-temperature underborder">MAX TEMPERATURE (Night)<br> <span> ${planet.temp.night}°C </span></p>
   
  </div>

  `;
  const planetInfoElement = document.getElementById('planet-info');
  planetInfoElement.innerHTML = planetInfoHtml;
  document.getElementById('planetModal').style.display = 'flex';
}

// Ställer in händelser för att stänga modalfönstret
function setupModal() {
  const modal = document.getElementById('planetModal');
  document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = "none";
  });
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "flex";
    }
  });
}