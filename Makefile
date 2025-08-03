SHELL := /bin/bash

.PHONY: dev stop fmt lint test migrate seed

dev: ## sobe stack local (postgres/redis)
	docker compose -f infra/docker/compose.yml up -d

stop:
	docker compose -f infra/docker/compose.yml down

fmt: ## formata (TS/JS e Python)
	pnpm -C apps/web format || true
	black apps/api services/workers || true

lint:
	pnpm -C apps/web lint || true
	ruff check apps/api services/workers || true

test:
	pnpm -C apps/web test || true
	pytest -q || true

migrate:
	cd apps/api && alembic upgrade head

seed:
	python apps/api/scripts/seed.py
