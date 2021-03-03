#
# A Makefile to manage docker images.
#
# (02/01/2021) - Barcelona
# Author:  Corentin COUTRET-ROZET <corentin.rozet@epitech.eu>
#

up:
	sudo docker-compose up -d

down:
	sudo docker-compose down -v

restart:
	sudo docker-compose down -v
	sudo docker-compose up -d

build:
	sudo docker-compose build

clean-db:
	sudo rm -rf data-node

log-server:
	sudo docker logs backend