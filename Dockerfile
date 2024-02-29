FROM node:lts

RUN apt-get update && \
    npm install -g pnpm

WORKDIR /app

COPY ./app/package.json .
RUN pnpm install
COPY ./app/ .

CMD ["pnpm", "run", "migrate:dev"]
