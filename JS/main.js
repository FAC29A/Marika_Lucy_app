// Import the getHistoricalWeather function from weatherFunctions.js
const getHistoricalWeather = window.getHistoricalWeather;

// Set default values for city and date
const cityInput = document.getElementById('earthCityInput');
const dateInput = document.getElementById('earthDateInput');
cityInput.value = 'London';
dateInput.value = '2023-10-08';

// Trigger the getHistoricalWeather function with default values when the page loads
getHistoricalWeather(new Event('submit')); // Pass a synthetic event to mimic form submission

// Add an event listener for the form submission
document.addEventListener('DOMContentLoaded', function () {
    const weatherForm = document.getElementById('weather-search-form');
    
    weatherForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission.

        // Get the historical weather data using the imported getHistoricalWeather function
        try {
            await getHistoricalWeather(event);
        } catch (error) {
            console.error('Error:', error.message);

            // Display the user-friendly error message.
            const weatherInfo = document.getElementById('earthWeatherInfo');
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});
