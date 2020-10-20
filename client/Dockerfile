FROM node:alpine as build
LABEL mantainer="singh.gagandeep3911@gmail.com"
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html