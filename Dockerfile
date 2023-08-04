FROM node:18.16.1-alpine
WORKDIR /usr/app/
COPY package*.json ./
RUN npm install
COPY ../.. .
RUN npm run build
WORKDIR ./dist
EXPOSE 4000
CMD node src/main.js

