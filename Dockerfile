ARG VERSION=10

FROM node:$VERSION

RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/

COPY ./app/*  ./

RUN npm init -y
RUN npm install express --save
