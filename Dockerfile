# Verwenden eines offiziellen Node.js Basisbildes
FROM node:24-alpine as build

# Setzen des Arbeitsverzeichnisses im Container
WORKDIR /app

# Kopieren der 'package.json' und 'package-lock.json' (falls vorhanden)
COPY package*.json ./

# Installieren der Projekt-Abhängigkeiten
RUN npm install

# Kopieren der Projektdateien ins Arbeitsverzeichnis im Container
COPY . .

# Bauen des Projekts
RUN npm run build

# Bereitstellen des gebauten Projekts mit einem Lightweight-Server
# Verwendung eines weiteren Stage, um die Image-Größe zu reduzieren
FROM node:16-alpine

# Installieren von 'serve' zum Servieren des gebauten Projekts
RUN npm install -g serve

# Kopieren des 'build' Ordners vom 'build'-Stage
COPY --from=build /app/dist /app

# Setzen des Arbeitsverzeichnisses für das Bereitstellen
WORKDIR /app

# Das Bereitstellen des Projekts auf Port 5000
EXPOSE 5000
CMD ["serve", "-s", ".", "-l", "5000"]
