MODE=prod
COMPOSE_FILE = docker/${MODE}/docker-compose.yml
DOCKER_COMPOSE = docker-compose -f ${COMPOSE_FILE}

ifeq ($(MODE),prod)
	RUN_FLAGS = -d
else
	RUN_FLAGS =
endif

all: build

build: clean
	${DOCKER_COMPOSE} up --build ${RUN_FLAGS}

up: down
	${DOCKER_COMPOSE} up ${RUN_FLAGS}

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
