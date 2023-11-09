// Add interactivity to the planets with API integration

const planets = document.querySelectorAll('.planet');
const planetInfoElement = document.getElementById('planet-info');

planets.forEach(planet => {
  planet.addEventListener('click', handleClick);
});

async function handleClick(event) {
  try {
    const planet = event.target;
    const planetId = planet.id;

    const data = await fetchPlanetInfo(planetId);
    console.log(data);

    // Process the returned data
    const planetName = data.name;
    const latinName = data.latinName;
    const rotationPeriod = data.rotation;

    // Update the HTML content with the planet information
    const planetInfo = `
      <h3>Planet: ${planetName}</h3>
      <p>Latin Name: ${latinName}</p>
      <p>Rotation Period: ${rotationPeriod} hours</p>
    `;
    planetInfoElement.innerHTML = planetInfo;

  } catch (error) {
    console.error(error);
  }
}

function fetchPlanetInfo(planetId) {
  const apiUrl = `https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies/${id}`;

  return fetch(apiUrl, {
      headers: {
        'x-zocom': 'solaris-B2mWxADrthdHqd22'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch planet info');
      }
      return response.json();
    });
}
