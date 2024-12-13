import { useCallback } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const IS_ANDROID = Platform.OS === 'android';

const Screen = ({ children, backgroundColor }: ScreenProps) => {
  const theme = useTheme();
  const { colors, dark } = theme;
  const { top, bottom } = useSafeAreaInsets();

  const getScreenStyles = useCallback(() => {
    return {
      backgroundColor: backgroundColor || colors.background,
      paddingTop: IS_ANDROID ? 30 : top,
      paddingBottom: bottom,
    };
  }, [backgroundColor, colors.background, top, bottom]);

  return (
    <View style={[styles.container, getScreenStyles()]}>
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
