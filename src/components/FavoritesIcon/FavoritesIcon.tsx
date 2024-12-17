import { IconButton, IconButtonProps, useTheme } from 'react-native-paper';

interface FavoritesIconProps extends Omit<IconButtonProps, 'icon'> {
  isFavorite: boolean;
}

const FavoritesIcon = ({ isFavorite, ...props }: FavoritesIconProps) => {
  const { colors } = useTheme();

  const icon = isFavorite ? 'heart' : 'heart-outline';

  return (
    <IconButton
      iconColor={colors.tertiary}
      icon={icon}
      testID="favorite-icon"
      {...props}
    />
  );
};

export default FavoritesIcon;
