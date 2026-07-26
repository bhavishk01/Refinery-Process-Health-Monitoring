import joblib
from pathlib import Path

model_path = Path("models") / "random_forest.pkl"

print("Exists:", model_path.exists())
print("Size:", model_path.stat().st_size)

try:
    model = joblib.load(model_path)
    print("SUCCESS")
    print(type(model))
except Exception as e:
    print(type(e).__name__)
    print(e)