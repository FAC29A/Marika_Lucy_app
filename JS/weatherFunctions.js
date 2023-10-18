// My API key for the weather on earth.
const apiKey = 'a711839e0ec942c4b97225522231610';

// Function to validate the date format
function isValidDateFormat(dateString) {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(dateString);
}

// Function to get historical weather data
async function getHistoricalWeather(event) {
    event.preventDefault(); // Prevent the default form submission.

    // Get the user input from the city and date fields.
    const cityInput = document.getElementById('earthCityInput').value;
    const dateInput = document.getElementById('earthDateInput').value;

    // Validate the input fields.
    if (!cityInput || !dateInput) {
        alert('Please fill in both city and date fields.');
        return; // Exit the function if validation fails
    }

    // Check if the date format is valid.
    if (!isValidDateFormat(dateInput)) {
        // Handle invalid date format
        console.error('Invalid date format. Please enter a valid date in yyyy-MM-dd format.');
        return; // Exit the function if validation fails
    }

    try {
        // Construct the API request URL with user input.
        const apiUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${cityInput}&dt=${dateInput}`;
        console.log('API Request URL:', apiUrl);

        // Fetch method to make a GET request to the API.
        const response = await fetch(apiUrl);

        // Check for a successful response (status code 200) and handle other status codes.
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }

        // Parse the response JSON data.
        const data = await response.json();

        // Handle API errors.
        if (data.error) {
            let errorMessage = 'An error occurred while fetching weather data.';

            // Different error code or type.
            if (data.error.code === 1002) {
                errorMessage = 'City not found. Please check the city name and try again.';
            } else if (data.error.code === 1003) {
                errorMessage = 'Invalid date format. Please enter a valid date.';
            }

            throw new Error(errorMessage);
        }

        // Display the weather information using the displayWeather function
        displayWeather(data);
    } catch (error) {
        throw error;
    }
}

// Export the getHistoricalWeather function
window.getHistoricalWeather = getHistoricalWeather;






