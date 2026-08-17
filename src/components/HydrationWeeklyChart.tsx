import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Flame, 
  Trophy, 
  Thermometer, 
  Droplets, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  ChevronRight,
  Plus
} from 'lucide-react';
import { HydrationDayRecord } from '../types';
import { motion } from 'motion/react';

interface HydrationWeeklyChartProps {
  todayConsumedMl: number;
  todayTargetMl: number;
  todayTempC: number;
}

export const HydrationWeeklyChart: React.FC<HydrationWeeklyChartProps> = ({
  todayConsumedMl,
  todayTargetMl,
  todayTempC
}) => {
  // Generar o cargar historial de los últimos 7 días
  const [weeklyData, setWeeklyData] = useState<HydrationDayRecord[]>(() => {
    try {
      const saved = localStorage.getItem('hydrofit_weekly_history');
      if (saved) {
        const parsed: HydrationDayRecord[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 7) {
          return parsed;
        }
      }
    } catch {
      // Ignorar y generar base
    }

    // Inicializar los últimos 7 días con datos dinámicos y amenos
    const days: HydrationDayRecord[] = [];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const isToday = i === 0;

      // Valores de muestra realistas basados en el objetivo
      const randomFactor = isToday ? (todayConsumedMl / todayTargetMl) : (0.85 + (Math.sin(i * 1.5) * 0.25));
      const target = todayTargetMl || 2800;
      const consumed = isToday ? todayConsumedMl : Math.round(target * Math.min(1.15, Math.max(0.6, randomFactor)));

      days.push({
        dateStr,
        dayName: dayNames[d.getDay()],
        consumedMl: consumed,
        targetMl: target,
        temperatureC: Math.round((todayTempC || 24) + (Math.cos(i) * 3)),
        completedGoal: consumed >= target
      });
    }

    return days;
  });

  const [selectedDay, setSelectedDay] = useState<HydrationDayRecord | null>(null);

  // Sincronizar el día de hoy con el consumo real actual
  useEffect(() => {
    setWeeklyData(prev => {
      const todayStr = new Date().toISOString().slice(0, 10);
      const updated = prev.map(item => {
        if (item.dateStr === todayStr) {
          return {
            ...item,
            consumedMl: todayConsumedMl,
            targetMl: todayTargetMl || item.targetMl,
            temperatureC: todayTempC || item.temperatureC,
            completedGoal: todayConsumedMl >= (todayTargetMl || item.targetMl)
          };
        }
        return item;
      });
      localStorage.setItem('hydrofit_weekly_history', JSON.stringify(updated));
      return updated;
    });
  }, [todayConsumedMl, todayTargetMl, todayTempC]);

  // Cálculos de la semana
  const totalWeekConsumed = weeklyData.reduce((acc, curr) => acc + curr.consumedMl, 0);
  const avgDailyLiters = (totalWeekConsumed / weeklyData.length / 1000).toFixed(1);
  const completedDaysCount = weeklyData.filter(d => d.completedGoal).length;
  
  // Calcular racha actual de días con meta cumplida
  let streak = 0;
  for (let i = weeklyData.length - 1; i >= 0; i--) {
    if (weeklyData[i].completedGoal) streak++;
    else if (i === weeklyData.length - 1 && weeklyData[i].consumedMl < weeklyData[i].targetMl) {
      // Si hoy aún no termina, no rompe la racha si ayer sí cumplió
      continue;
    } else {
      break;
    }
  }
  if (streak === 0 && completedDaysCount > 0) streak = 1;

  return (
    <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5 relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Encabezado del Historial */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Historial Semanal Dinámico</h3>
            <p className="text-[10px] text-slate-400">Progreso de los últimos 7 días correlacionado con el clima</p>
          </div>
        </div>

        {/* Badge de Racha */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl flex items-center shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Flame className="w-3.5 h-3.5 mr-1 text-orange-400 animate-bounce" />
            Racha: {streak} Días Saludables
          </span>
        </div>
      </div>

      {/* ================= 3 MÉTRICAS AMENAS ================= */}
      <div className="grid grid-cols-3 gap-2.5 relative z-10">
        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">Promedio Diario</span>
          <p className="text-base font-black text-cyan-400 font-mono mt-0.5">
            {avgDailyLiters} <span className="text-[10px] font-normal text-slate-400">Litros/día</span>
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">Total Semana</span>
          <p className="text-base font-black text-blue-400 font-mono mt-0.5">
            {(totalWeekConsumed / 1000).toFixed(1)} <span className="text-[10px] font-normal text-slate-400">Litros</span>
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">Metas Logradas</span>
          <p className="text-base font-black text-emerald-400 font-mono mt-0.5">
            {completedDaysCount} <span className="text-[10px] font-normal text-slate-400">/ 7 Días</span>
          </p>
        </div>
      </div>

      {/* ================= GRÁFICO DE BARRAS CON LÍQUIDO Y TEMPERATURA ================= */}
      <div className="pt-2 relative z-10">
        <div className="grid grid-cols-7 gap-2 sm:gap-3 items-end h-48 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 sm:p-4">
          {weeklyData.map((item, idx) => {
            const pct = Math.min(120, Math.round((item.consumedMl / item.targetMl) * 100));
            const isToday = idx === weeklyData.length - 1;
            const barHeightPct = Math.min(100, Math.max(8, pct));

            return (
              <div 
                key={idx}
                onClick={() => setSelectedDay(item)}
                className="flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Temperatura del día */}
                <div className="flex items-center space-x-0.5 text-[9px] font-bold text-amber-400/90 mb-1.5 opacity-80 group-hover:opacity-100 transition">
                  <Thermometer className="w-2.5 h-2.5 text-amber-400" />
                  <span>{item.temperatureC || 25}°</span>
                </div>

                {/* Columna de Líquido */}
                <div className={`w-full max-w-[36px] bg-slate-900 border rounded-t-xl overflow-hidden relative flex flex-col justify-end transition-all h-full ${
                  isToday 
                    ? 'border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                    : 'border-slate-800 group-hover:border-slate-700'
                }`}>
                  {/* Marca de meta 100% */}
                  <div className="absolute top-[16%] left-0 right-0 border-b border-dashed border-cyan-400/30 z-20 pointer-events-none"></div>

                  {/* Relleno Líquido */}
                  <motion.div
                    className={`w-full rounded-t-lg transition-all duration-500 relative ${
                      item.completedGoal 
                        ? 'bg-gradient-to-t from-blue-600 via-cyan-500 to-emerald-400' 
                        : 'bg-gradient-to-t from-blue-700 to-cyan-500/80'
                    }`}
                    style={{ height: `${barHeightPct}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeightPct}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                  >
                    {/* Brillo superior del agua */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 rounded-full"></div>
                  </motion.div>
                </div>

                {/* Nombre del día y estado */}
                <div className="mt-2 text-center">
                  <span className={`text-[10px] font-bold block ${isToday ? 'text-cyan-400 font-black' : 'text-slate-400'}`}>
                    {item.dayName}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    {Math.round(item.consumedMl / 1000 * 10) / 10}L
                  </span>
                  {item.completedGoal ? (
                    <span className="inline-block text-[10px] text-emerald-400 mt-0.5">⭐</span>
                  ) : (
                    <span className="inline-block text-[10px] text-slate-600 mt-0.5">💧</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MODAL / DETALLE DE DÍA SELECCIONADO ================= */}
      {selectedDay && (
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-4 animate-in fade-in duration-200 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black">
              {selectedDay.dayName}
            </div>
            <div>
              <span className="text-xs font-black text-white">
                Registro del {selectedDay.dateStr} ({selectedDay.dayName})
              </span>
              <p className="text-[11px] text-slate-400">
                Bebido: <strong className="text-cyan-300 font-mono">{selectedDay.consumedMl} ml</strong> de <span className="font-mono">{selectedDay.targetMl} ml</span> | Clima: <strong>{selectedDay.temperatureC}°C</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-bold px-3 py-1 rounded-xl border ${
              selectedDay.completedGoal 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {selectedDay.completedGoal ? 'Meta Lograda 🏆' : 'Bajo la Meta'}
            </span>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
