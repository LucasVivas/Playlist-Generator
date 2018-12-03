#!/bin/bash
docker rm projet-web-api
docker rm projet-web-client
docker rm postgresql
docker rmi playlistgenerator_node:latest
docker rmi playlistgenerator_angular:latest
docker rmi playlistgenerator_postgresql:latest
