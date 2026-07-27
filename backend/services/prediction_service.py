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
        self.current_mode = "live"
        self.feature_columns = []

    def _prepare_dataset(self, dataframe, mode):
        self.dataset = dataframe.reset_index(drop=True)
        self.current_index = 0
        self.current_mode = mode

        metadata = [
            "faultNumber",
            "simulationRun",
            "sample",
        ]

        self.feature_columns = [
            column
            for column in self.dataset.columns
            if column not in metadata
        ]

    def load_live_dataset(self):
        df = pd.read_csv(DEMO_REPLAY_DATA)

        self._prepare_dataset(df, "live")

        print(
            f"[LIVE] Loaded {len(self.dataset)} industrial replay samples."
        )

    def load_demo_dataset(self):
        """
        Backward compatibility.
        Existing code can still call this.
        """
        self.load_live_dataset()

    def load_normal_dataset(self):
        df = pd.read_csv(FAULT_FREE_TEST_DATA)

        self._prepare_dataset(df, "normal")

        print(
            f"[NORMAL] Loaded {len(self.dataset)} normal operation samples."
        )

    def load_fault_dataset(self, fault_number: int):
        df = pd.read_csv(FAULTY_TEST_DATA)

        filtered = (
            df[df["faultNumber"] == fault_number]
            .reset_index(drop=True)
        )

        if filtered.empty:
            raise ValueError(
                f"No samples found for Fault {fault_number}."
            )

        self._prepare_dataset(filtered, f"fault_{fault_number}")

        print(
            f"[FAULT] Loaded {len(self.dataset)} samples for Fault {fault_number}."
        )

    def restart(self):
        self.current_index = 0

    def has_next(self):
        return (
            self.dataset is not None
            and self.current_index < len(self.dataset)
        )

    def predict_next(self):

        if self.dataset is None:
            raise RuntimeError("No dataset has been loaded.")

        if not self.has_next():
            self.restart()

        row = self.dataset.iloc[self.current_index]

        self.current_index += 1

        X = row[self.feature_columns].to_frame().T

        model = ModelLoader.get_xgboost_model()

        prediction = int(model.predict(X)[0])

        probabilities = model.predict_proba(X)[0]

        confidence = round(
            float(max(probabilities) * 100),
            2,
        )

        sensor_data = row[self.feature_columns].to_dict()

        return {
            "timestamp": datetime.now().isoformat(),
            "actual_fault": int(row["faultNumber"]),
            "predicted_fault": prediction,
            "confidence": confidence,
            "simulation_run": int(row["simulationRun"]),
            "sample": int(row["sample"]),
            "sensor_data": sensor_data,
        }