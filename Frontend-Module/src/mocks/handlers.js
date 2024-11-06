// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('http://assistant-core:8080/backend/message/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Aufnahme erfolgreich' })
    );
  }),
];
