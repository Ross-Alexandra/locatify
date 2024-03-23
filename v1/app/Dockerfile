FROM node:14.21.1-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install nodemon --save-dev --silent

COPY . ./
