// My API key for fetching Earth's weather data.
const apiKey = 'a711839e0ec942c4b97225522231610';

//Asynchronously fetches historical weather data for the specified city and date.
async function getHistoricalWeather(event) {
    event.preventDefault(); // Prevent the default form submission behavior.

    // Retrieve the user-inputted city value.
    const cityInputValue = document.getElementById('earthCityInput').value;

    // Validate that the city input field is not empty.
    if (!cityInputValue) {
        alert('Please fill in the city field.');
        return; // Exit the function if validation fails.
    }

    try {
        // Construct the API request URL using user input and the default date.
        const apiUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${cityInputValue}&dt=${DEFAULT_DATE}`;
        console.log('API Request URL:', apiUrl);

        // Use the Fetch API to make a GET request to the specified URL.
        const response = await fetch(apiUrl);

        // If the response status is not OK (200), throw an error.
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }

        // Parse the response data as JSON.
        const data = await response.json();

        // Handle specific API errors.
        if (data.error) {
            let errorMessage = 'An error occurred while fetching weather data.';

            if (data.error.code === 1002) {
                errorMessage = 'City not found. Please check the city name and try again.';
            }

            throw new Error(errorMessage);
        }

        // If everything is successful, display the weather information using the `displayWeather` function.
        displayWeather(data);
    } catch (error) {
        throw error;
    }
}

// Export the getHistoricalWeather function.
window.getHistoricalWeather = getHistoricalWeather;







