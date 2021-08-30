//In your project, display the current date and time using JavaScript: Tuesday 16:00

function formatDate() {
  let now = new Date();
  let currentDayOfMonth = now.getDate();
  let currentYear = now.getFullYear();
  let currentTime = String(now.getHours()).padStart(2, "0");
  let currentMinutes = String(now.getMinutes()).padStart(2, "0");
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = now.getMonth();
  months = months[currentMonth];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = now.getDay();
  days = days[day];

  let newDate = `${days}, ${months} ${currentDayOfMonth}, ${currentYear} ${currentTime}:${currentMinutes}`;
  let today = document.querySelector("#current-date");
  today.innerHTML = newDate;
}

formatDate();

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

//Display temp of searched city
function displayTemp(response) {
  console.log(response.data);
  console.log(response.data.main.temp);

  let temp = Math.round(response.data.main.temp);
  let tempC = document.querySelector("#temperature");
  tempC.innerHTML = temp;

  //Weather description
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;

  //Display Min and Max temperature
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMinimal = document.querySelector(".lowest-temp");
  let tempMaximal = document.querySelector(".highest-temp");
  tempMinimal.innerHTML = `${tempMin}°C`;
  tempMaximal.innerHTML = `${tempMax}°C`;

  //Display humidity
  let humidity = Math.round(response.data.main.humidity);
  let levelHumidity = document.querySelector(".humidity");
  levelHumidity.innerHTML = `Humidity: ${humidity}%`;

  //Display wind speed
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;

  celsiusTemperature = response.data.main.temp;

  let city = document.querySelector("#chosen-city");
  city.innerHTML = response.data.name;
}

//Display searched city
function enteredCity(event) {
  event.preventDefault();
  let input = document.querySelector("#entered-city");
  let apiKey = "24154979b6ec1ef396150cc6787ea89e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enteredCity);

//Current location temperature button
function exactLocation(position) {
  let apiKey = "24154979b6ec1ef396150cc6787ea89e";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}${unit}`;

  axios.get(apiUrl).then(displayTemp);
}

function exactButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(exactLocation);
}

let exact = document.querySelector("#exact-location");
exact.addEventListener("click", exactButton);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
