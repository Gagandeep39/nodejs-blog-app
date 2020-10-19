FROM node:14.14.0-alpine3.12 
LABEL mantainer="singh.gagandeep3911@gmail.com"
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ] 
