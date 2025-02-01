import { useState, useEffect, useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import context from "../context/context";

const MiningButton = ({ currentminingtime }) => {
    const [miningStartTime, setMiningStartTime] = useState(currentminingtime ? new Date(currentminingtime) : null);
    const [timeLeft, setTimeLeft] = useState(0);
    const { startMining } = useContext(context);

    useEffect(() => {
        if (!miningStartTime) return;

        const updateTimer = () => {
            const now = new Date();
            const diff = miningStartTime.getTime() +  60 * 1000 - now.getTime();
            setTimeLeft(diff > 0 ? diff : 0);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [miningStartTime]);

    const formatTime = (ms) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div
            className="flex flex-col items-center space-y-4"
            style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            {timeLeft > 0 ? (
                <div className="flex flex-col items-center">
                    <CountdownCircleTimer
                        isPlaying
                        duration={4 * 60 * 60} // 4 hours in seconds
                        initialRemainingTime={timeLeft / 1000}
                        colors={["#4CAF50", "#F7B801", "#FF5733", "#A30000"]}
                        colorsTime={[14400, 7200, 3600, 0]} // Color changes at these times
                        size={120}
                        strokeWidth={10}
                    >
                        {({ remainingTime }) => (
                            <span className="text-lg font-semibold text-gray-800">
                                {formatTime(remainingTime * 1000)}
                            </span>
                        )}
                    </CountdownCircleTimer>
                    <p className="text-gray-600 text-sm mt-2">Mining in progress...</p>
                </div>
            ) : (
                <button
                    onClick={startMining}
                    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    <span className="mr-2 text-lg font-semibold">Start Mining</span>
                    <i className="fa-solid fa-money-bill-transfer fa-xl"></i>
                </button>
            )}
        </div >
    );
};

export default MiningButton;
