const BASE_URL = "http://127.0.0.1:8000";

async function request(endpoint, options = {}) {

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!response.ok) {

        let message = "Server request failed.";

        try {
            const error = await response.json();
            message = error.detail || message;
        } catch (_) { }

        throw new Error(message);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }

    return null;
}

export async function getNextPrediction() {
    return request("/predict/next");
}

export async function restartReplay() {
    return request("/predict/restart", {
        method: "POST",
    });
}

export async function loadLiveMonitoring() {
    return request("/predict/live", {
        method: "POST",
    });
}

export async function loadNormalOperation() {
    return request("/predict/normal", {
        method: "POST",
    });
}

export async function loadFault(faultNumber) {
    return request(`/predict/fault/${faultNumber}`, {
        method: "POST",
    });
}