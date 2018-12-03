FROM node:10

MAINTAINER Lucas Vivas

RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/

ENV PATH /home/node/app/node_modules/.bin:$PATH

COPY package.json /home/node/app/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.4

COPY . /home/node/app

EXPOSE $PORT
CMD ng serve --host 0.0.0.0
