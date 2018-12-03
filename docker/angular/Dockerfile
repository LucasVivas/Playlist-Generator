FROM node:10

MAINTAINER Lucas Vivas

RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/

COPY .  /home/node/app

RUN npm install
RUN npm install -g @angular/cli

EXPOSE $PORT
CMD ng serve --host 0.0.0.0
