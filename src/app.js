//DATE
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

//TIME
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

//CITY & TEMPERATURE
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

//WIND, HUMIDITY & DESCRIPTION
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  
  celsiusTemperature=response.data.main.temp;
}

//FORECAST
function displayForecast(response){
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast=null;

  for (let index = 0; index < 6; index++) {
  forecast=response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col">
           <div class="card">
            ${getWeatherIcon(forecast.weather[0].icon)}
            <div class="card-body">
            <p class="card-temperature">
              ${Math.round(forecast.main.temp)}°
              </strong>
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
function getWeatherIcon(icon){
  if(icon==="01d"||icon==="01n"){
    return `<i class="fas fa-cloud-rain rain"></i>`;
  }else if(icon==="02d"||icon==="02n"){
    return `<i class="fas fa-cloud-rain rain"></i>`;
  }else{
    return "";
  }
}

//SEARCH CITY & DISPLAY WEATHER & FORECAST
function searchCity(city) {
  let apiKey = "88bb6b7ed04faa186d338b9c9e0be6e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

//CONVERT FAHRENHEIT
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//CONVERT CELSIUS
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//SEARCH CITY
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

//GEOLOCATION
function showPosition(position){
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let unit="metric";
  let apiKey = "88bb6b7ed04faa186d338b9c9e0be6e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


//CURRENT POSITION
function handleCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//GLOBAL VARIABLES
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature=null;

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", search);

let currentLocation=document.querySelector("#current-location-button");
currentLocation.addEventListener("click", handleCurrentLocation);

searchCity("Lisbon");