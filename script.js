// ================= API ================= 
const unsplashAccessKey = 'NnSrMv3s7SE9KwQjg_9bQ4f1LXaYD-fWiZw9McMEZRY';
const apiKey = 'a711839e0ec942c4b97225522231610';
const apiUrl = 'https://api.weatherapi.com/v1/history.json';
const nasaAPI = fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json");

// ================= CONSTANTS & VARIABLES ================= 
const defaultCity = 'London'; // Default city is set to London
let marsDates = [];
let marsDatesReady = false;
let userCity = defaultCity;
let formSubmittedWhileLoading = null;

// Store the current background image URL
let currentBackgroundImage = '';
const DEFAULT_IMAGE = 'mars';

// =================  DOM ELEMENTS ================= 
const buttons = document.querySelectorAll('.filter-btn');
const backgroundContainer = document.querySelector('.background-container');


// ================= MAIN FUNCTIONS ================= 
//Updates the city for the user and initiates an image fetch.
function updateUserCity(city) {
    userCity = city;
    clearErrorMessage();
    fetchUnsplashImage();
}

// ================= UTILITY FUNCTIONS ================= 
// Clear the error message
function clearErrorMessage() {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Displays a given error message on the screen
function displayErrorMessage(message) {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

//Set the background image
function setBackgroundImage(imageUrl) {

    if (!imageUrl) {
        imageUrl = DEFAULT_IMAGE;
    }

    const backgroundContainer = document.querySelector('.background-image');
    backgroundContainer.style.backgroundImage = `url(${imageUrl})`;
    backgroundContainer.style.backgroundSize = 'cover';
    backgroundContainer.style.backgroundRepeat = 'no-repeat';
}



// ================= Parameter API data storage ================= 
const parameterData = {
    mars: {
        terrestrial_date: [],
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: [],
        solData: []
    },
    earth: {
        atmoOpacities: [],
        minAirTemp: [],
        maxAirTemp: [],
        sunrise: [],
        sunset: []
    }
}


// ================= FETCHING FUNCTIONS ================= 

// Fetches an image from Unsplash based on the user's city input.
async function fetchUnsplashImage() {
    const cityName = userCity;

    // Check if the "Search" button is clicked before fetching the image
    if (!isSearchButtonClicked) {
        return;
    }

    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${cityName}&orientation=landscape`;
    console.log('Requesting Unsplash URL:', unsplashUrl);

    try {
        const response = await fetch(unsplashUrl, {
            headers: {
                Authorization: `Client-ID ${unsplashAccessKey}`,
            },
        });

        // If the fetch isn't successful, retrieve a Mars image
        if (!response.ok) {
            // throw new Error(`Failed to fetch image from NASA ${response.status} ${response.statusText}`);
            await fetchMarsImage();
            return;
        }

        const data = await response.json();

        // If no images are found for the user's city, retrieve a Mars image
        if (!data.results || data.results.length === 0) {
            displayErrorMessage(`No images found for ${cityName} on Unsplash.`);
            await fetchMarsImage();
            return;
        }
        const imageUrl = data.results[0].urls.full; // Get the URL of the first image

        // Store the fetched image URL as the current background image
        currentBackgroundImage = imageUrl;

        // Set the fetched image as the background of the container
        setBackgroundImage(imageUrl);

    } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        await fetchMarsImage(); // When there's an error, fetch Mars image from Unsplash
    }
}


//Fetch an image of Mars 
async function fetchMarsImage() {
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=mars&orientation=landscape`;

    try {
        const response = await fetch(unsplashUrl, {
            headers: {
                Authorization: `Client-ID ${unsplashAccessKey}`,
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch Mars image from Unsplash: ${response.status} ${response.statusText}`);
            throw new Error('Failed to fetch Mars image from Unsplash.');
        }

        const data = await response.json();
        const imageUrl = data.results[0].urls.full; // Get the URL of the first Mars image

        // Set the fetched Mars image as the background
        setBackgroundImage(imageUrl);

    } catch (marsError) {
        console.error('Error fetching Mars image from Unsplash:', marsError);

        // Displaying an error message to the user
        displayErrorMessage('We encountered an error while fetching a background image. Please try again later.');
    }
}

async function handleWeatherFormSubmission(event, marsDates) {
    event.preventDefault();

    // Start the loading indicator
    document.getElementById('loadingIndicator').style.display = 'flex';
    await new Promise(resolve => setTimeout(resolve, 1000));

    const cityInput = document.getElementById('earthCityInput');
    const cityInputValue = cityInput.value;

    if (cityInputValue) {
        updateUserCity(cityInputValue);

        const promises = marsDates.map((marsDate, dayIndex) => fetchWeatherForCity(userCity, marsDate, dayIndex));
        await Promise.all(promises); // Wait for all fetches to complete

        // Stop the loading indicator after all fetches are done
        document.getElementById('loadingIndicator').style.display = 'none';
    } else {
        // Stop the loading indicator after all fetches are done
        document.getElementById('loadingIndicator').style.display = 'none';
        alert("Please enter a valid city name.");
        await fetchMarsImage();
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
        document.getElementById('loadingIndicator').style.display = 'none';
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('loadingIndicator').style.display = 'none';

        // Clear the arrays for this city and Mars date combination
        parameterData.earth.atmoOpacities[dayIndex] = null;
        parameterData.earth.minAirTemp[dayIndex] = null;
        parameterData.earth.maxAirTemp[dayIndex] = null;
        parameterData.earth.sunrise[dayIndex] = null;
        parameterData.earth.sunset[dayIndex] = null;
    }
}




// ================= NASA MARS API ================= 
document.getElementById('loadingIndicator').style.display = 'block';
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
            console.log("Mars Parameter Data:", parameterData.mars);

        });

        // Fill parameterData object with obtained data for both Mars and Earth
        parameterData.mars.terrestrial_date = last7Sols.map(sol => sol.terrestrial_date);
        parameterData.mars.atmoOpacities = last7Sols.map(sol => sol.atmo_opacity);
        parameterData.mars.minAirTemp = last7Sols.map(sol => sol.min_temp);
        parameterData.mars.maxAirTemp = last7Sols.map(sol => sol.max_temp);
        parameterData.mars.sunrise = last7Sols.map(sol => sol.sunrise);
        parameterData.mars.sunset = last7Sols.map(sol => sol.sunset);
        parameterData.mars.solData = last7Sols;

        // Set the flag to indicate that marsDates is ready
        marsDatesReady = true;

        // Check if the form was submitted while loading
        if (formSubmittedWhileLoading) {
            handleWeatherFormSubmission(formSubmittedWhileLoading.event, marsDates);
        }
        // Stop the loading indicator after processing the data
        document.getElementById('loadingIndicator').style.display = 'none';

    })
    .catch((error) => console.log(error));
// Stop the loading indicator in case of error
document.getElementById('loadingIndicator').style.display = 'none';




// ================= EVENT LISTENERS & INITIALIZATION ================= 

// Event listener for the form submission
document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById('earthCityInput');
    cityInput.value = defaultCity;

    const weatherForm = document.getElementById('weather-search-form');
    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting by default


        // Check if the user has entered a city name
        const userCity = cityInput.value.trim();
        if (userCity === '') {
            alert('Please enter a city name before searching.');
            await fetchMarsImage();
            return; // Do not proceed with the search if no city is entered
        }

        if (marsDatesReady) {
            isSearchButtonClicked = true; // Set the flag when the "Search" button is clicked
            await handleWeatherFormSubmission(event, marsDates);

            // Update the background image based on the user's input city
            fetchUnsplashImage();
        } else {
            // If marsDates is not ready, store the form submission data
            formSubmittedWhileLoading = { event, marsDates };
        }
    });

});


//Attach click event listeners to the buttons
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Call the updateTableData function with the clicked button's index
        updateTableData(index);
    });
});


// ================= TABLE ================= 
// Function to update table cells based on the selected index
function updateTableData(index) {
    const solData = parameterData.mars.solData[index];
    const earthSunset = parameterData.earth.sunset[index].replace(" AM", "").replace(" PM", "").split(":");
    const convertiedEarthSunrise = Number(earthSunset[0])+12;

    // Update the Earth data cells
    const solNumber = parameterData.mars.solData[index].sol;
    document.getElementById('soleDate').textContent = `SOL ${solNumber}`;
    document.getElementById('earthMinAirTemp').textContent = parameterData.earth.minAirTemp[index];
    document.getElementById('earthMaxAirTemp').textContent = parameterData.earth.maxAirTemp[index];
    document.getElementById('earthAtmoOpacities').textContent = parameterData.earth.atmoOpacities[index];
    document.getElementById('earthSunrise').textContent = parameterData.earth.sunrise[index].replace(" AM", "").replace(" PM", "");
    
    document.getElementById('earthSunset').textContent = convertiedEarthSunrise + ":" + earthSunset[1];


    // Update the Mars data cells
    document.getElementById('marsMinAirTemp').textContent = parameterData.mars.minAirTemp[index];
    document.getElementById('marsMaxAirTemp').textContent = parameterData.mars.maxAirTemp[index];
    document.getElementById('marsAtmoOpacities').textContent = parameterData.mars.atmoOpacities[index];
    document.getElementById('marsSunrise').textContent = parameterData.mars.sunrise[index];
    document.getElementById('marsSunset').textContent = parameterData.mars.sunset[index];
}



