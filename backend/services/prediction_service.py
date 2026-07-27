import pandas as pd
from datetime import datetime
from core.config import (
    FAULT_FREE_TEST_DATA,
    FAULTY_TEST_DATA,
    DEMO_REPLAY_DATA,
)
from core.model_loader import ModelLoader


class PredictionService:

    def __init__(self):
        self.dataset = None
        self.current_index = 0

    def load_normal_dataset(self):

        self.dataset = pd.read_csv(FAULT_FREE_TEST_DATA)

        self.current_index = 0

        print(f"Loaded {len(self.dataset)} normal samples.")

    def load_demo_dataset(self):

        self.dataset = pd.read_csv(DEMO_REPLAY_DATA)
        self.current_index = 0
        print(f"Loaded {len(self.dataset)} demo replay samples.")

    def load_fault_dataset(self, fault_number: int):

        df = pd.read_csv(FAULTY_TEST_DATA)

        self.dataset = (
            df[df["faultNumber"] == fault_number]
            .reset_index(drop=True)
        )

        self.current_index = 0

        print(
            f"Loaded {len(self.dataset)} samples for Fault {fault_number}."
        )

    def restart(self):

        self.current_index = 0

    def has_next(self):

        return self.current_index < len(self.dataset)

    def predict_next(self):

        if not self.has_next():
            self.restart()

        row = self.dataset.iloc[self.current_index]
        self.current_index += 1

        metadata = [
            "faultNumber",
            "simulationRun",
            "sample",
        ]

        feature_columns = [
            col
            for col in self.dataset.columns
            if col not in metadata
        ]

        X = row[feature_columns].to_frame().T

        model = ModelLoader.get_xgboost_model()

        prediction = int(model.predict(X)[0])

        probabilities = model.predict_proba(X)[0]

        confidence = round(float(max(probabilities) * 100), 2)

        sensor_data = row[feature_columns].to_dict()

        return {
            "timestamp": datetime.now().isoformat(),
            "actual_fault": int(row["faultNumber"]),
            "predicted_fault": prediction,
            "confidence": confidence,
            "simulation_run": int(row["simulationRun"]),
            "sample": int(row["sample"]),
            "sensor_data": sensor_data,
        }