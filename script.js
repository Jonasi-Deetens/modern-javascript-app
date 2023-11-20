// Check if script is read by the browser!
console.log("script is running")
// import data from different files
import WMO_CODES from "./wmo_codes.js";
import API from "./config.js";

// Getting my button element
const button = document.querySelector('#submit-search');
// Getting my input field element
const inputField = document.querySelector('#cityName');
//getting my container element
const cityNameContainer = document.querySelector('.city-info')
// Weekdays listed in the order used by the Date object in javascript
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// In case I want to switch to a different format:
const weekdays2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Check if weekdays are correctly displayed
console.log(weekdays);
// check if API is correctly imported
console.log(API)

// add eventlistener to input field
inputField.addEventListener('keyup', function(event) {
    // get the current value after the user submitted the city name
    const theNameOfTheCity = document.querySelector("#cityName").value;

    // see if event listener is triggered
    console.log("Enter submission")

    // check if the keyup action is used on an Enter key
    if (event.code === "Enter") {

        // check if the value of the input field is not empty
    if (document.getElementById('cityName').value.trim()) {
        // Make the api call to get the weather Data based on the City
        fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + theNameOfTheCity + "&days=7&aqi=no&alerts=no")
        // Transform the response in a readable javascript format
        .then(response => response.json())
        // final formatted data from the API call
        .then(data => {
            // Check if data is received
            console.log(data)


            // check if the data is not giving back an error
            if(data.error) {
                // stop the event from continuing the code if there is an error
                return alert("Hey are you sure you are not holding up your map upside down?")
                console.log("check if code stops")
            } else {
                // continue with the code if there are no errors
                const container = document.querySelector(".container");
                // Remove existing children if there are any in the <element class="container">
                while (container.lastChild) {
                    container.removeChild(container.lastChild);
                };
                
                // I also found this option to remove the children (but it removes all html content though)
                container.innerHTML = ""

                // container.children.forEach(child => {
                //     container.remove(child);
                // })
                
                // Display the location in the browser as "City, Country"
                cityNameContainer.textContent = data.location.name + ", " + data.location.country;

                // Create cards for each days (first 5 days) of the week.
                // if I want to have 7 days, I just need to augment the number in the loop condition from 5 to 7
                for(let i= 0; i < 5; i++) {

                    // get the container again for add the cards
                    const div = document.querySelector('.container');

                    // d = date
                    const d = new Date()
                    // console.log(weekdays[(d.getDay() + i) % 7])
                    // dow = dateOfWeek
                    const dow = weekdays[(d.getDay() + i) % 7]
                
                    // Create the elements with Data
                    const card = document.createElement('div');
                    card.classList.add("card");
                    
                    // if it's the first element (index === 0), add a second class: "main-card" for unique styling
                    if (i === 0) card.classList.add("main-card");
                
                    div.appendChild(card);
                
                    const initialContentBeforeSlideAnimation = document.createElement('div');
                    initialContentBeforeSlideAnimation.classList.add("imgBx");
                    card.appendChild(initialContentBeforeSlideAnimation);
                    

                    const cardImg = document.createElement('img');
                    cardImg.src = data.forecast.forecastday[i].day.condition.icon;
                    cardImg.alt = "Icon describing the following weather: " + data.forecast.forecastday[i].day.condition.text;
                    initialContentBeforeSlideAnimation.appendChild(cardImg);



                    
                    const contentBox = document.createElement("div");
                    contentBox.classList.add("contentBx");
                    card.appendChild(contentBox);
                
                    const dowContentBeforeSliderAnimation = document.createElement("h2");
                    dowContentBeforeSliderAnimation.innerHTML = dow;
                    contentBox.appendChild(dowContentBeforeSliderAnimation);
                
                    console.log(data.forecast.forecastday[i].day.condition.text);
                    const tempDescription = document.createElement("h4");
                    tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
                    contentBox.appendChild(tempDescription);
                
                    const currentTempBox = document.createElement("div");
                    currentTempBox.classList.add("color");
                    contentBox.appendChild(currentTempBox)
                
                    const currentTempHeader = document.createElement("h3");
                    currentTempHeader.innerHTML = "Temp:"
                    currentTempBox.appendChild(currentTempHeader);
                
                    const currentT = document.createElement("span");
                    currentT.classList.add("current-temp");

                    // OLD structure from different API
                    // let averageTemp = (result.daily.temperature_2m_min[i] + result.daily.temperature_2m_max[i]) / 2;
                    // if(i === 0) averageTemp = result.current.temperature_2m;

                // NEW structure:
                currentT.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
                currentTempBox.appendChild(currentT);
            
                const minMax = document.createElement("div");
                minMax.classList.add("details");
                contentBox.appendChild(minMax);
            
                const minMaxTempHeader = document.createElement("h3");
                minMaxTempHeader.innerHTML = "More:"
                minMax.appendChild(minMaxTempHeader);
            
                const minT = document.createElement("span");
                minT.classList.add("min-temp")
                minT.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
                minMax.appendChild(minT);
            
                const maxT = document.createElement("span");
                maxT.classList.add("max-temp")
                maxT.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
                minMax.appendChild(maxT);
                }
            }
        }).catch(err => {
            //not working
            // alert("Hey are you sure you are not holding up your map upside down?")
        })
    }
    }
})

