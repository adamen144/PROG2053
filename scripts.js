let postCount = 0; // Track how many posts have been loaded

// Container to put the post rows
const postsContainer = document.getElementById('posts-container');

// Function to fetch posts; modern alternative to the traditional XMLHttpRequest using open() and send()
async function loadPosts() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${postCount}&_limit=3`);
        const posts = await response.json();

        // Add posts to the container
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;
            postsContainer.appendChild(postDiv);
        });

        postCount += 3; // Increment post count after loading
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Detection for when users reach bottom of site to load more posts
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadPosts();
    }
});

// Initial load
loadPosts();

/*-------------------------------------------------------------------------------------------------------------------------------*/

// Container to put the different weather displays
const weatherContainer = document.getElementById('weather-container');

// List of locations with latitude and longitude coordinates
const locations = [
    { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Toronto', lat: 43.65107, lon: -79.347015 },
];

// Function to fetch and display weather data for each location
async function fetchWeather() {
    locations.forEach(async location => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`);
        const data = await response.json();

        // Create a weather card
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        weatherCard.innerHTML = `
            <h3>${location.name}</h3>
            <p>Temperature: ${data.current_weather.temperature}°C</p>
            <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
            <p>Weather: ${data.current_weather.weathercode}</p>
        `;

        // Add the card to the container
        weatherContainer.appendChild(weatherCard);
    });
}

// Function to clear old data and fetch new weather data
async function refreshWeather() {
    weatherContainer.innerHTML = ''; // Clear old weather data
    await fetchWeather(); // Fetch new weather data
}

// Fetch weather every minute
setInterval(refreshWeather, 60000); // 60.000 ms = 1 minute


// Fetch weather data on page load
fetchWeather();

