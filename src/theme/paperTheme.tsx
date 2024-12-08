import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
} from 'react-native-paper';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const lightThemeForNavigation = {
  ...CombinedDefaultTheme,
  fonts: NavigationDefaultTheme.fonts,
};

const darkThemeForNavigation: Theme = {
  ...CombinedDarkTheme,
  fonts: NavigationDarkTheme.fonts,
};

const darkTheme = {
  ...CombinedDarkTheme,
};

const lightTheme = {
  ...CombinedDefaultTheme,
};

const useAppTheme = () => useTheme();

export {
  darkTheme,
  darkThemeForNavigation,
  lightTheme,
  lightThemeForNavigation,
  useAppTheme,
};
