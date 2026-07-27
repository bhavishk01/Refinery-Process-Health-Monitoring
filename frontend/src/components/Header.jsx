import { useEffect, useState } from "react";

function Header() {

    const [time, setTime] = useState("");

    useEffect(() => {

        const updateClock = () => {
            setTime(new Date().toLocaleString());
        };

        updateClock();

        const timer = setInterval(updateClock, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <header className="bg-slate-900 border-b border-slate-800 shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

                <div>

                    <h1 className="text-2xl font-bold text-blue-400">
                        AI-Based Refinery Process Health Monitoring
                    </h1>

                    <p className="text-slate-400 text-sm mt-1">
                        Intelligent Fault Diagnosis System
                    </p>

                </div>

                <div className="text-right">

                    <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-600 rounded-full px-4 py-2">

                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>

                        <span className="font-semibold text-green-400">
                            SYSTEM RUNNING
                        </span>

                    </div>

                    <p className="text-slate-400 mt-3 text-sm">
                        {time}
                    </p>

                </div>

            </div>

        </header>

    );

}

export default Header;