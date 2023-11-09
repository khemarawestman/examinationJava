document.addEventListener('DOMContentLoaded', () => {
  // Fetch planet data and set up click events when the document is ready
  fetchPlanetDataAndSetup();
});

async function fetchPlanetDataAndSetup() {
  const planetData = await fetchPlanetData();
  if (planetData) {
    setupClickEvents(planetData);
    setupModalCloseEvents();
  }
}
async function fetchPlanetData() {
  try {
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
      headers: { "x-zocom": "solaris-1Cqgm3S6nlMechWO" }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log(data.bodies);
    return data.bodies; // Returns the planet data
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}



function setupClickEvents(planetsData) {
  document.querySelectorAll('.planet').forEach(planetElement => {
    planetElement.addEventListener('click', () => displayPlanetInfo(planetsData, planetElement.id));
  });
}

function displayPlanetInfo(planetsData, planetId) {
  const planet = planetsData.find(p => p.name.toLowerCase() === planetId);
  if (!planet) return;

  const planetInfoHtml =
  `
  <div class="planet-info">
  <div class = containinfo>
    <h3> ${planet.name}</h3>
    <p class="latin-name">${planet.latinName}</p>
    <p class="description"> ${planet.desc}</p>
  </div>
  <div class="planetinfo">
  
  </div>
    <div class=footer >
    <p class="circumference">CIRCUMFERENCE<br>${planet.circumference}</p>
    <p class="rotation">Rotation Period<br> ${planet.rotation}</p>
    <p class="day-temperature">MAX TEMPERATURE (Day)<br> ${planet.temp.day}°C</p>
    
    </div>
    <div class="distance-from-sun">
   
    <p class="distance">DISTANCE FROM THE SUN <br> ${planet.distance} KM</p>
    <p class="night-temperature">MAX TEMPERATURE (Night)<br> ${planet.temp.night}°C</p>
   
  </div>

  </div>`;
  const planetInfoElement = document.getElementById('planet-info');
  planetInfoElement.innerHTML = planetInfoHtml;
  document.getElementById('planetModal').style.display = 'block';
}

function setupModalCloseEvents() {
  const modal = document.getElementById('planetModal');
  document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = "none";
  });
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

