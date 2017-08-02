.PHONY: run get-ip .env

DOCKER := docker

MAKE_FILE := $(lastword $(MAKEFILE_LIST))
PROJECT_NAME ?= userpanel

DOCKER := docker
DOCKER_COMPOSE := docker-compose -p $(PROJECT_NAME)

######################
## BASE
######################

run:
	$(DOCKER_COMPOSE) up -d --remove-orphans

build: .env
	$(DOCKER_COMPOSE) build --pull

rebuild:
	-$(MAKE) stop
	-$(MAKE) build

stop:
	$(DOCKER_COMPOSE) stop

restart:
	$(DOCKER_COMPOSE) restart

destroy:
	-$(DOCKER_COMPOSE) down -v --rmi local

remove:
	-$(DOCKER_COMPOSE) rm -f -v

kill:
	$(DOCKER_COMPOSE) kill

get-ip:
	@$(DOCKER) inspect -f "{{.Name}}%%{{range .NetworkSettings.Networks}}%%{{.IPAddress}}{{end}}" $(shell docker ps -q -f name=$(PROJECT_NAME)) | tr '%' '\t'


.env:
	cp -n .env.example .env

######################
## MANAGE CONTAINERS
######################

logs-app:
	$(DOCKER_COMPOSE) logs -f app

exec:
	@$(DOCKER_COMPOSE) run -p 3000:3000 app npm start

node-shell:
	$(DOCKER_COMPOSE) run -p 3000:3000 app bash

npm-install:
	@$(DOCKER_COMPOSE) run app npm install
