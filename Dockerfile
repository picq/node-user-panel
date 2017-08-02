FROM node:8.2.1

MAINTAINER Piotr Sarzyński <pickap@gmail.com>

# ENV NPM_CONFIG_LOGLEVEL verbose

RUN npm install knex -g

WORKDIR /app

EXPOSE 3000
