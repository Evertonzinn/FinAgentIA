# ADR-0001: Monorepo com TS+Python

## Decisão
Usar monorepo com separação por apps e packages, TypeScript para UI/edge e Python para API/workers.

## Consequências
- Reuso de tipagem e contratos.
- Deploys independentes por app.
- CI com matrizes por pasta.
