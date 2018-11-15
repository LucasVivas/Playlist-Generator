FROM node:10

MAINTAINER Lucas Vivas

RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/

COPY ./app/*  ./

RUN npm init -y
RUN npm install express --save
RUN npm install morgan --save
RUN npm install cors --save
