FROM node:lts

RUN apt-get update && \
    npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

CMD ["pnpm", "run", "start"]