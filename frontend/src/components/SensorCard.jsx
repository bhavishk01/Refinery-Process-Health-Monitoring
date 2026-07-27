function SensorCard({ name, value }) {

    return (

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-cyan-400 hover:shadow-lg transition-all duration-200">

            <div className="flex justify-between items-center">

                <span className="text-xs text-slate-400 font-mono">
                    {name}
                </span>

                <div className="flex items-center gap-1">

                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>

                    <span className="text-[10px] text-cyan-300">
                        LIVE
                    </span>

                </div>

            </div>

            <div className="mt-4 text-center">

                <p className="text-2xl font-bold text-white font-mono">

                    {value !== undefined && value !== null
                        ? Number(value).toFixed(3)
                        : "--"}

                </p>

            </div>

        </div>

    );

}

export default SensorCard;