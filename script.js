import API from "./config.js";

initListeners();

function initListeners() {
    const cityInput = document.querySelector('#cityName');
    cityInput.addEventListener("keyup", (event) => {
        if (event.code === "Enter") getGeoLocation();
    });

    const getWeatherButton = document.querySelector('#submit-search');
    getWeatherButton.addEventListener("click", getGeoLocation);
}

async function getGeoLocation() {
    const cityName = document.querySelector("#cityName").value;

    if (cityName.trim()) {
        const weatherData = await fetchWeatherData(cityName);
        
        if(weatherData.error) {
            return alert("Hey are you sure you are not holding up your map upside down?")
        } else {
            const cityNameContainer = document.querySelector('.city-info');
            cityNameContainer.textContent = weatherData.location.name + ", " + weatherData.location.country;
            
            emptyWeatherContainer();
            for(let i= 0; i < 5; i++) {
                createWeatherCard(weatherData, i)
            }
        }
    }
}

async function fetchWeatherData(cityName)  {
    const result = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + cityName + "&days=7&aqi=no&alerts=no");
    const data = result.json();

    return data;
}

function createWeatherCard(weatherData, i) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weatherContainer = document.querySelector(".weather-container");
    const date = new Date()
    const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]

    const card = document.createElement('section');
    card.classList.add("card");
    
    if (i === 0) card.classList.add("main-card");

    const initialContentBeforeSlideAnimation = document.createElement('div');
    initialContentBeforeSlideAnimation.classList.add("imgBx");
    card.appendChild(initialContentBeforeSlideAnimation);
    
    const cardImg = document.createElement('img');
    cardImg.src = weatherData.forecast.forecastday[i].day.condition.icon;
    cardImg.alt = "Icon describing the following weather: " + weatherData.forecast.forecastday[i].day.condition.text;
    initialContentBeforeSlideAnimation.appendChild(cardImg);
    
    const contentBox = document.createElement("div");
    contentBox.classList.add("contentBx");
    card.appendChild(contentBox);

    const dowContentBeforeSliderAnimation = document.createElement("h2");
    dowContentBeforeSliderAnimation.innerHTML = dayOfTheWeek;
    contentBox.appendChild(dowContentBeforeSliderAnimation);

    const tempDescription = document.createElement("h4");
    tempDescription.innerHTML = weatherData.forecast.forecastday[i].day.condition.text;
    contentBox.appendChild(tempDescription);

    const currentTempSection = document.createElement("section");
    currentTempSection.classList.add("color");
    contentBox.appendChild(currentTempSection)

    const currentTempHeader = document.createElement("h3");
    currentTempHeader.innerHTML = "Temp:"
    currentTempSection.appendChild(currentTempHeader);

    const currentTemp = document.createElement("span");
    currentTemp.classList.add("current-temp");
    currentTemp.innerHTML = weatherData.forecast.forecastday[i].day.avgtemp_c + "°C";
    currentTempSection.appendChild(currentTemp);

    const minMaxSection = document.createElement("section");
    minMaxSection.classList.add("details");
    contentBox.appendChild(minMaxSection);

    const minMaxTempHeader = document.createElement("h3");
    minMaxTempHeader.innerHTML = "More:"
    minMaxSection.appendChild(minMaxTempHeader);

    const minTemp = document.createElement("span");
    minTemp.classList.add("min-temp")
    minTemp.innerHTML = weatherData.forecast.forecastday[i].day.mintemp_c  + "°C";
    minMaxSection.appendChild(minTemp);

    const maxTemp = document.createElement("span");
    maxTemp.classList.add("max-temp")
    maxTemp.innerHTML = weatherData.forecast.forecastday[i].day.maxtemp_c + "°C";
    minMaxSection.appendChild(maxTemp);

    weatherContainer.appendChild(card);
}

function emptyWeatherContainer() {
    const weatherContainer = document.querySelector(".weather-container");
    while (weatherContainer.lastChild) {
        weatherContainer.removeChild(weatherContainer.lastChild);
    };
}



// This is a weather web application made for educational purposes. Please do not commercialize this project in any way whatsoever.
// Made by a BeCode technical coach whom had a lot of fun making "bad code", and improved by the very learners of this class.
// I want to mention that this is a fully working app, but can be optimized by: 
// cleaning up, 
// refactoring the code, 
// renaming the variables, 
// removing redundant code,
// removing unnecessary comments,
// storing information into variables for easier and more readable use 