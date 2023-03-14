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
  mainWind.innerHTML = Math.roumd(response.data.wind.speed);
}

let apiKey = "e8c37959c3602ea4b3c235c19a41dd37";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
