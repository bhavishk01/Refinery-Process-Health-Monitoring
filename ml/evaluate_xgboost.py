from pathlib import Path

import joblib
import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "models" / "xgboost_model.pkl"

PROCESSED_DIR = BASE_DIR / "processed"

print("=" * 60)
print("XGBOOST MODEL EVALUATION")
print("=" * 60)

print("\nLoading model...")

model = joblib.load(MODEL_PATH)

print("Loading test dataset...")

X_test = pd.read_csv(PROCESSED_DIR / "X_test.csv")
y_test = pd.read_csv(PROCESSED_DIR / "y_test.csv").squeeze()

print("\nRunning predictions...")

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"\nAccuracy : {accuracy * 100:.2f}%")

print("\nClassification Report:\n")

print(classification_report(y_test, predictions))

print("\nConfusion Matrix:\n")

print(confusion_matrix(y_test, predictions))