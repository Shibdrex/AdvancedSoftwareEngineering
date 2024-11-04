// src/setupTests.js
import { server } from './mocks/server';
import { TextEncoder, TextDecoder } from 'util';

// Starte den Mock Server vor allen Tests und beende ihn danach
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Polyfills für TextEncoder und TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
