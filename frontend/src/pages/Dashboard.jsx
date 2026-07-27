import Header from "../components/Header";
import StatusCards from "../components/StatusCards";
import SensorGrid from "../components/SensorGrid";
import ControlPanel from "../components/ControlPanel";
import FaultInfoPanel from "../components/FaultInfoPanel";
import PredictionHistory from "../components/PredictionHistory";

import usePrediction from "../hooks/usePrediction";

function Dashboard() {
    const {
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
    } = usePrediction();

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Header />

            <div className="max-w-7xl mx-auto p-6 space-y-6">

                <StatusCards
                    prediction={prediction}
                    isRunning={isRunning}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-8">

                        <SensorGrid
                            sensorValues={sensorValues}
                        />

                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">

                        <ControlPanel
                            isRunning={isRunning}
                            onStart={start}
                            onPause={pause}
                            onRestart={restart}
                            onNormal={normal}
                            onFaultSelect={selectFault}
                        />

                        <FaultInfoPanel
                            prediction={prediction}
                        />

                    </div>

                </div>

                <PredictionHistory
                    history={history}
                />

            </div>

        </div>
    );
}

export default Dashboard;