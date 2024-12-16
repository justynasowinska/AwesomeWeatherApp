import { render, screen } from '@testing-library/react-native';

import FavoriteCityItemRight from 'screens/Home/components/FavoritesList/FavoriteCityItemRight';
import { getWeatherIconUrl, kelvinToCelsius } from 'utils/openWeatherHelpers';

jest.mock('utils/openWeatherHelpers', () => ({
  getWeatherIconUrl: jest.fn(),
  kelvinToCelsius: jest.fn(),
}));

const getWeatherIconUrlMock = getWeatherIconUrl as jest.Mock;
const kelvinToCelsiusMock = kelvinToCelsius as jest.Mock;

describe('FavoriteCityItemRight', () => {
  const mockIcon = '01d';
  const mockTemperature = 300;

  beforeEach(() => {
    getWeatherIconUrlMock.mockReturnValue('mocked_url');
    kelvinToCelsiusMock.mockReturnValue(27);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    render(
      <FavoriteCityItemRight icon={mockIcon} temperature={mockTemperature} />,
    );

    expect(screen.getByText('27°C')).toBeOnTheScreen();
    expect(screen.getByTestId('avatar-image').props.source.uri).toBe(
      'mocked_url',
    );
  });

  it('calls kelvinToCelsius with the correct temperature', () => {
    render(
      <FavoriteCityItemRight icon={mockIcon} temperature={mockTemperature} />,
    );
    expect(kelvinToCelsius).toHaveBeenCalledWith(mockTemperature);
  });

  it('calls getWeatherIconUrl with the correct icon', () => {
    render(
      <FavoriteCityItemRight icon={mockIcon} temperature={mockTemperature} />,
    );
    expect(getWeatherIconUrl).toHaveBeenCalledWith(mockIcon);
  });
});
