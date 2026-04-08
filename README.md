# ⛅ Smart Weather Dashboard

A premium, production-ready weather application built with **React 18**, **Tailwind CSS v4**, and **Vite**. This dashboard provides real-time weather insights, detailed 5-day forecasts, and intelligent "What to Wear" suggestions based on live atmospheric conditions.

---

## 🚀 Key Features

*   **Intelligent Location Resolution:** Uses a two-step Geocoding-first search logic to accurately resolve ambiguous city names (e.g., automatically mapping "India" to New Delhi).
*   **Smart Wear AI:** A points-based suggestion engine that recommends outfits based on temperature, rain probability, wind speed, and visibility.
*   **Dynamic Backgrounds:** Experience-driven UI where background gradients shift dynamically based on thermal conditions (Cold, Moderate, Hot) or specific weather states (Cloudy, Rainy, Clear).
*   **5-Day Extended Forecast:** Detailed high/low temperature tracking with midday representative readings.
*   **Adaptive Theme Engine:** Full support for Dark and Light modes with a cinematic frosted-glass (Glassmorphism) aesthetic.
*   **Persistence:** Bookmarked "Favorite" cities are stored locally via `localStorage` for instant access upon return.
*   **One-Click Geolocation:** Direct integration with the browser's Geolocation API for immediate hyper-local weather.

---

## 🛠️ Tech Stack & Engineering

This project was built focusing on **Functional Programming** and **Modern Component Architecture**.

*   **Frontend:** React 18 (Functional Components, Hooks)
*   **Styling:** Tailwind CSS v4 (Glassmorphism, Custom Animations)
*   **Build Tool:** Vite (Ultra-fast HMR and optimized production bundles)
*   **API Integration:** OpenWeatherMap (Current, Forecast, and Geocoding endpoints)
*   **Logic Patterns:** 
    *   **Higher-Order Functions:** Extensive use of `map`, `filter`, `reduce`, and `find` for complex data processing.
    *   **Custom Hooks:** Business logic isolated in `useWeather` for high reusability and clean component code.
    *   **Pure Utilities:** Mathematical and formatting logic separated into modular utility files.

---

## 📦 Installation & Setup

1. **Clone the repository** (if applicable) or navigate to the project folder.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your OpenWeatherMap API Key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

---

## 📐 Project Structure

```text
src/
├── components/       # Modular UI components (Navbar, WeatherCard, etc.)
├── hooks/            # Custom React hooks (useWeather)
├── utils/            # Pure utility functions (Weather calculations, formatting)
├── App.jsx           # Main layout orchestrator and state management
├── index.css         # Global styles & design system definitions
└── main.jsx          # Application entry point
```

---

## 👨‍💻 Technical Interview Highlights

If asked about this project in an interview, here are three things to highlight:

1.  **Architecture:** Explain how `useWeather` decouples the UI from the API fetching logic, making the code testable and maintainable.
2.  **Data Processing:** Mention how you manually handled the OpenWeather 5-day forecast (which returns 40 data points) by using `reduce` to group them into unique days and `find` to select the most accurate midday timestamp.
3.  **UX Focus:** Highlight the use of `backdrop-filter` for the UI and the custom-built `COUNTRY_MAP` that handles high-level geographic queries for a better user experience.

---

## 📜 License Plan

This project is open-source and ready for portfolio use.
