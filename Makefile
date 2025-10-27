.PHONY: help build up down restart logs clean dev prod seed-dev seed-prod

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

# Production Commands
build: ## Build all Docker images for production
	docker-compose build --no-cache

up: ## Start all services in production mode (detached)
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## View logs for all services
	docker-compose logs -f

logs-api: ## View logs for API service only
	docker-compose logs -f api

logs-web: ## View logs for web service only
	docker-compose logs -f web

# Development Commands
dev: ## Start all services in development mode with hot reloading
	docker-compose -f docker-compose.dev.yml up

dev-build: ## Build development containers
	docker-compose -f docker-compose.dev.yml build

dev-down: ## Stop development services
	docker-compose -f docker-compose.dev.yml down

# Database Commands
db-migrate: ## Run database migrations
	docker-compose exec api npm run -w apps/api prisma migrate deploy

seed-dev: ## Seed development database
	docker-compose exec api npm run db:seed-dev

seed-prod: ## Seed production database
	docker-compose exec api npm run db:seed-prod

db-studio: ## Open Prisma Studio
	docker-compose exec api npx prisma studio

# Utility Commands
clean: ## Remove all containers, networks, and volumes
	docker-compose down -v
	docker system prune -f

shell-api: ## Open a shell in the API container
	docker-compose exec api sh

shell-web: ## Open a shell in the web container
	docker-compose exec web sh

shell-db: ## Open PostgreSQL shell
	docker-compose exec db psql -U postgres -d fullstack

# Monitoring Commands
prometheus: ## Open Prometheus dashboard
	open http://localhost:9090 || xdg-open http://localhost:9090

# Testing Commands
test-api: ## Run API tests
	docker-compose exec api npm run -w apps/api test

test-web: ## Run web tests
	docker-compose exec web npm run -w apps/web test

test-all: ## Run all tests
	docker-compose exec api npm run -w apps/api test
	docker-compose exec web npm run -w apps/web test

# Build individual services
build-api: ## Build only the API image
	docker-compose build api

build-web: ## Build only the web image
	docker-compose build web

# Health checks
health: ## Check health status of all services
	@echo "Checking service health..."
	@docker-compose ps
	@echo "\nAPI Health:"
	@curl -f http://localhost:4000/health || echo "API is not healthy"
	@echo "\nWeb Health:"
	@curl -f http://localhost:3000 || echo "Web is not healthy"
	@echo "\nPrometheus Health:"
	@curl -f http://localhost:9090/-/healthy || echo "Prometheus is not healthy"
