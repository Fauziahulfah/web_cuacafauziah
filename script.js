/* API elemen DOM */
const cityInput = document.getElementById("city");
const getWeatherBtn = document.getElementById("getWeather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const weatherDisplay = document.getElementById("weather");
const weatherIcon = document.getElementById("weatherIcon");

/* API key OpenWeather (ganti dengan API key Anda) */
const API_KEY = "885b98c5dcd09be0e3f2d7295cfba891";

/* fungsi untuk mengambil data cuaca */
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("Kota tidak ditemukan!");
        }

        const data = await response.json();

        /* update DOM dengan data cuaca */
        locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
        temperatureDisplay.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionDisplay.textContent = `${data.weather[0].description}`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherDisplay.classList.remove("hidden");
    } catch (error) {
        alert("Error: " + error.message);
        weatherDisplay.classList.add("hidden"); /* Sembunyikan jika ada error */
    }
} // This is the correct closing brace for the getWeather function.

/* Event listener untuk tombol */
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Harap masukkan nama kota!");
    }
});