import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { searchCitiesMockResponse } from '__mocks__/searchCitiesMockResponse';
import Search from 'components/Search';
import useSearchCities from 'hooks/useSearchCities';
import React from 'react';

jest.mock('hooks/useSearchCities', () => ({
  __esModule: true,
  default: jest.fn(),
  MIN_QUERY_LENGTH: 3,
  Status: {
    IDLE: 'idle',
    FETCHING: 'fetching',
    SUCCESS: 'success',
    ERROR: 'error',
  },
}));

const mockUseSearchCities = useSearchCities as jest.Mock;

describe('Search', () => {
  it('updates the query and displays results when input changes', async () => {
    mockUseSearchCities.mockReturnValue({
      data: searchCitiesMockResponse.list,
      status: 'success',
      error: null,
    });

    const onCitySelect = jest.fn();
    render(<Search onCitySelect={onCitySelect} />);

    const input = screen.getByPlaceholderText('Search for a city');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.changeText(input, 'London');
      jest.runAllTimers();
    });

    expect(await screen.findByText('London, UK')).toBeOnTheScreen();
  });

  it('clears the input when clear is triggered', async () => {
    mockUseSearchCities.mockReturnValue({
      data: searchCitiesMockResponse.list,
      status: 'success',
      error: null,
    });

    const onCitySelect = jest.fn();
    render(<Search onCitySelect={onCitySelect} />);

    const input = screen.getByPlaceholderText('Search for a city');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.changeText(input, 'City');
      jest.runAllTimers();
    });

    expect(input.props.value).toBe('City');

    const clearButton = screen.getByTestId('icon-right-close');
    fireEvent.press(clearButton);

    expect(input.props.value).toBe('');
  });

  it('renders results only when query length is >= MIN_QUERY_LENGTH', async () => {
    mockUseSearchCities.mockReturnValue({
      data: [],
      status: 'idle',
      error: null,
    });

    const onCitySelect = jest.fn();
    render(<Search onCitySelect={onCitySelect} />);

    const input = screen.getByPlaceholderText('Search for a city');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.changeText(input, 'Lo');
      jest.runAllTimers();
    });

    expect(screen.queryByTestId('search-results')).not.toBeOnTheScreen();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.changeText(input, 'Lon');
      jest.runAllTimers();
    });

    expect(screen.getByTestId('search-results')).toBeOnTheScreen();
  });
});
