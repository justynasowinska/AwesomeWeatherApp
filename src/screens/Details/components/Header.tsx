import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

import { FavoritesIcon } from 'components/FavoritesIcon';

interface HeaderProps {
  cityName: string;
  isFavorite: boolean;
  handleToggleFavorite: () => void;
}

const Header = ({
  cityName,
  isFavorite,
  handleToggleFavorite,
}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.cityName} ellipsizeMode="tail" numberOfLines={2}>
        {cityName}
      </Text>
      <FavoritesIcon
        isFavorite={isFavorite}
        onPress={handleToggleFavorite}
        style={styles.favoriteButton}
        size={34}
        testID="header-favorite-toggle"
        accessibilityLabel={
          isFavorite
            ? `Remove ${cityName} from favorites`
            : `Add ${cityName} to favorites`
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cityName: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    right: -56,
  },
});

export default Header;
