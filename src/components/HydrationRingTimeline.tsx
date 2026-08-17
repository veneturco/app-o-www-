import React from 'react';
import { Clock, CheckCircle2, Zap, BatteryCharging, Sparkles } from 'lucide-react';
import { HydrationScheduleItem } from '../types';

interface HydrationRingTimelineProps {
  percentage: number;
  consumedMl: number;
  targetMl: number;
  schedules: HydrationScheduleItem[];
  onToggleSchedule: (index: number) => void;
}

export const HydrationRingTimeline: React.FC<HydrationRingTimelineProps> = ({
  percentage,
  consumedMl,
  targetMl,
  schedules,
  onToggleSchedule
}) => {
  // Configuración del círculo SVG
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, percentage) / 100) * circumference;

  // Medidor de Bio-Energía Celular
  let energyLevel = 'Bajo (Riesgo Fatiga)';
  let energyColor = 'text-amber-400';
  let batteryWidth = '25%';
  let batteryBg = 'bg-amber-500';

  if (percentage >= 100) {
    energyLevel = '100% Máxima Potencia y Recuperación';
    energyColor = 'text-emerald-400';
    batteryWidth = '100%';
    batteryBg = 'bg-gradient-to-r from-cyan-400 to-emerald-400';
  } else if (percentage >= 70) {
    energyLevel = 'Zona Óptima de Rendimiento';
    energyColor = 'text-cyan-300';
    batteryWidth = '80%';
    batteryBg = 'bg-cyan-400';
  } else if (percentage >= 40) {
    energyLevel = 'Moderado (En camino)';
    energyColor = 'text-blue-400';
    batteryWidth = '50%';
    batteryBg = 'bg-blue-500';
  }

  return (
    <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Anillo Horario & Bio-Energía</h3>
            <p className="text-[10px] text-slate-400">Sincronización en 360° con tus tomas recomendadas</p>
          </div>
        </div>

        <span className="text-[10px] font-bold bg-slate-900 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-xl">
          {schedules.filter(s => s.completed).length}/{schedules.length} tomas listas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* ================= ANILLO CIRCULAR EN 360° ================= */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-52 h-52 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Círculo de fondo */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="text-slate-800"
                strokeWidth="14"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Círculo de progreso con gradiente */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="text-cyan-400 transition-all duration-1000 ease-out"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))'
                }}
              />
            </svg>

            {/* Centro del anillo */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-white font-mono">{percentage}%</span>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                {consumedMl} / {targetMl} ml
              </span>
              <span className="text-[9px] text-slate-400 mt-0.5">Meta Diaria</span>
            </div>
          </div>
        </div>

        {/* ================= BATERÍA CELULAR Y FRAGMENTOS ================= */}
        <div className="md:col-span-6 space-y-4">
          {/* Tarjeta de Batería Bio-Energética */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1 text-cyan-400" /> Bio-Energía Muscular
              </span>
              <span className={`text-xs font-bold font-mono ${energyColor}`}>
                {energyLevel}
              </span>
            </div>

            {/* Batería física con segmentos */}
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5 relative">
              <div
                className={`h-full rounded-full transition-all duration-700 ${batteryBg}`}
                style={{ width: batteryWidth }}
              ></div>
            </div>

            <p className="text-[10px] text-slate-400">
              Mantener un aporte de agua constante preserva la contractibilidad neuromuscular y previene micro-calambres durante el ejercicio.
            </p>
          </div>

          {/* Micro-puntos de tomas horarias clicables */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Puntos Horarios del Plan
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {schedules.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onToggleSchedule(idx)}
                  className={`px-2.5 py-1.5 rounded-xl border text-left transition flex items-center justify-between text-xs cursor-pointer ${
                    item.completed
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono font-bold text-[11px]">{item.time}</span>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${item.completed ? 'text-cyan-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
