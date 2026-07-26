import pandas as pd

from core.config import FAULT_FREE_TEST_DATA


class ReplayEngine:

    def __init__(self):

        self.dataset = None

        self.current_index = 0

    def load_fault_free(self):

        self.dataset = pd.read_csv(FAULT_FREE_TEST_DATA)

        self.current_index = 0

        print(f"Replay Engine loaded {len(self.dataset)} rows.")

    def has_next(self):

        return (
            self.dataset is not None
            and self.current_index < len(self.dataset)
        )

    def next_row(self):

        if not self.has_next():
            return None

        row = self.dataset.iloc[self.current_index]

        self.current_index += 1

        return row

    def restart(self):

        self.current_index = 0