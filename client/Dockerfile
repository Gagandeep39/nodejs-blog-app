FROM node:alpine as build
LABEL mantainer="singh.gagandeep3911@gmail.com"
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_POST_SERVICE=80
ENV REACT_APP_COMMENT_SERVICE=80
ENV REACT_APP_QUERY_SERVICE=80
RUN npm run build

# Stage 2
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html