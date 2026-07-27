const BASE_URL = "http://127.0.0.1:8000";

export async function getNextPrediction() {

    const res = await fetch(`${BASE_URL}/predict/next`);

    if (!res.ok) {
        throw new Error("Failed to fetch prediction.");
    }

    return await res.json();
}

export async function restartReplay() {
    await fetch(`${BASE_URL}/predict/restart`, {
        method: "POST",
    });
}

export async function loadNormalOperation() {
    await fetch(`${BASE_URL}/predict/normal`, {
        method: "POST",
    });
}

export async function loadFault(faultNumber) {
    await fetch(`${BASE_URL}/predict/fault/${faultNumber}`, {
        method: "POST",
    });
}