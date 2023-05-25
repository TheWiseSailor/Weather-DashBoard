//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
//I want to make it to where the whole thing is centered on the screen, to which is functional with no flaws in the console or the network
//no errors in the console log when ran
//getting started with my api key
const apiKey = "1850c488fdbe3a1cd0ab670585eea465";
//getting this all over with, starting with all the DOM elements, ive made way too many in the html
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const searchedCities = document.getElementById("searchedCities");
const currentCity = document.getElementById("currentCity");
const currentDate = document.getElementById("currentDate");
const currentIcon = document.getElementById("currentIcon");
const currentTemperature = document.getElementById("currentTemperature");
const currentHumidity = document.getElementById("currentHumidity");
const currentWind = document.getElementById("currentWind");
const CurrentUVIndex = document.getElementById("CurrentUVIndex");
const day1 = document.getElementById("day1");
const day1Icon = document.getElementById("day1Icon");
const day1Temp = document.getElementById("day1Temp");
const day1Humidity = document.getElementById("day1Humidity");
const day2 = document.getElementById("day2");
const day2Icon = document.getElementById("day2Icon");
const day2Temp = document.getElementById("day2Temp");
const day2humidity = document.getElementById("day2humidity");
const day3 = document.getElementById("day3");
const day3Icon = document.getElementById("day3Icon");
const day3Temp = document.getElementById("day3Temp");
const day3Humidity = document.getElementById("day3Humidity");
const day4 = document.getElementById("day4");
const day4Icon = document.getElementById("day4Icon");
const day4Temp = document.getElementById("day4Temp");
const day4humidity = document.getElementById("day4humidity");
const day5 = document.getElementById("day5");
const day5Icon = document.getElementById("day5Icon");
const day5Temp = document.getElementById("day5Temp");
const day5humidity = document.getElementById("day5humidity");

//thisn will retrieve the searched cities from local storage
var searchedCitiesArr =
  JSON.parse(localStorage.getItem("searchedCities")) || [];

//this will be a function to handle the search bar
function handleSearch(event) {
  event.preventDefault();

  const city = searchBar.ariaValueMax.trim();
  if (city !== "") {
    getWeather(city);
    searchBar.value = "";
    //adding the city cities to the cities array
    searchedCitiesArr.unshift(city);
    //limiting the number of saved cities to 8 so that way it wont cover the entire left portion of the screen and cause any lagg issues if u start to go over a certain number
    if (searchedCitiesArr.length > 8) {
      searchedCitiesArr.pop();
    }
    //now to make a localstoraghe for the searched cities array in the local storage
    localStorage.setItem("searchedCities", JSON.stringify(searchedCitiesArr));
    //making it to where it displays the searched cities
    displaySearchedCities();
  }
}
//now I need to make the function to display the searched citi9es

function displaySearchedCities() {
  searchedCities.innerHTML = "";

  for (let i = 0; i < searchedCitiesArr.length; i++) {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("searchedCity");
    cityDiv.textContent = searchedCitiesArr[i];
    searchedCities.appendChild(cityDiv);
  }
}

function handleSearch() {
  // Your search functionality implementation
  searchButton.addEventListener("click", handleSearch);

  searchedCities.addEventListener("click", ({ target }) => {
    if (target.classList.contains("searchedCity")) {
      const city = target.innerText;
      getWeather(city);
    }
  });
}
function getWeather(city) {
  const apiKey = "db7e8293fc07aa24abd5218fa943315d";
  const encodedCity = encodeURIComponent(city);
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  //fetching the current weather
  fetch(currentWeatherURL)
    .then((response) => response.json())
    .then((data) => {
      // Display current weather
      displayCurrentWeather(data);
      const currentWeatherURL =
        "http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1527811200&opacity=0.9&fill_bound=true&appid={API key}";
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
//dispplaying current weather data
function displayCurrentWeather(data) {
  const cityName = data.name;
  const iconCode = data.weather[0].icon;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  //set current weather in the dom
  currentCity.textContent = cityName;
  currentDate.textContent = date;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/w/${iconCode}.png`
  );
  currentTemperature.textContent = temperature.toFixed(1);
  currentHumidity.textContent = humidity;
  currentWind.textContent = windSpeed.toFixed(1);

  //fetching uvindex
  const uvIndexURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
  fetch(uvIndexURL)
    .then((response) => response.JSON())
    .then((data) => {
      const uvIndex = data.value;
      CurrentUVIndex.textContent = uvIndex;

      //now to change the background color of the uv index according to its valdue
      if (uvIndex < 3) {
        CurrentUVIndex.style.backgroundColor = "green";
      } else if (uvIndex < 6) {
        CurrentUVIndex.style.backgroundColor = "yellow";
      } else {
        CurrentUVIndex.style.backgroundColor = "red";
      }
      CurrentUVIndex.style.color = "black";
    })
    .catch((error) => console.log("Error Fetching UV index:", error));
}
//displaying the forcast data
function displayForecast(data) {
  const forecastList = data.list;
  const forcastData = [];

  //making itto where we can separate it to 12:pm each day
  for (let i = 0; i < forecastList.length; i++) {
    const forecastTime = forecastList[i].dt_text.split(" ")[1];
    if (forecastTime === "12:00:00") {
      forecastData.push(forecastList[i]);
    }
  }

  //setting the forcast values inthe DOM
  for (let i = 0; i < forecastData.length; i++) {
    const forecast = forecastData[i];
    const date = new Date(forecast.dt_txt).toLocaleDateString("en-US");
    const iconCode = forecast.weather[0].icon;
    const temperature = forecast.main.temp;
    const humidity = forecast.main.humidity;
  }
}
//load the weather for a defauklt city when the page loads
//and displaying the searched cities on the page when it loads
//window.addEventListener("load", function () {
//  const defaultCity = " New York";
//  displaySearchedCities();
//});

//neeed to get this done so i can have time to work on the project mor//working on 2 projects at the same time... this will get done first because it is due tomorrow
