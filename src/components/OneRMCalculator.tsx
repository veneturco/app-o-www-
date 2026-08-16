import React, { useState } from 'react';
import { Calculator, Award, Dumbbell, Info, TrendingUp, Zap } from 'lucide-react';

export const OneRMCalculator: React.FC = () => {
  const [weightKg, setWeightKg] = useState<number>(100);
  const [reps, setReps] = useState<number>(5);

  // Epley Formula: 1RM = Weight * (1 + 0.0333 * Reps)
  // Brzycki Formula: 1RM = Weight * (36 / (37 - Reps))
  // Lander Formula: 1RM = (100 * Weight) / (101.3 - 2.67123 * Reps)

  const calcEpley = reps === 1 ? weightKg : Math.round(weightKg * (1 + 0.0333 * reps) * 10) / 10;
  const calcBrzycki = reps === 1 ? weightKg : reps < 37 ? Math.round((weightKg * (36 / (37 - reps))) * 10) / 10 : calcEpley;
  const calcLander = reps === 1 ? weightKg : Math.round(((100 * weightKg) / (101.3 - 2.67123 * reps)) * 10) / 10;

  const average1RM = Math.round(((calcEpley + calcBrzycki + calcLander) / 3) * 10) / 10;

  const percentages = [
    { percent: 100, reps: '1 rep (1RM)', desc: 'Fuerza Máxima Absoluta' },
    { percent: 95, reps: '2 reps', desc: 'Fuerza Pesada' },
    { percent: 90, reps: '3-4 reps', desc: 'Fuerza & Potencia' },
    { percent: 85, reps: '5-6 reps', desc: 'Fuerza / Hipertrofia Miofibrilar' },
    { percent: 80, reps: '7-8 reps', desc: 'Hipertrofia Óptima' },
    { percent: 75, reps: '9-10 reps', desc: 'Hipertrofia Sarcoplasmática' },
    { percent: 70, reps: '11-12 reps', desc: 'Resistencia Muscular & Bombeo' },
    { percent: 65, reps: '15+ reps', desc: 'Metabólico & Resistencia' }
  ];

  return (
    <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Calculadora 1RM (Repetición Máxima)</h3>
          <p className="text-[11px] text-slate-400">Calcula tu fuerza máxima teórica basada en fórmulas científicas</p>
        </div>
      </div>

      {/* Input Inputs Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div>
          <label className="text-[11px] font-bold text-slate-400 block mb-1.5">Peso Levantado (kg)</label>
          <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden shadow-inner">
            <button
              onClick={() => setWeightKg(prev => Math.max(0, prev - 5))}
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              -5
            </button>
            <input
              type="number"
              min="0"
              step="2.5"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
              className="w-full text-center bg-transparent text-sm font-black text-white focus:outline-none"
            />
            <button
              onClick={() => setWeightKg(prev => prev + 5)}
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              +5
            </button>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-400 block mb-1.5">Repeticiones Logradas</label>
          <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden shadow-inner">
            <button
              onClick={() => setReps(prev => Math.max(1, prev - 1))}
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              -1
            </button>
            <input
              type="number"
              min="1"
              max="20"
              value={reps}
              onChange={(e) => setReps(parseInt(e.target.value, 10) || 1)}
              className="w-full text-center bg-transparent text-sm font-black text-white focus:outline-none"
            />
            <button
              onClick={() => setReps(prev => Math.min(20, prev + 1))}
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              +1
            </button>
          </div>
        </div>
      </div>

      {/* Main 1RM Result Bento Banner */}
      <div className="bg-gradient-to-r from-cyan-950/50 via-[#121826] to-blue-950/40 border border-cyan-500/40 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 block mb-1">1RM Estimado (Promedio Científico)</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl sm:text-5xl font-black text-white">{average1RM}</span>
            <span className="text-sm font-bold text-cyan-300">kg</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-5">
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Epley:</span>
            <span className="font-black text-slate-200">{calcEpley} kg</span>
          </div>
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Brzycki:</span>
            <span className="font-black text-slate-200">{calcBrzycki} kg</span>
          </div>
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Lander:</span>
            <span className="font-black text-slate-200">{calcLander} kg</span>
          </div>
        </div>
      </div>

      {/* Training Percentages Bento Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 block">Tabla de Porcentajes de Carga para Programación:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {percentages.map((item) => {
            const targetWeight = Math.round((average1RM * (item.percent / 100)) * 2) / 2;
            return (
              <div
                key={item.percent}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-cyan-400 text-sm">{item.percent}%</span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                    {item.reps}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 leading-tight">{item.desc}</span>
                <div className="pt-1.5 border-t border-slate-800/80 flex items-baseline justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold">Carga:</span>
                  <div>
                    <span className="text-base font-black text-white">{targetWeight}</span>
                    <span className="text-[10px] text-slate-400 ml-0.5">kg</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
