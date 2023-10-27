const apikey = "aa8a4b6bda9d86fd0e2ca3847276fbb4";

const weatherData = document.getElementById("weather-data")

const locationInput = document.getElementById("location-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const locationValue = locationInput.value;
  getWeatherData(locationValue);
});

async function getWeatherData(locationValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherData.querySelector(".temp").textContent = `${temperature}°C`;
    weatherData.querySelector(".desc").textContent = description;

    weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";
    weatherData.querySelector(".temp").textContent = "";
    weatherData.querySelector(".desc").textContent = "An error happened, please try again later";

    weatherData.querySelector(".details").innerHTML = "";
  }
}
