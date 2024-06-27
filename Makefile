MODE=dev
COMPOSE_FILE = docker/${MODE}/docker-compose.yml
DOCKER_COMPOSE = docker-compose -f ${COMPOSE_FILE}

all: build

build: clean
	${DOCKER_COMPOSE} up --build

up: down
	${DOCKER_COMPOSE} up

down:
	${DOCKER_COMPOSE} down

prune:
	docker system prune -f

clean:
	${DOCKER_COMPOSE} down --rmi all
	@make prune

fclean:
	${DOCKER_COMPOSE} down --rmi all --volumes
	@make prune
