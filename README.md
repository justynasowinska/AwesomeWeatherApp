# Awesome Weather

Awesome Weather is a React Native application that allows users to search for cities and view weather details using the OpenWeather API. It includes features such as city search, favorite cities, and weather information.

---

## Installation

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/justynasowinska/AwesomeWeatherApp.git
   cd AwesomeWeatherApp
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Install iOS dependencies (if working on macOS):

   ```bash
   cd ios && pod install && cd ..
   ```

4. Start the Metro server:

   ```bash
   yarn start
   ```

5. Run the app:
   - For Android:
     ```bash
     yarn run android
     ```
   - For iOS:
     ```bash
     yarn run ios
     ```

---

## API Key Configuration

To use the OpenWeather API, you need to obtain your own API key:

1. Visit the OpenWeather API Key Guide: https://openweathermap.org/appid for instructions on how to create an account and generate an API key.
2. Create a `.env` file in the root directory of the project and add your API key:
   ```env
   OPEN_WEATHER_API_KEY="your_api_key"
   ```

---

## Environment Setup

Make sure you have the following tools installed:

- Node.js (https://nodejs.org) (LTS version recommended)
- React Native CLI (https://reactnative.dev/docs/environment-setup)
- Android Studio (https://developer.android.com/studio) (for Android development)
- Xcode (https://developer.apple.com/xcode/) (for iOS development)

---

## Features

- **City Search:** Search for cities and view suggestions.
- **Weather Details:** View weather information for selected cities.
- **Favorites:** Save cities to your favorites list for quick access.

---

## Development Notes

### Testing

Run unit tests using:

```bash
yarn run test
```
