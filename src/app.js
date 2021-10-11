function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours > 12) {
    hours = hours - 12;
  }

  let minutes = date.getMinutes();
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
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
        </div>
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="45"
          />
          <div class= weather-forecast-temperatures>
           <span class="weather-forecast-temperature-max"> ${Math.round(
             forecastDay.temp.max
           )}</span>°
<span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )} </span>°
          </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div >`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "40603cc0b95a9db4d38003ce742650b3";
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response);

  celsiusTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let city = document.querySelector(".cityName");
  city.innerHTML = response.data.name;
  console.log(response.data.name);

  let description = document.querySelector(".descrip");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector(".humid");
  humidity.innerHTML = response.data.main.humidity;

  let windspeed = document.querySelector(".wind");
  windspeed.innerHTML = Math.round(response.data.wind.speed);

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png
    `
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "40603cc0b95a9db4d38003ce742650b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Nanaimo");
displayForecast();
