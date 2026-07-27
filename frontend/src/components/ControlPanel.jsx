import { useState } from "react";

function ControlPanel({
    isRunning,
    loading,
    onStart,
    onPause,
    onRestart,
    onNormal,
    onLive,
    onFaultSelect,
}) {
    const [selectedFault, setSelectedFault] = useState(null);
    const [selectedSource, setSelectedSource] = useState("live");

    const handleLive = () => {
        setSelectedSource("live");
        setSelectedFault(null);
        onLive();
    };

    const handleNormal = () => {
        setSelectedSource("normal");
        setSelectedFault(null);
        onNormal();
    };

    const handleFault = (fault) => {
        setSelectedSource("fault");
        setSelectedFault(fault);
        onFaultSelect(fault);
    };

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

            <h2 className="text-xl font-bold text-white mb-6">
                Plant Control Console
            </h2>

            <div className="mb-7">

                <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-3">
                    System Source
                </h3>

                <div className="grid grid-cols-1 gap-3">

                    <button
                        onClick={handleLive}
                        disabled={loading}
                        className={`rounded-lg py-3 font-semibold transition border
                        ${selectedSource === "live"
                                ? "bg-green-600 border-green-500"
                                : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                            }`}
                    >
                        🟢 Live Plant Monitoring
                    </button>

                    <button
                        onClick={handleNormal}
                        disabled={loading}
                        className={`rounded-lg py-3 font-semibold transition border
                        ${selectedSource === "normal"
                                ? "bg-blue-600 border-blue-500"
                                : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                            }`}
                    >
                        ⚙ Normal Operation
                    </button>

                </div>

            </div>

            <div className="mb-7">

                <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-3">
                    Simulation Controls
                </h3>

                <div className="grid grid-cols-3 gap-3">

                    <button
                        onClick={onStart}
                        disabled={isRunning || loading}
                        className={`rounded-lg py-3 font-semibold transition
                        ${isRunning || loading
                                ? "bg-green-900 opacity-60 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        ▶ Start
                    </button>

                    <button
                        onClick={onPause}
                        disabled={!isRunning || loading}
                        className={`rounded-lg py-3 font-semibold transition
                        ${!isRunning || loading
                                ? "bg-yellow-900 opacity-60 cursor-not-allowed"
                                : "bg-yellow-600 hover:bg-yellow-700"
                            }`}
                    >
                        ⏸ Pause
                    </button>

                    <button
                        onClick={onRestart}
                        disabled={loading}
                        className={`rounded-lg py-3 font-semibold transition
                        ${loading
                                ? "bg-blue-900 opacity-60 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        🔄 Restart
                    </button>

                </div>

            </div>

            <div>

                <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-3">
                    Fault Simulation
                </h3>

                <div className="grid grid-cols-5 gap-2">

                    {Array.from({ length: 20 }, (_, i) => i + 1).map((fault) => (

                        <button
                            key={fault}
                            onClick={() => handleFault(fault)}
                            disabled={loading}
                            className={`rounded-lg py-2 font-bold transition border
                            ${loading
                                    ? "bg-slate-800 opacity-60 cursor-not-allowed border-slate-700"
                                    : selectedFault === fault
                                        ? "bg-red-600 border-red-500"
                                        : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                                }`}
                        >
                            F{fault}
                        </button>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default ControlPanel;