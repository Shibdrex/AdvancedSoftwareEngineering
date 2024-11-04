// jest.config.js
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.js'];
export const testEnvironment = 'node';
export const transform = {
    '^.+\\.jsx?$': 'babel-jest', // oder die Konfiguration, die du verwendest
};
export const testPathIgnorePatterns = ['/node_modules/', '/dist/'];
  
if (
    typeof globalThis.TextEncoder === "undefined" ||
    typeof globalThis.TextDecoder === "undefined"
  ) {
    const utils = require("util");
    globalThis.TextEncoder = utils.TextEncoder;
    globalThis.TextDecoder = utils.TextDecoder;
    globalThis.Uint8Array = Uint8Array;
  }
