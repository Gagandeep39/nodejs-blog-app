FROM node:alpine
LABEL mantainer="singh.gagandeep3911@gmail.com"
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]
