import {
  createWeatherDescription,
  getWeatherIconUrl,
  kelvinToCelsius,
} from 'utils/openWeatherHelpers';

describe('openWeatherHelpers', () => {
  describe('kelvinToCelsius', () => {
    it('converts Kelvin to Celsius correctly', () => {
      expect(kelvinToCelsius(273.15)).toBe(0); // Freezing point
      expect(kelvinToCelsius(298.15)).toBe(25); // Room temperature
      expect(kelvinToCelsius(310.15)).toBe(37); // Human body temperature
    });
  });

  describe('createWeatherDescription', () => {
    it('returns a single description with capitalized first letter', () => {
      const weather = [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ];
      expect(createWeatherDescription(weather)).toBe('Clear sky');
    });

    it('returns combined descriptions with proper formatting', () => {
      const weather = [
        { id: 800, main: 'Mist', description: 'mist', icon: '01d' },
        { id: 800, main: 'Rain', description: 'light rain', icon: '03d' },
      ];
      expect(createWeatherDescription(weather)).toBe('Mist, light rain');
    });

    it('returns an empty string if the input is null or undefined', () => {
      expect(createWeatherDescription(null)).toBe('');
      expect(createWeatherDescription(undefined)).toBe('');
    });

    it('returns an empty string if the array is empty', () => {
      expect(createWeatherDescription([])).toBe('');
    });
  });

  describe('getWeatherIconUrl', () => {
    it('returns the correct URL for a valid icon code', () => {
      expect(getWeatherIconUrl('10d')).toBe(
        'https://openweathermap.org/img/wn/10d@2x.png',
      );
    });

    it('returns an empty string if the icon code is undefined', () => {
      expect(getWeatherIconUrl(undefined)).toBe('');
    });

    it('returns an empty string if the icon code is empty', () => {
      expect(getWeatherIconUrl('')).toBe('');
    });
  });
});
