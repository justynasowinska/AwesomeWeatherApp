import { fireEvent, render, screen } from '@testing-library/react-native';
import SearchInput from 'components/Search/SearchInput';
import React from 'react';

describe('SearchInput', () => {
  it('renders correctly with default props', () => {
    render(
      <SearchInput
        value=""
        onChange={jest.fn()}
        isLoading={false}
        onClear={jest.fn()}
      />,
    );

    expect(screen.getByPlaceholderText('Search for a city')).toBeOnTheScreen();
    expect(screen.getByTestId('icon-left-magnify')).toBeOnTheScreen();
    expect(screen.queryByTestId('icon-right-close')).not.toBeOnTheScreen();
  });

  it('renders loading icon instead of magnify icon when isLoading is true', () => {
    render(
      <SearchInput
        value="query"
        onChange={jest.fn()}
        isLoading={true}
        onClear={jest.fn()}
      />,
    );

    expect(screen.getByTestId('icon-left-loading')).toBeOnTheScreen();
    expect(screen.queryByTestId('icon-left-magnify')).not.toBeOnTheScreen();
  });

  it('renders clear button when value is not empty', () => {
    render(
      <SearchInput
        value="query"
        onChange={jest.fn()}
        isLoading={false}
        onClear={jest.fn()}
      />,
    );

    expect(screen.getByTestId('icon-right-close')).toBeOnTheScreen();
  });

  it('calls onChange when text changes', () => {
    const handleChange = jest.fn();

    render(
      <SearchInput
        value=""
        onChange={handleChange}
        isLoading={false}
        onClear={jest.fn()}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Search for a city'),
      'London',
    );
    expect(handleChange).toHaveBeenCalledWith('London');
  });

  it('calls onClear when clear button is pressed', () => {
    const handleClear = jest.fn();

    render(
      <SearchInput
        value="test"
        onChange={jest.fn()}
        isLoading={false}
        onClear={handleClear}
      />,
    );

    fireEvent.press(screen.getByTestId('icon-right-close'));
    expect(handleClear).toHaveBeenCalled();
  });
});
