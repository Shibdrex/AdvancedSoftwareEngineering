// jest.config.cjs (CommonJS-Format)
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Erzwingt die Verarbeitung von axios durch Babel
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
