module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-paper|@react-navigation|react-native-vector-icons|react-native-safe-area-context)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/types/*',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/theme/**',
  ],
  coverageReporters: ['text'],
};
