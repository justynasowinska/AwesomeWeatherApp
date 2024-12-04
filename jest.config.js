module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    'react-native-config': '<rootDir>/__mocks__/react-native-config.ts',
  },
  setupFilesAfterEnv: ['./jest-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-paper|@react-navigation|react-native-vector-icons)/)',
  ],
};
