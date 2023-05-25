// API key
const apiKey = "1850c488fdbe3a1cd0ab670585eea465";

// DOM elements
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const searchedCities = document.getElementById("searchedCities");
const currentCity = document.getElementById("currentCity");
const currentDate = document.getElementById("currentDate");
const currentIcon = document.getElementById("currentIcon");
const currentTemperature = document.getElementById("currentTemperature");
const currentHumidity = document.getElementById("currentHumidity");
const currentWind = document.getElementById("currentWind");
const currentUVIndex = document.getElementById("currentUVIndex");
const day1 = document.getElementById("day1");
const day1Icon = document.getElementById("day1Icon");
const day1Temp = document.getElementById("day1Temp");
const day1Humidity = document.getElementById("day1Humidity");
const day2 = document.getElementById("day2");
const day2Icon = document.getElementById("day2Icon");
const day2Temp = document.getElementById("day2Temp");
const day2Humidity = document.getElementById("day2Humidity");
const day3 = document.getElementById("day3");
const day3Icon = document.getElementById("day3Icon");
const day3Temp = document.getElementById("day3Temp");
const day3Humidity = document.getElementById("day3Humidity");
const day4 = document.getElementById("day4");
const day4Icon = document.getElementById("day4Icon");
const day4Temp = document.getElementById("day4Temp");
const day4Humidity = document.getElementById("day4Humidity");
const day5 = document.getElementById("day5");
const day5Icon = document.getElementById("day5Icon");
const day5Temp = document.getElementById("day5Temp");
const day5Humidity = document.getElementById("day5Humidity");

// Retrieve the searched cities from local storage
var searchedCitiesArr =
  JSON.parse(localStorage.getItem("searchedCities")) || [];

// Function to handle the search
function handleSearch(event) {
  event.preventDefault();

  const city = searchBar.value.trim();
  if (city !== "") {
    getWeather(city);
    searchBar.value = "";

    // Add the city to the searched cities array
    searchedCitiesArr.unshift(city);

    // Limit the number of saved cities to 8
    if (searchedCitiesArr.length > 8) {
      searchedCitiesArr.pop();
    }

    // Save the updated searched cities array in local storage
    localStorage.setItem("searchedCities", JSON.stringify(searchedCitiesArr));

    // Display the searched cities
    displaySearchedCities();
  }
}

// Function to display the searched cities
function displaySearchedCities() {
  searchedCities.innerHTML = "";

  for (let i = 0; i < searchedCitiesArr.length; i++) {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("searchedCity");
    cityDiv.textContent = searchedCitiesArr[i];
    searchedCities.appendChild(cityDiv);
  }
}

// Add event listeners
searchButton.addEventListener("click", handleSearch);
searchedCities.addEventListener("click", function (e) {
  if (e.target.classList.contains("searchedCity")) {
    const city = e.target.innerText;
    getWeather(city);
  }
});
// Fetch weather data from API
function getWeather(city) {
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  // Fetch current weather
  fetch(currentWeatherURL)
    .then((response) => response.json())
    .then((data) => {
      // Display current weather
      displayCurrentWeather(data);

      // Fetch forecast
      fetch(forecastURL)
        .then((response) => response.json())
        .then((data) => {
          // Display forecast
          displayForecast(data);
        })
        .catch((error) => console.log("Error fetching forecast:", error));
    })
    .catch((error) => console.log("Error fetching current weather:", error));
}
// Display current weather data
function displayCurrentWeather(data) {
  const cityName = data.name;
  const date = new Date().toLocaleDateString("en-US");
  const iconCode = data.weather[0].icon;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  // Set current weather values in the DOM
  currentCity.textContent = cityName;
  currentDate.textContent = date;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/w/${iconCode}.png`
  );
  currentTemperature.textContent = temperature.toFixed(1);
  currentHumidity.textContent = humidity;
  currentWind.textContent = windSpeed.toFixed(1);

  // Fetch UV index
  const uvIndexURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
  fetch(uvIndexURL)
    .then((response) => response.json())
    .then((data) => {
      const uvIndex = data.value;
      currentUVIndex.textContent = uvIndex;

      // Change the background color of the UV index according to its value
      if (uvIndex < 3) {
        currentUVIndex.style.backgroundColor = "green";
      } else if (uvIndex < 6) {
        currentUVIndex.style.backgroundColor = "yellow";
      } else {
        currentUVIndex.style.backgroundColor = "red";
      }

      // Adjust text color for visibility against the background color
      currentUVIndex.style.color = "black";
    })
    .catch((error) => console.log("Error fetching UV index:", error));
}
// Display forecast data
function displayForecast(data) {
  const forecastList = data.list;
  const forecastData = [];

  // Filter forecast data for 12:00 PM each day
  for (let i = 0; i < forecastList.length; i++) {
    const forecastTime = forecastList[i].dt_txt.split(" ")[1];
    if (forecastTime === "12:00:00") {
      forecastData.push(forecastList[i]);
    }
  }

  // Set forecast values in the DOM
  for (let i = 0; i < forecastData.length; i++) {
    const forecast = forecastData[i];
    const date = new Date(forecast.dt_txt).toLocaleDateString("en-US");
    const iconCode = forecast.weather[0].icon;
    const temperature = forecast.main.temp;
    const humidity = forecast.main.humidity;

    // Set values for each forecast day
    switch (i) {
      case 0:
        day1.textContent = date;
        day1Icon.setAttribute(
          "src",
          `http://openweathermap.org/img/w/${iconCode}.png`
        );
        day1Temp.textContent = temperature.toFixed(1);
        day1Humidity.textContent = humidity;
        break;
      case 1:
        day2.textContent = date;
        day2Icon.setAttribute(
          "src",
          `http://openweathermap.org/img/w/${iconCode}.png`
        );
        day2Temp.textContent = temperature.toFixed(1);
        day2Humidity.textContent = humidity;
        break;
      case 2:
        day3.textContent = date;
        day3Icon.setAttribute(
          "src",
          `http://openweathermap.org/img/w/${iconCode}.png`
        );
        day3Temp.textContent = temperature.toFixed(1);
        day3Humidity.textContent = humidity;
        break;
      case 3:
        day4.textContent = date;
        day4Icon.setAttribute(
          "src",
          `http://openweathermap.org/img/w/${iconCode}.png`
        );
        day4Temp.textContent = temperature.toFixed(1);
        day4Humidity.textContent = humidity;
        break;
      case 4:
        day5.textContent = date;
        day5Icon.setAttribute(
          "src",
          `http://openweathermap.org/img/w/${iconCode}.png`
        );
        day5Temp.textContent = temperature.toFixed(1);
        day5Humidity.textContent = humidity;
        break;
      default:
        break;
    }
  }
}

// Load weather for a default city on page load
window.addEventListener("load", function () {
  const defaultCity = "New York";
  getWeather(defaultCity);

  // Display the searched cities on page load
  displaySearchedCities();
});
