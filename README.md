# 🌤️ Weather Forecast App

A responsive weather web app built with HTML, CSS and vanilla JavaScript. Search any city to see its current weather and a 4-day forecast, powered by the [OpenWeatherMap API](https://openweathermap.org/api).

## ✨ Features

- 🔍 Search weather by city name (button click or Enter key)
- 🌡️ Current temperature, weather condition, humidity and wind speed
- 📅 Daily forecast taken from the 5-day / 3-hour forecast API (12:00 reading per day)
- 🌅 Sunrise and sunset times shown in the searched city's local time
- ⚠️ Weather alert banner for thunderstorm, rain, snow and low-visibility conditions
- 🖼️ Weather icons that change with the current condition
- ❌ "Not found" screen for invalid city names
- 💎 Glassmorphism-style UI with a blurred background

## 🛠️ Tech Stack

- HTML5
- CSS3 (flexbox, backdrop-filter, animations)
- JavaScript (ES6, async/await, Fetch API)
- OpenWeatherMap API (`/weather` and `/forecast` endpoints)

## 📁 Project Structure

```
weather1_updated/
├── first.html      # Page structure
├── style.css       # Styling
├── script.js       # API calls and DOM updates
├── pblphoto/       # Weather icons, background and message images
└── README.md
```

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```
2. Get a free API key from [OpenWeatherMap](https://home.openweathermap.org/api_keys).
3. Open `script.js` and set your key:
   ```js
   const apikey = 'YOUR_API_KEY'
   ```
4. Open `first.html` in your browser (or use the VS Code Live Server extension).
5. Type a city name and press Enter.

## 🔐 API Key Note

This is a frontend-only project, so the API key is visible in the browser. Do not commit a paid or private key to a public repository. Use a free-tier key, and regenerate it if it was ever shared publicly.

## 🔮 Future Improvements

- Toggle between °C and °F
- Search by current location (Geolocation API)
- Hourly forecast
- Famous landmarks for the searched city

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
