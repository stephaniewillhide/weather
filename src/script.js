let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[currentTime.getDay()];
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

let timeElement = document.querySelector("#current-time");
timeElement.innerHTML = formatDate(currentTime);

let form = document.querySelector("form");
form.addEventListener("submit", returnCity);

function returnCity(event) {
  event.preventDefault();
  let input = document.querySelector("#form").value;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = input;
  let apiKey = "ed136b54c46892c2f08167afd8eae8a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&&units=imperial`;

  function showTemperature(response) {
    let temp = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temp}°F`;
  }
  axios.get(apiUrl).then(showTemperature);
}

function showInitialTemperature(response) {
  console.log(response);
  let initialTemperatureElement = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  initialTemperatureElement.innerHTML = `${temp}°F`;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ed136b54c46892c2f08167afd8eae8a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=imperial`;

  console.log(apiUrl);

  axios.get(apiUrl).then(showInitialTemperature);
}

navigator.geolocation.getCurrentPosition(getPosition);
