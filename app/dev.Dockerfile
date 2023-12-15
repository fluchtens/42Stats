# Specifies the base image to be used to build the Docker image
FROM node:lts

# Installs the required packages
RUN apt-get update && npm install -g pnpm

# Sets the working directory
WORKDIR /app

# Installs project dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY ./ ./

# Exposes port
EXPOSE 3000

# Starts application
CMD ["pnpm", "run", "dev"]