FROM node:lts

RUN apt-get update && \
    npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

RUN pnpx prisma generate

CMD ["pnpm", "run", "migrate:dev"]
