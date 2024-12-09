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
  colors: {
    ...CombinedDarkTheme.colors,
    primary: '#027aff',
    secondary: '#FFCC03',
    background: '#121212',
    surface: '#1F1F1F',
    onSurface: '#E0E0E0',
  },
};

const lightTheme = {
  ...CombinedDefaultTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: '#027aff',
    secondary: '#FFCC03',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    onSurface: '#212121',
  },
};

export {
  darkTheme,
  darkThemeForNavigation,
  lightTheme,
  lightThemeForNavigation,
};
