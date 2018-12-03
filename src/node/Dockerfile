FROM node:10

MAINTAINER Lucas Vivas

RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/

COPY .  ./

RUN npm init -y
RUN npm install express
RUN npm install morgan
RUN npm install cors
RUN npm install jshint
RUN npm install pg

EXPOSE $PORT
CMD npm run start
