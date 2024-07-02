MODE=prod
COMPOSE_FILE = docker/${MODE}/docker-compose.yml
DOCKER_COMPOSE = docker-compose -f ${COMPOSE_FILE}
PROJECT=42stats

ifeq ($(MODE),prod)
	RUN_FLAGS = -d
else
	RUN_FLAGS =
endif

all: build

build: clean
	${DOCKER_COMPOSE} -p ${PROJECT} up --build ${RUN_FLAGS}

up: down
	${DOCKER_COMPOSE} -p ${PROJECT} up ${RUN_FLAGS}

down:
	${DOCKER_COMPOSE} -p ${PROJECT} down

prune:
	docker system prune -f

clean:
	${DOCKER_COMPOSE} down -p ${PROJECT} --rmi all
	@make prune

fclean:
	${DOCKER_COMPOSE} down -p ${PROJECT} --rmi all --volumes
	@make prune

.PHONY: all build up down prune clean fclean

.SILENT:
