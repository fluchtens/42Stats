# Specifies the base image to be used to build the Docker image
FROM node:lts

# Installs the required packages
RUN apt-get update && npm install -g npm

# Sets the working directory
WORKDIR /app

# Installs project dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./

# Setups prisma
RUN npx prisma generate

# Exposes port
EXPOSE 3000

# Starts application
CMD ["npm", "run", "migrate:dev"]