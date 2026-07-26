from pathlib import Path
import joblib
from core.config import XGBOOST_MODEL_PATH
class ModelLoader:
    _xgboost_model = None
    @classmethod
    def load_models(cls):
        if cls._xgboost_model is None:

            if not Path(XGBOOST_MODEL_PATH).exists():
                raise FileNotFoundError(
                    f"XGBoost model not found:\n{XGBOOST_MODEL_PATH}"
                )

            print("Loading XGBoost model...")

            cls._xgboost_model = joblib.load(XGBOOST_MODEL_PATH)

            print("XGBoost model loaded successfully.")

    @classmethod
    def get_xgboost_model(cls):
        if cls._xgboost_model is None:
            raise RuntimeError(
                "Model has not been loaded. Call load_models() first."
            )

        return cls._xgboost_model