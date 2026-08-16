import React, { useState } from 'react';
import { MuscleGroup } from '../types';
import { User, Activity, Sparkles, ChevronRight, Eye } from 'lucide-react';

interface InteractiveBodyMapProps {
  selectedMuscle: MuscleGroup | null;
  onSelectMuscle: (muscle: MuscleGroup) => void;
}

export const InteractiveBodyMap: React.FC<InteractiveBodyMapProps> = ({
  selectedMuscle,
  onSelectMuscle
}) => {
  const [view, setView] = useState<'anterior' | 'posterior'>('anterior');

  const muscleList: { id: MuscleGroup; label: string; view: 'anterior' | 'posterior' | 'both'; color: string }[] = [
    { id: 'pecho', label: 'Pectoral Mayor y Menor', view: 'anterior', color: 'border-cyan-400 text-cyan-300' },
    { id: 'hombros', label: 'Deltoides (Ant, Lat, Post)', view: 'both', color: 'border-amber-400 text-amber-300' },
    { id: 'biceps', label: 'Bíceps Braquial & Braquial', view: 'anterior', color: 'border-emerald-400 text-emerald-300' },
    { id: 'triceps', label: 'Tríceps (Cabeza Larga/Lat)', view: 'posterior', color: 'border-emerald-400 text-emerald-300' },
    { id: 'core', label: 'Abdomen & Core / Oblicuos', view: 'anterior', color: 'border-purple-400 text-purple-300' },
    { id: 'cuadriceps', label: 'Cuádriceps (Vasto/Recto)', view: 'anterior', color: 'border-cyan-400 text-cyan-300' },
    { id: 'espalda', label: 'Dorsal Ancho & Trapecios', view: 'posterior', color: 'border-blue-400 text-blue-300' },
    { id: 'gluteos', label: 'Glúteo Mayor y Medio', view: 'posterior', color: 'border-pink-400 text-pink-300' },
    { id: 'isquios', label: 'Isquiosurales / Femorales', view: 'posterior', color: 'border-yellow-400 text-yellow-300' },
    { id: 'gemelos', label: 'Pantorrillas / Gemelos', view: 'both', color: 'border-slate-300 text-slate-200' },
    { id: 'cardio', label: 'Sistema Cardiovascular / VO2', view: 'both', color: 'border-red-400 text-red-300' }
  ];

  return (
    <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Title & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Mapa Anatómico Interactivo</h2>
            <p className="text-[11px] text-slate-400">Selecciona un músculo para explorar sus máquinas y ejercicios</p>
          </div>
        </div>

        <div className="flex bg-slate-900/90 border border-slate-800 p-1 rounded-2xl shadow-inner self-start sm:self-auto">
          <button
            onClick={() => setView('anterior')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
              view === 'anterior'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Frontal (Anterior)
          </button>
          <button
            onClick={() => setView('posterior')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
              view === 'posterior'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dorsal (Posterior)
          </button>
        </div>
      </div>

      {/* Interactive Anatomical SVG Model & Bento Sub-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 flex justify-center bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 relative overflow-hidden shadow-inner">
          {/* Anatomical Figure (Front or Back) */}
          <svg viewBox="0 0 200 320" className="h-64 sm:h-72 w-auto select-none drop-shadow-md">
            {view === 'anterior' ? (
              /* ANTERIOR VIEW */
              <g id="anterior-body">
                {/* Head / Neck */}
                <circle cx="100" cy="24" r="16" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                <rect x="94" y="38" width="12" height="10" fill="#1E293B" />
                
                {/* Shoulders (Deltoides Anterior) */}
                <ellipse 
                  cx="66" cy="60" rx="14" ry="11" 
                  fill={selectedMuscle === 'hombros' ? '#FFB800' : '#1E293B'} 
                  stroke={selectedMuscle === 'hombros' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('hombros')}
                />
                <ellipse 
                  cx="134" cy="60" rx="14" ry="11" 
                  fill={selectedMuscle === 'hombros' ? '#FFB800' : '#1E293B'} 
                  stroke={selectedMuscle === 'hombros' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('hombros')}
                />

                {/* Chest (Pectoral Mayor) */}
                <path 
                  d="M 75 56 Q 100 62 125 56 L 125 84 Q 100 95 75 84 Z" 
                  fill={selectedMuscle === 'pecho' ? '#00F0FF' : '#1A2333'} 
                  stroke={selectedMuscle === 'pecho' ? '#FFF' : '#334155'} 
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('pecho')}
                />
                {/* Chest line separator */}
                <line x1="100" y1="56" x2="100" y2="88" stroke="#0B0F19" strokeWidth="2" />

                {/* Arms (Biceps) */}
                <rect 
                  x="48" y="74" width="14" height="30" rx="6"
                  fill={selectedMuscle === 'biceps' ? '#00FF66' : '#1E293B'}
                  stroke={selectedMuscle === 'biceps' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('biceps')}
                />
                <rect 
                  x="138" y="74" width="14" height="30" rx="6"
                  fill={selectedMuscle === 'biceps' ? '#00FF66' : '#1E293B'}
                  stroke={selectedMuscle === 'biceps' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('biceps')}
                />

                {/* Forearms */}
                <rect x="44" y="108" width="12" height="32" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
                <rect x="144" y="108" width="12" height="32" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />

                {/* Core / Recto Abdominal */}
                <rect 
                  x="82" y="90" width="36" height="42" rx="6"
                  fill={selectedMuscle === 'core' ? '#A855F7' : '#162032'}
                  stroke={selectedMuscle === 'core' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('core')}
                />
                {/* 6 pack grid */}
                <line x1="100" y1="92" x2="100" y2="130" stroke="#0B0F19" strokeWidth="1.5" />
                <line x1="84" y1="104" x2="116" y2="104" stroke="#0B0F19" strokeWidth="1.5" />
                <line x1="84" y1="118" x2="116" y2="118" stroke="#0B0F19" strokeWidth="1.5" />

                {/* Pelvis */}
                <polygon points="80,132 120,132 110,150 90,150" fill="#1E293B" stroke="#334155" />

                {/* Quads (Cuádriceps) */}
                <rect 
                  x="72" y="152" width="24" height="66" rx="10"
                  fill={selectedMuscle === 'cuadriceps' ? '#00F0FF' : '#1A2333'}
                  stroke={selectedMuscle === 'cuadriceps' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('cuadriceps')}
                />
                <rect 
                  x="104" y="152" width="24" height="66" rx="10"
                  fill={selectedMuscle === 'cuadriceps' ? '#00F0FF' : '#1A2333'}
                  stroke={selectedMuscle === 'cuadriceps' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('cuadriceps')}
                />

                {/* Knees */}
                <circle cx="84" cy="225" r="7" fill="#1E293B" />
                <circle cx="116" cy="225" r="7" fill="#1E293B" />

                {/* Calves (Espinillas / Gemelos frontales) */}
                <rect 
                  x="74" y="235" width="20" height="55" rx="8"
                  fill={selectedMuscle === 'gemelos' ? '#E2E8F0' : '#162032'}
                  stroke={selectedMuscle === 'gemelos' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('gemelos')}
                />
                <rect 
                  x="106" y="235" width="20" height="55" rx="8"
                  fill={selectedMuscle === 'gemelos' ? '#E2E8F0' : '#162032'}
                  stroke={selectedMuscle === 'gemelos' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('gemelos')}
                />
              </g>
            ) : (
              /* POSTERIOR VIEW */
              <g id="posterior-body">
                {/* Head */}
                <circle cx="100" cy="24" r="16" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                
                {/* Upper Trapezius & Back (Espalda) */}
                <path 
                  d="M 68 50 L 100 40 L 132 50 L 126 128 L 74 128 Z"
                  fill={selectedMuscle === 'espalda' ? '#3B82F6' : '#1A2333'}
                  stroke={selectedMuscle === 'espalda' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('espalda')}
                />
                {/* Spine line */}
                <line x1="100" y1="42" x2="100" y2="135" stroke="#0B0F19" strokeWidth="2" />

                {/* Triceps */}
                <rect 
                  x="48" y="68" width="14" height="34" rx="6"
                  fill={selectedMuscle === 'triceps' ? '#00FF66' : '#1E293B'}
                  stroke={selectedMuscle === 'triceps' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('triceps')}
                />
                <rect 
                  x="138" y="68" width="14" height="34" rx="6"
                  fill={selectedMuscle === 'triceps' ? '#00FF66' : '#1E293B'}
                  stroke={selectedMuscle === 'triceps' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('triceps')}
                />

                {/* Glutes (Glúteos) */}
                <ellipse 
                  cx="85" cy="148" rx="16" ry="16"
                  fill={selectedMuscle === 'gluteos' ? '#EC4899' : '#162032'}
                  stroke={selectedMuscle === 'gluteos' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('gluteos')}
                />
                <ellipse 
                  cx="115" cy="148" rx="16" ry="16"
                  fill={selectedMuscle === 'gluteos' ? '#EC4899' : '#162032'}
                  stroke={selectedMuscle === 'gluteos' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('gluteos')}
                />

                {/* Hamstrings (Isquiosurales) */}
                <rect 
                  x="72" y="168" width="24" height="54" rx="8"
                  fill={selectedMuscle === 'isquios' ? '#EAB308' : '#1A2333'}
                  stroke={selectedMuscle === 'isquios' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('isquios')}
                />
                <rect 
                  x="104" y="168" width="24" height="54" rx="8"
                  fill={selectedMuscle === 'isquios' ? '#EAB308' : '#1A2333'}
                  stroke={selectedMuscle === 'isquios' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('isquios')}
                />

                {/* Calves (Gemelos) */}
                <ellipse 
                  cx="84" cy="255" rx="12" ry="24"
                  fill={selectedMuscle === 'gemelos' ? '#E2E8F0' : '#162032'}
                  stroke={selectedMuscle === 'gemelos' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('gemelos')}
                />
                <ellipse 
                  cx="116" cy="255" rx="12" ry="24"
                  fill={selectedMuscle === 'gemelos' ? '#E2E8F0' : '#162032'}
                  stroke={selectedMuscle === 'gemelos' ? '#FFF' : '#334155'}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectMuscle('gemelos')}
                />
              </g>
            )}
          </svg>

          {/* Quick guide label */}
          <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] text-slate-400">
            <span>Toca cualquier zona muscular</span>
            <span className="font-bold text-cyan-400">{view === 'anterior' ? 'Vista Delantera' : 'Vista Trasera'}</span>
          </div>
        </div>

        {/* Muscle Selector Button List */}
        <div className="md:col-span-6 space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">
          <p className="text-xs font-bold text-slate-400 mb-2">Grupos Musculares Disponibles:</p>
          <div className="grid grid-cols-1 gap-2">
            {muscleList
              .filter(m => m.view === 'both' || m.view === view)
              .map((muscle) => {
                const isSelected = selectedMuscle === muscle.id;
                return (
                  <button
                    key={muscle.id}
                    onClick={() => onSelectMuscle(muscle.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition border cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
                      <span>{muscle.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
