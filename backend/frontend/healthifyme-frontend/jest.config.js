module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom', // Keep this, it's essential for React testing
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // Allow Jest to transform ES Modules in axios
  ],
  moduleDirectories: ['node_modules', 'src'], // Ensure node_modules is included
  setupFilesAfterEnv: ['./jest.setup.js'],
};
