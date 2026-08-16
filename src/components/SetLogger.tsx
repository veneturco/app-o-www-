import React, { useState } from 'react';
import { Exercise, LoggedSet, SetType } from '../types';
import { Plus, Trash2, CheckCircle, Timer, Award, Flame, Play } from 'lucide-react';
import { playChime } from '../utils/audio';

interface SetLoggerProps {
  exercise: Exercise;
  loggedSets: LoggedSet[];
  onAddSet: (set: Omit<LoggedSet, 'id' | 'timestamp'>) => void;
  onDeleteSet: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onStartRestTimer: (seconds: number) => void;
}

export const SetLogger: React.FC<SetLoggerProps> = ({
  exercise,
  loggedSets,
  onAddSet,
  onDeleteSet,
  onToggleComplete,
  onStartRestTimer
}) => {
  const [weightKg, setWeightKg] = useState<number>(50);
  const [reps, setReps] = useState<number>(10);
  const [rpe, setRpe] = useState<number>(8);
  const [setType, setSetType] = useState<SetType>('working');
  const [autoTimerSecs, setAutoTimerSecs] = useState<number>(90);

  const handleSaveSet = () => {
    onAddSet({
      setNumber: loggedSets.length + 1,
      weightKg: Number(weightKg) || 0,
      reps: Number(reps) || 0,
      rpe: Number(rpe) || undefined,
      setType,
      completed: true
    });
    playChime('start');
    if (autoTimerSecs > 0) {
      onStartRestTimer(autoTimerSecs);
    }
  };

  const totalVolume = loggedSets
    .filter(s => s.completed)
    .reduce((sum, s) => sum + (s.weightKg * s.reps), 0);

  const maxWeight = loggedSets
    .filter(s => s.completed)
    .reduce((max, s) => Math.max(max, s.weightKg), 0);

  return (
    <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Title & Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Tracker de Series & Cargas</h3>
            <p className="text-[11px] text-slate-400">Registra tus series de {exercise.name}</p>
          </div>
        </div>

        {loggedSets.length > 0 && (
          <div className="flex items-center space-x-2 text-xs">
            <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
              <span className="text-slate-400">Volumen: </span>
              <span className="font-black text-cyan-400">{totalVolume.toLocaleString()} kg</span>
            </div>
            {maxWeight > 0 && (
              <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Top: </span>
                <span className="font-black text-amber-400">{maxWeight} kg</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Form for New Set */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3.5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Peso Kg */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Carga (kg)</label>
            <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setWeightKg(prev => Math.max(0, prev - 2.5))}
                className="px-2.5 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 text-xs font-bold transition"
              >
                -
              </button>
              <input
                type="number"
                step="2.5"
                min="0"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full text-center bg-transparent text-sm font-bold text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setWeightKg(prev => prev + 2.5)}
                className="px-2.5 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 text-xs font-bold transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Repeticiones */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Reps</label>
            <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setReps(prev => Math.max(1, prev - 1))}
                className="px-2.5 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 text-xs font-bold transition"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="100"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value, 10) || 1)}
                className="w-full text-center bg-transparent text-sm font-bold text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setReps(prev => prev + 1)}
                className="px-2.5 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 text-xs font-bold transition"
              >
                +
              </button>
            </div>
          </div>

          {/* RPE / Intensidad */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">RPE (1-10)</label>
            <select
              value={rpe}
              onChange={(e) => setRpe(parseFloat(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2 px-2.5 text-xs font-bold text-white focus:outline-none"
            >
              <option value={6}>RPE 6 (Calentamiento)</option>
              <option value={7}>RPE 7 (3 reps en reserva)</option>
              <option value={8}>RPE 8 (2 reps en reserva)</option>
              <option value={8.5}>RPE 8.5 (1-2 reps en reserva)</option>
              <option value={9}>RPE 9 (1 rep en reserva)</option>
              <option value={9.5}>RPE 9.5 (Casi fallo)</option>
              <option value={10}>RPE 10 (Fallo Muscular)</option>
            </select>
          </div>

          {/* Tipo de Serie */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Tipo de Serie</label>
            <select
              value={setType}
              onChange={(e) => setSetType(e.target.value as SetType)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2 px-2.5 text-xs font-bold text-white focus:outline-none"
            >
              <option value="working">Serie Efectiva (W)</option>
              <option value="warmup">Aproximación (A)</option>
              <option value="dropset">Drop Set (D)</option>
              <option value="failure">Al Fallo (F)</option>
            </select>
          </div>
        </div>

        {/* Auto Timer Trigger Settings & Add Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Timer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Descanso automático:</span>
            <select
              value={autoTimerSecs}
              onChange={(e) => setAutoTimerSecs(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 text-xs rounded-lg px-2.5 py-1 text-cyan-300 font-semibold focus:outline-none"
            >
              <option value={0}>Sin temporizador</option>
              <option value={30}>30 seg</option>
              <option value={60}>60 seg</option>
              <option value={90}>90 seg (Hipertrofia)</option>
              <option value={120}>2 min</option>
              <option value={180}>3 min (Fuerza)</option>
            </select>
          </div>

          <button
            id="btn-log-set"
            onClick={handleSaveSet}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md shadow-cyan-500/20 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Serie</span>
          </button>
        </div>
      </div>

      {/* Logged Sets Table */}
      {loggedSets.length > 0 ? (
        <div className="space-y-2">
          <div className="grid grid-cols-12 text-[10px] font-bold text-slate-500 uppercase px-3 py-1">
            <span className="col-span-2">Serie</span>
            <span className="col-span-3">Carga</span>
            <span className="col-span-2">Reps</span>
            <span className="col-span-2">RPE</span>
            <span className="col-span-3 text-right">Acciones</span>
          </div>

          {loggedSets.map((set) => {
            const badgeType =
              set.setType === 'warmup'
                ? { label: 'Aprox', class: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30' }
                : set.setType === 'dropset'
                ? { label: 'Drop', class: 'bg-purple-500/10 text-purple-300 border-purple-500/30' }
                : set.setType === 'failure'
                ? { label: 'Fallo', class: 'bg-red-500/10 text-red-300 border-red-500/30' }
                : { label: 'Efectiva', class: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' };

            return (
              <div
                key={set.id}
                className={`grid grid-cols-12 items-center px-3.5 py-2.5 rounded-2xl text-xs border transition ${
                  set.completed
                    ? 'bg-slate-900/70 border-slate-800 text-slate-200'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                }`}
              >
                <div className="col-span-2 flex items-center space-x-1.5 font-bold">
                  <span>#{set.setNumber}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${badgeType.class}`}>
                    {badgeType.label}
                  </span>
                </div>

                <div className="col-span-3 font-bold text-cyan-300">
                  {set.weightKg} <span className="text-[10px] text-slate-400 font-normal">kg</span>
                </div>

                <div className="col-span-2 font-bold text-white">
                  {set.reps} <span className="text-[10px] text-slate-400 font-normal">reps</span>
                </div>

                <div className="col-span-2 text-slate-400 font-semibold">
                  {set.rpe ? `RPE ${set.rpe}` : '-'}
                </div>

                <div className="col-span-3 flex items-center justify-end space-x-1.5">
                  <button
                    onClick={() => onToggleComplete(set.id)}
                    title={set.completed ? 'Marcar incompleta' : 'Completar serie'}
                    className={`p-1.5 rounded-lg border transition ${
                      set.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteSet(set.id)}
                    title="Eliminar serie"
                    className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4 bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-500">No hay series registradas hoy para este ejercicio.</p>
          <p className="text-[11px] text-slate-600 mt-0.5">Ingresa tu peso y repeticiones arriba para comenzar.</p>
        </div>
      )}
    </div>
  );
};
