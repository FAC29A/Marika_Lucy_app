const apiKey = 'a711839e0ec942c4b97225522231610';
const apiUrl = 'http://api.weatherapi.com/v1/history.json';
const DEFAULT_CITY = 'London'; // Default city set to London


//Create object to store API parameters 
const parameterData = {
    mars: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: []
    },
    earth: 
    {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: []
    }
};

// MARS API
const nasaAPI = fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json")
nasaAPI
    .then((response) => response.json())
    .then((marsData) => {
        const solsArray = marsData.soles;
        solsArray.sort((a, b) => new Date(b.First_UTC) - new Date(a.First_UTC));

        const last7Sols = solsArray.slice(0, 7);
        console.log(last7Sols);

        // Extract the terrestrial_date from the Mars API data
        const marsDates = last7Sols.map(sol => sol.terrestrial_date);

        // Create a function to fetch data for each Mars date
        const fetchEarthDataForMarsDates = async (marsDates) => {
            for (const marsDate of marsDates) {
                const queryParams = {
                    key: apiKey,
                    q: 'London', // Replace with the location you want to query
                    dt: marsDate, // Use the Mars date
                };

                const url = new URL(apiUrl);
                url.search = new URLSearchParams(queryParams);

                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log('Weather data for date', marsDate, data);

                    parameterData.earth.atmoOpacities = data.forecast.forecastday[0].day.condition.text
                    parameterData.earth.minAirTemp = data.forecast.forecastday[0].day.mintemp_c
                    parameterData.earth.maxAirTemp = data.forecast.forecastday[0].day.maxtemp_c
                    parameterData.earth.sunrise = data.forecast.forecastday[0].astro.sunrise
                    parameterData.earth.sunset = data.forecast.forecastday[0].astro.sunset
                    
                    
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        };

        // Call the function to fetch Earth data for each Mars date
        fetchEarthDataForMarsDates(marsDates);

        //Fill parameterData object with obtained data for both Mars and Earth
        parameterData.mars.atmoOpacities = last7Sols.map(sol => sol.atmo_opacity)
        parameterData.mars.minAirTemp = last7Sols.map(sol => sol.min_temp)
        parameterData.mars.maxAirTemp = last7Sols.map(sol => sol.max_temp)
        parameterData.mars.sunrise = last7Sols.map(sol => sol.sunrise)
        parameterData.mars.sunset = last7Sols.map(sol => sol.sunset)
    })
    .catch((error) => console.log(error));
