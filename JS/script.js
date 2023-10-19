const apiKey = 'a711839e0ec942c4b97225522231610';
const apiUrl = 'http://api.weatherapi.com/v1/history.json';
const DEFAULT_CITY = 'London'; 

const parameterData = {
    mars: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: [],
        solData: [],
    },
    earth: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: [],
    },
};

const nasaAPI = fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json");
nasaAPI
    .then((response) => response.json())
    .then(async (marsData) => {
        const solsArray = marsData.soles;
        solsArray.sort((a, b) => new Date(b.First_UTC) - new Date(a.First_UTC));
        const last7Sols = solsArray.slice(0, 7);
        const marsDates = last7Sols.map(sol => sol.terrestrial_date);

        const earthAtmoOpacities = [];
        const earthMinAirTemp = [];
        const earthMaxAirTemp = [];
        const earthSunrise = [];
        const earthSunset = [];

        const fetchEarthDataForDate = async (date) => {
            const queryParams = {
                key: apiKey,
                q: DEFAULT_CITY, 
                dt: date,
            };
            const url = new URL(apiUrl);
            url.search = new URLSearchParams(queryParams);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                earthAtmoOpacities.push(data.forecast.forecastday[0].day.condition.text);
                earthMinAirTemp.push(data.forecast.forecastday[0].day.mintemp_c);
                earthMaxAirTemp.push(data.forecast.forecastday[0].day.maxtemp_c);
                earthSunrise.push(data.forecast.forecastday[0].astro.sunrise);
                earthSunset.push(data.forecast.forecastday[0].astro.sunset);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        for (const marsDate of marsDates) {
            await fetchEarthDataForDate(marsDate);
        }

        parameterData.earth.atmoOpacities = earthAtmoOpacities;
        parameterData.earth.minAirTemp = earthMinAirTemp;
        parameterData.earth.maxAirTemp = earthMaxAirTemp;
        parameterData.earth.sunrise = earthSunrise;
        parameterData.earth.sunset = earthSunset;
        parameterData.mars.solData = last7Sols;
    })
    .catch((error) => console.log(error));
