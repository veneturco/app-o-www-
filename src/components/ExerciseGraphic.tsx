import React from 'react';
import { Exercise } from '../types';

interface ExerciseGraphicProps {
  exercise: Exercise;
}

export const ExerciseGraphic: React.FC<ExerciseGraphicProps> = ({ exercise }) => {
  const getGraphic = () => {
    switch (exercise.svgGraphicType) {
      case 'press':
        return (
          <svg viewBox="0 0 240 140" className="w-full h-full max-h-48 text-cyan-400">
            <defs>
              <linearGradient id="pressGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Bench / Machine frame */}
            <line x1="40" y1="110" x2="200" y2="110" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="70" y1="110" x2="70" y2="130" stroke="#1E293B" strokeWidth="5" />
            <line x1="170" y1="110" x2="170" y2="130" stroke="#1E293B" strokeWidth="5" />
            {/* Person Torso */}
            <rect x="75" y="90" width="90" height="18" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            {/* Target Muscle Highlight (Chest) */}
            <ellipse cx="120" cy="84" rx="22" ry="12" fill="url(#pressGrad)" className="animate-pulse" />
            {/* Head */}
            <circle cx="60" cy="98" r="10" fill="#334155" />
            {/* Arms & Movement Vector */}
            <path d="M 105 92 L 100 50 L 140 50 L 135 92" fill="none" stroke="#00F0FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Barbell / Handle */}
            <line x1="80" y1="50" x2="160" y2="50" stroke="#F8FAFC" strokeWidth="4.5" strokeLinecap="round" />
            <rect x="72" y="42" width="10" height="16" rx="2" fill="#E2E8F0" />
            <rect x="158" y="42" width="10" height="16" rx="2" fill="#E2E8F0" />
            {/* Force vectors */}
            <path d="M 120 42 L 120 22 M 115 28 L 120 22 L 125 28" stroke="#00FF66" strokeWidth="2.5" strokeLinecap="round" />
            <text x="135" y="30" fill="#00FF66" fontSize="10" fontWeight="bold">CONCÉNTRICA ↑</text>
          </svg>
        );

      case 'pull':
        return (
          <svg viewBox="0 0 240 140" className="w-full h-full max-h-48 text-cyan-400">
            {/* Overhead pulley */}
            <circle cx="120" cy="18" r="12" fill="#1E293B" stroke="#00F0FF" strokeWidth="2" />
            <line x1="120" y1="18" x2="120" y2="40" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
            {/* Lat Bar */}
            <path d="M 65 40 Q 120 46 175 40" fill="none" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" />
            {/* Back Muscle Highlight */}
            <path d="M 100 70 Q 120 62 140 70 L 135 110 L 105 110 Z" fill="#00F0FF" opacity="0.4" className="animate-pulse" />
            {/* Seated Figure */}
            <circle cx="120" cy="58" r="9" fill="#475569" />
            <line x1="120" y1="67" x2="120" y2="108" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            {/* Arms pulling */}
            <path d="M 112 72 L 75 42 M 128 72 L 165 42" stroke="#00F0FF" strokeWidth="4" strokeLinecap="round" />
            {/* Downward force vector */}
            <path d="M 120 90 L 120 115 M 115 108 L 120 115 L 125 108" stroke="#00FF66" strokeWidth="2.5" strokeLinecap="round" />
            <text x="140" y="112" fill="#00FF66" fontSize="10" fontWeight="bold">TRACCIÓN ↓</text>
          </svg>
        );

      case 'squat':
        return (
          <svg viewBox="0 0 240 140" className="w-full h-full max-h-48">
            {/* 45 Incline Rail */}
            <line x1="40" y1="120" x2="180" y2="30" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <line x1="70" y1="125" x2="200" y2="40" stroke="#1E293B" strokeWidth="4" />
            {/* Sled Platform */}
            <rect x="155" y="25" width="45" height="12" rx="3" transform="rotate(-32 155 25)" fill="#64748B" />
            {/* Backrest */}
            <rect x="60" y="90" width="60" height="16" rx="4" transform="rotate(-32 60 90)" fill="#1E293B" stroke="#00F0FF" strokeWidth="1" />
            {/* Quads & Glute Highlight */}
            <ellipse cx="120" cy="85" rx="18" ry="12" fill="#00FF66" opacity="0.6" className="animate-pulse" />
            {/* Angle Indicator */}
            <path d="M 115 80 L 140 55" stroke="#00F0FF" strokeWidth="4" strokeLinecap="round" />
            <text x="50" y="40" fill="#00F0FF" fontSize="10" fontWeight="bold">EMPUJE 45° ↗</text>
          </svg>
        );

      case 'extension':
        return (
          <svg viewBox="0 0 240 140" className="w-full h-full max-h-48">
            {/* Seat and back */}
            <line x1="80" y1="50" x2="80" y2="100" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="75" y1="100" x2="135" y2="100" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            {/* Axis of rotation */}
            <circle cx="135" cy="100" r="7" fill="#00F0FF" stroke="#F8FAFC" strokeWidth="2" />
            {/* Quad Glow */}
            <path d="M 90 92 L 135 92 L 130 84 L 90 84 Z" fill="#00F0FF" opacity="0.6" className="animate-pulse" />
            {/* Lower leg extending */}
            <path d="M 135 100 L 175 75" stroke="#00FF66" strokeWidth="5" strokeLinecap="round" />
            <circle cx="175" cy="75" r="5" fill="#F59E0B" />
            {/* Arc vector */}
            <path d="M 140 120 Q 170 115 175 75" fill="none" stroke="#00FF66" strokeWidth="2" strokeDasharray="3 3" />
            <text x="145" y="45" fill="#00FF66" fontSize="10" fontWeight="bold">EXTENSIÓN ↷</text>
          </svg>
        );

      case 'curl':
        return (
          <svg viewBox="0 0 240 140" className="w-full h-full max-h-48">
            {/* Scott Bench Incline Pad */}
            <polygon points="60,110 130,60 140,65 75,115" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            {/* Upper Arm resting */}
            <line x1="80" y1="100" x2="130" y2="65" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
            {/* Biceps Peak Glow */}
            <circle cx="108" cy="76" r="11" fill="#00F0FF" opacity="0.7" className="animate-pulse" />
            {/* Forearm flexing up */}
            <line x1="130" y1="65" x2="115" y2="30" stroke="#00FF66" strokeWidth="5" strokeLinecap="round" />
            {/* Barbell grip */}
            <circle cx="115" cy="30" r="7" fill="#F8FAFC" />
            <text x="140" y="35" fill="#00FF66" fontSize="10" fontWeight="bold">FLEXIÓN BÍCEPS ↶</text>
          </svg>
        );

      case 'treadmill':
        return (
          <svg viewBox="0 0 240 140" className="w-full h-full max-h-48">
            {/* Treadmill base & incline */}
            <line x1="40" y1="110" x2="190" y2="85" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            {/* Console mast */}
            <line x1="170" y1="85" x2="170" y2="35" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <rect x="155" y="25" width="30" height="15" rx="3" fill="#00F0FF" opacity="0.3" stroke="#00F0FF" />
            {/* Runner Figure */}
            <circle cx="105" cy="45" r="8" fill="#F8FAFC" />
            <path d="M 105 53 L 115 80 L 95 100 M 115 80 L 140 92" stroke="#00FF66" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 105 60 L 90 70 M 105 60 L 125 65" stroke="#00FF66" strokeWidth="3" strokeLinecap="round" />
            <text x="50" y="35" fill="#00FF66" fontSize="10" fontWeight="bold">CARDIO / HIIT ⚡</text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 240 140" className="w-full h-full max-h-48">
            {/* Cable Station Tower */}
            <rect x="30" y="20" width="30" height="100" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            <circle cx="45" cy="30" r="5" fill="#00F0FF" />
            {/* Cable Line */}
            <line x1="45" y1="30" x2="140" y2="70" stroke="#00F0FF" strokeWidth="3" strokeDasharray="4 2" />
            {/* User */}
            <circle cx="150" cy="50" r="9" fill="#64748B" />
            <line x1="150" y1="59" x2="150" y2="105" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
            <circle cx="140" cy="70" r="8" fill="#00FF66" opacity="0.5" className="animate-pulse" />
            <text x="90" y="115" fill="#00F0FF" fontSize="10" fontWeight="bold">TENSIÓN CONTINUA</text>
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group shadow-inner">
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Vector Biomecánico 3D
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          Fuerza & Rango
        </span>
      </div>

      <div className="w-full h-40 flex items-center justify-center py-1">
        {getGraphic()}
      </div>

      <div className="w-full pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
          <span>Músculo Principal: <b className="text-cyan-300 capitalize">{exercise.primaryMuscle}</b></span>
        </span>
        <span className="text-slate-400">Tempo: <b className="text-emerald-400">{exercise.tempoAdvice.split(' ')[0]}</b></span>
      </div>
    </div>
  );
};
