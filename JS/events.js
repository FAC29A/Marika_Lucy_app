// Define the default city
const defaultCity = 'London';

// Set userCity to the default city initially
let userCity = defaultCity;

// Function to update userCity with user input
function updateUserCity(city) {
    userCity = city;
}

// Asynchronously fetches historical weather data for the specified city.
async function handleWeatherFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior.

    // Retrieve the user-inputted city value.
    const cityInput = document.getElementById('earthCityInput');
    const cityInputValue = cityInput.value;

    // Update userCity with the user's chosen city
    updateUserCity(cityInputValue);

    // Call the function to fetch weather data based on the user's chosen city.
    fetchEarthDataForUserCity(userCity);
}

// Add event listener for when the document is completely loaded
document.addEventListener('DOMContentLoaded', function () {
    // Set the input field value to the default city
    const cityInput = document.getElementById('earthCityInput');
    cityInput.value = defaultCity;

    // Attach the form submission event handler
    const weatherForm = document.getElementById('weather-search-form');
    weatherForm.addEventListener('submit', handleWeatherFormSubmission);

    // Add an event listener to detect changes in the input field and update userCity accordingly
    cityInput.addEventListener('input', function () {
        updateUserCity(cityInput.value);
    });
});


// Function to populate the table with data for a specific day
function displayWeather(dayIndex) {
    // Update the date
    const dateElement = document.getElementById('date');
    dateElement.textContent = `Day ${dayIndex + 1}`;

    // Update Earth weather
    const earthAtmoOpacities = document.getElementById('earthAtmoOpacities');
    earthAtmoOpacities.textContent = parameterData.earth.atmoOpacities[dayIndex];
    const earthMinAirTemp = document.getElementById('earthMinAirTemp');
    earthMinAirTemp.textContent = parameterData.earth.minAirTemp[dayIndex];
    const earthMaxAirTemp = document.getElementById('earthMaxAirTemp');
    earthMaxAirTemp.textContent = parameterData.earth.maxAirTemp[dayIndex];
    const earthSunrise = document.getElementById('earthSunrise');
    earthSunrise.textContent = parameterData.earth.sunrise[dayIndex];
    const earthSunset = document.getElementById('earthSunset');
    earthSunset.textContent = parameterData.earth.sunset[dayIndex];

    // Update Mars weather
    const marsAtmoOpacities = document.getElementById('marsAtmoOpacities');
    marsAtmoOpacities.textContent = parameterData.mars.atmoOpacities[dayIndex];
    const marsMinAirTemp = document.getElementById('marsMinAirTemp');
    marsMinAirTemp.textContent = parameterData.mars.minAirTemp[dayIndex];
    const marsMaxAirTemp = document.getElementById('marsMaxAirTemp');
    marsMaxAirTemp.textContent = parameterData.mars.maxAirTemp[dayIndex];
    const marsSunrise = document.getElementById('marsSunrise');
    marsSunrise.textContent = parameterData.mars.sunrise[dayIndex];
    const marsSunset = document.getElementById('marsSunset');
    marsSunset.textContent = parameterData.mars.sunset[dayIndex];

}


