import React, { useState, useEffect } from 'react';
import { Exercise, LoggedSet, SetType } from '../types';
import { Plus, Trash2, Timer, Play, Pause, RotateCcw, CheckSquare, Square, Dumbbell, Hash } from 'lucide-react';
import { playChime } from '../utils/audio';

interface SetLoggerProps {
  exercise: Exercise;
  loggedSets: LoggedSet[];
  onAddSet?: (set: Omit<LoggedSet, 'id' | 'timestamp'>) => void;
  onDeleteSet?: (id: string) => void;
  onToggleComplete?: (id: string) => void;
  onStartRestTimer?: (seconds: number) => void;
  // Compatibility signatures for alternate callers
  onAddSetDirect?: (exerciseId: string, weight: number, reps: number) => void;
  onUpdateSet?: (exerciseId: string, setId: string, updates: Partial<LoggedSet>) => void;
  onRemoveSet?: (exerciseId: string, setId: string) => void;
}

export const SetLogger: React.FC<SetLoggerProps> = ({
  exercise,
  loggedSets,
  onAddSet,
  onDeleteSet,
  onToggleComplete,
  onStartRestTimer,
  onAddSetDirect,
  onUpdateSet,
  onRemoveSet
}) => {
  // Estados para los inputs
  const [weightInput, setWeightInput] = useState<string>('50');
  const [repsInput, setRepsInput] = useState<string>('10');

  // Estados para el Temporizador
  const defaultRest = Number(exercise.rest) || 90;
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMax, setTimerMax] = useState<number>(defaultRest);

  // Lógica del Temporizador
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timeLeft === 0) {
      setIsTimerRunning(false);
      playChime('finish');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleAddSet = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weightInput) || 0;
    const r = parseInt(repsInput, 10) || 0;
    if (r > 0) {
      if (onAddSetDirect) {
        onAddSetDirect(exercise.id, w, r);
      } else if (onAddSet) {
        onAddSet({
          setNumber: loggedSets.length + 1,
          weightKg: w,
          reps: r,
          setType: 'working',
          completed: true
        });
      }
      playChime('start');
    }
  };

  const toggleSetCompletion = (setId: string, isCurrentlyCompleted: boolean) => {
    if (onUpdateSet) {
      onUpdateSet(exercise.id, setId, { completed: !isCurrentlyCompleted });
    } else if (onToggleComplete) {
      onToggleComplete(setId);
    }
    
    // Si se acaba de completar la serie, auto-iniciar el temporizador
    if (!isCurrentlyCompleted) {
      setTimeLeft(defaultRest);
      setTimerMax(defaultRest);
      setIsTimerRunning(true);
      if (onStartRestTimer) {
        onStartRestTimer(defaultRest);
      }
    }
  };

  const handleDeleteSet = (setId: string) => {
    if (onRemoveSet) {
      onRemoveSet(exercise.id, setId);
    } else if (onDeleteSet) {
      onDeleteSet(setId);
    }
  };

  // Cálculos visuales para el anillo SVG del temporizador
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / (timerMax || 1)) * circumference;
  const timerPercentage = timerMax > 0 ? (timeLeft / timerMax) * 100 : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center">
            <Dumbbell className="w-4 h-4 mr-2 text-cyan-400" />
            Registro de Series & Cargas
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Registra tu progreso para <span className="text-cyan-300 font-bold">{exercise.name}</span>
          </p>
        </div>
      </div>

      {/* ================= TEMPORIZADOR CIRCULAR (NEON) ================= */}
      {(timeLeft > 0 || isTimerRunning) && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-inner">
          <div className="flex items-center space-x-4">
            {/* SVG Circular Ring */}
            <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
              <svg className="transform -rotate-90 w-20 h-20">
                {/* Track (Fondo) */}
                <circle cx="40" cy="40" r={radius} stroke="#1E293B" strokeWidth="6" fill="transparent" />
                {/* Indicador de Progreso */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke={timerPercentage > 25 ? '#00F0FF' : '#F43F5E'}
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={isNaN(strokeDashoffset) ? 0 : strokeDashoffset}
                  className="transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-black text-white font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center">
                <Timer className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> Descanso ({defaultRest}s)
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Recupérate antes de la siguiente serie efectiva.</p>
            </div>
          </div>

          {/* Controles del Timer */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition shadow-md cursor-pointer"
              title={isTimerRunning ? 'Pausar' : 'Reanudar'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-cyan-400" />}
            </button>
            <button
              onClick={() => {
                setTimeLeft(defaultRest);
                setTimerMax(defaultRest);
                setIsTimerRunning(false);
              }}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
              title="Reiniciar temporizador"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= FORMULARIO AÑADIR SERIE ================= */}
      <form onSubmit={handleAddSet} className="flex items-end gap-3 pt-1">
        <div className="flex-1 space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
            <Dumbbell className="w-3 h-3 mr-1 text-cyan-400" /> Peso (kg)
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition text-sm"
            placeholder="50"
          />
        </div>

        <div className="flex-1 space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
            <Hash className="w-3 h-3 mr-1 text-cyan-400" /> Reps
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={repsInput}
            onChange={(e) => setRepsInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition text-sm"
            placeholder="10"
          />
        </div>

        <button
          type="submit"
          disabled={!weightInput || !repsInput}
          className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 p-3 rounded-xl font-black transition flex items-center justify-center cursor-pointer disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          title="Guardar serie"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {/* ================= LISTA DE SERIES ================= */}
      <div className="space-y-3">
        {loggedSets.length === 0 ? (
          <div className="text-center py-6 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-500 font-semibold">No hay series registradas aún para este ejercicio.</p>
            <p className="text-[10px] text-slate-600 mt-1">Ingresa el peso y las repeticiones arriba y presiona +.</p>
          </div>
        ) : (
          loggedSets.map((set, index) => (
            <div
              key={set.id}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                set.completed
                  ? 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.05)]'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              {/* Botón de Checkbox */}
              <button
                onClick={() => toggleSetCompletion(set.id, set.completed)}
                className="flex items-center space-x-3.5 flex-1 text-left cursor-pointer group"
              >
                {set.completed ? (
                  <CheckSquare className="w-5 h-5 text-cyan-400 transition-transform group-hover:scale-110 flex-shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 transition-transform group-hover:scale-110 group-hover:text-cyan-400 flex-shrink-0" />
                )}

                <div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      set.completed ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  >
                    Serie {index + 1}
                  </span>
                  <div className="flex space-x-4 mt-0.5">
                    <span className={`font-mono font-bold text-base ${set.completed ? 'text-white' : 'text-slate-300'}`}>
                      {set.weightKg} <span className="text-[10px] text-slate-500 font-normal">kg</span>
                    </span>
                    <span className={`font-mono font-bold text-base ${set.completed ? 'text-white' : 'text-slate-300'}`}>
                      {set.reps} <span className="text-[10px] text-slate-500 font-normal">reps</span>
                    </span>
                  </div>
                </div>
              </button>

              {/* Eliminar Serie */}
              <button
                onClick={() => handleDeleteSet(set.id)}
                className="p-2.5 bg-slate-950/60 hover:bg-red-500/20 text-slate-500 hover:text-red-400 rounded-xl transition cursor-pointer"
                title="Eliminar serie"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
