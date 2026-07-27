import SensorCard from "./SensorCard";
import { SENSOR_NAMES } from "../constants/sensorNames";

function SensorGrid({ sensorValues }) {
    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 h-[650px] flex flex-col">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-semibold">
                    Live Sensor Readings
                </h2>

                <span className="text-sm text-slate-400">
                    {SENSOR_NAMES.length} Variables
                </span>

            </div>

            <div className="flex-1 overflow-y-auto pr-2">

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">

                    {SENSOR_NAMES.map((sensor) => (
                        <SensorCard
                            key={sensor}
                            name={sensor}
                            value={sensorValues?.[sensor]}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
}

export default SensorGrid;