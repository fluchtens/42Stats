FROM node:22-alpine3.19

RUN apk update && \
    npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev"]
