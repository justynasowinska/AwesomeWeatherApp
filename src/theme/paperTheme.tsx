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
  MD3Theme,
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

const darkTheme: MD3Theme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    primary: '#fbb801',
    secondary: '#6a9bff',
    background: '#131e32',
    surface: '#132845',
    onSurfaceVariant: '#6c788f',
    onSurface: '#ffffff',
  },
};

const lightTheme: MD3Theme = {
  ...CombinedDefaultTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: '#3477ff',
    secondary: '#f46946',
    background: '#f3f4f7',
    surface: '#d4d4dd',
    onSurfaceVariant: '#90929d',
    onSurface: '#000000',
  },
};

export {
  darkTheme,
  darkThemeForNavigation,
  lightTheme,
  lightThemeForNavigation,
};
