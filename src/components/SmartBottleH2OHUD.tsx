import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Sparkles, Cpu, Clock, Thermometer, Plus, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { playChime } from '../utils/audio';

interface SmartBottleH2OHUDProps {
  isActiveTab: boolean;
  onNavigate: () => void;
}

export const SmartBottleH2OHUD: React.FC<SmartBottleH2OHUDProps> = ({
  isActiveTab,
  onNavigate
}) => {
  const [consumedMl, setConsumedMl] = useState<number>(0);
  const [targetMl, setTargetMl] = useState<number>(2800);
  const [tempC, setTempC] = useState<number>(24);
  const [weatherCondition, setWeatherCondition] = useState<string>('Óptimo');
  const [city, setCity] = useState<string>('Ubicación Detectada');
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [nextDoseTime, setNextDoseTime] = useState<string>('02:00 PM');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState<boolean>(false);
  const [justAddedWater, setJustAddedWater] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sincronizar datos en tiempo real con localStorage
  const syncData = () => {
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const savedWater = localStorage.getItem(`hydrofit_water_${todayStr}`);
      const consumed = savedWater ? Number(savedWater) : 0;
      setConsumedMl(consumed);

      const savedPlan = localStorage.getItem('hydrofit_ai_hydration_plan');
      if (savedPlan) {
        const parsed = JSON.parse(savedPlan);
        if (parsed.totalDailyMl) setTargetMl(parsed.totalDailyMl);
        if (parsed.temperatureC) setTempC(parsed.temperatureC);
        if (parsed.weatherCondition) setWeatherCondition(parsed.weatherCondition);
        if (parsed.city) setCity(parsed.city);
        
        if (parsed.schedules && parsed.schedules.length > 0) {
          const pending = parsed.schedules.find((s: { completed: boolean; time: string }) => !s.completed);
          if (pending) {
            setNextDoseTime(pending.time);
          } else {
            setNextDoseTime('Completado');
          }
        }
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    syncData();
    const interval = setInterval(syncData, 1500);

    // Reloj digital en vivo
    const updateTime = () => {
      const d = new Date();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTimeStr(`${formattedHours}:${formattedMinutes} ${ampm}`);
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    window.addEventListener('storage', syncData);

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsPinnedOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
      window.removeEventListener('storage', syncData);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const percentage = Math.min(100, Math.round((consumedMl / targetMl) * 100));

  // Manejo de suma rápida de agua (+250ml)
  const handleQuickAddWater = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const todayKey = `hydrofit_water_${todayStr}`;
      const newAmount = consumedMl + 250;
      localStorage.setItem(todayKey, newAmount.toString());
      setConsumedMl(newAmount);
      playChime('water');
      setJustAddedWater(true);
      setTimeout(() => setJustAddedWater(false), 1500);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  const showHUD = isHovered || isPinnedOpen;

  return (
    <div 
      ref={containerRef}
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ================= BOTÓN PRINCIPAL H2O-IA ================= */}
      <button
        id="tab-h2o-ia-smart-bottle"
        onClick={() => {
          onNavigate();
          setIsPinnedOpen(false);
        }}
        className={`flex items-center space-x-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-300 relative group cursor-pointer border overflow-hidden select-none ${
          isActiveTab
            ? 'bg-gradient-to-r from-[#0d1c2d] to-[#0a1526] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] text-white'
            : 'bg-[#0f172a]/95 hover:bg-[#131d36] border-cyan-500/40 hover:border-cyan-400 text-slate-200 hover:text-white shadow-sm'
        }`}
        title="H2O-IA: Botella inteligente con telemetría en tiempo real"
      >
        {/* ================= MINI BOTELLA H2O-IA CON OLEAJE Y CHIP ================= */}
        <div className="relative w-5.5 h-8 sm:w-6 sm:h-9 flex flex-col items-center justify-end">
          {/* Tapa deportiva con sello H2O */}
          <div className="w-3.5 h-1.5 bg-gradient-to-r from-cyan-600 via-sky-400 to-blue-600 rounded-t-sm border border-cyan-300/80 z-20 flex items-center justify-center shadow-xs">
            <span className="text-[5px] font-black tracking-tighter text-slate-950 leading-none">H2O</span>
          </div>
          <div className="w-2.5 h-0.5 bg-slate-900 border-x border-cyan-400/50 z-20"></div>

          {/* Cuerpo ergonómico de la botella con borde de vidrio neón */}
          <div className="w-full h-6.5 sm:h-7.5 bg-slate-950/90 border border-cyan-400/60 rounded-b-md rounded-t-xs relative overflow-hidden flex flex-col justify-end shadow-[inset_0_0_8px_rgba(6,182,212,0.4)]">
            
            {/* Llenado de Líquido reactivo con Oleaje animado */}
            <motion.div 
              className="w-full relative z-10 transition-all duration-500"
              style={{ height: `${Math.min(100, Math.max(8, percentage))}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${Math.min(100, Math.max(8, percentage))}%` }}
              transition={{ type: 'spring', damping: 18, stiffness: 85 }}
            >
              {/* Olas en la superficie del líquido */}
              <div className="absolute -top-1.5 left-0 right-0 h-2 overflow-hidden z-20 pointer-events-none">
                <div className="w-[300%] h-full absolute top-0 left-0 animate-wave-1 opacity-90">
                  <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C200,10 400,100 600,60 C800,10 1000,100 1200,60 L1200,120 L0,120 Z" fill="#22d3ee" />
                  </svg>
                </div>
              </div>

              {/* Masa de líquido con resplandor */}
              <div className="w-full h-full bg-gradient-to-t from-blue-600 via-cyan-500 to-sky-400 opacity-85 relative">
                {/* Micro burbuja */}
                <div className="absolute bottom-0.5 left-1 w-0.5 h-0.5 bg-white rounded-full animate-ping"></div>
              </div>
            </motion.div>

            {/* Micro-Chip AI centrado en el vidrio de la botella */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-[2px] bg-slate-950/90 border border-cyan-400/90 flex items-center justify-center shadow-[0_0_6px_rgba(6,182,212,0.8)]">
                <span className="text-[5px] font-black text-cyan-300 font-mono tracking-tighter">AI</span>
              </div>
            </div>

            {/* Reflejo de cristal */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent pointer-events-none z-30"></div>
          </div>
        </div>

        {/* ================= TEXTO Y BADGES ================= */}
        <div className="flex flex-col items-start leading-none text-left">
          <div className="flex items-center space-x-1">
            <span className="text-[11px] sm:text-xs font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white font-mono">
              H2O·IA
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>
          <span className="text-[9px] text-cyan-400/80 font-mono font-semibold hidden sm:inline">
            {(consumedMl / 1000).toFixed(1)}L / {(targetMl / 1000).toFixed(1)}L
          </span>
        </div>

        {/* Mini Badge con Porcentaje */}
        <div className={`px-1.5 py-0.5 rounded-md text-[10px] font-black font-mono border flex items-center space-x-0.5 ${
          percentage >= 100
            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
            : 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300'
        }`}>
          <span>{percentage >= 100 ? '100% 🏆' : `${percentage}%`}</span>
        </div>
      </button>

      {/* ================= POP-OVER HUD DE TELEMETRÍA BIOTECNOLÓGICA (Inspirado en la imagen) ================= */}
      <AnimatePresence>
        {showHUD && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 bg-[#070c18]/95 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.25)] p-4 z-50 overflow-hidden"
          >
            {/* Efectos de fondo de circuito futurista */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none"></div>

            {/* Cabecera del HUD */}
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2.5 mb-3 relative z-10">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                  <Cpu className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white font-mono tracking-widest flex items-center space-x-1">
                    <span>H2O-IA HYDRATION</span>
                  </h4>
                  <p className="text-[9px] text-cyan-400/80 font-mono">NEURAL WATER MATRIX</p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-bold">
                {currentTimeStr || 'LIVE'}
              </span>
            </div>

            {/* Visual Central: Botella Cyberpunk Interactiva con Circuitos */}
            <div className="bg-[#0b1322] border border-cyan-500/30 rounded-xl p-3 mb-3 relative overflow-hidden flex items-center justify-between">
              
              {/* Telemetría Izquierda */}
              <div className="flex flex-col space-y-1.5 z-10">
                <div className="flex items-center space-x-1 text-[9px] font-mono text-slate-400">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>NEXT DOSE</span>
                </div>
                <span className="text-xs font-mono font-bold text-white bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700/80">
                  {nextDoseTime}
                </span>

                <div className="flex items-center space-x-1 text-[9px] font-mono text-slate-400 pt-1">
                  <Thermometer className="w-3 h-3 text-amber-400" />
                  <span>AMBIENTE</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-300">
                  {tempC}°C • {weatherCondition}
                </span>
              </div>

              {/* Botella Gráfica con Ondas y Anillo de Telemetría */}
              <div className="relative w-16 h-28 flex flex-col items-center justify-end z-10">
                {/* Anillo Orbital Holográfico */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-8 border border-cyan-400/60 rounded-full rotate-[-12deg] pointer-events-none animate-pulse"></div>

                {/* Tapa de la Botella H2O */}
                <div className="w-6 h-3 bg-gradient-to-r from-cyan-600 via-sky-400 to-blue-600 rounded-t border border-cyan-300 z-20 flex items-center justify-center shadow-md">
                  <span className="text-[7px] font-black text-slate-950 font-mono">H2O</span>
                </div>
                <div className="w-4 h-1 bg-slate-900 border-x border-cyan-400/60 z-20"></div>

                {/* Botella de Vidrio Translúcida */}
                <div className="w-12 h-20 bg-slate-950/90 border-2 border-cyan-400/80 rounded-b-xl rounded-t-xs relative overflow-hidden flex flex-col justify-end shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  {/* Agua interna con oleaje */}
                  <motion.div 
                    className="w-full relative z-10"
                    style={{ height: `${Math.min(100, Math.max(6, percentage))}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, Math.max(6, percentage))}%` }}
                    transition={{ type: 'spring', damping: 16, stiffness: 80 }}
                  >
                    <div className="absolute -top-2 left-0 right-0 h-3 overflow-hidden z-20 pointer-events-none">
                      <div className="w-[300%] h-full absolute top-0 left-0 animate-wave-1 opacity-90">
                        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                          <path d="M0,60 C200,10 400,100 600,60 C800,10 1000,100 1200,60 L1200,120 L0,120 Z" fill="#38bdf8" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-full h-full bg-gradient-to-t from-blue-700 via-cyan-500 to-sky-400 opacity-90"></div>
                  </motion.div>

                  {/* Microchip AI Integrado */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25">
                    <div className="w-6 h-6 rounded bg-slate-950 border border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.9)]">
                      <span className="text-[7px] font-black text-cyan-300 font-mono">AI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telemetría Derecha: Status */}
              <div className="flex flex-col items-end space-y-1 z-10">
                <span className="text-[9px] font-mono text-slate-400">STATUS</span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                  percentage >= 100 
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' 
                    : 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                }`}>
                  {percentage >= 100 ? 'OPTIMAL' : 'HYDRATING'}
                </span>
                <span className="text-[9px] font-mono text-slate-400 pt-1">ACCURACY</span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">GPS 99.8%</span>
              </div>
            </div>

            {/* Barra de Progreso Segmentada (Exacta a la imagen) */}
            <div className="mb-3">
              <div className="flex justify-between text-[9px] font-mono font-bold text-slate-300 mb-1">
                <span>PROGRESS</span>
                <span className="text-cyan-300 font-mono">{consumedMl}ml / {targetMl}ml ({percentage}%)</span>
              </div>
              
              {/* Barra segmentada futurista */}
              <div className="grid grid-cols-10 gap-1 h-3 p-0.5 bg-slate-950 rounded-lg border border-cyan-500/40">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const isFilled = (idx + 1) * 10 <= percentage;
                  return (
                    <div
                      key={idx}
                      className={`h-full rounded-xs transition-all duration-300 ${
                        isFilled
                          ? 'bg-gradient-to-t from-cyan-500 to-sky-300 shadow-[0_0_6px_rgba(6,182,212,0.8)]'
                          : 'bg-slate-800/60'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleQuickAddWater}
                className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  justAddedWater
                    ? 'bg-emerald-500 border-emerald-300 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-98'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-cyan-300 text-slate-950 shadow-md shadow-cyan-500/30 active:scale-95'
                }`}
              >
                {justAddedWater ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>¡+250ml!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>+250 ml Vaso</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onNavigate();
                  setIsPinnedOpen(false);
                }}
                className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 hover:text-white transition cursor-pointer"
              >
                <span>Plan Médico</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
