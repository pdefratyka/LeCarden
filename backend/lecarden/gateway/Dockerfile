FROM java:8-jre
ARG JAR_FILE=target/gateway.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]