import { render, screen } from '@testing-library/react-native';
import { FavoritesIcon } from 'components/common/FavoritesIcon';
import React from 'react';
import { IconButton } from 'react-native-paper';

describe('FavoritesIcon', () => {
  it('should display the "heart-outline" icon when isFavorite is false', () => {
    render(<FavoritesIcon isFavorite={false} />);
    const icon = screen.UNSAFE_getByType(IconButton);
    expect(icon.props.icon).toBe('heart-outline');
  });

  it('should display the "heart" icon when isFavorite is true', () => {
    render(<FavoritesIcon isFavorite={true} />);
    const icon = screen.UNSAFE_getByType(IconButton);
    expect(icon.props.icon).toBe('heart');
  });
});
