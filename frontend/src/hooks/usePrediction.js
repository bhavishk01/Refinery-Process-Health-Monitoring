import { useState, useEffect, useRef, useCallback } from "react";
import {
    getNextPrediction,
    restartReplay,
    loadNormalOperation,
    loadFault,
} from "../services/api";

export default function usePrediction() {
    const [prediction, setPrediction] = useState(null);
    const [sensorValues, setSensorValues] = useState({});
    const [history, setHistory] = useState([]);
    const [activeAlarm, setActiveAlarm] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [loading, setLoading] = useState(false);

    const intervalRef = useRef(null);
    const busyRef = useRef(false);

    const fetchPrediction = useCallback(async () => {
        if (busyRef.current) return;

        try {
            const data = await getNextPrediction();

            if (!data || data.detail) return;

            setPrediction(data);
            setSensorValues(data.sensor_data || {});

            setHistory((prev) => {
                const updated = [data, ...prev];
                return updated.slice(0, 100);
            });

            if (data.predicted_fault !== 0) {
                setActiveAlarm(data);
            } else {
                setActiveAlarm(null);
            }
        } catch (error) {
            console.error("Prediction Error:", error);
        }
    }, []);

    const stopPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startPolling = useCallback(() => {
        stopPolling();
        fetchPrediction();
        intervalRef.current = setInterval(fetchPrediction, 1000);
    }, [fetchPrediction, stopPolling]);

    const start = useCallback(() => {
        if (isRunning) return;
        setIsRunning(true);
        startPolling();
    }, [isRunning, startPolling]);

    const pause = useCallback(() => {
        stopPolling();
        setIsRunning(false);
    }, [stopPolling]);

    const restart = useCallback(async () => {
        if (busyRef.current) return;
        busyRef.current = true;
        setLoading(true);

        try {
            stopPolling();

            await restartReplay();

            setHistory([]);
            setActiveAlarm(null);
            setPrediction(null);

            startPolling();
            setIsRunning(true);
        } catch (error) {
            console.error("Restart Error:", error);
        } finally {
            busyRef.current = false;
            setLoading(false);
        }
    }, [stopPolling, startPolling]);

    const normal = useCallback(async () => {
        if (busyRef.current) return;
        busyRef.current = true;
        setLoading(true);

        try {
            stopPolling();

            await loadNormalOperation();

            setHistory([]);
            setActiveAlarm(null);
            setPrediction(null);

            startPolling();
            setIsRunning(true);
        } catch (error) {
            console.error("Normal Mode Error:", error);
        } finally {
            busyRef.current = false;
            setLoading(false);
        }
    }, [stopPolling, startPolling]);

    const selectFault = useCallback(async (fault) => {
        if (busyRef.current) return;
        busyRef.current = true;
        setLoading(true);

        try {
            stopPolling();

            await loadFault(fault);

            setHistory([]);
            setActiveAlarm(null);
            setPrediction(null);

            startPolling();
            setIsRunning(true);
        } catch (error) {
            console.error("Fault Selection Error:", error);
        } finally {
            busyRef.current = false;
            setLoading(false);
        }
    }, [stopPolling, startPolling]);

    useEffect(() => {
        setIsRunning(true);
        startPolling();

        return () => stopPolling();
    }, [startPolling, stopPolling]);

    return {
        prediction,
        sensorValues,
        history,
        activeAlarm,
        isRunning,
        loading,
        start,
        pause,
        restart,
        normal,
        selectFault,
    };
}