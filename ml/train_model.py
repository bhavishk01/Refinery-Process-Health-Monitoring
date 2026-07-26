from pathlib import Path
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier

BASE_DIR = Path(__file__).resolve().parent

PROCESSED_DIR = BASE_DIR / "processed"
MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(exist_ok=True)

print("=" * 70)
print("RANDOM FOREST TRAINING")
print("=" * 70)

print("\nLoading training data...")

X_train = pd.read_csv(PROCESSED_DIR / "X_train.csv")
y_train = pd.read_csv(PROCESSED_DIR / "y_train.csv")

y_train = y_train.squeeze()

print(f"Training Samples : {len(X_train):,}")
print(f"Features : {X_train.shape[1]}")

print("\nCreating Random Forest model...")

model = RandomForestClassifier(
    n_estimators=180,
    criterion="entropy",
    max_depth=30,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features="sqrt",
    bootstrap=True,
    random_state=42,
    n_jobs=-1
)

print("\nTraining model...")

model.fit(X_train, y_train)

print("Training completed successfully!")

model_path = MODEL_DIR / "random_forest.pkl"

joblib.dump(model, model_path)

print(f"\nModel saved to:\n{model_path}")

print("\nDone!")