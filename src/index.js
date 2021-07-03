let now = new Date();

let currentDay = document.querySelector("#current-day");
{
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  currentDay.innerHTML = `${day}, ${hours}:${minutes}`;
}

//

function getTemp(response) {
  let cityName = document.querySelector("#city-name");
  let city = response.data.name;
  cityName.innerHTML = `${city}`;

  let temperature = document.querySelector("#main-temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-search");
  let cityHeading = document.querySelector("#city-name");
  cityHeading.innerHTML = `${searchCity.value}`;

  let city = `${searchCity.value}`;
  let apiKey = "938a807e7f1ca26a89a29e8d800f3a6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}
let searchNow = document.querySelector("#search-form");
searchNow.addEventListener("submit", search);

//

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "938a807e7f1ca26a89a29e8d800f3a6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
