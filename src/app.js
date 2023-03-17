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

function getForecast(coordinates) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="forecast-day">${day}</div>
              <img src="#" alt="" />
              <div class="forecast-temperature">
                <span class="forecast-temperature-max">8°</span>
                <span class="forecast-temperature-min">-2°</span>
              </div>
            </div>    
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  mainCelsius = response.data.main.temp;

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

  getForecast(response.data.coord);
}

function citySearch(cityInput) {
  let apiKey = "e8c37959c3602ea4b3c235c19a41dd37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  citySearch(cityInput.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let Fah = (mainCelsius * 9) / 5 + 32;
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = Math.round(Fah);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = Math.round(mainCelsius);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let mainCelsius = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

citySearch("Toronto");

displayForecast();
