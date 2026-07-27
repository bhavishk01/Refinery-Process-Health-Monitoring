export const FAULT_INFO = {
    0: {
        name: "Normal Operation",
        severity: "Normal",
        description:
            "The refinery process is operating under normal conditions. No abnormal process behaviour detected.",
        action: "Continue monitoring the process."
    },

    1: {
        name: "A/C Feed Ratio Change",
        severity: "Low",
        description:
            "Change in the ratio of Feed A to Feed C entering the process.",
        action:
            "Inspect feed flow controllers and verify feed composition."
    },

    2: {
        name: "B Composition Change",
        severity: "Medium",
        description:
            "Unexpected composition variation in Feed B.",
        action:
            "Inspect Feed B source and verify composition measurements."
    },

    3: {
        name: "D Feed Temperature Change",
        severity: "Medium",
        description:
            "Feed D temperature deviates from its expected operating range.",
        action:
            "Inspect feed heater and temperature control system."
    },

    4: {
        name: "Reactor Cooling Water Inlet Temperature",
        severity: "High",
        description:
            "Cooling water entering the reactor is outside normal operating conditions.",
        action:
            "Check cooling system and verify cooling water supply."
    },

    5: {
        name: "Condenser Cooling Water Failure",
        severity: "High",
        description:
            "Cooling efficiency of the condenser has reduced.",
        action:
            "Inspect condenser cooling circuit and water flow."
    },

    6: {
        name: "A Feed Loss",
        severity: "Critical",
        description:
            "Feed A flow has significantly reduced or stopped.",
        action:
            "Inspect feed pump and supply valves immediately."
    },

    7: {
        name: "C Header Pressure Loss",
        severity: "High",
        description:
            "Pressure drop detected in Feed C header.",
        action:
            "Check header pressure and upstream piping."
    },

    8: {
        name: "A, B, C Feed Composition Change",
        severity: "Medium",
        description:
            "Combined feed composition has changed.",
        action:
            "Verify raw material quality."
    },

    9: {
        name: "D Feed Temperature Drift",
        severity: "Medium",
        description:
            "Gradual drift in Feed D temperature.",
        action:
            "Inspect temperature sensors and heaters."
    },

    10: {
        name: "C Feed Temperature Drift",
        severity: "Medium",
        description:
            "Feed C temperature has deviated from normal operation.",
        action:
            "Verify heat exchanger and controller."
    },

    11: {
        name: "Reactor Cooling Water Valve",
        severity: "High",
        description:
            "Cooling valve behaviour is abnormal.",
        action:
            "Inspect valve actuator and cooling circuit."
    },

    12: {
        name: "Condenser Cooling Water Valve",
        severity: "High",
        description:
            "Cooling valve for condenser is malfunctioning.",
        action:
            "Inspect condenser valve and water flow."
    },

    13: {
        name: "Reaction Kinetics Change",
        severity: "High",
        description:
            "Unexpected change in reaction behaviour.",
        action:
            "Review reactor operating conditions."
    },

    14: {
        name: "Reactor Heat Transfer Loss",
        severity: "Critical",
        description:
            "Heat transfer efficiency inside the reactor has decreased.",
        action:
            "Inspect reactor cooling jackets and heat exchanger."
    },

    15: {
        name: "Condenser Heat Transfer Loss",
        severity: "Critical",
        description:
            "Condenser heat transfer efficiency is reduced.",
        action:
            "Inspect condenser tubes for fouling."
    },

    16: {
        name: "Unknown Process Disturbance",
        severity: "Medium",
        description:
            "Unknown process abnormality detected.",
        action:
            "Investigate process variables for root cause."
    },

    17: {
        name: "Unknown Process Disturbance",
        severity: "Medium",
        description:
            "Unexpected process behaviour detected.",
        action:
            "Review live sensor values."
    },

    18: {
        name: "Unknown Process Disturbance",
        severity: "Medium",
        description:
            "Abnormal process trend detected.",
        action:
            "Inspect affected equipment."
    },

    19: {
        name: "Unknown Valve Sticking",
        severity: "High",
        description:
            "Control valve movement appears abnormal.",
        action:
            "Inspect valve actuator and control signal."
    },

    20: {
        name: "Unknown Process Failure",
        severity: "Critical",
        description:
            "Major process abnormality detected.",
        action:
            "Immediately inspect plant conditions and isolate faulty subsystem."
    }
};