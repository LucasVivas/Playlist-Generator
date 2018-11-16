ARG VERSION=10

FROM node:$VERSION

MAINTAINER Lucas Vivas

RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/

COPY ./src/*  ./

RUN npm init -y
RUN npm install express --save
RUN npm install morgan --save
RUN npm install cors --save

EXPOSE $PORT    
CMD npm run start
