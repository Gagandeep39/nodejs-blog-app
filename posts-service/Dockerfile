FROM node:alpine
LABEL mantainer="singh.gagandeep3911@gmail.com"
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]

# docker run -it [img-id] sh - Overides default ommand (Container will start but app wont run)
# docker exec -it [img-id] sh - Allows accessing a running container