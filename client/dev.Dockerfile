FROM node:lts-alpine

RUN apk update && \
    npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
