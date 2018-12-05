#!/bin/bash
docker rm -f projet-web-api
docker rm -f projet-web-client
docker rm -f postgresql
docker rmi -f playlistgenerator_node:latest
docker rmi -f playlistgenerator_angular:latest
docker rmi -f playlistgenerator_postgresql:latest
