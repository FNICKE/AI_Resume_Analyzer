# Stage 1: Build stage
FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /app

# Copy the maven wrapper and pom file
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Ensure line endings are correct and mvnw is executable
RUN chmod +x mvnw

# Download dependencies (caching step)
RUN ./mvnw dependency:go-offline -B

# Copy source files
COPY src ./src

# Package the application
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the packaged jar from the builder stage
COPY --from=builder /app/target/resume-analyzer-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
