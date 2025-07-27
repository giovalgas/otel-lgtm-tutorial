# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn dependency:go-offline -B
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/worker.jar /app/app.jar
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.18.1/opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar

EXPOSE 8080

ENTRYPOINT [\
        "java",\
        "-javaagent:/app/opentelemetry-javaagent.jar",\
        "-Dotel.service.name=worker",\
        "-Dotel.exporter.otlp.endpoint=http://otel-collector:4317",\
        "-Dotel.exporter.otlp.protocol=grpc",\
        "-Dotel.logs.exporter=otlp",\
        "-Dotel.metrics.exporter=otlp",\
        "-Dotel.traces.exporter=otlp",\
        "-jar",\
        "/app/app.jar"]
