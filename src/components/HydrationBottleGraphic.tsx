import React from 'react';
import { Droplets, Sparkles, Trophy, Flame, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface HydrationBottleGraphicProps {
  consumedMl: number;
  targetMl: number;
  onAddWater: (amount: number) => void;
}

export const HydrationBottleGraphic: React.FC<HydrationBottleGraphicProps> = ({
  consumedMl,
  targetMl,
  onAddWater
}) => {
  const percentage = Math.min(100, Math.round((consumedMl / targetMl) * 100));
  const remainingMl = Math.max(0, targetMl - consumedMl);

  // Determinar estado de hidratación
  let statusBadge = {
    label: 'Iniciando el Día',
    color: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    desc: 'Bebe tu primer vaso de activación'
  };

  if (percentage >= 100) {
    statusBadge = {
      label: '🏆 ¡Meta Cumplida!',
      color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      desc: 'Nivel óptimo celular y muscular alcanzado'
    };
  } else if (percentage >= 75) {
    statusBadge = {
      label: '⚡ Zona de Alto Rendimiento',
      color: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30',
      desc: 'Volumen plasmático en balance perfecto'
    };
  } else if (percentage >= 50) {
    statusBadge = {
      label: '💧 Mitad de Camino',
      color: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
      desc: 'Buen ritmo de absorción hídrica'
    };
  } else if (percentage >= 25) {
    statusBadge = {
      label: '🔥 Activación Celular',
      color: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
      desc: 'Continúa bebiendo en tus intervalos'
    };
  }

  // Altura del agua en la botella (0 a 100%)
  const fillHeight = Math.min(100, Math.max(4, percentage));

  return (
    <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Glow decorativo de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Termo Deportivo Interactivo</h3>
            <p className="text-[10px] text-slate-400">Visualiza el volumen real de líquido en tu organismo</p>
          </div>
        </div>

        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border flex items-center ${statusBadge.color}`}>
          {statusBadge.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        {/* ================= TERMO DEPORTIVO VECTORIAL SVG CON FÍSICA DE FLUIDOS ================= */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-44 sm:w-48 h-72 flex flex-col items-center justify-center">
            
            {/* SVG Vectorial de Alta Definición para el Termo */}
            <svg 
              className="w-full h-full drop-shadow-[0_10px_25px_rgba(6,182,212,0.25)]"
              viewBox="0 0 200 320" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Máscara de recorte anatómica de la botella/termo */}
                <clipPath id="thermoInnerClip">
                  <path d="M60 48 H140 V65 C140 75 160 85 160 105 V270 C160 292 142 308 120 308 H80 C58 308 40 292 40 270 V105 C40 85 60 75 60 65 Z" />
                </clipPath>

                {/* Degradado del líquido vital */}
                <linearGradient id="cyberWaterGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#0284c7" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                </linearGradient>

                {/* Reflejo de cristal */}
                <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="25%" stopColor="#ffffff" stopOpacity="0.05" />
                  <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
                </linearGradient>
              </defs>

              {/* Tapa deportiva superior y boquilla */}
              <rect x="75" y="16" width="50" height="18" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="88" y="8" width="24" height="10" rx="3" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1" />
              <rect x="94" y="11" width="12" height="3" rx="1.5" fill="#e0f2fe" />

              {/* Cuello del termo */}
              <rect x="65" y="34" width="70" height="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

              {/* Fondo del cuerpo del termo */}
              <path 
                d="M60 48 H140 V65 C140 75 160 85 160 105 V270 C160 292 142 308 120 308 H80 C58 308 40 292 40 270 V105 C40 85 60 75 60 65 Z" 
                fill="#050b14" 
                stroke="#1e293b" 
                strokeWidth="2" 
              />

              {/* ================= CAPA INTERNA DE AGUA CON CLIPPING ================= */}
              <g clipPath="url(#thermoInnerClip)">
                {/* Altura de agua con animación reactiva */}
                <foreignObject x="0" y="48" width="200" height="260">
                  <div className="w-full h-full flex flex-col justify-end relative overflow-hidden">
                    <motion.div 
                      className="w-full relative transition-all duration-700 ease-out"
                      style={{ height: `${fillHeight}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${fillHeight}%` }}
                      transition={{ type: 'spring', damping: 18, stiffness: 90 }}
                    >
                      {/* Cresta de Olas Animadas con waveFlow1 y waveFlow2 */}
                      <div className="absolute -top-3.5 left-0 right-0 h-5 overflow-hidden z-20 pointer-events-none">
                        {/* Ola Trasera (waveFlow2) */}
                        <div className="w-[300%] h-full absolute top-0 left-0 animate-wave-2 opacity-60">
                          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path 
                              d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z" 
                              fill="#0284c7" 
                            />
                          </svg>
                        </div>

                        {/* Ola Frontal (waveFlow1) */}
                        <div className="w-[300%] h-full absolute top-0 left-0 animate-wave-1 opacity-90">
                          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path 
                              d="M0,60 C200,10 400,100 600,60 C800,10 1000,100 1200,60 L1200,120 L0,120 Z" 
                              fill="#22d3ee" 
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Masa de Agua con Degradado y Burbujas */}
                      <div className="w-full h-full bg-gradient-to-t from-blue-800 via-cyan-600 to-cyan-400 relative shadow-[inset_0_0_20px_rgba(6,182,212,0.6)]">
                        {/* Microburbujas flotantes */}
                        <div className="absolute bottom-1 left-5 w-1.5 h-1.5 bg-white/70 rounded-full animate-bubble-1"></div>
                        <div className="absolute bottom-3 left-12 w-1 h-1 bg-white/80 rounded-full animate-bubble-2"></div>
                        <div className="absolute bottom-2 right-8 w-1.5 h-1.5 bg-white/70 rounded-full animate-bubble-3"></div>
                        <div className="absolute bottom-4 right-14 w-1 h-1 bg-white/80 rounded-full animate-bubble-4"></div>
                      </div>
                    </motion.div>
                  </div>
                </foreignObject>
              </g>

              {/* Líneas de graduación volumétrica grabadas en el termo */}
              <line x1="140" y1="100" x2="152" y2="100" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
              <text x="134" y="103" fill="#38bdf8" fontSize="7" fontFamily="monospace" textAnchor="end" fontWeight="bold">100%</text>

              <line x1="142" y1="145" x2="152" y2="145" stroke="#64748b" strokeWidth="1" opacity="0.6" />
              <text x="136" y="148" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="end">75%</text>

              <line x1="140" y1="190" x2="152" y2="190" stroke="#64748b" strokeWidth="1" opacity="0.6" />
              <text x="136" y="193" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="end">50%</text>

              <line x1="142" y1="235" x2="152" y2="235" stroke="#64748b" strokeWidth="1" opacity="0.6" />
              <text x="136" y="238" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="end">25%</text>

              {/* Contorno exterior brillante de cristal y reflejos */}
              <path 
                d="M60 48 H140 V65 C140 75 160 85 160 105 V270 C160 292 142 308 120 308 H80 C58 308 40 292 40 270 V105 C40 85 60 75 60 65 Z" 
                fill="url(#glassReflection)" 
                stroke="#38bdf8" 
                strokeWidth="1.5" 
                strokeOpacity="0.6"
                className="pointer-events-none"
              />

              {/* Reflejo vertical de curvatura del termo */}
              <path d="M48 110 V265 C48 280 54 295 70 300" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" fill="none" />
            </svg>

            {/* Porcentaje numérico flotante en el centro del termo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-6 z-30">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {percentage}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
                {consumedMl.toLocaleString()} ml
              </span>
            </div>
          </div>
        </div>

        {/* ================= DETALLES DE CAPACIDAD & ACCIONES ================= */}
        <div className="md:col-span-7 space-y-4">
          {/* Tarjeta de Resumen Numérico */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Consumo de Hoy</span>
                <p className="text-xl font-black text-white font-mono">
                  {consumedMl.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ {targetMl.toLocaleString()} ml</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Faltante para la Meta</span>
                <p className="text-base font-black text-cyan-400 font-mono">
                  {remainingMl === 0 ? '¡Completado! 🌟' : `${remainingMl.toLocaleString()} ml`}
                </p>
              </div>
            </div>

            {/* Barra de progreso complementaria */}
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full"
                style={{ width: `${percentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <p className="text-[11px] text-slate-400 italic">
              {statusBadge.desc}
            </p>
          </div>

          {/* Botones de Ingesta Rápida con 1 toque */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center">
              <Plus className="w-3 h-3 mr-1 text-cyan-400" /> Registro Inmediato
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onAddWater(250)}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 p-2.5 rounded-xl text-center transition active:scale-95 cursor-pointer group"
              >
                <span className="text-xs font-black text-white group-hover:text-cyan-300 block">+250 ml</span>
                <span className="text-[9px] text-slate-500 block">Vaso</span>
              </button>

              <button
                type="button"
                onClick={() => onAddWater(500)}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 p-2.5 rounded-xl text-center transition active:scale-95 cursor-pointer group"
              >
                <span className="text-xs font-black text-white group-hover:text-cyan-300 block">+500 ml</span>
                <span className="text-[9px] text-slate-500 block">Botella</span>
              </button>

              <button
                type="button"
                onClick={() => onAddWater(750)}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 p-2.5 rounded-xl text-center transition active:scale-95 cursor-pointer group"
              >
                <span className="text-xs font-black text-white group-hover:text-cyan-300 block">+750 ml</span>
                <span className="text-[9px] text-slate-500 block">Shaker</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
