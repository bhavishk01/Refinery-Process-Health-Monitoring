import { useState } from "react";

function ControlPanel({
    isRunning,
    onStart,
    onPause,
    onRestart,
    onNormal,
    onFaultSelect,
}) {
    const [selectedFault, setSelectedFault] = useState(1);

    const handleFault = (fault) => {
        setSelectedFault(fault);
        onFaultSelect(fault);
    };

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

            <h2 className="text-xl font-semibold mb-5">
                Control Panel
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">

                <button
                    onClick={onStart}
                    disabled={isRunning}
                    className={`rounded-lg py-2 font-semibold transition ${isRunning
                            ? "bg-green-800 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    ▶ Start
                </button>

                <button
                    onClick={onPause}
                    disabled={!isRunning}
                    className={`rounded-lg py-2 font-semibold transition ${!isRunning
                            ? "bg-yellow-800 cursor-not-allowed"
                            : "bg-yellow-600 hover:bg-yellow-700"
                        }`}
                >
                    ⏸ Pause
                </button>

                <button
                    onClick={onRestart}
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-semibold"
                >
                    🔄 Restart
                </button>

                <button
                    onClick={onNormal}
                    className="bg-purple-600 hover:bg-purple-700 rounded-lg py-2 font-semibold"
                >
                    Normal
                </button>

            </div>

            <h3 className="font-semibold mb-3">
                Load Fault Dataset
            </h3>

            <div className="grid grid-cols-5 gap-2">

                {Array.from({ length: 20 }, (_, i) => i + 1).map((fault) => (

                    <button
                        key={fault}
                        onClick={() => handleFault(fault)}
                        className={`rounded-lg py-2 font-bold transition ${selectedFault === fault
                                ? "bg-red-600"
                                : "bg-slate-800 hover:bg-slate-700"
                            }`}
                    >
                        {fault}
                    </button>

                ))}

            </div>

        </div>
    );
}

export default ControlPanel;