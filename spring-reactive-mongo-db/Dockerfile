FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN mvn clean install -Dmaven.test.skip=true 
VOLUME /tmp
EXPOSE 8090
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/target/spring-reactive-mongo-db-0.0.1-SNAPSHOT.jar"]