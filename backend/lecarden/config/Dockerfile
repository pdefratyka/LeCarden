FROM java:8-jre
LABEL maintainer="p.defratyka28@gmail.com"
ARG JAR_FILE=target/config.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8888
ENTRYPOINT ["java","-jar","/app.jar"]
