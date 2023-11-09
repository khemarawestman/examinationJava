/*¨ fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
  method: "POST"
})
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });

  */
 
  async function getApi() {
    try {
      const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
        method: "GET",
        headers: { "x-zocom": "solaris-B2mWxADrthdHqd22" },
      });
  
      const data = await response.json();
      console.log(data);
  
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
 
  getApi();
 


 // app.js
// Add interactivity to the planets with API integration

const planets = document.querySelectorAll('.planet');

planets.forEach(planet => {
  planet.addEventListener('click', handleClick);
});

function handleClick(event) {
  const planet = event.target;
  const planetId = planet.id;

  fetchPlanetInfo(planetId)
    .then(data => {
      // Process the returned data
      console.log(data);
      const planetName = data.name;
      const latinName = data.latinName;
      const rotationPeriod = data.rotation;

      // Display the data on the webpage or perform additional actions
      const planetInfo = `Planet: ${planetName}
        Latin Name: ${latinName}
        Rotation Period: ${rotationPeriod} hours`;

      console.log(planetInfo);
    })
    .catch(error => {
      console.error(error);
    });
}

function fetchPlanetInfo(planetId) {
  const apiUrl = `https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies/${planetId}`;

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch planet info');
      }
      return response.json();
    });
}
