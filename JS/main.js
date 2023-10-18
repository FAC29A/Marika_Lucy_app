// Import the getHistoricalWeather function from api.js
const getHistoricalWeather = window.getHistoricalWeather;

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
