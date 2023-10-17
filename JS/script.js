const apiKey = 'a711839e0ec942c4b97225522231610';

// Function to get historical weather data for a specific city and date.
async function getHistoricalWeather(event) {
    event.preventDefault(); // Prevent the default form submission.

    const cityInput = document.getElementById('earthCityInput').value;
    const dateInput = document.getElementById('earthDateInput').value;

    // Validate the input fields.
    if (!cityInput || !dateInput) {
        alert('Please fill in both city and date fields.');
        return;
    }

    // Make an API request to fetch historical weather data.
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${cityInput}&dt=${dateInput}`);
        const data = await response.json();

        // Display the weather information.
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display weather information.
function displayWeather(data) {
    const weatherInfo = document.getElementById('earthWeatherInfo');
    if (data.error) {
        // Handle API error here.
        weatherInfo.innerHTML = `<p>${data.error.message}</p>`;
    } else {
        // Extract and display the weather information.
        const { location, forecast } = data;
        const {
            temp_c,
            mintemp_c,
            maxtemp_c,
            pressure_mb,
        } = forecast.forecastday[0].day;

        const { sunrise, sunset } = forecast.forecastday[0].astro;

        weatherInfo.innerHTML = `
            <h2>Weather for ${location.name}, ${location.country}</h2>
            <p>Air Temperature (Min): ${mintemp_c}°C</p>
            <p>Air Temperature (Max): ${maxtemp_c}°C</p>
            <p>Ground Temperature (Min): ${mintemp_c}°C</p>
            <p>Ground Temperature (Max): ${maxtemp_c}°C</p>
            <p>Pressure (Pa): ${pressure_mb} Pa</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        `;
    }
}

// Add an event listener for form submission.
const weatherForm = document.getElementById('weather-search-form');
weatherForm.addEventListener('submit', getHistoricalWeather);
