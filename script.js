const API_KEY = '50fd3edc8855617a01bde8a6cd04de86'; 

async function getWeather(city) {
  const weatherCard = document.getElementById('weather-info');


  weatherCard.innerHTML = `
    <div class="loading">
      <p>Fetching weather data for ${city}...</p>
    </div>
  `;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;

    weatherCard.innerHTML = `
      <h2>${city}</h2>
      <p>🌡️ <strong>Temperature:</strong> ${temperature}°C</p>
      <p>☁️ <strong>Weather:</strong> ${description}</p>
      <p>🌬️ <strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
  } catch (error) {
    
    weatherCard.innerHTML = `
      <div class="error">
        <p>Error fetching weather data: ${error.message}</p>
      </div>
    `;
    console.error('Error fetching weather data:', error);
  }
}
