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

    // Extract sunrise and sunset times
    const { sunrise, sunset } = forecast.forecastday[0].astro;

    // Extract the date
    const { date } = forecast.forecastday[0];

    // Format the pressure value to hPa.
    const pressure_hPa = pressure_mb / 100;

    // Format dates and temperatures
    const formattedMinTemp = `${mintemp_c}°C`;
    const formattedMaxTemp = `${maxtemp_c}°C`;
    const formattedAvgTemp = `${avgtemp_c}°C`;

    // Display the weather information
    weatherInfo.innerHTML = `
        <h3>Weather for <span id="earthLocationName">${location.name}, ${location.country}</span> - <span id="earthDate">${date}</span></h3>
        <p>Air Temperature (Min): ${formattedMinTemp}</p>
        <p>Air Temperature (Max): ${formattedMaxTemp}</p>
        <p>Ground Temperature (Avg): ${formattedAvgTemp}</p>
        <p>Atmospheric Pressure: ${pressure_hPa} hPa</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
    `;
}