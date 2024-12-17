import { fireEvent, render, screen } from '@testing-library/react-native';

import { FavoritesButton } from 'components/FavoritesButton';

describe('FavoritesButton', () => {
  it('renders Remove text when isFavorite is true', () => {
    render(<FavoritesButton isFavorite={true} onPress={jest.fn()} />);
    expect(screen.getByText('Remove')).toBeOnTheScreen();
  });

  it('renders Add text when isFavorite is false', () => {
    render(<FavoritesButton isFavorite={false} onPress={jest.fn()} />);
    expect(screen.getByText('Add')).toBeOnTheScreen();
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    render(<FavoritesButton isFavorite={false} onPress={onPressMock} />);

    const button = screen.getByText('Add');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
