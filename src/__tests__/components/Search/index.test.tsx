import { fireEvent, render, screen } from '@testing-library/react-native';
import { searchCitiesMockResponse } from '__mocks__/searchCitiesMockResponse';

import Search from 'components/Search';
import { Status } from 'hooks/useSearchCities';
import React from 'react';

describe('Search', () => {
  const defaultProps = {
    inputValue: '',
    data: [],
    status: Status.IDLE,
    error: null,
    showResults: false,
    onInputChange: jest.fn(),
    onCitySelect: jest.fn(),
    onInputClear: jest.fn(),
  };

  it('calls onInputChange with proper text when input text is changed', async () => {
    const onInputChange = jest.fn();
    render(<Search {...defaultProps} onInputChange={onInputChange} />);

    const input = screen.getByPlaceholderText('Search for a city');

    fireEvent.changeText(input, 'London');

    expect(onInputChange).toHaveBeenCalledWith('London');
  });

  it('calls onInputClear when the clear button is pressed', async () => {
    const onInputClear = jest.fn();
    render(
      <Search
        {...defaultProps}
        inputValue="London"
        onInputClear={onInputClear}
      />,
    );

    const clearButton = screen.getByTestId('icon-right-close');
    fireEvent.press(clearButton);

    expect(onInputClear).toHaveBeenCalled();
  });

  it('renders results only when showResults is true', async () => {
    render(
      <Search
        {...defaultProps}
        data={searchCitiesMockResponse.list}
        status={Status.SUCCESS}
        showResults={true}
      />,
    );

    expect(screen.getByText('New York, US')).toBeOnTheScreen();
  });

  it('does not render results when showResults is false', async () => {
    render(<Search {...defaultProps} showResults={false} />);

    expect(screen.queryByTestId('search-results')).not.toBeOnTheScreen();
  });
});
