FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY ./src/ ./src

EXPOSE 3333

CMD ["npm", "start"]