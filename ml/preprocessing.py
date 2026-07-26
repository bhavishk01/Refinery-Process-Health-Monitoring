from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split

BASE_DIR = Path(__file__).resolve().parent

PROCESSED_DIR = BASE_DIR / "processed"
REPORT_DIR = BASE_DIR / "reports"

REPORT_DIR.mkdir(exist_ok=True)

FAULTFREE_FILE = PROCESSED_DIR / "FaultFree_Training.csv"
FAULTY_FILE = PROCESSED_DIR / "Faulty_Training.csv"

TARGET = "faultNumber"

print("=" * 70)
print("AI REFINERY PREPROCESSING")
print("=" * 70)

print("\nLoading datasets...")

faultfree = pd.read_csv(FAULTFREE_FILE)
faulty = pd.read_csv(FAULTY_FILE)

print("FaultFree Shape :", faultfree.shape)
print("Faulty Shape    :", faulty.shape)

cols = ["simulationRun", "sample"]

for c in cols:
    if c in faultfree.columns:
        faultfree.drop(columns=c, inplace=True)
    if c in faulty.columns:
        faulty.drop(columns=c, inplace=True)

faultfree.drop_duplicates(inplace=True)
faulty.drop_duplicates(inplace=True)

faultfree.reset_index(drop=True, inplace=True)
faulty.reset_index(drop=True, inplace=True)

print("\nMissing Values")
print(faultfree.isnull().sum().sum())
print(faulty.isnull().sum().sum())

print("\nClass Distribution")

print(faultfree[TARGET].value_counts().sort_index())

print(faulty[TARGET].value_counts().sort_index())

data = pd.concat(
    [faultfree, faulty],
    ignore_index=True
)

samples_per_class = 12000

balanced = []

for cls in sorted(data["faultNumber"].unique()):

    temp = data[data["faultNumber"] == cls]

    if len(temp) > samples_per_class:

        temp = temp.sample(
            n=samples_per_class,
            random_state=42
        )

    balanced.append(temp)

data = pd.concat(
    balanced,
    ignore_index=True
)

data = data.sample(
    frac=1,
    random_state=42
).reset_index(drop=True)

print("Balanced Dataset Shape :", data.shape)

print("\nTotal Samples :", len(data))

X = data.drop(columns=[TARGET])

y = data[TARGET]

print("Features :", X.shape[1])

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

print("\nSaving processed datasets...")

X_train.to_csv(
    PROCESSED_DIR / "X_train.csv",
    index=False
)

X_test.to_csv(
    PROCESSED_DIR / "X_test.csv",
    index=False
)

y_train.to_frame(
    name=TARGET
).to_csv(
    PROCESSED_DIR / "y_train.csv",
    index=False
)

y_test.to_frame(
    name=TARGET
).to_csv(
    PROCESSED_DIR / "y_test.csv",
    index=False
)

report = REPORT_DIR / "preprocessing_report.txt"

with open(report, "w") as f:

    f.write("=" * 60 + "\n")
    f.write("AI REFINERY PREPROCESSING REPORT\n")
    f.write("=" * 60 + "\n\n")

    f.write(f"FaultFree Samples : {len(faultfree)}\n")
    f.write(f"Faulty Samples    : {len(faulty)}\n")
    f.write(f"Total Samples     : {len(data)}\n\n")

    f.write(f"Features          : {X.shape[1]}\n")
    f.write(f"Training Samples  : {len(X_train)}\n")
    f.write(f"Testing Samples   : {len(X_test)}\n\n")

    f.write("Training Class Distribution\n")
    f.write(
        y_train.value_counts().sort_index().to_string()
    )

    f.write("\n\n")

    f.write("Testing Class Distribution\n")
    f.write(
        y_test.value_counts().sort_index().to_string()
    )

print("\nFiles Created Successfully")

print(PROCESSED_DIR / "X_train.csv")
print(PROCESSED_DIR / "X_test.csv")
print(PROCESSED_DIR / "y_train.csv")
print(PROCESSED_DIR / "y_test.csv")

print("\nReport Generated")

print(report)

print("\nPreprocessing Completed Successfully")

print("=" * 60)