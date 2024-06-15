FROM openjdk:22

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

# FROM maven:3.8.5-openjdk-17

# WORKDIR /bezkoder-app
# COPY . .
# RUN mvn clean install

# CMD mvn spring-boot:run





# FROM maven:3.9.7-eclipse-temurin-22

# WORKDIR /app

# COPY . .

# RUN mvn clean install

# CMD ["mvn", "spring-boot:run"]


# FROM maven:3.8-openjdk-17 AS build
# WORKDIR /app
# COPY . .
# RUN mvn clean package

# FROM ibm-semeru-runtimes:open-17-jre-centos7
# WORKDIR /app
# COPY --from=build /app/target/*.jar app.jar
# EXPOSE 8080
# CMD ["java", "-jar", "app.jar"]
