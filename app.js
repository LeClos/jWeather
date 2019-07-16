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
          // making location look nicer
          var theLocation = data.timezone;
          var timezone1 = theLocation.split('/');
          var first = timezone1[1];
          var second = timezone1[0];
          var newWord = first.concat(", ", second);
          locationTimezone.innerHTML = newWord;
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

// getting time
var d = new Date();
document.getElementById("demo").innerHTML = d;

// Function to change webpage background color
function changeBodyBg(color) {
  document.body.style.background = color;
}

// Function to change button background color
function changeButtonBg(color) {
  document.getElementById("theme").style.background = color;
}

// changing themes
var but = document.querySelector('#theme');
but.addEventListener("click", function (event) {
  if (document.body.style.background != 'orange') {
    changeBodyBg('orange')
    changeButtonBg('linear-gradient(rgb(47, 150, 163), rgb(48, 62, 143))');
    document.getElementById("theme").style.color = "white";
    document.getElementById("degree").style.color = "black";
    document.getElementById("symbol").style.color = "black";
    document.getElementById("des").style.color = "black";
    document.getElementById("tz").style.color = "black";
    document.getElementById("info").style.color = "black";
    document.getElementById("demo").style.color = "black";
    document.getElementById("mybtn").style.background = "orange";
    document.getElementById("mybtn").style.color = "black";
  } else {
    changeBodyBg('linear-gradient(rgb(47, 150, 163), rgb(48, 62, 143))');
    changeButtonBg('orange');
    document.getElementById("theme").style.color = "black";
    document.getElementById("degree").style.color = "rgb(255, 204, 95)";
    document.getElementById("symbol").style.color = "rgb(255, 204, 95)";
    document.getElementById("des").style.color = "white";
    document.getElementById("tz").style.color = "white";
    document.getElementById("info").style.color = "white";
    document.getElementById("demo").style.color = "white";
    document.getElementById("mybtn").style.background = 'linear-gradient(rgb(47, 150, 163), rgb(48, 62, 143))';
    document.getElementById("mybtn").style.color = "white";
  }

});