SHELL := /bin/bash

# Variables
ROOT := $(CURDIR)
API := apps/api
WEB := apps/web
TYPES := packages/types

.PHONY: help install env seed dev dev-api dev-web build build-api build-web start typecheck clean

help:
	@echo "Make targets:"
	@echo "  install     - Install all workspace dependencies"
	@echo "  env         - Copy example env files for API and Web"
	@echo "  seed        - Initialize/seed the SQLite/Postgres database"
	@echo "  dev         - Run types, API, and Web in watch/dev mode"
	@echo "  dev-api     - Run only the API in dev mode"
	@echo "  dev-web     - Run only the Web app in dev mode"
	@echo "  build       - Build API and Web"
	@echo "  build-api   - Build only the API"
	@echo "  build-web   - Build only the Web"
	@echo "  start       - Start API and Web (production builds)"
	@echo "  typecheck   - Type-check all workspaces"
	@echo "  clean       - Remove build artifacts"

install:
	npm install
	env -C $(TYPES) npm run build || true

env:
	@[ -f "$(API)/.env" ] || cp "$(API)/.env.example" "$(API)/.env"; echo "API env ready: $(API)/.env"
	@[ -f "$(WEB)/.env.local" ] || cp "$(WEB)/.env.local.example" "$(WEB)/.env.local"; echo "Web env ready: $(WEB)/.env.local"

seed:
	npm run db:seed

dev:
	npm run -w $(TYPES) dev & npm run -w $(API) dev & npm run -w $(WEB) dev

dev-api:
	npm run -w $(API) dev

dev-web:
	npm run -w $(WEB) dev

build:
	npm run build

build-api:
	npm run -w $(API) build

build-web:
	npm run -w $(WEB) build

start:
	npm run start

typecheck:
	npm run typecheck

clean:
	rm -rf "$(API)/dist" "$(WEB)/.next" "$(TYPES)/dist" || true
