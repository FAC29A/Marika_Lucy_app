function displayWeather(data) {
    const weatherInfo = document.getElementById('earthWeatherInfo');
    console.log("Data received:", JSON.stringify(data, null, 2));

    // Check if necessary data exists
    if (!data || !data.forecast || !data.forecast.forecastday || !data.forecast.forecastday[0] || !data.forecast.forecastday[0].day) {
        weatherInfo.innerHTML = `<p>Error: Missing weather data.</p>`;
        return;
    }

    // Assign the forecast data for the first day to dayForecast
    const dayForecast = data.forecast.forecastday[0].day;

    // Continue with the rest of your code
    const { location } = data;

    // Set default values and destructure
    const {
        temp_c = 'N/A',
        mintemp_c = 'N/A',
        maxtemp_c = 'N/A',
        avgtemp_c = 'N/A', // Ground temperature
    } = dayForecast;

    const { sunrise = 'N/A', sunset = 'N/A' } = data.forecast.forecastday[0].astro;

    const rawDate = data.forecast.forecastday[0].date;
    const formattedDate = formatDateForDisplay(rawDate);

    // Format dates and temperatures
    const formattedMinTemp = `${mintemp_c}°C`;
    const formattedMaxTemp = `${maxtemp_c}°C`;
    const formattedAvgTemp = `${avgtemp_c}°C`;

    // Format pressure_mb
    let pressure_mb = 'N/A'; // Default value
    if (!isNaN(dayForecast.pressure_mb)) {
        pressure_mb = parseFloat(dayForecast.pressure_mb);
    }
    console.log("Pressure Value:", pressure_mb);

    // Get the icon class based on the weather condition
    const iconClass = getIconClass(dayForecast.condition.code);

    // Set the icon class for the weather icon
    const iconElement = document.querySelector(".icon");
    iconElement.className = 'icon ' + iconClass;

    // First, set the general structure (innerHTML) of the weatherInfo.
    weatherInfo.innerHTML = `
        <h3>Weather for <span id="earthLocationName">${location.name}, ${location.country}</span> - <span id="earthDate">${formattedDate}</span></h3>
        <p>Air Temperature (Min): <span id="earthMinTemperature">${formattedMinTemp}</span></p>
        <p>Air Temperature (Max): <span id="earthMaxTemperature">${formattedMaxTemp}</span></p>
        <p>Ground Temperature (Avg): <span id="earthAvgGroundTemperature">${formattedAvgTemp}</span></p>
        <p>Atmospheric Pressure: <span id="earthPressure">${pressure_mb}</span> mb</p>
        <p>Sunrise: <span id="earthSunrise">${sunrise}</span></p>
        <p>Sunset: <span id="earthSunset">${sunset}</span></p>
    `;
}


