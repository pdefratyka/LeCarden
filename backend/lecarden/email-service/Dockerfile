FROM openjdk:11-jre-slim-buster
ARG JAR_FILE=target/email-service.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]