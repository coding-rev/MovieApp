# Docker Setup for Monorepo Application

This guide explains how to containerize and run your monorepo application using Docker and Docker Compose.

## 📁 Project Structure

```
.
├── apps/
│   ├── api/            # Express.js API
│   │   └── Dockerfile
│   └── web/            # Next.js application
│       └── Dockerfile
├── packages/
│   └── types/          # Shared TypeScript types
├── docker-compose.yml  # Production orchestration
├── docker-compose.dev.yml # Development orchestration
├── prometheus.yml      # Prometheus configuration
├── Makefile           # Convenience commands
└── .dockerignore      # Docker build exclusions
```

## 🚀 Quick Start

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- Node.js 20+ (for local development)

### Production Setup

1. **Copy and configure environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

2. **Build and start all services:**
```bash
make build
make up
```

Or using Docker Compose directly:
```bash
docker-compose build
docker-compose up -d
```

3. **Seed the database (if needed):**
```bash
make seed-prod
```

4. **Access the applications:**
- Web app: http://localhost:3000
- API: http://localhost:4000
- Prometheus: http://localhost:9090

### Development Setup

For development with hot reloading:

```bash
make dev
```

Or:
```bash
docker-compose -f docker-compose.dev.yml up
```

## 📦 Docker Images

### API Dockerfile Features
- Multi-stage build for optimized image size
- Prisma client generation
- Production-only dependencies in final image
- Health checks configured

### Web Dockerfile Features
- Next.js optimized build
- Static assets properly copied
- Production server configuration
- Minimal final image

## 🔧 Available Commands

Use the Makefile for convenience:

```bash
make help              # Show all available commands
make build            # Build all images
make up               # Start all services
make down             # Stop all services
make logs             # View logs
make clean            # Remove containers and volumes
make shell-api        # Access API container shell
make shell-web        # Access web container shell
make health           # Check services health
```

## 📊 Monitoring

### Prometheus
- Metrics endpoint: http://localhost:9090
- Scrapes API metrics from `/metrics` endpoint
- Configuration in `prometheus.yml`

## 🗄️ Database Management

```bash
# Run migrations
make db-migrate

# Seed development data
make seed-dev

# Seed production data
make seed-prod

# Open Prisma Studio
make db-studio

# Access PostgreSQL shell
make shell-db
```

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts:**
   - Ensure ports 3000, 4000, 5432, 9090 are available
   - Modify port mappings in docker-compose.yml if needed

2. **Build failures:**
   ```bash
   # Clean and rebuild
   make clean
   make build
   ```

3. **Database connection issues:**
   - Check DATABASE_URL in .env
   - Ensure db service is healthy: `docker-compose ps`

4. **Memory issues:**
   - Increase Docker Desktop memory allocation
   - Add memory limits in docker-compose.yml:
   ```yaml
   services:
     api:
       deploy:
         resources:
           limits:
             memory: 1G
   ```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f db
```

## 🏗️ Building for Different Environments

### Staging
```bash
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d
```

### Production
```bash
# Build with production optimizations
docker build --target production -t myapp-api:latest ./apps/api
docker build --target production -t myapp-web:latest ./apps/web

# Push to registry
docker tag myapp-api:latest myregistry.com/myapp-api:latest
docker push myregistry.com/myapp-api:latest
```

## 🔐 Security Best Practices

1. **Never commit .env files** - Use secrets management in production
2. **Use specific image versions** instead of `latest`
3. **Run containers as non-root user** (add USER directive in Dockerfile)
4. **Scan images for vulnerabilities:**
   ```bash
   docker scan myapp-api:latest
   ```
5. **Use Docker secrets** for sensitive data in production

## 📈 Performance Optimization

1. **Use BuildKit for faster builds:**
   ```bash
   DOCKER_BUILDKIT=1 docker-compose build
   ```

2. **Enable Docker layer caching**

3. **Optimize Dockerfile layers:**
   - Copy package files before source code
   - Use multi-stage builds
   - Minimize layer count

4. **Configure Node.js for production:**
   ```dockerfile
   ENV NODE_ENV=production
   ENV NODE_OPTIONS="--max-old-space-size=2048"
   ```

## 🔄 CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and push Docker images
        run: |
          docker-compose build
          docker-compose push
      
      - name: Deploy
        run: |
          # Your deployment commands
```

## 📝 Notes

- The monorepo uses npm workspaces for dependency management
- Types package is built before API and Web apps
- Database migrations run automatically on API startup (configure in Dockerfile CMD if needed)
- Prometheus scrapes metrics every 10 seconds from the API `/metrics` endpoint
- Redis is included for session management/caching (optional)

## 🤝 Contributing

When adding new services:
1. Create a Dockerfile in the service directory
2. Add service configuration to docker-compose.yml
3. Update .dockerignore if needed
4. Add convenient commands to Makefile
5. Document any new environment variables

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Prometheus Documentation](https://prometheus.io/docs/)
