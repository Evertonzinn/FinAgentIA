from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI(title="FinAgent API", version="0.1.0")

# CORS para o front local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScenarioIn(BaseModel):
    name: str
    params: dict

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/v1/kpis")
def kpis():
    return {
        "saldo": 125000.0,
        "receita30": 84200.0,
        "despesas30": 67650.0
    }

@app.post("/v1/scenarios")
def create_scenario(payload: ScenarioIn):
    scn_id = f"scn_{uuid.uuid4().hex[:8]}"
    return {"id": scn_id, "status": "processing"}