// add eventlistener to button
button.addEventListener('click', function() {
    const theNameOfTheCity = document.querySelector("#cityName").value;
    console.log("clicked")
    fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + theNameOfTheCity + "&days=7&aqi=no&alerts=no")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error) {
            return alert("Hey are you sure you are not holding up your map upside down?")
            console.log("check if code stops")
        } else {
            const container = document.querySelector(".container");
            while (container.lastChild) {
                container.removeChild(container.lastChild);
            };

            container.innerHTML = ""
            // container.children.forEach(child => {
            //     container.remove(child);
            // })
            
            cityNameContainer.textContent = data.location.name + ", " + data.location.country;

            for(let i= 0; i < 5; i++) {
                const container = document.querySelector('.container');

                const date = new Date()
                // console.log(weekdays[(date.getDay() + i) % 7])
                const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
            
                // Create the elements with Data
                const card = document.createElement('div');
                card.classList.add("card");
            
                if (i === 0) card.classList.add("main-card");
            
                container.appendChild(card);
            
                const imageBox = document.createElement('div');
                imageBox.classList.add("imgBx");
                card.appendChild(imageBox);
            
                const cardImg = document.createElement('img');
                cardImg.src = data.forecast.forecastday[i].day.condition.icon;
                imageBox.appendChild(cardImg);
                
                const contentBox = document.createElement("div");
                contentBox.classList.add("contentBx");
                card.appendChild(contentBox);
            
                const cardHeader = document.createElement("h2");
                cardHeader.innerHTML = dayOfTheWeek;
                contentBox.appendChild(cardHeader);
            
                console.log(data.forecast.forecastday[i].day.condition.text);
                const tempDescription = document.createElement("h4");
                tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
                contentBox.appendChild(tempDescription);
            
                const currentTempBox = document.createElement("div");
                currentTempBox.classList.add("color");
                contentBox.appendChild(currentTempBox)
            
                const currentTempHeader = document.createElement("h3");
                currentTempHeader.innerHTML = "Temp:"
                currentTempBox.appendChild(currentTempHeader);
            
                const currentTemp = document.createElement("span");
                currentTemp.classList.add("current-temp");

                // OLD structure from different API
                // let averageTemp = (result.daily.temperature_2m_min[i] + result.daily.temperature_2m_max[i]) / 2;
                // if(i === 0) averageTemp = result.current.temperature_2m;
                currentTemp.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
                currentTempBox.appendChild(currentTemp);
            
                const minMaxTemperatures = document.createElement("div");
                minMaxTemperatures.classList.add("details");
                contentBox.appendChild(minMaxTemperatures);
            
                const minMaxTempHeader = document.createElement("h3");
                minMaxTempHeader.innerHTML = "More:"
                minMaxTemperatures.appendChild(minMaxTempHeader);
            
                const minTemp = document.createElement("span");
                minTemp.classList.add("min-temp")
                minTemp.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
                minMaxTemperatures.appendChild(minTemp);
            
                const maxTemp = document.createElement("span");
                maxTemp.classList.add("max-temp")
                maxTemp.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
                minMaxTemperatures.appendChild(maxTemp);
            }
        }
    })
    .catch(err => {
        //not working
        // alert("Hey are you sure you are not holding up your map upside down?")
    })
})

// This is a weather web application made for educational purposes. Please do not commercialize this project in any way whatsoever.
// Made by a BeCode technical coach whom had a lot of fun making "bad code", and improved by the very learners of this class.
// I want to mention that this is a fully working app, but can be optimized by: 
// cleaning up, 
// refactoring the code, 
// renaming the variables, 
// removing redundant code,
// removing unnecessary comments,
// storing information into variables for easier and more readable use 