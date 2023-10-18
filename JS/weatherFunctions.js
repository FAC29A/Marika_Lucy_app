// My API key for the weather on earth.
const apiKey = 'a711839e0ec942c4b97225522231610';

function isValidDateFormat(dateString) {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(dateString);
}

async function getHistoricalWeather(event) {
    event.preventDefault(); // Prevent the default form submission.

    // Get the user input from the city and date fields.
    const cityInput = document.getElementById('earthCityInput').value;
    const dateInput = document.getElementById('earthDateInput').value;

    // Validate the input fields.
    if (!cityInput || !dateInput) {
        alert('Please fill in both city and date fields.');
        return;
    }

    // Check if the date format is valid.
    if (!isValidDateFormat(dateInput)) {
        // Handle invalid date format
        console.error('Invalid date format. Please enter a valid date in yyyy-MM-dd format.');
        return;
    }

    try {
        // Construct the API request URL with user input.
        const apiUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${cityInput}&dt=${dateInput}`;
        console.log('API Request URL:', apiUrl);
        
        // Use the fetch method to make a GET request to the API.
        const response = await fetch(apiUrl);

        // Check for a successful response (status code 200) and handle other status codes.
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }

        // Parse the response JSON data.
        const data = await response.json();

        // Handle API errors.
        if (data.error) {
            let errorMessage = 'An error occurred while fetching weather data.';

            // Different error code or type.
            if (data.error.code === 1002) {
                errorMessage = 'City not found. Please check the city name and try again.';
            } else if (data.error.code === 1003) {
                errorMessage = 'Invalid date format. Please enter a valid date.';
            }

            throw new Error(errorMessage);
        }

        // Display the weather information using the displayWeather function from main.js
        displayWeather(data);
    } catch (error) {
        throw error;
    }
}

// Export the getHistoricalWeather function
window.getHistoricalWeather = getHistoricalWeather;

// Define the displayWeather function
function displayWeather(data) {
    const weatherInfo = document.getElementById('earthWeatherInfo');

    // Extract and display the weather information.
    const { location, forecast } = data;
    const {
        temp_c,
        mintemp_c,
        maxtemp_c,
        pressure_mb,
        avgtemp_c, // Ground temperature
    } = forecast.forecastday[0].day;

    const { sunrise, sunset } = forecast.forecastday[0].astro;

    // Format the pressure value to hPa.
    const pressure_hPa = pressure_mb / 100;

    // Format dates and temperatures
    const formattedSunrise = new Date(sunrise).toLocaleTimeString();
    const formattedSunset = new Date(sunset).toLocaleTimeString();
    const formattedMinTemp = `${mintemp_c}°C`;
    const formattedMaxTemp = `${maxtemp_c}°C`;
    const formattedAvgTemp = `${avgtemp_c}°C`;

    // Display the weather information
    weatherInfo.innerHTML = `
        <h2>Weather for ${location.name}, ${location.country}</h2>
        <p>Air Temperature (Min): ${formattedMinTemp}</p>
        <p>Air Temperature (Max): ${formattedMaxTemp}</p>
        <p>Ground Temperature (Avg): ${formattedAvgTemp}</p>
        <p>Atmospheric Pressure: ${pressure_hPa} hPa</p>
        <p>Sunrise: ${formattedSunrise}</p>
        <p>Sunset: ${formattedSunset}</p>
    `;
}
