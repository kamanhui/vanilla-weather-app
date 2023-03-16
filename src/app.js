function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
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
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = Math.round(response.data.main.temp);

  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = response.data.name;

  let mainDescription = document.querySelector("#main-description");
  mainDescription.innerHTML = response.data.weather[0].description;

  let mainHumidity = document.querySelector("#main-humidity");
  mainHumidity.innerHTML = response.data.main.humidity;

  let mainWind = document.querySelector("#main-wind");
  mainWind.innerHTML = Math.round(response.data.wind.speed);

  let mainTime = document.querySelector("#main-time");
  mainTime.innerHTML = formatDate(response.data.dt * 1000);

  let mainWeatherIcon = document.querySelector("#main-weather-icon");
  let iconId = response.data.weather[0].icon;
  mainWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconId}@2x.png`
  );
  mainWeatherIcon.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "e8c37959c3602ea4b3c235c19a41dd37";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
