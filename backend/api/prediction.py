from fastapi import APIRouter, HTTPException

from services.prediction_service import PredictionService
from core.model_loader import ModelLoader

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

prediction_service = PredictionService()

try:
    ModelLoader.load_models()
    prediction_service.load_live_dataset()
except Exception as e:
    print(f"Startup Error: {e}")

@router.get("/next")
def predict_next():

    result = prediction_service.predict_next()

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="No more samples available."
        )

    return result

@router.post("/restart")
def restart_replay():

    prediction_service.restart()

    return {
        "success": True,
        "message": "Replay restarted successfully."
    }

@router.post("/live")
def load_live_monitoring():

    prediction_service.load_live_dataset()

    return {
        "success": True,
        "message": "Live plant monitoring started."
    }

@router.post("/normal")
def load_normal():

    prediction_service.load_normal_dataset()

    return {
        "success": True,
        "message": "Normal operation loaded."
    }

@router.post("/fault/{fault_number}")
def load_fault(fault_number: int):

    if fault_number < 1 or fault_number > 20:
        raise HTTPException(
            status_code=400,
            detail="Fault number must be between 1 and 20."
        )

    prediction_service.load_fault_dataset(fault_number)

    return {
        "success": True,
        "message": f"Fault Scenario F{fault_number} loaded."
    }