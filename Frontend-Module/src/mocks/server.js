// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Server wird hier mit allen definierten Handlers gestartet
export const server = setupServer(...handlers);
