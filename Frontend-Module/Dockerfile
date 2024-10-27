# Schritt 1: Erstellen des Build-Images
FROM node:20 AS build

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Quellcode kopieren und Build ausführen
COPY . .
RUN npm run build

# Schritt 2: Erstellen des Produktions-Images
FROM node:18 AS production

# 'serve' installieren
RUN npm install -g serve

# Statische Dateien kopieren
WORKDIR /app
COPY --from=build /app/build ./build

# App starten
CMD ["serve", "-s", "build", "-l", "3000"]

# Exponiere den Port
EXPOSE 3000
