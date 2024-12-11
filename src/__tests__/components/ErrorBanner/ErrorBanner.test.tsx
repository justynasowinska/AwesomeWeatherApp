import { fireEvent, render, screen } from '@testing-library/react-native';
import { ErrorBanner } from 'components/ErrorBanner';
import React from 'react';

describe('ErrorBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when visible is false', () => {
    render(
      <ErrorBanner
        visible={false}
        error="Something went wrong"
        onClosePress={jest.fn()}
      />,
    );
    expect(screen.queryByText('Something went wrong')).not.toBeVisible();
  });

  it('does not render when error is null or undefined', () => {
    const { rerender } = render(
      <ErrorBanner visible={true} error={null} onClosePress={jest.fn()} />,
    );
    expect(screen.queryByText('null')).not.toBeVisible();

    rerender(<ErrorBanner visible={true} onClosePress={jest.fn()} />);
    expect(screen.queryByText('undefined')).not.toBeVisible();
  });

  it('renders when visible is true and error is defined', () => {
    render(
      <ErrorBanner
        visible={true}
        error="Something went wrong"
        onClosePress={jest.fn()}
      />,
    );
    expect(screen.getByText('Something went wrong')).toBeVisible();
  });

  it('calls onClosePress when the Close button is pressed', () => {
    const mockOnClosePress = jest.fn();
    render(
      <ErrorBanner
        visible={true}
        error="Something went wrong"
        onClosePress={mockOnClosePress}
      />,
    );

    const closeButton = screen.getByText('Close');
    fireEvent.press(closeButton);

    expect(mockOnClosePress).toHaveBeenCalled();
  });
});
