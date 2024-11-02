const express = require('express');
const multer = require('multer');
const app = express();
const port = 2000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('audio'), (req, res) => {
  console.log(req.file); // Hier kannst du die Audiodatei verarbeiten
  res.send('Audio erfolgreich empfangen');
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});