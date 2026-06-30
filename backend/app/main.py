from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base, SessionLocal
import app.models  # noqa: F401 — ensure all models are registered before create_all
from app.routers import auth, votes
from app.seed import seed_if_empty

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
    db = SessionLocal()
    try:
        seed_if_empty(db)
    finally:
        db.close()


app.include_router(auth.router)
app.include_router(votes.router)


@app.get("/")
def root():
    return {"message": "ThesisHQ API is running"}


@app.get("/health")
def health():
    return {"status": "ok", "version": "0.1.0"}
