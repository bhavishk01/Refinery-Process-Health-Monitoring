from pathlib import Path
import gc
import joblib
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix

BASE_DIR = Path(__file__).resolve().parent

PROCESSED_DIR = BASE_DIR / "processed"
MODEL_DIR = BASE_DIR / "models"

print("STEP 1 - Loading model")
model = joblib.load(MODEL_DIR / "random_forest.pkl")
print("✓ Model loaded")

gc.collect()

print("STEP 2 - Loading test data")

X_test = pd.read_csv(
    PROCESSED_DIR / "X_test.csv",
    nrows=10000
)

y_test = pd.read_csv(
    PROCESSED_DIR / "y_test.csv",
    nrows=10000
).squeeze()

print("✓ Test data loaded")
print(X_test.shape)

gc.collect()

print("STEP 3 - Predicting")

y_pred = model.predict(X_test)

print("✓ Prediction complete")

acc = accuracy_score(y_test, y_pred)

print(f"\nAccuracy: {acc:.4f}")

print("\nClassification Report")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix")
print(confusion_matrix(y_test, y_pred))