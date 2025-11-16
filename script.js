const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const output = document.getElementById('output');
import API_KEY from "./api_config.js";

// DARK MODE TOGGLE
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    output.textContent = 'Please enter a city name.';
    return;
  }

output.innerHTML = `<div class="spinner"></div>`;

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    if (!res.ok) {
      throw new Error('City not found');
    }

    const data = await res.json();

    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

output.innerHTML = `
  <div style="text-align:center;">
    <img 
      src="${iconUrl}" 
      alt="${data.weather[0].description}" 
      width="120"
      height="120"
      onerror="this.src='https://openweathermap.org/img/wn/01d@4x.png'"
    />
  </div>

  <h3>${data.name}, ${data.sys.country}</h3>
  <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
  <p><strong>Condition:</strong> ${data.weather[0].main}</p>
  <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
  <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
`;

  } catch (err) {
    output.textContent = `Error: ${err.message}`;
  }
});

