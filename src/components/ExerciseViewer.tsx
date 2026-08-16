import React, { useState } from 'react';
import { Exercise, LoggedSet } from '../types';
import { ExerciseGraphic } from './ExerciseGraphic';
import { BiomechanicsDetail } from './BiomechanicsDetail';
import { SetLogger } from './SetLogger';
import { 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  Dumbbell, 
  Timer, 
  Bookmark, 
  Layers,
  Sparkles,
  Zap,
  Activity,
  Image as ImageIcon,
  Compass
} from 'lucide-react';

interface ExerciseViewerProps {
  exercise: Exercise;
  loggedSets: LoggedSet[];
  onAddSet: (set: Omit<LoggedSet, 'id' | 'timestamp'>) => void;
  onDeleteSet: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onStartRestTimer: (seconds: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (exerciseId: string) => void;
}

export const ExerciseViewer: React.FC<ExerciseViewerProps> = ({
  exercise,
  loggedSets,
  onAddSet,
  onDeleteSet,
  onToggleComplete,
  onStartRestTimer,
  isFavorite,
  onToggleFavorite
}) => {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [visualMode, setVisualMode] = useState<'photo' | 'vector'>('photo');
  const [activeSubTab, setActiveSubTab] = useState<'guia' | 'biomecanica' | 'tracker'>('guia');

  // Current real photographic image based on selected gender
  const currentImg = selectedGender === 'male' ? exercise.imgMale : exercise.imgFemale;

  return (
    <div className="space-y-4">
      {/* Exercise Main Header Bento Card */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
        {/* Top bar: Equipment badge, Title, Gender toggle, and Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-400 px-2.5 py-1 rounded-lg border border-slate-700 inline-block mb-1.5">
              {exercise.equipment}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
              {exercise.name}
            </h2>
            {exercise.machineName && (
              <p className="text-xs text-slate-400 mt-0.5">
                Estación: <span className="text-cyan-300 font-semibold">{exercise.machineName}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Gender Toggle: 🚹 Pro / 🚺 Pro */}
            <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1 ${
                  selectedGender === 'male'
                    ? 'bg-cyan-500 text-black shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🚹</span>
                <span>Pro</span>
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1 ${
                  selectedGender === 'female'
                    ? 'bg-purple-500 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🚺</span>
                <span>Pro</span>
              </button>
            </div>

            {/* View Mode Toggle: Photo vs Animated Vector */}
            <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setVisualMode('photo')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1 ${
                  visualMode === 'photo'
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Fotografía técnica real"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Foto</span>
              </button>
              <button
                onClick={() => setVisualMode('vector')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1 ${
                  visualMode === 'vector'
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Esquema biomecánico 3D"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Esquema 3D</span>
              </button>
            </div>

            {/* Favorite button */}
            <button
              onClick={() => onToggleFavorite(exercise.id)}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isFavorite
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Quick Rest Timer Launch */}
            <button
              onClick={() => onStartRestTimer(exercise.rest || 60)}
              className="flex items-center space-x-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm"
              title={`Iniciar descanso de ${exercise.rest || 60}s`}
            >
              <Timer className="w-3.5 h-3.5 text-cyan-400" />
              <span>{exercise.rest || 60}s Rest</span>
            </button>
          </div>
        </div>

        {/* Visual Showcase: Real Image or Biomechanical Vector Graphic */}
        <div className="relative w-full aspect-video max-h-[380px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
          {visualMode === 'photo' ? (
            <>
              <img
                src={currentImg}
                alt={exercise.name}
                className="w-full h-full object-contain p-2"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Tempo Badge */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-cyan-300 font-mono shadow-lg flex items-center space-x-1.5">
                <span>⏱️ Tempo:</span>
                <span className="font-bold text-white">{exercise.tempo}</span>
              </div>
            </>
          ) : (
            <div className="w-full h-full p-2">
              <ExerciseGraphic exercise={exercise} />
            </div>
          )}
        </div>

        {/* Bento Sub-Tabs Selector */}
        <div className="grid grid-cols-3 gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('guia')}
            className={`py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              activeSubTab === 'guia'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Ficha & Claves
          </button>
          <button
            onClick={() => setActiveSubTab('biomecanica')}
            className={`py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              activeSubTab === 'biomecanica'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Biomecánica & Pasos
          </button>
          <button
            onClick={() => setActiveSubTab('tracker')}
            className={`py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeSubTab === 'tracker'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>Tracker de Series</span>
            {loggedSets.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-cyan-400 text-[10px] font-black inline-flex items-center justify-center">
                {loggedSets.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SUBTAB 1: FICHA TÉCNICA, CLAVES POSTURALES & ERRORES */}
      {activeSubTab === 'guia' && (
        <div id="exerciseDetails" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bento Card 1: Ficha Técnica */}
          <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <span className="text-cyan-400">📊</span>
                <span>Ficha Técnica</span>
              </h3>

              <div className="space-y-3 pt-1">
                <div className="flex flex-col border-b border-slate-800/80 pb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">🎯 Músculo Principal</span>
                  <span className="text-xs font-bold text-cyan-400 mt-0.5">{exercise.muscle}</span>
                </div>

                <div className="flex flex-col border-b border-slate-800/80 pb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">⚡ Sinergistas</span>
                  <span className="text-xs text-slate-300 mt-0.5">{exercise.secondary.join(", ")}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">⏱️ Descanso Sugerido</span>
                  <span className="text-xs font-bold text-amber-400">{exercise.rest} segundos</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartRestTimer(exercise.rest)}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-1.5 mt-2"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Activar Temporizador ({exercise.rest}s)</span>
            </button>
          </div>

          {/* Bento Card 2: Claves de Ejecución Correcta */}
          <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center space-x-1.5">
              <span>✅</span>
              <span>Claves de Ejecución Correcta</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 pt-1">
              {exercise.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80">
                  <span className="text-emerald-400 font-black">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bento Card 3: Errores Comunes a Evitar */}
          <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center space-x-1.5">
              <span>❌</span>
              <span>Errores Comunes a Evitar</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 pt-1">
              {exercise.mistakes.map((err, idx) => (
                <li key={idx} className="flex items-start space-x-2 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80">
                  <span className="text-rose-400 font-black">•</span>
                  <span className="leading-relaxed">{err}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SUBTAB 2: BIOMECÁNICA, AJUSTES DE MÁQUINA Y PASOS */}
      {activeSubTab === 'biomecanica' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Machine Setup Bento Card */}
            <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Ajuste Ergonómico</h3>
                  <p className="text-[11px] text-slate-400">Configuración anatómica de la estación</p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {exercise.machineSetup.seatHeight && (
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">Altura Asiento / Eje</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{exercise.machineSetup.seatHeight}</p>
                  </div>
                )}
                {exercise.machineSetup.backrestAngle && (
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">Respaldo / Inclinación</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{exercise.machineSetup.backrestAngle}</p>
                  </div>
                )}
                {exercise.machineSetup.pinOrCableLevel && (
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">Altura de Polea / Pasador</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{exercise.machineSetup.pinOrCableLevel}</p>
                  </div>
                )}
                {exercise.machineSetup.handleOrGrip && (
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">Agarre / Manillar</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{exercise.machineSetup.handleOrGrip}</p>
                  </div>
                )}
                {exercise.machineSetup.safetyCatch && (
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">Topes de Seguridad</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{exercise.machineSetup.safetyCatch}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Execution Steps */}
            <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Secuencia de Ejecución</h3>
                  <p className="text-[11px] text-slate-400">Guía paso a paso</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                {exercise.executionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{step.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <BiomechanicsDetail exercise={exercise} />
        </div>
      )}

      {/* SUBTAB 3: TRACKER DE SERIES */}
      {activeSubTab === 'tracker' && (
        <SetLogger
          exercise={exercise}
          loggedSets={loggedSets}
          onAddSet={onAddSet}
          onDeleteSet={onDeleteSet}
          onToggleComplete={onToggleComplete}
          onStartRestTimer={onStartRestTimer}
        />
      )}
    </div>
  );
};
