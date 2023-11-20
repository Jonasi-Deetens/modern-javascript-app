import API from "./config.js";

// Getting my button element
// Getting my input field element
const inputField = document.querySelector('#cityName');
// Weekdays listed in the order used by the Date object in javascript
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// In case I want to switch to a different format:
const weekdays2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

initListeners();

function initListeners() {
    const cityInput = document.querySelector('#cityName');
    cityInput.addEventListener("keyup", (event) => {
        if (event.code === "Enter") getGeoLocation();
    });

    const getWeatherButton = document.querySelector('#submit-search');
    getWeatherButton.addEventListener("click", getGeoLocation);
}

function emptyContainer(container) {
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    };
}

async function fetchWeatherData(cityName)  {
    const result = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + cityName + "&days=7&aqi=no&alerts=no");
    const data = result.json();

    return data;
}

async function getGeoLocation() {
    const cityName = document.querySelector("#cityName").value;

    if (cityName.trim()) {
        // Make the api call to get the weather Data based on the City
        const weatherData = await fetchWeatherData(cityName);
        // check if the data is not giving back an error
        if(weatherData.error) {
            return alert("Hey are you sure you are not holding up your map upside down?")
        } else {
            //getting my container element
            const cityNameContainer = document.querySelector('.city-info');
            cityNameContainer.textContent = weatherData.location.name + ", " + weatherData.location.country;
            // continue with the code if there are no errors
            const weatherContainer = document.querySelector(".weather-container");
            emptyContainer(weatherContainer);
            // Create cards for each days (first 5 days) of the week.
            for(let i= 0; i < 5; i++) {
                // d = date
                const date = new Date()
                const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
            
                // Create the elements with Data
                const card = document.createElement('section');
                card.classList.add("card");
                
                // if it's the first element (index === 0), add a second class: "main-card" for unique styling
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
            
                const currentTempBox = document.createElement("div");
                currentTempBox.classList.add("color");
                contentBox.appendChild(currentTempBox)
            
                const currentTempHeader = document.createElement("h3");
                currentTempHeader.innerHTML = "Temp:"
                currentTempBox.appendChild(currentTempHeader);
            
                const currentT = document.createElement("span");
                currentT.classList.add("current-temp");
                // NEW structure:
                currentT.innerHTML = weatherData.forecast.forecastday[i].day.avgtemp_c + "°C";
                currentTempBox.appendChild(currentT);
            
                const minMax = document.createElement("div");
                minMax.classList.add("details");
                contentBox.appendChild(minMax);
            
                const minMaxTempHeader = document.createElement("h3");
                minMaxTempHeader.innerHTML = "More:"
                minMax.appendChild(minMaxTempHeader);
            
                const minT = document.createElement("span");
                minT.classList.add("min-temp")
                minT.innerHTML = weatherData.forecast.forecastday[i].day.mintemp_c  + "°C";
                minMax.appendChild(minT);
            
                const maxT = document.createElement("span");
                maxT.classList.add("max-temp")
                maxT.innerHTML = weatherData.forecast.forecastday[i].day.maxtemp_c + "°C";
                minMax.appendChild(maxT);
            
                weatherContainer.appendChild(card);
            }
        }
    }
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