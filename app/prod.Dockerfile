FROM node:lts-alpine

RUN apk update && \
    npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

ARG DATABASE_URL
ARG FORTY_TWO_UID
ARG FORTY_TWO_SECRET
ARG AUTH_SECRET

ENV DATABASE_URL=$DATABASE_URL
ENV FORTY_TWO_UID=$FORTY_TWO_UID
ENV FORTY_TWO_SECRET=$FORTY_TWO_SECRET
ENV AUTH_SECRET=$AUTH_SECRET

RUN pnpx prisma generate

EXPOSE 80

CMD ["pnpm", "run", "migrate:build"]
