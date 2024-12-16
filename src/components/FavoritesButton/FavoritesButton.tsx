import { StyleSheet } from 'react-native';

import { Button } from 'react-native-paper';

type FavoritesButtonProps = {
  isFavorite: boolean;
  onPress: () => void;
};

const FavoritesButton = ({ isFavorite, onPress }: FavoritesButtonProps) => {
  const title = isFavorite ? 'Remove' : 'Add';
  return (
    <Button mode="text" labelStyle={styles.favoriteButton} onPress={onPress}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    fontWeight: 'bold',
  },
});

export default FavoritesButton;
