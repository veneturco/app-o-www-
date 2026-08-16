import React from 'react';
import { Flame, Dumbbell, Timer, Calculator, User, Sparkles, BookOpen, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: 'enciclopedia' | 'bodymap' | 'tracker' | 'calculators';
  setActiveTab: (tab: 'enciclopedia' | 'bodymap' | 'tracker' | 'calculators') => void;
  timerActive: boolean;
  timerSecondsRemaining: number;
  openTimer: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  timerActive,
  timerSecondsRemaining,
  openTimer,
  searchQuery,
  setSearchQuery
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('enciclopedia')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
              <span className="text-[#0B0F19] font-black text-xl">⚡</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-cyan-400 font-black tracking-tighter text-xl">HYDRO</span>
                <span className="text-white font-black tracking-tighter text-xl">FIT</span>
                <span className="text-[10px] font-black bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 px-1.5 py-0.5 rounded leading-none">
                  GYM PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Enciclopedia Biomecánica</p>
            </div>
          </div>

          {/* Mobile Right Badges */}
          <div className="flex md:hidden items-center space-x-2">
            {timerActive && (
              <button
                onClick={openTimer}
                className="flex items-center space-x-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse"
              >
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTime(timerSecondsRemaining)}</span>
              </button>
            )}
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              SISTEMA ACTIVO
            </span>
          </div>
        </div>

        {/* Search Input and Live Status (Desktop) */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:w-64 bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 flex items-center space-x-2.5 focus-within:border-cyan-500/50 transition shadow-inner">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ejercicio o máquina..."
              className="bg-transparent outline-none text-xs w-full text-slate-200 placeholder-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Rest Timer indicator */}
          {timerActive && (
            <button
              onClick={openTimer}
              className="hidden sm:flex items-center space-x-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-xl text-xs font-bold animate-pulse hover:bg-cyan-500/30 transition"
              title="Ver cronómetro de descanso"
            >
              <Timer className="w-4 h-4" />
              <span>{formatTime(timerSecondsRemaining)}</span>
            </button>
          )}

          {/* Live Status Badge */}
          <div className="hidden md:flex text-right">
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              SISTEMA ACTIVO
            </span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation Bar */}
      <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between sm:justify-start gap-2 overflow-x-auto custom-scrollbar">
        <button
          id="tab-enciclopedia"
          onClick={() => setActiveTab('enciclopedia')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
            activeTab === 'enciclopedia'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-[#121826] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Enciclopedia & Máquinas</span>
        </button>

        <button
          id="tab-bodymap"
          onClick={() => setActiveTab('bodymap')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
            activeTab === 'bodymap'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-[#121826] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Mapa Muscular</span>
        </button>

        <button
          id="tab-tracker"
          onClick={() => setActiveTab('tracker')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
            activeTab === 'tracker'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-[#121826] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Tracker & Rutinas</span>
        </button>

        <button
          id="tab-calculators"
          onClick={() => setActiveTab('calculators')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
            activeTab === 'calculators'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-[#121826] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>1RM & Discos</span>
        </button>
      </div>
    </header>
  );
};
