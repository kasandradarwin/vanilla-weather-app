function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
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

function displayTemperature(response) {
  console.log(response);

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

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

  // let currentTime = document.querySelector(".time");
  //currentTime.innerHTML = time;
}

let apiKey = "40603cc0b95a9db4d38003ce742650b3";
let cityName = "nanaimo";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
