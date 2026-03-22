# BikeRental Docker Deployment Guide

## Prerequisites

- Docker Desktop installed and running
- Docker Compose installed (included with Docker Desktop)

## Quick Start with Docker Compose

The easiest way to run the entire BikeRental application with all services:

### 1. Start All Services

```bash
docker-compose up -d
```

This command will:
- Create a MySQL database container
- Build and start the Java Spring Boot backend
- Build and start the React frontend
- Set up networking between containers

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **MySQL**: localhost:3306 (host machine)

### 3. Check Service Status

```bash
# View all containers
docker-compose ps

# View logs for a specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# View real-time logs
docker-compose logs -f
```

### 4. Stop All Services

```bash
docker-compose down
```

### 5. Reset Everything

```bash
# Stop and remove all containers, volumes, and networks
docker-compose down -v

# Clean up dangling images
docker image prune -f
```

## Individual Service Deployment

### Deploy Backend Only

```bash
docker build -t bikerental-backend ./bikerental-java-backend
docker run -d --name backend -p 8080:8080 \
  -e SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/bikerental" \
  -e SPRING_DATASOURCE_USERNAME="bikerental_user" \
  -e SPRING_DATASOURCE_PASSWORD="bikerental_password" \
  bikerental-backend
```

### Deploy Frontend Only

```bash
docker build -t bikerental-frontend ./bikerental-react-frontend
docker run -d --name frontend -p 3000:3000 bikerental-frontend
```

## Configuration

### Environment Variables

#### Backend Environment Variables
Create `.env.backend`:
```env
SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/bikerental
SPRING_DATASOURCE_USERNAME=bikerental_user
SPRING_DATASOURCE_PASSWORD=bikerental_password
JWT_SECRET=your-secret-key-min-32-characters
JWT_EXPIRATION=86400000
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
```

#### Frontend Environment Variables
Create `.env.frontend`:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_API_TIMEOUT=10000
```

### Database Initialization

The database automatically initializes using Flyway migrations from:
- `bikerental-java-backend/src/main/resources/db/migration/V1__Initial_Schema.sql`

To add custom migrations:
1. Create new files: `V2__Your_Migration.sql`, `V3__Another_Migration.sql`, etc.
2. Place in the migration folder
3. Restart containers

## Docker Compose Services

### MySQL Service (db)
```yaml
image: mysql:8.0
ports: 3306
volumes: mysql_data (persistent storage)
health_check: enabled
```

### Backend Service (backend)
```yaml
build: ./bikerental-java-backend
ports: 8080
depends_on: db (waits for healthy DB)
health_check: enabled
```

### Frontend Service (frontend)
```yaml
build: ./bikerental-react-frontend
ports: 3000
depends_on: backend
nginx: reverse proxy for API
```

## Network Configuration

All services communicate via the `bikerental-network` bridge:
- Backend → Database: `jdbc:mysql://db:3306/bikerental`
- Frontend → Backend: `http://backend:8080/api` (internal)
- External → Frontend: `http://localhost:3000`
- External → Backend: `http://localhost:8080/api`

## Troubleshooting

### Containers Won't Start

```bash
# Check logs for errors
docker-compose logs

# Rebuild images (clear cache)
docker-compose build --no-cache
docker-compose up -d
```

### Port Already in Use

```bash
# Find process using port
# Windows: netstat -ano | findstr :3000

# Kill process or change port in docker-compose.yml
# Change: ports: ["3000:3000"] to ["3001:3000"]
```

### Database Connection Issues

```bash
# Check if DB is healthy
docker-compose exec db mysql -u bikerental_user -pbikerental_password -e "SELECT 1;"

# Verify network connectivity
docker-compose exec backend curl http://db:3306
```

### Frontend Can't Connect to Backend

```bash
# Check if backend is responding
curl http://localhost:8080/api/health

# Check frontend logs
docker-compose logs frontend | grep -i error
```

## Production Deployment

For production deployment to cloud platforms (AWS, Google Cloud, Azure):

### 1. Use Environment-Specific Configs
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 2. Secrets Management
Use Docker Secrets or environment variable files:
```bash
docker-compose --env-file .env.prod up -d
```

### 3. Resource Limits
Add resource constraints in docker-compose.yml:
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

### 4. Logging and Monitoring
Configure log drivers:
```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Development Workflow

### Develop with Hot Reload (Frontend)

```bash
# Run frontend locally, backend in docker
docker-compose up db backend

# In another terminal
cd bikerental-react-frontend
npm install
npm start
```

### Develop with Hot Reload (Backend)

```bash
# Run database in docker
docker-compose up db

# In another terminal
cd bikerental-java-backend
mvn spring-boot:run
```

### View Real-time Changes

```bash
docker-compose logs -f [service-name]
```

## Useful Commands

```bash
# View container details
docker ps -a
docker inspect [container-name]

# Execute commands in containers
docker-compose exec backend curl http://localhost:8080/api/health
docker-compose exec db mysql -u root -p

# Access container shell
docker-compose exec backend /bin/bash
docker-compose exec frontend /bin/sh

# Monitor resource usage
docker stats

# Clean up unused resources
docker system prune -a
```

## Performance Optimization

### Image Layer Caching
- Order Dockerfile commands to maximize cache hits
- Dependencies first, then changing code

### Database Optimization
- Use MySQL indexes on frequently queried columns
- Connection pooling configured via Spring Boot

### Frontend Optimization
- Images built with multi-stage Docker build
- Production build with minification
- Nginx serves static files with caching headers

## Security Considerations

1. **Secrets Management**: Change JWT_SECRET and database passwords before production
2. **Network Security**: Use internal docker networks, expose only necessary ports
3. **Image Security**: Scan for vulnerabilities with `docker scan`
4. **HTTPS**: Use reverse proxy (Nginx, Caddy) in front of the application
5. **Database**: Use strong passwords, restrict connections

## Monitoring and Logging

### Check Application Logs

```bash
# All services
docker-compose logs

# Specific service with follow
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100
```

### Health Checks

All services include health checks. Check status:

```bash
docker-compose ps  # Shows health status
docker inspect [container-name]  # Detailed health info
```

## Next Steps

1. Customize environment variables in docker-compose.yml
2. Adjust resource limits for your use case
3. Set up persistent backups for the database
4. Configure custom domains and HTTPS
5. Set up monitoring and alerting

---

**Version**: 1.0.0  
**Last Updated**: 2025
