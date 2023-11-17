##STAGE 1
#FROM node AS build
#
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm ci
#COPY . .
#RUN npm run build backend && npm prune --production
#
##STAGE 2
#FROM node:alpine
#
#WORKDIR /usr/src/app
#ENV NODE_ENV=production
#COPY --from=build /usr/src/app .
#CMD node dist/apps/server/main.js

FROM node:alpine

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY . .
CMD node dist/apps/server/main.js
