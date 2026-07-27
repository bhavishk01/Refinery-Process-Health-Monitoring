export default function PredictionHistory({ history }) {

    const recentHistory = history.slice(0, 10);

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6">

            <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl font-bold text-white">
                    Prediction History
                </h2>

                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                    Last 10 Predictions
                </span>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full text-sm">

                    <thead>

                        <tr className="border-b border-slate-700">

                            <th className="text-left py-3 text-slate-400 font-semibold">
                                Time
                            </th>

                            <th className="text-center py-3 text-slate-400 font-semibold">
                                Actual
                            </th>

                            <th className="text-center py-3 text-slate-400 font-semibold">
                                Predicted
                            </th>

                            <th className="text-center py-3 text-slate-400 font-semibold">
                                Confidence
                            </th>

                            <th className="text-center py-3 text-slate-400 font-semibold">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {recentHistory.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="text-center py-8 text-slate-500"
                                >
                                    Waiting for predictions...
                                </td>

                            </tr>

                        ) : (

                            recentHistory.map((item, index) => {

                                const correct =
                                    item.actual_fault === item.predicted_fault;

                                return (

                                    <tr
                                        key={index}
                                        className="border-b border-slate-800 hover:bg-slate-800 transition"
                                    >

                                        <td className="py-3 text-slate-300">

                                            {new Date(item.timestamp)
                                                .toLocaleTimeString()}

                                        </td>

                                        <td className="text-center">

                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold
                                                ${item.actual_fault === 0
                                                        ? "bg-green-900 text-green-300"
                                                        : "bg-red-900 text-red-300"
                                                    }`}
                                            >
                                                {item.actual_fault === 0
                                                    ? "Normal"
                                                    : `F${item.actual_fault}`}
                                            </span>

                                        </td>

                                        <td className="text-center">

                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold
                                                ${item.predicted_fault === 0
                                                        ? "bg-blue-900 text-blue-300"
                                                        : "bg-yellow-900 text-yellow-300"
                                                    }`}
                                            >
                                                {item.predicted_fault === 0
                                                    ? "Normal"
                                                    : `F${item.predicted_fault}`}
                                            </span>

                                        </td>

                                        <td className="text-center text-cyan-300 font-semibold">

                                            {item.confidence}%

                                        </td>

                                        <td className="text-center">

                                            {correct ? (

                                                <span className="inline-block px-3 py-1 rounded-full bg-green-900 text-green-300 text-xs font-semibold">

                                                    ✔ Correct

                                                </span>

                                            ) : (

                                                <span className="inline-block px-3 py-1 rounded-full bg-red-900 text-red-300 text-xs font-semibold">

                                                    ✖ Mismatch

                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                );

                            })

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}