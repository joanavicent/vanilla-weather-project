function formatDate(timestamp) {
  let date= new Date(timestamp);
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
  let date= new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
return `${hours}:${minutes}`;
}
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function displayForecast(response){
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast=null;

  for (let index = 0; index < 6; index++) {
  forecast=response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col">
           <div class="card">
            <i class="fas fa-cloud-rain rain">
            </i>
            <div class="card-body">
              <p class="card-temperature">
              <strong>
              ${Math.round(forecast.main.temp_max)}°
              </strong>
              ${Math.round(forecast.main.temp_min)}°
              </p>
                <hr />
                <p class="card-day">
                  ${formatHours(forecast.dt * 1000)}
                </p>
            </div>
          </div>
        </div> 
  `;
  }
}

function searchCity(city) {
  let apiKey = "88bb6b7ed04faa186d338b9c9e0be6e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}


let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", search);
