FROM node:23-alpine3.19

RUN apk update && \
    npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

RUN pnpm run build

ENV TZ=Europe/Paris

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
