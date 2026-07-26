import gc
import os
from pathlib import Path

import pandas as pd
import pyreadr

# ==========================================================
# PATHS
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent
RAW_DIR = BASE_DIR.parent / "datasets" / "raw"
REPORT_DIR = BASE_DIR / "reports"
PROCESSED_DIR = BASE_DIR / "processed"

REPORT_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)

# ==========================================================
# SYSTEM CONFIGURATION
# ==========================================================

# Your laptop has about 6 GB RAM.
# Skip files larger than this threshold.
MAX_FILE_SIZE_MB = 600

# ==========================================================
# DATASETS
# ==========================================================

DATASETS = {
    "FaultFree_Training": "TEP_FaultFree_Training.RData",
    "FaultFree_Testing": "TEP_FaultFree_Testing.RData",
    "Faulty_Training": "TEP_Faulty_Training.RData",
    "Faulty_Testing": "TEP_Faulty_Testing.RData",
}

report = []
reference_columns = None

print("=" * 70)
print("TENNESSEE EASTMAN DATASET EXPLORER")
print("=" * 70)

for dataset_name, filename in DATASETS.items():

    path = RAW_DIR / filename

    if not path.exists():
        print(f"\n❌ {filename} not found")
        report.append(f"{dataset_name}: FILE NOT FOUND")
        continue

    file_size = path.stat().st_size / (1024 * 1024)

    print("\n" + "=" * 70)
    print(dataset_name)
    print("=" * 70)

    print(f"File Size : {file_size:.2f} MB")

    if file_size > MAX_FILE_SIZE_MB:
        print("⚠️ Skipped (Too large for current RAM)")
        report.append(f"{dataset_name}: SKIPPED (Large File)")
        continue

    try:

        result = pyreadr.read_r(path)

        df = next(iter(result.values()))

        rows, cols = df.shape

        print(f"Rows : {rows:,}")
        print(f"Columns : {cols}")

        print(f"Memory Usage : {df.memory_usage(deep=True).sum()/1024/1024:.2f} MB")

        print(f"Missing Values : {df.isnull().sum().sum()}")

        print(f"Duplicate Rows : {df.duplicated().sum()}")

        print("\nFirst Five Rows\n")
        print(df.head())

        if reference_columns is None:
            reference_columns = list(df.columns)
            feature_status = "Reference Dataset"

        else:

            if list(df.columns) == reference_columns:
                feature_status = "MATCH"
            else:
                feature_status = "DO NOT MATCH"

        print(f"\nFeature Check : {feature_status}")

        csv_path = PROCESSED_DIR / f"{dataset_name}.csv"

        print("\nSaving CSV...")

        df.to_csv(csv_path, index=False)

        print("CSV Saved")

        report.append(
            f"""
Dataset : {dataset_name}
Rows : {rows}
Columns : {cols}
Missing : {df.isnull().sum().sum()}
Duplicates : {df.duplicated().sum()}
Feature Check : {feature_status}
CSV : Saved
"""
        )

        del df
        del result
        gc.collect()

    except Exception as e:

        print("\nERROR")
        print(e)

        report.append(f"{dataset_name}: FAILED\n{e}")

report_path = REPORT_DIR / "dataset_report.txt"

with open(report_path, "w", encoding="utf-8") as f:
    f.write("\n".join(report))

print("\n")
print("=" * 70)
print("DATASET EXPLORATION FINISHED")
print("=" * 70)
print(f"Report Saved : {report_path}")
