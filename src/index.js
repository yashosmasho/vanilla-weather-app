function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let weatherForecast = document.querySelector("#forecast");

  let weatherForecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      weatherForecastHTML =
        weatherForecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date"><h4>
        ${formatDay(forecastDay.dt)}</h4></div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"><strong>${Math.round(
            forecastDay.temp.max
          )}° </strong></span> | <span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
        </div>
      </div>
  `;
    }
  });

  weatherForecastHTML = weatherForecastHTML + `</div>`;
  weatherForecast.innerHTML = weatherForecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "938a807e7f1ca26a89a29e8d800f3a6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function getTemp(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;

  let temperature = document.querySelector("#main-temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let overview = document.querySelector("#overview");
  overview.innerHTML = response.data.weather[0].description;

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "938a807e7f1ca26a89a29e8d800f3a6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-search");
  search(searchCity.value);
}

let searchNow = document.querySelector("#search-form");
searchNow.addEventListener("submit", handleSubmit);

search("Adelaide");

function getFahrenheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  mainTemp.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", getFahrenheit);

function getCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let mainTemp = document.querySelector("#main-temperature");
  mainTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", getCelsius);

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
