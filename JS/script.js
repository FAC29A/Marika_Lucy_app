const apiKey = 'a711839e0ec942c4b97225522231610';
const apiUrl = 'http://api.weatherapi.com/v1/history.json';
const nasaAPI = fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json");
const defaultCity = 'London'; // Default city set to London
const buttons = document.querySelectorAll('.filter-btn');
let marsDates = [];
let marsDatesReady = false; 
let userCity = defaultCity; 
let formSubmittedWhileLoading = null; 

function updateUserCity(city) {
    userCity = city;
}

// Create object to store API parameters 
const parameterData = {
    mars: {
        terrestrial_date: [],
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

// MARS API
nasaAPI
    .then((response) => response.json())
    .then((marsData) => {
        const solsArray = marsData.soles;
        solsArray.sort((a, b) => new Date(b.First_UTC) - new Date(a.First_UTC));

        const last7Sols = solsArray.slice(0, 7);
        console.log(last7Sols);

        // Extract the terrestrial_date from the Mars API data
        marsDates = last7Sols.map(sol => {
            const dateParts = sol.terrestrial_date.split('-'); // Split the date string
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];

            // Define an array of month names
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            // Reformat the date as 'DD Mon YYYY'
            return `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
        });
        console.log(marsDates);

        // Populate the buttons with terrestrial dates
        buttons.forEach((button, index) => {
            button.textContent = marsDates[index];
        });

        // Fill parameterData object with obtained data for both Mars and Earth
        parameterData.mars.terrestrial_date = last7Sols.map(sol => sol.terrestrial_date);
        parameterData.mars.atmoOpacities = last7Sols.map(sol => sol.atmo_opacity);
        parameterData.mars.minAirTemp = last7Sols.map(sol => sol.min_temp);
        parameterData.mars.maxAirTemp = last7Sols.map(sol => sol.max_temp);
        parameterData.mars.sunrise = last7Sols.map(sol => sol.sunrise);
        parameterData.mars.sunset = last7Sols.map(sol => sol.sunset);

        // Set the flag to indicate that marsDates is ready
        marsDatesReady = true;

        // Check if the form was submitted while loading
        if (formSubmittedWhileLoading) {
            handleWeatherFormSubmission(formSubmittedWhileLoading.event, marsDates);
        }
    })
    .catch((error) => console.log(error));

async function handleWeatherFormSubmission(event, marsDates) {
    event.preventDefault();

    const cityInput = document.getElementById('earthCityInput');
    const cityInputValue = cityInput.value;

    if (cityInputValue) {
        updateUserCity(cityInputValue);

        const promises = marsDates.map((marsDate, dayIndex) => fetchWeatherForCity(userCity, marsDate, dayIndex));
        await Promise.all(promises); // Wait for all fetches to complete
    } else {
        alert("Please enter a valid city name.");
    }
}

async function fetchWeatherForCity(city, marsDate, dayIndex) {
    const queryParams = {
        key: apiKey,
        q: city,
        dt: marsDate,
    };

    const url = new URL(apiUrl);
    url.search = new URLSearchParams(queryParams);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Weather data for date', marsDate, 'in', city, data);

        // Update the arrays for Earth with data for the selected day (dayIndex)
        parameterData.earth.atmoOpacities[dayIndex] = data.forecast.forecastday[0].day.condition.text;
        parameterData.earth.minAirTemp[dayIndex] = data.forecast.forecastday[0].day.mintemp_c;
        parameterData.earth.maxAirTemp[dayIndex] = data.forecast.forecastday[0].day.maxtemp_c;
        parameterData.earth.sunrise[dayIndex] = data.forecast.forecastday[0].astro.sunrise;
        parameterData.earth.sunset[dayIndex] = data.forecast.forecastday[0].astro.sunset;
    } catch (error) {
        console.error('Fetch error:', error);

        // Clear the arrays for this city and Mars date combination
        parameterData.earth.atmoOpacities[dayIndex] = null;
        parameterData.earth.minAirTemp[dayIndex] = null;
        parameterData.earth.maxAirTemp[dayIndex] = null;
        parameterData.earth.sunrise[dayIndex] = null;
        parameterData.earth.sunset[dayIndex] = null;
    }
}

// Add an event listener for the form submission
document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById('earthCityInput');
    cityInput.value = defaultCity;

    const weatherForm = document.getElementById('weather-search-form');
    weatherForm.addEventListener('submit', (event) => {
        if (marsDatesReady) {
            handleWeatherFormSubmission(event, marsDates);
        } else {
            // If marsDates is not ready, store the form submission data
            formSubmittedWhileLoading = { event, marsDates };
        }
    });

    cityInput.addEventListener('input', function () {
        updateUserCity(cityInput.value);
    });
});

// Function to update table cells based on the selected index
function updateTableData(index) {
    // Update the Earth data cells
    document.getElementById('earthMinAirTemp').textContent = parameterData.earth.minAirTemp[index];
    document.getElementById('earthMaxAirTemp').textContent = parameterData.earth.maxAirTemp[index];
    document.getElementById('earthAtmoOpacities').textContent = parameterData.earth.atmoOpacities[index];
    document.getElementById('earthSunrise').textContent = parameterData.earth.sunrise[index];
    document.getElementById('earthSunset').textContent = parameterData.earth.sunset[index];

    // Update the Mars data cells
    document.getElementById('marsMinAirTemp').textContent = parameterData.mars.minAirTemp[index];
    document.getElementById('marsMaxAirTemp').textContent = parameterData.mars.maxAirTemp[index];
    document.getElementById('marsAtmoOpacities').textContent = parameterData.mars.atmoOpacities[index];
    document.getElementById('marsSunrise').textContent = parameterData.mars.sunrise[index];
    document.getElementById('marsSunset').textContent = parameterData.mars.sunset[index];
}

// Attach click event listeners to the buttons
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Call the updateTableData function with the clicked button's index
        updateTableData(index);
    });
});

  