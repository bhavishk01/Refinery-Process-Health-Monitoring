from pathlib import Path
import joblib
import pandas as pd
from xgboost import XGBClassifier

BASE_DIR = Path(__file__).resolve().parent

PROCESSED_DIR = BASE_DIR / "processed"
MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(exist_ok=True)

print("=" * 70)
print("XGBOOST TRAINING")
print("=" * 70)

print("\nLoading training data...")

X_train = pd.read_csv(PROCESSED_DIR / "X_train.csv")
y_train = pd.read_csv(PROCESSED_DIR / "y_train.csv").squeeze()

print(f"Training Samples : {len(X_train):,}")
print(f"Features         : {X_train.shape[1]}")

print("\nCreating XGBoost model...")

model = XGBClassifier(

    objective="multi:softmax",
    num_class=21,

    n_estimators=150,
    max_depth=8,

    learning_rate=0.1,

    subsample=0.8,
    colsample_bytree=0.8,

    tree_method="hist",

    random_state=42,
    n_jobs=-1,

    eval_metric="mlogloss"
)

print("\nTraining model...")

model.fit(X_train, y_train)

print("Training completed successfully!")

model_path = MODEL_DIR / "xgboost_model.pkl"

joblib.dump(model, model_path)

print(f"\nModel saved to:\n{model_path}")

print("\nDone!")