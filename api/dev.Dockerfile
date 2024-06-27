FROM maven:3-openjdk-17
WORKDIR /app
COPY . .
CMD mvn spring-boot:run
