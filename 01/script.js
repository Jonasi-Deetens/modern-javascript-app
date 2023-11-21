import API from "./config.js";

const initListeners = () => {
    const cityInput = document.querySelector('#cityName');
    cityInput.addEventListener("keyup", (event) => {
        if (event.code === "Enter") displayWeather();
    });

    const getWeatherButton = document.querySelector('#submit-search');
    getWeatherButton.addEventListener("click", displayWeather);
}

const displayWeather = async () => {
    const cityName = document.querySelector("#cityName").value;

    if (cityName.trim()) {
        const weatherData = await fetchWeatherData(cityName);
        
        if(weatherData.error) {
            return alert("Hey are you sure you are not holding up your map upside down?")
        } else {
            setCityName(weatherData)
            const weatherContainer = emptyContainer(document.querySelector(".weather-container"));
            for(let i= 0; i < 5; i++) {
                const weatherCard = createWeatherCard(weatherData, i);
                weatherContainer.appendChild(weatherCard);
            }
        }
    }
}

const fetchWeatherData = async (cityName) => {
    const result = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + cityName + "&days=7&aqi=no&alerts=no");
    const data = result.json();
    return data;
}

const setCityName = (data) => {
    const cityNameContainer = document.querySelector('.city-info');
    cityNameContainer.textContent = data.location.name + ", " + data.location.country;
    
}

const emptyContainer = (container) => {
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    };
    return container;
}

const createWeatherCard = (weatherData, i) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

    return card;
}
initListeners();