function Card({ title, value, color }) {
    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-lg hover:border-slate-700 transition">

            <p className="text-slate-400 text-sm uppercase tracking-wide">
                {title}
            </p>

            <h2 className={`text-2xl font-bold mt-3 ${color}`}>
                {value}
            </h2>

        </div>
    );
}

function StatusCards({ prediction, isRunning }) {

    const predictionCorrect =
        prediction &&
        prediction.actual_fault === prediction.predicted_fault;

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">

            <Card
                title="System Status"
                value={isRunning ? "Running" : "Paused"}
                color={isRunning ? "text-green-400" : "text-red-400"}
            />

            <Card
                title="Actual Fault"
                value={
                    prediction
                        ? prediction.actual_fault === 0
                            ? "Normal"
                            : `Fault ${prediction.actual_fault}`
                        : "--"
                }
                color="text-yellow-400"
            />

            <Card
                title="Predicted Fault"
                value={
                    prediction
                        ? prediction.predicted_fault === 0
                            ? "Normal"
                            : `Fault ${prediction.predicted_fault}`
                        : "--"
                }
                color="text-blue-400"
            />

            <Card
                title="Prediction"
                value={
                    prediction
                        ? predictionCorrect
                            ? "✔ Correct"
                            : "✖ Mismatch"
                        : "--"
                }
                color={
                    !prediction
                        ? "text-slate-400"
                        : predictionCorrect
                            ? "text-green-400"
                            : "text-red-400"
                }
            />

            <Card
                title="Confidence"
                value={
                    prediction
                        ? `${prediction.confidence}%`
                        : "--"
                }
                color="text-cyan-400"
            />

            <Card
                title="Simulation"
                value={
                    prediction
                        ? prediction.simulation_run
                        : "--"
                }
                color="text-purple-400"
            />

            <Card
                title="Sample"
                value={
                    prediction
                        ? prediction.sample
                        : "--"
                }
                color="text-orange-400"
            />

        </div>

    );
}

export default StatusCards;