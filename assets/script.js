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
const apiKey = "db7e8293fc07aa24abd5218fa943315d";
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
}

// Fetch weather data from API
