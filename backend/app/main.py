from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
import app.models  # noqa: F401 — ensure all models are registered before create_all
from app.routers import auth

app = FastAPI(title="ThesisHQ API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)


app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "ThesisHQ API is running"}


@app.get("/health")
def health():
    return {"status": "ok", "version": "0.1.0"}
