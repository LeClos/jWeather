// When page loads, this fucntion will comence
window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature')
  let buttonName = document.querySelector('.btn')
  const temperatureSpan = document.querySelector('.temperature span')

  // getting position of user
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/a6fadd4e118b34a158ab75ddd4f2cdaa/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {
            temperature,
            summary,
            icon
          } = data.currently;
          console.log(data);
          // Set DOM Elements from the API
          temperatureDegree.textContent = Math.round(((temperature - 32) * (5 / 9)));
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Set icons
          setIcons(icon, document.querySelector('.icon'));

          // Change to F
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.round(temperature);
              buttonName.textContent = "Click for Celsius"
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.round(((temperature - 32) * (5 / 9)));
              buttonName.textContent = "Click for Fahrenheit"
            }
          })
        });
    });

  } else {
    h1.textContent = "Please allow location for browser"
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({
      color: 'white'
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});