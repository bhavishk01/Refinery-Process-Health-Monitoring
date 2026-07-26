from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI-Based Refinery Process Health Monitoring API",
    description="Backend API for refinery fault diagnosis using Machine Learning.",
    version="1.0.0"
)

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # We'll tighten this during deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Refinery Monitoring Backend Running",
        "status": "OK",
        "version": "1.0.0"
    }