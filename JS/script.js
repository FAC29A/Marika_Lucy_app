const apiKey = 'a711839e0ec942c4b97225522231610';
const apiUrl = 'http://api.weatherapi.com/v1/history.json';
const DEFAULT_CITY = 'London'; // Default city set to London

// Create object to store API parameters
const parameterData = {
    mars: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: [],
        solData: [], // Add a new property for Sol data
    },
    earth: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: [],
    },
};

// MARS API
const nasaAPI = fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json")
nasaAPI
    .then((response) => response.json())
    .then(async (marsData) => {
        const solsArray = marsData.soles;
        solsArray.sort((a, b) => new Date(b.First_UTC) - new Date(a.First_UTC));

        const last7Sols = solsArray.slice(0, 7);
        console.log(last7Sols);

        // Extract the terrestrial_date from the Mars API data
        const marsDates = last7Sols.map(sol => sol.terrestrial_date);

        // Create arrays to store Earth's weather data for each parameter
        const earthAtmoOpacities = [];
        const earthMinAirTemp = [];
        const earthMaxAirTemp = [];
        const earthSunrise = [];
        const earthSunset = [];

        // Function to fetch Earth data for a specific date
        const fetchEarthDataForDate = async (date) => {
            const queryParams = {
                key: apiKey,
                q: 'London', 
                dt: date, // Use the Mars date
            };

            const url = new URL(apiUrl);
            url.search = new URLSearchParams(queryParams);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Weather data for date', date, data);

                // Push Earth's weather data for the current date into arrays
                earthAtmoOpacities.push(data.forecast.forecastday[0].day.condition.text);
                earthMinAirTemp.push(data.forecast.forecastday[0].day.mintemp_c);
                earthMaxAirTemp.push(data.forecast.forecastday[0].day.maxtemp_c);
                earthSunrise.push(data.forecast.forecastday[0].astro.sunrise);
                earthSunset.push(data.forecast.forecastday[0].astro.sunset);

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        // Loop through Mars dates and fetch Earth data for each date
        for (const marsDate of marsDates) {
            await fetchEarthDataForDate(marsDate);
        }

        // Fill parameterData object with obtained data for both Mars and Earth
        parameterData.earth.atmoOpacities = earthAtmoOpacities;
        parameterData.earth.minAirTemp = earthMinAirTemp;
        parameterData.earth.maxAirTemp = earthMaxAirTemp;
        parameterData.earth.sunrise = earthSunrise;
        parameterData.earth.sunset = earthSunset;

        // Populate the solData array in parameterData.mars with Sol data
        parameterData.mars.solData = last7Sols;

        // Loop through Mars dates and fetch Earth data for each date
        for (const marsDate of marsDates) {
            await fetchEarthDataForDate(marsDate);
        }
    })
    .catch((error) => console.log(error));