const apiKey = 'a711839e0ec942c4b97225522231610';
const apiUrl = 'http://api.weatherapi.com/v1/history.json';
const DEFAULT_CITY = 'London'; // Default city set to London

const parameterData = {
    mars: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: []
    },
    earth: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: []
    }
};

fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json")
    .then(response => response.json())
    .then(marsData => {
        // Process Mars data
        const solsArray = marsData.soles;
        solsArray.sort((a, b) => new Date(b.First_UTC) - new Date(a.First_UTC));
        const last7Sols = solsArray.slice(0, 7);
        const marsDates = last7Sols.map(sol => sol.terrestrial_date);
        parameterData.mars.atmoOpacities = last7Sols.map(sol => sol.atmo_opacity);
        parameterData.mars.minAirTemp = last7Sols.map(sol => sol.min_temp);
        parameterData.mars.maxAirTemp = last7Sols.map(sol => sol.max_temp);
        parameterData.mars.sunrise = last7Sols.map(sol => sol.sunrise);
        parameterData.mars.sunset = last7Sols.map(sol => sol.sunset);

        return fetchEarthDataForMarsDates(marsDates, apiKey, apiUrl, userCity);
    })
    .then(() => {
        displayWeather();
    })
    .catch(error => console.error('Error:', error));

async function fetchEarthDataForMarsDates(marsDates, apiKey, apiUrl, userCity) {
    for (const marsDate of marsDates) {
        const queryParams = {
            key: apiKey,
            q: userCity,
            dt: marsDate
        };

        const url = new URL(apiUrl);
        url.search = new URLSearchParams(queryParams);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const earthData = await response.json();
            parameterData.earth.atmoOpacities.push(earthData.forecast.forecastday[0].day.condition.text);
            parameterData.earth.minAirTemp.push(earthData.forecast.forecastday[0].day.mintemp_c);
            parameterData.earth.maxAirTemp.push(earthData.forecast.forecastday[0].day.maxtemp_c);
            parameterData.earth.sunrise.push(earthData.forecast.forecastday[0].astro.sunrise);
            parameterData.earth.sunset.push(earthData.forecast.forecastday[0].astro.sunset);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}
