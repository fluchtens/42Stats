FROM node:lts-alpine

RUN apk update && \
    npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

RUN pnpx prisma generate

EXPOSE 3000

CMD ["pnpm", "run", "migrate:dev"]
