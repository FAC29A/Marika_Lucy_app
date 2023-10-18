// Define default city and date values
const DEFAULT_CITY = 'London';
const DEFAULT_DATE = '2023-10-08';

// Initialize the city input field with the default value
const cityInput = document.getElementById('earthCityInput');
cityInput.value = DEFAULT_CITY;

// Function to handle form submission
async function handleWeatherFormSubmission(event) {
    event.preventDefault();

    try {
        await getHistoricalWeather(event); // Fetch historical weather data
    } catch (error) {
        console.error('Error:', error.message);

        // Display a user-friendly error message
        const weatherInfo = document.getElementById('earthWeatherInfo');
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Fetch historical weather data using default values immediately
getHistoricalWeather(new Event('submit'));

// Add event listener for when the document is completely loaded
document.addEventListener('DOMContentLoaded', function () {
    // Set default date on the first button
    const firstButton = document.querySelector('.filter-btn');
    if (firstButton) {
        firstButton.innerText = DEFAULT_DATE;
    }

    // Attach the form submission event handler
    const weatherForm = document.getElementById('weather-search-form');
    weatherForm.addEventListener('submit', handleWeatherFormSubmission);
});


