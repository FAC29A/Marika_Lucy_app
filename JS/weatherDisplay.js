/**
 * Updates the webpage with weather data for a specified city and date.
 * 
 * @param {Object} data - The weather data fetched from the API.
 */
function displayWeather(data) {
    // Reference to the DOM element where the city and country will be displayed.
    const locationDisplay = document.getElementById('locationDisplay');

    // Destructure the data to extract weather details and location.
    const { location, forecast } = data;
    const {
        temp_c,
        mintemp_c,
        maxtemp_c,
        pressure_mb,
        avgtemp_c  // Represents the average ground temperature
    } = forecast.forecastday[0].day;

    // Extract sunrise and sunset times from the data.
    const { sunrise, sunset } = forecast.forecastday[0].astro;

    // Format temperature values for display.
    const formattedMinTemp = `${mintemp_c}°C`;
    const formattedMaxTemp = `${maxtemp_c}°C`;
    const formattedAvgTemp = `${avgtemp_c}°C`;

    // Update the city and country name above the date buttons.
    locationDisplay.innerHTML = `<h3>${location.name}, ${location.country}</h3>`;

    // Update the table with weather details for Earth:
    document.getElementById('earthMinTemperature').textContent = formattedMinTemp;
    document.getElementById('earthMaxTemperature').textContent = formattedMaxTemp;
    document.getElementById('earthAvgGroundTemperature').textContent = formattedAvgTemp;
    document.getElementById('earthPressure').textContent = `${pressure_mb} mb`; 
    document.getElementById('earthSunrise').textContent = sunrise;
    document.getElementById('earthSunset').textContent = sunset;
}
