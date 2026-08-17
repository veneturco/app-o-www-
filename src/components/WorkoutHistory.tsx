import React, { useState, useEffect, useMemo } from 'react';
import { CalendarDays, Activity, Timer, Dumbbell, Trophy, Trash2, AlertCircle, TrendingUp, Zap } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

interface SavedSession {
  id: string;
  date: string;
  duration: number;
  volume: number;
  sets: number;
  exercises: number;
}

interface DailyVolumePoint {
  dayLabel: string;
  fullDate: string;
  tonnage: number;
  setsCount: number;
  sessionCount: number;
}

export const WorkoutHistory: React.FC = () => {
  const [history, setHistory] = useState<SavedSession[]>([]);
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  // Cargar el historial cuando se abre la pantalla
  useEffect(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem('hydrofit_history') || '[]');
      setHistory(savedData);
    } catch {
      setHistory([]);
    }
  }, []);

  const clearAllHistory = () => {
    localStorage.removeItem('hydrofit_history');
    setHistory([]);
  };

  const deleteSession = (id: string) => {
    const newHistory = history.filter(session => session.id !== id);
    localStorage.setItem('hydrofit_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('es-ES', { 
        weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
      }).format(date);
    } catch {
      return isoString;
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // Cálculo de los últimos 7 días con volumen consolidado
  const last7DaysData = useMemo(() => {
    const result: DailyVolumePoint[] = [];
    const now = new Date();

    // Generar los últimos 7 días en orden cronológico (desde hace 6 días hasta hoy)
    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() - i);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      // Filtrar sesiones del día
      const daySessions = history.filter(session => {
        try {
          const sDate = new Date(session.date);
          return sDate >= targetDate && sDate < nextDay;
        } catch {
          return false;
        }
      });

      const dayTonnage = daySessions.reduce((sum, s) => sum + (Number(s.volume) || 0), 0);
      const daySets = daySessions.reduce((sum, s) => sum + (Number(s.sets) || 0), 0);

      const dayLabel = i === 0 
        ? 'Hoy' 
        : targetDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });

      result.push({
        dayLabel: dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1),
        fullDate: targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
        tonnage: Math.round(dayTonnage),
        setsCount: daySets,
        sessionCount: daySessions.length
      });
    }

    return result;
  }, [history]);

  const total7DaysTonnage = useMemo(() => {
    return last7DaysData.reduce((acc, curr) => acc + curr.tonnage, 0);
  }, [last7DaysData]);

  const max7DaysTonnage = useMemo(() => {
    return Math.max(...last7DaysData.map(d => d.tonnage), 0);
  }, [last7DaysData]);

  const total7DaysSets = useMemo(() => {
    return last7DaysData.reduce((acc, curr) => acc + curr.setsCount, 0);
  }, [last7DaysData]);

  return (
    <div className="space-y-4">
      {/* ================= HEADER DEL HISTORIAL ================= */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">Progreso Personal</span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Historial & Tonelaje</h2>
          </div>
        </div>

        {history.length > 0 && (
          <button 
            onClick={clearAllHistory}
            className="text-xs font-bold text-slate-500 hover:text-red-400 transition flex items-center space-x-1 p-2 rounded-xl hover:bg-red-500/10 cursor-pointer"
            title="Borrar todo el historial"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Borrar Todo</span>
          </button>
        )}
      </div>

      {/* ================= GRÁFICO RECHARTS: TONELAJE ÚLTIMOS 7 DÍAS ================= */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden space-y-4">
        {/* Glow decorativo de fondo */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>

        {/* Barra superior de métricas del gráfico */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Tonelaje Semanal (Últimos 7 Días)
              </h3>
              <p className="text-[11px] text-slate-400">Volumen acumulado por día (kg movidos)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Selector de tipo de gráfico */}
            <div className="bg-slate-900 border border-slate-800 p-0.5 rounded-xl flex items-center text-xs">
              <button
                onClick={() => setChartType('area')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  chartType === 'area'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Curva
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  chartType === 'bar'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Barras
              </button>
            </div>

            {/* Totalizador semanal */}
            <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl flex items-center space-x-2 shadow-inner">
              <span className="text-[11px] text-slate-400">Total:</span>
              <span className="text-sm font-black text-cyan-300 font-mono">
                {total7DaysTonnage.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">kg</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3 mini cards resumen */}
        <div className="grid grid-cols-3 gap-2.5 pt-1 relative z-10">
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3">
            <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Volumen Total</span>
            <p className="text-base sm:text-lg font-black text-cyan-400 font-mono">
              {total7DaysTonnage.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">kg</span>
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3">
            <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Pico Diario</span>
            <p className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              {max7DaysTonnage.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">kg</span>
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3">
            <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Series 7 Días</span>
            <p className="text-base sm:text-lg font-black text-purple-400 font-mono">
              {total7DaysSets} <span className="text-[10px] text-slate-500 font-normal">series</span>
            </p>
          </div>
        </div>

        {/* Contenedor del Gráfico Responsive Recharts */}
        <div className="h-56 sm:h-64 w-full pt-2 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={last7DaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tonnageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="dayLabel" 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#1E293B' }} 
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={{ stroke: '#1E293B' }}
                  tickFormatter={(val) => `${val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as DailyVolumePoint;
                      return (
                        <div className="bg-slate-950/95 border border-cyan-500/40 p-3 rounded-xl shadow-2xl space-y-1 backdrop-blur-md">
                          <p className="text-xs font-bold text-white flex items-center justify-between gap-3">
                            <span>{data.dayLabel}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{data.fullDate}</span>
                          </p>
                          <p className="text-sm font-black text-cyan-300 font-mono">
                            {data.tonnage.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kg movidos</span>
                          </p>
                          <div className="text-[10px] text-slate-400 flex items-center justify-between gap-4 pt-1 border-t border-slate-800">
                            <span>{data.setsCount} series</span>
                            <span>{data.sessionCount} sesión(es)</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tonnage" 
                  stroke="#00F0FF" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#tonnageGradient)" 
                  activeDot={{ r: 6, fill: '#00F0FF', stroke: '#0F172A', strokeWidth: 2 }}
                />
              </AreaChart>
            ) : (
              <BarChart data={last7DaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="dayLabel" 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#1E293B' }} 
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={{ stroke: '#1E293B' }}
                  tickFormatter={(val) => `${val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as DailyVolumePoint;
                      return (
                        <div className="bg-slate-950/95 border border-cyan-500/40 p-3 rounded-xl shadow-2xl space-y-1 backdrop-blur-md">
                          <p className="text-xs font-bold text-white flex items-center justify-between gap-3">
                            <span>{data.dayLabel}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{data.fullDate}</span>
                          </p>
                          <p className="text-sm font-black text-cyan-300 font-mono">
                            {data.tonnage.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kg movidos</span>
                          </p>
                          <div className="text-[10px] text-slate-400 flex items-center justify-between gap-4 pt-1 border-t border-slate-800">
                            <span>{data.setsCount} series</span>
                            <span>{data.sessionCount} sesión(es)</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="tonnage" 
                  fill="#00F0FF" 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= LISTA DE SESIONES ================= */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider px-1">Sesiones Registradas</h3>
        {history.length === 0 ? (
          <div className="bg-[#121826] border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
              <AlertCircle className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-white font-black text-lg">No hay entrenamientos aún</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Tus sesiones guardadas aparecerán aquí. ¡Ve a la Enciclopedia o al Tracker, registra unas series y finaliza tu primer entrenamiento!
            </p>
          </div>
        ) : (
          history.map((session) => (
            <div key={session.id} className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-lg hover:border-cyan-500/30 transition-colors group relative overflow-hidden">
              
              {/* Adorno visual de fondo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Fecha y Título */}
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-slate-900 rounded-xl border border-slate-700 text-cyan-400">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-wide text-sm">Sesión Completada</h4>
                    <p className="text-xs text-slate-400 font-medium capitalize mt-0.5">{formatDate(session.date)}</p>
                  </div>
                </div>

                {/* Estadísticas de la Sesión */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-bold text-white">{session.volume.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">kg totales</span></span>
                  </div>
                  
                  <div className="bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold text-white">{session.sets} <span className="text-[10px] text-slate-500 font-normal">series</span></span>
                  </div>

                  <div className="bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-1.5">
                    <Timer className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-bold text-white">{formatDuration(session.duration)}</span>
                  </div>

                  {/* Botón Eliminar Sesión Individual */}
                  <button 
                    onClick={() => deleteSession(session.id)}
                    className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                    title="Eliminar esta sesión"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
