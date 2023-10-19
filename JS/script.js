const apiKey = 'a711839e0ec942c4b97225522231610';
const apiUrl = 'http://api.weatherapi.com/v1/history.json';
const nasaAPI = fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json")
const defaultCity = 'London'; // Default city set to London

let marsDates = []
let formSubmittedWhileLoading = null

function updateUserCity(city) {
    userCity = city;
}

//Create object to store API parameters 
const parameterData = {
    mars: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: []
    },
    earth:
    {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: []
    }
};

// MARS API
nasaAPI
    .then((response) => response.json())
    .then((marsData) => {
        const solsArray = marsData.soles;
        solsArray.sort((a, b) => new Date(b.First_UTC) - new Date(a.First_UTC));

        const last7Sols = solsArray.slice(0, 7);

        // // Extract the terrestrial_date from the Mars API data
        marsDates = last7Sols.map(sol => sol.terrestrial_date);
        console.log(marsDates);

        //Fill parameterData object with obtained data for both Mars and Earth
        parameterData.mars.atmoOpacities = last7Sols.map(sol => sol.atmo_opacity)
        parameterData.mars.minAirTemp = last7Sols.map(sol => sol.min_temp)
        parameterData.mars.maxAirTemp = last7Sols.map(sol => sol.max_temp)
        parameterData.mars.sunrise = last7Sols.map(sol => sol.sunrise)
        parameterData.mars.sunset = last7Sols.map(sol => sol.sunset)

        // Set the flag to indicate that marsDates is ready
        marsDatesReady = true;

        // Check if the form was submitted while loading
        if (formSubmittedWhileLoading) {
            handleWeatherFormSubmission(formSubmittedWhileLoading.event, marsDates);
        }
    })
    .catch((error) => console.log(error));

async function handleWeatherFormSubmission(event, marsDates) {
    event.preventDefault();

    const cityInput = document.getElementById('earthCityInput');
    const cityInputValue = cityInput.value;

    if (cityInputValue) {
        updateUserCity(cityInputValue);

        const promises = marsDates.map(marsDate => fetchWeatherForCity(userCity, marsDate));
        await Promise.all(promises); // Wait for all fetches to complete

    } else {
        alert("Please enter a valid city name.");
    }
}

async function fetchWeatherForCity(city, marsDate) {
    const queryParams = {
        key: apiKey,
        q: city,
        dt: marsDate,
    };

    const url = new URL(apiUrl);
    url.search = new URLSearchParams(queryParams);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Weather data for date', marsDate, 'in', city, data);

         // Clear the arrays for this city and Mars date combination
         parameterData.earth.atmoOpacities = [];
         parameterData.earth.minAirTemp = [];
         parameterData.earth.maxAirTemp = [];
         parameterData.earth.sunrise = [];
         parameterData.earth.sunset = [];
 
         // Add new data for the city and Mars date

        parameterData.earth.atmoOpacities.push(data.forecast.forecastday[0].day.condition.text);
        parameterData.earth.minAirTemp.push(data.forecast.forecastday[0].day.mintemp_c);
        parameterData.earth.maxAirTemp.push(data.forecast.forecastday[0].day.maxtemp_c);
        parameterData.earth.sunrise.push(data.forecast.forecastday[0].astro.sunrise);
        parameterData.earth.sunset.push(data.forecast.forecastday[0].astro.sunset);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Add an event listener for the form submission
document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById('earthCityInput');
    cityInput.value = defaultCity;

    const weatherForm = document.getElementById('weather-search-form');
    weatherForm.addEventListener('submit', (event) => {
        if (marsDatesReady) {
            handleWeatherFormSubmission(event, marsDates)
        } else {
            // If marsDates is not ready, store the form submission data
            formSubmittedWhileLoading = { event, marsDates };
        }
    });

    cityInput.addEventListener('input', function () {
        updateUserCity(cityInput.value);
    });
});

//FOR MARIKA TO PLAY

// Assuming you have an element with the ID "atmoOpacityElement" in your HTML
const atmoOpacityElement = document.getElementById('atmoOpacityElement');
atmoOpacityElement.textContent = parameterData.earth.atmoOpacities[0]; // Replace [0] with the appropriate index

