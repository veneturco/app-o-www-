import React, { useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, X, Plus, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';
import { playChime } from '../utils/audio';

interface RestTimerProps {
  isOpen: boolean;
  onClose: () => void;
  secondsRemaining: number;
  totalDuration: number;
  isRunning: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onAddSeconds: (seconds: number) => void;
  onSetPreset: (seconds: number) => void;
  isMinimized: boolean;
  setIsMinimized: (val: boolean) => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  isOpen,
  onClose,
  secondsRemaining,
  totalDuration,
  isRunning,
  onTogglePlay,
  onReset,
  onAddSeconds,
  onSetPreset,
  isMinimized,
  setIsMinimized
}) => {
  useEffect(() => {
    if (isRunning && secondsRemaining <= 3 && secondsRemaining > 0) {
      playChime('tick');
    } else if (isRunning && secondsRemaining === 0) {
      playChime('finish');
    }
  }, [secondsRemaining, isRunning]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = totalDuration > 0 ? ((totalDuration - secondsRemaining) / totalDuration) * 100 : 0;
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  // If minimized, show sleek floating widget
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-[#121826]/95 border border-cyan-500/40 rounded-2xl p-3 shadow-2xl shadow-cyan-500/20 backdrop-blur-md flex items-center space-x-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="w-10 h-10 -rotate-90">
            <circle cx="20" cy="20" r="16" stroke="#1E293B" strokeWidth="3" fill="transparent" />
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="#00F0FF"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray="100"
              strokeDashoffset={100 - progressPercent}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] font-black text-cyan-300">{secondsRemaining}s</span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Descanso</span>
          <span className="text-sm font-black text-white">{formatTime(secondsRemaining)}</span>
        </div>

        <div className="flex items-center space-x-1 pl-1 border-l border-slate-800">
          <button
            onClick={onTogglePlay}
            className="p-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#121826] border border-cyan-500/30 rounded-2xl p-5 shadow-2xl shadow-cyan-500/10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cronómetro de Descanso</h3>
              <p className="text-[11px] text-slate-400">Recuperación neuromuscular</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Minimizar"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Circular Countdown Progress */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-44 h-44 -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="70"
                stroke="#1E293B"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r="70"
                stroke={secondsRemaining <= 5 && secondsRemaining > 0 ? '#00FF66' : '#00F0FF'}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="440"
                strokeDashoffset={440 - (440 * progressPercent) / 100}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl font-black tracking-tight ${secondsRemaining === 0 ? 'text-emerald-400 animate-bounce' : 'text-white'}`}>
                {formatTime(secondsRemaining)}
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {secondsRemaining === 0 ? '¡A ENTRENAR!' : isRunning ? 'RECUPERANDO' : 'PAUSADO'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => onAddSeconds(15)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            +15s
          </button>

          <button
            onClick={onTogglePlay}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition active:scale-95 ${
              isRunning
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/20 hover:bg-amber-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/30 hover:from-cyan-400 hover:to-blue-500'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={onReset}
            className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Reiniciar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Fast Presets Grid */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block text-center">Presets de Descanso</span>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { secs: 30, label: '30s (Pump)' },
              { secs: 60, label: '60s (Accesorio)' },
              { secs: 90, label: '90s (Hipertrofia)' },
              { secs: 180, label: '3m (Fuerza/1RM)' }
            ].map((preset) => (
              <button
                key={preset.secs}
                onClick={() => onSetPreset(preset.secs)}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-bold border transition text-center ${
                  totalDuration === preset.secs
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {preset.secs >= 60 ? `${preset.secs / 60}m` : `${preset.secs}s`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
