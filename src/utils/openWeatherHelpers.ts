import { WeatherCity } from 'types/openWeather';

/**
 * Converts temperature from Kelvin to Celsius.
 * @param kelvin Temperature in Kelvin.
 * @returns Temperature in Celsius, rounded to the nearest integer.
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

/**
 * Creates a description string from an array of weather descriptions.
 * @param weather Array of weather description.
 * @returns String with all descriptions combined with first letter capitalized.
 */
export const createWeatherDescription = (
  weather: WeatherCity['weather'],
): string => {
  if (!weather || weather.length === 0) {
    return '';
  }

  return weather
    .map(condition => condition.description)
    .join(' ')
    .replace(/^./, str => str.toUpperCase());
};

/**
 * Generates a url for the OpenWeather icon.
 * @param iconCode The icon code from the weather data.
 * @returns The full URL to the icon.
 */
export const getWeatherIconUrl = (iconCode?: string): string => {
  if (!iconCode) {
    return '';
  }

  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
