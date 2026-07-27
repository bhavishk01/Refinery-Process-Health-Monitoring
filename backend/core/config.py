from pathlib import Path
BACKEND_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BACKEND_DIR.parent
ML_DIR = PROJECT_ROOT / "ml"
MODEL_DIR = ML_DIR / "models"
XGBOOST_MODEL_PATH = MODEL_DIR / "xgboost_model.pkl"
RANDOM_FOREST_MODEL_PATH = MODEL_DIR / "random_forest.pkl"
PROCESSED_DATA_DIR = ML_DIR / "processed"
FAULT_FREE_TEST_DATA = PROCESSED_DATA_DIR / "FaultFree_Testing.csv"
FAULTY_TEST_DATA = PROCESSED_DATA_DIR / "Faulty_Training.csv"
DEMO_REPLAY_DATA = PROCESSED_DATA_DIR / "DemoReplay.csv"
DATABASE_DIR = PROJECT_ROOT / "database"
DATABASE_PATH = DATABASE_DIR / "refinery.db"