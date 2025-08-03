# 🧠 FinAgent Monorepo

Monorepo profissional do projeto **FinAgent.ai** – um SaaS de agente financeiro prescritivo com arquitetura escalável, modular e robusta.

Inclui:

- **apps** → `web`, `edge`, `api`
- **packages** → `ui`, `sdk`, `schemas`
- **services** → `workers`, `gateways`
- **infra** → `terraform`, `docker`, `db`
- **tests** → cobertura completa do stack
- **docs** → documentação técnica
- **CI** → GitHub Actions, lint/test/deploy

---

## ⚡️ Quickstart Dev (Stack Local)

```bash
# Subir Redis, PostgreSQL etc.
make dev

# Iniciar API (FastAPI)
cd apps/api
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Iniciar Web (Next.js)
cd apps/web
pnpm install
pnpm dev
.\.venv\Scripts\Activate.ps1   
http://localhost:8000/docs#/default/health%20health%20get