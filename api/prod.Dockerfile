FROM maven:3-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/stats-0.0.1-SNAPSHOT.jar ./app.jar
ENV TZ=Europe/Paris
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
