const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const timeElement = document.querySelector(".time p");

const weather = {};

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

function getWeatherByCity(city) {
  const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  fetchWeather(api);
}

function fetchWeather(api) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p>City not found!</p>`;
        return;
      }
      notificationElement.style.display = "none";
      weather.temperature = Math.round(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;

      displayWeather();
    })
    .catch((error) => {
      notificationElement.style.display = "block";
      notificationElement.innerHTML = `<p>Error fetching data</p>`;
    });
}

function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function setTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  timeElement.textContent = `${hours}:${minutes}`;
}

searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  setTime();
});
