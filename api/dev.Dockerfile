FROM maven:3-openjdk-17

WORKDIR /app

COPY . .

ENV TZ=Europe/Paris

EXPOSE 8080

CMD mvn spring-boot:run
