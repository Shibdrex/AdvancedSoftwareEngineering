// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // Hier einen Mock für die POST-Anfrage definieren
  rest.post('/api/record-audio', (req, res, ctx) => {
    // Simuliere eine erfolgreiche Antwort mit einem JSON-Objekt
    return res(
      ctx.status(200),
      ctx.json({ message: 'Aufnahme erfolgreich' })
    );
  }),
];
