import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Timer, Flag, Wifi, Battery, Signal } from 'lucide-react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  }, []);

  const handleLap = useCallback(() => {
    setLaps(prev => [...prev, time]);
  }, [time]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center p-8">
      <div className="w-[380px] scale-100 transform transition-transform hover:scale-[1.02]">
        {/* Smartphone frame */}
        <div className="bg-black rounded-[3rem] p-6 shadow-2xl border-8 border-gray-800 relative">
          {/* Dynamic Island */}
          <div className="w-[120px] h-[35px] bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 -top-1 flex items-center justify-center overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-gray-800 absolute right-4" />
          </div>

          {/* Status bar */}
          <div className="flex justify-between items-center mb-6 text-gray-300 text-sm pt-4">
            <span>9:41</span>
            <div className="flex items-center gap-2">
              <Signal size={16} />
              <Wifi size={16} />
              <Battery size={16} />
            </div>
          </div>

          {/* Main display */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8">
            <div className="text-center">
              <div className="font-mono text-white tracking-wider">
                <div className="text-8xl mb-2">{formatTime(time).split('.')[0]}</div>
                <div className="text-4xl text-gray-400">.{formatTime(time).split('.')[1]}</div>
              </div>
              <div className="text-gray-400 text-sm mt-4">ChronoSync</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-around my-8 gap-4">
            <button
              onClick={handleReset}
              className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-all transform hover:scale-105 hover:rotate-12"
            >
              <RotateCcw size={28} />
            </button>
            <button
              onClick={handleStartStop}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${
                isRunning
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {isRunning ? <Pause size={28} /> : <Play size={28} />}
            </button>
            <button
              onClick={handleLap}
              className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-white hover:bg-amber-600 transition-all transform hover:scale-105 hover:-rotate-12"
            >
              <Flag size={28} />
            </button>
          </div>

          {/* Laps */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-4 max-h-[300px] overflow-y-auto">
            <h3 className="text-gray-300 text-sm mb-3 font-medium">Laps</h3>
            {laps.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Timer size={32} className="mx-auto mb-2 opacity-50" />
                <p>No laps recorded</p>
              </div>
            ) : (
              <div className="space-y-2">
                {laps.map((lapTime, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-white font-mono bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-gray-400">Lap {laps.length - index}</span>
                    <span>{formatTime(lapTime)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Home indicator */}
          <div className="w-32 h-1 bg-gray-600 rounded-full mx-auto mt-8" />
        </div>

        {/* Phone reflections */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/3 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-xl" />
        </div>
      </div>
    </div>
  );
}

export default App;