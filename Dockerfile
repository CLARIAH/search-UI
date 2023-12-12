FROM node:alpine AS build

RUN apk add --update --no-cache python3 make g++

WORKDIR /app
COPY . /app

RUN yarn
RUN yarn run build

FROM nginx:stable-alpine

COPY --from=build /app/lib /usr/share/nginx/html
EXPOSE 80
