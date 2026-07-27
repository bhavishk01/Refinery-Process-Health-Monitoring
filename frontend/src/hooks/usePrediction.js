import { useState, useEffect, useRef } from "react";
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
    const [isRunning, setIsRunning] = useState(true);

    const intervalRef = useRef(null);

    const fetchPrediction = async () => {
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
    };

    const start = () => {
        if (intervalRef.current) return;

        setIsRunning(true);

        fetchPrediction();

        intervalRef.current = setInterval(fetchPrediction, 1000);
    };

    const pause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setIsRunning(false);
    };

    const restart = async () => {
        try {
            await restartReplay();

            setHistory([]);
            setActiveAlarm(null);

            await fetchPrediction();
        } catch (error) {
            console.error("Restart Error:", error);
        }
    };

    const normal = async () => {
        try {
            await loadNormalOperation();

            setHistory([]);
            setActiveAlarm(null);

            await fetchPrediction();
        } catch (error) {
            console.error("Normal Mode Error:", error);
        }
    };

    const selectFault = async (fault) => {
        try {
            await loadFault(fault);

            setHistory([]);
            setActiveAlarm(null);

            await fetchPrediction();
        } catch (error) {
            console.error("Fault Selection Error:", error);
        }
    };

    useEffect(() => {
        start();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    return {
        prediction,
        sensorValues,
        history,
        activeAlarm,
        isRunning,
        start,
        pause,
        restart,
        normal,
        selectFault,
    };
}