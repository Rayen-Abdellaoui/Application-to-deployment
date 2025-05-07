FROM node:16-alpine

WORKDIR /app/backend

COPY package*.json ./

RUN npm install -g nodemon \
    && npm install

COPY . .

EXPOSE 5555

CMD ["npm", "run", "start"]

