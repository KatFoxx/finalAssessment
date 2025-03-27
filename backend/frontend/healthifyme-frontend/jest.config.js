module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios)/)", // Allow Jest to transform ES Modules in axios
    ],
    setupFilesAfterEnv: ['./jest.setup.js'], // Ensure Jest uses the setup file
  };