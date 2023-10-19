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
