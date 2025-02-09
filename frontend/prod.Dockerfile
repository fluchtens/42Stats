FROM node:22-alpine3.19

RUN apk update && \
		apk add nginx && \
		npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm run build

COPY nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
