function displayWeather(data) {
    const weatherInfo = document.getElementById('earthWeatherInfo');
    console.log("Data received:", JSON.stringify(data, null, 2));

    // Check if necessary data exists
    if (!data || !data.forecast || !data.forecast.forecastday || !data.forecast.forecastday[0] || !data.forecast.forecastday[0].day) {
        weatherInfo.innerHTML = `<p>Error: Missing weather data.</p>`;
        return;
    }

    const { location, forecast } = data;

    // Set default values and destructure
    const {
        temp_c = 'N/A',
        mintemp_c = 'N/A',
        maxtemp_c = 'N/A',
        avgtemp_c = 'N/A', // Ground temperature
    } = forecast.forecastday[0].day;

    const { sunrise = 'N/A', sunset = 'N/A' } = forecast.forecastday[0].astro;

    const rawDate = forecast.forecastday[0].date;
    const formattedDate = formatDateForDisplay(rawDate);

    // Format dates and temperatures
    const formattedMinTemp = `${mintemp_c}°C`;
    const formattedMaxTemp = `${maxtemp_c}°C`;
    const formattedAvgTemp = `${avgtemp_c}°C`;

    // Format pressure_mb
    let pressure_mb = 'N/A'; // Default value
    if (!isNaN(forecast.forecastday[0].day.pressure_mb)) {
        pressure_mb = parseFloat(forecast.forecastday[0].day.pressure_mb);
    }
    console.log("Pressure Value:", pressure_mb);

    // Get the condition code from the data
    const conditionCode = forecast.forecastday[0].day.condition.code;

    // Get all weather icon elements
    const iconElements = document.querySelectorAll(".weather-icon img");

    // Set the src attribute for each icon element
    iconElements.forEach((iconElement) => {
        const iconFileName = `${conditionCode}.png`;
        iconElement.src = `icons/${iconFileName}`;
    });

    // Set the general structure (innerHTML) of the weatherInfo.
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

    
