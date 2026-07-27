import { AlertTriangle, ShieldCheck } from "lucide-react";
import { FAULT_INFO } from "../constants/faultInfo";

export default function FaultInfoPanel({ prediction }) {

    if (!prediction) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white">
                    Fault Information
                </h2>

                <p className="text-slate-400 mt-4">
                    Waiting for prediction...
                </p>
            </div>
        );
    }

    const fault =
        FAULT_INFO[prediction.actual_fault] ||
        FAULT_INFO[0];

    const isNormal =
        prediction.actual_fault === 0;

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">

            <div
                className={`px-5 py-4 flex items-center gap-3
                ${isNormal
                        ? "bg-green-900/40 border-b border-green-700"
                        : "bg-red-900/40 border-b border-red-700"
                    }`}
            >

                {isNormal ? (
                    <ShieldCheck
                        className="text-green-400"
                        size={28}
                    />
                ) : (
                    <AlertTriangle
                        className="text-red-400"
                        size={28}
                    />
                )}

                <div>

                    <h2 className="text-white font-bold text-lg">
                        {isNormal
                            ? "NORMAL OPERATION"
                            : "ACTIVE FAULT"}
                    </h2>

                    <p className="text-slate-300 text-sm">
                        Live System Status
                    </p>

                </div>

            </div>

            <div className="p-5 space-y-5">

                <div>

                    <p className="text-slate-400 text-xs uppercase tracking-wide">
                        Fault Name
                    </p>

                    <p className="text-white text-xl font-bold mt-1">
                        {fault.name}
                    </p>

                </div>

                <div>

                    <p className="text-slate-400 text-xs uppercase tracking-wide">
                        Severity
                    </p>

                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold
                        ${fault.severity === "Low"
                                ? "bg-green-600 text-white"
                                : fault.severity === "Medium"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-red-600 text-white"
                            }`}
                    >
                        {fault.severity}
                    </span>

                </div>

                <div>

                    <p className="text-slate-400 text-xs uppercase tracking-wide">
                        Description
                    </p>

                    <p className="text-slate-200 mt-2 leading-relaxed">
                        {fault.description}
                    </p>

                </div>

                <div>

                    <p className="text-slate-400 text-xs uppercase tracking-wide">
                        Recommended Action
                    </p>

                    <div className="mt-2 bg-slate-800 rounded-lg p-3 border border-slate-700">

                        <p className="text-slate-200 leading-relaxed">
                            {fault.action}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}