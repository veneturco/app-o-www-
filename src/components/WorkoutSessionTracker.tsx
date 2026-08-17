import React, { useState, useEffect } from 'react';
import { Exercise, LoggedSet, RoutinePreset } from '../types';
import { ROUTINE_PRESETS } from '../data/exercises';
import { Play, CheckSquare, Plus, Award, Flame, Dumbbell, Calendar, RotateCcw, ArrowRight, Zap, Target, Save, Activity } from 'lucide-react';
import { playChime } from '../utils/audio';

interface WorkoutSessionTrackerProps {
  exercises: Exercise[];
  allLoggedSets: Record<string, LoggedSet[]>;
  onSelectExercise: (exerciseId: string) => void;
  onClearSession: () => void;
}

export const WorkoutSessionTracker: React.FC<WorkoutSessionTrackerProps> = ({
  exercises,
  allLoggedSets,
  onSelectExercise,
  onClearSession
}) => {
  const [workoutDuration, setWorkoutDuration] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [selectedRoutine, setSelectedRoutine] = useState<RoutinePreset | null>(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState<boolean>(false);

  // Reloj de la sesión
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setWorkoutDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins < 10 ? '0' : ''}${mins}m`;
    }
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  // Cálculos de Volumen y Series
  const allSetsList: LoggedSet[] = Object.values(allLoggedSets).flat() as LoggedSet[];
  const totalCompletedSets = allSetsList.filter((s: LoggedSet) => s.completed).length;
  const totalTonnageKg = allSetsList
    .filter((s: LoggedSet) => s.completed)
    .reduce((sum: number, s: LoggedSet) => sum + (s.weightKg * s.reps), 0);
  
  const activeExerciseIds = Object.keys(allLoggedSets).filter(
    id => allLoggedSets[id] && allLoggedSets[id].length > 0
  );

  // Función para guardar en LocalStorage
  const handleSaveSession = () => {
    const sessionData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: workoutDuration,
      volume: totalTonnageKg,
      sets: totalCompletedSets,
      exercises: activeExerciseIds.length,
      details: allLoggedSets
    };
    
    // Recuperar historial previo y añadir la nueva sesión
    const existingHistory = JSON.parse(localStorage.getItem('hydrofit_history') || '[]');
    localStorage.setItem('hydrofit_history', JSON.stringify([sessionData, ...existingHistory]));

    // Efecto de éxito
    playChime('pr');
    setShowSuccessAnim(true);
    
    setTimeout(() => {
      setShowSuccessAnim(false);
      onClearSession();
      setWorkoutDuration(0);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* ================= HERO DASHBOARD ================= */}
      <div className={`bg-[#121826] border ${showSuccessAnim ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-slate-800 shadow-2xl'} rounded-3xl p-5 sm:p-6 relative overflow-hidden transition-all duration-500 space-y-4`}>
        
        {/* Marca de agua cibernética */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <div className={`w-64 h-64 border-8 ${showSuccessAnim ? 'border-emerald-500' : 'border-cyan-500'} rounded-full flex items-center justify-center transition-colors duration-500`}>
            <div className={`w-32 h-32 border-4 ${showSuccessAnim ? 'border-emerald-500' : 'border-cyan-500'} rounded-full opacity-50`}></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className={`w-12 h-12 rounded-2xl ${showSuccessAnim ? 'bg-emerald-400' : 'bg-gradient-to-tr from-cyan-400 to-blue-600'} flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 transition-colors duration-500`}>
              {showSuccessAnim ? <Award className="w-6 h-6" /> : <Dumbbell className="w-6 h-6" />}
            </div>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${showSuccessAnim ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {showSuccessAnim ? '¡Entrenamiento Guardado!' : 'Panel de Control'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Sesión Activa</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Reloj de Sesión */}
            <div className="bg-slate-900/90 border border-slate-700/60 px-4 py-2 rounded-2xl flex items-center space-x-2.5 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-mono font-black text-white">{formatDuration(workoutDuration)}</span>
            </div>

            {/* Botón de Guardado (Solo aparece si hay series completadas) */}
            {totalCompletedSets > 0 && !showSuccessAnim && (
              <button
                onClick={handleSaveSession}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-2xl font-black text-xs flex items-center space-x-1.5 transition shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Finalizar Sesión</span>
              </button>
            )}

            {/* Botón Reiniciar (Papelera) */}
            {!showSuccessAnim && (
              <button
                onClick={onClearSession}
                className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition text-xs flex items-center justify-center cursor-pointer shadow-sm"
                title="Reiniciar sesión actual"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Células de Estadísticas en Vivo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 relative z-10">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Series Logradas</span>
            <p className="text-2xl font-black text-cyan-400">{totalCompletedSets}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center"><Activity className="w-3 h-3 mr-1"/> Kilos Movidos</span>
            <p className="text-2xl font-black text-emerald-400">{totalTonnageKg.toLocaleString()} <span className="text-xs font-normal text-slate-500">kg</span></p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Ejercicios</span>
            <p className="text-2xl font-black text-purple-400">{activeExerciseIds.length}</p>
          </div>
        </div>
      </div>

      {/* ================= RUTINAS PREDISEÑADAS ================= */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-sm">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Plantillas de Rutinas</h3>
            <p className="text-[11px] text-slate-400">Carga rutinas para estructurar tu entrenamiento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {ROUTINE_PRESETS.map((routine) => {
            const isSelected = selectedRoutine?.id === routine.id;
            return (
              <div
                key={routine.id}
                onClick={() => setSelectedRoutine(routine)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/30 border-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-white">{routine.title}</span>
                    <span className="text-[9px] font-bold bg-slate-950 text-cyan-400 px-2 py-0.5 rounded-md border border-slate-800">
                      {routine.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{routine.subtitle}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>{routine.exerciseIds.length} ejercicios incluidos</span>
                  <span className="text-cyan-400 font-bold flex items-center space-x-1">
                    <span>Ver rutina</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedRoutine && (
          <div className="mt-3 bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300">
                Ejercicios de {selectedRoutine.title}:
              </span>
              <span className="text-[11px] text-slate-400">{selectedRoutine.frequency}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedRoutine.exerciseIds.map((exId) => {
                const ex = exercises.find(e => e.id === exId);
                if (!ex) return null;
                const setsLogged = allLoggedSets[ex.id]?.length || 0;
                return (
                  <div
                    key={ex.id}
                    onClick={() => onSelectExercise(ex.id)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition"></div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition">{ex.name}</p>
                        <p className="text-[10px] text-slate-400">{ex.repRange} • {ex.targetZone.split('+')[0]}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {setsLogged > 0 ? (
                        <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                          {setsLogged} series
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 group-hover:text-slate-300 font-semibold">Abrir →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ================= HISTORIAL DE HOY ================= */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Historial de Series de Hoy</h3>

        {activeExerciseIds.length > 0 ? (
          <div className="space-y-3">
            {activeExerciseIds.map((exId) => {
              const ex = exercises.find(e => e.id === exId);
              const sets = allLoggedSets[exId] || [];
              if (!ex || sets.length === 0) return null;

              return (
                <div key={exId} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => onSelectExercise(ex.id)}
                      className="text-xs font-bold text-cyan-300 hover:underline text-left cursor-pointer"
                    >
                      {ex.name}
                    </button>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {sets.length} series
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sets.map((set) => (
                      <span
                        key={set.id}
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border transition-all ${
                          set.completed
                            ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                            : 'bg-slate-950 border-slate-800 text-slate-600'
                        }`}
                      >
                        {set.weightKg}kg x {set.reps}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl space-y-1.5">
            <p className="text-xs text-slate-400 font-semibold">Aún no has registrado ninguna serie en esta sesión.</p>
            <p className="text-[11px] text-slate-500">
              Navega a la Enciclopedia o selecciona una rutina para comenzar a registrar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
