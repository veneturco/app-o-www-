import React, { useState } from 'react';
import { Dumbbell, Layers } from 'lucide-react';

export const PlateCalculator: React.FC = () => {
  const [targetWeight, setTargetWeight] = useState<number>(100);
  const [barWeight, setBarWeight] = useState<number>(20); // 20kg standard olympic bar

  const availablePlates = [
    { weight: 25, color: 'bg-red-600 border-red-400 text-white', label: '25 kg' },
    { weight: 20, color: 'bg-blue-600 border-blue-400 text-white', label: '20 kg' },
    { weight: 15, color: 'bg-yellow-500 border-yellow-300 text-black', label: '15 kg' },
    { weight: 10, color: 'bg-emerald-600 border-emerald-400 text-white', label: '10 kg' },
    { weight: 5, color: 'bg-white border-slate-300 text-black', label: '5 kg' },
    { weight: 2.5, color: 'bg-slate-700 border-slate-500 text-white', label: '2.5 kg' },
    { weight: 1.25, color: 'bg-zinc-800 border-zinc-600 text-cyan-300', label: '1.25 kg' }
  ];

  // Calculate plates per side
  const weightPerSideNeeded = Math.max(0, (targetWeight - barWeight) / 2);
  let remaining = weightPerSideNeeded;
  const platesPerSide: { weight: number; count: number; color: string; label: string }[] = [];

  availablePlates.forEach((plate) => {
    if (remaining >= plate.weight) {
      const count = Math.floor(remaining / plate.weight);
      platesPerSide.push({
        weight: plate.weight,
        count,
        color: plate.color,
        label: plate.label
      });
      remaining = Math.round((remaining - count * plate.weight) * 100) / 100;
    }
  });

  const actualTotalWeight = barWeight + (weightPerSideNeeded - remaining) * 2;

  return (
    <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Title */}
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Calculadora de Discos de Barra</h3>
          <p className="text-[11px] text-slate-400">Distribución exacta de discos por lado para barra olímpica</p>
        </div>
      </div>

      {/* Target input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div>
          <label className="text-[11px] font-bold text-slate-400 block mb-1.5">Peso Total Objetivo (kg)</label>
          <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden shadow-inner">
            <button
              onClick={() => setTargetWeight(prev => Math.max(barWeight, prev - 5))}
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              -5
            </button>
            <input
              type="number"
              min={barWeight}
              step="2.5"
              value={targetWeight}
              onChange={(e) => setTargetWeight(parseFloat(e.target.value) || barWeight)}
              className="w-full text-center bg-transparent text-sm font-black text-white focus:outline-none"
            />
            <button
              onClick={() => setTargetWeight(prev => prev + 5)}
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              +5
            </button>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-400 block mb-1.5">Peso de la Barra</label>
          <select
            value={barWeight}
            onChange={(e) => setBarWeight(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-3 text-xs font-bold text-white focus:outline-none"
          >
            <option value={20}>Barra Olímpica Estándar (20 kg)</option>
            <option value={15}>Barra Femenina / Técnica (15 kg)</option>
            <option value={10}>Barra Z / Corta (10 kg)</option>
            <option value={0}>Sin Barra (Máquina Smith compensada)</option>
          </select>
        </div>
      </div>

      {/* Visual Barbell Graphic Bento Cell */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center space-y-3 shadow-inner">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
          Cargar por Cada Lado: <b className="text-cyan-400 font-black">{weightPerSideNeeded} kg</b>
        </span>

        {/* SVG representation of Bar & Plates */}
        <div className="w-full overflow-x-auto py-2 flex justify-center custom-scrollbar">
          <div className="flex items-center space-x-1 min-w-[280px]">
            {/* Left Collar */}
            <div className="w-4 h-12 bg-slate-400 rounded-l"></div>
            {/* Plates (Left Side preview) */}
            <div className="flex items-center space-x-1 flex-row-reverse">
              {platesPerSide.flatMap((p) =>
                Array.from({ length: p.count }).map((_, i) => (
                  <div
                    key={`left-${p.weight}-${i}`}
                    className={`h-16 w-3.5 rounded-sm border ${p.color} flex items-center justify-center text-[8px] font-black shadow-sm`}
                    title={`${p.weight}kg`}
                  />
                ))
              )}
            </div>

            {/* Central Barbell Shaft */}
            <div className="h-4 flex-1 min-w-20 bg-gradient-to-r from-slate-600 via-slate-300 to-slate-600 rounded-sm flex items-center justify-center shadow-inner">
              <span className="text-[9px] font-black text-black uppercase tracking-wider">{barWeight}kg Bar</span>
            </div>

            {/* Plates (Right Side preview) */}
            <div className="flex items-center space-x-1">
              {platesPerSide.flatMap((p) =>
                Array.from({ length: p.count }).map((_, i) => (
                  <div
                    key={`right-${p.weight}-${i}`}
                    className={`h-16 w-3.5 rounded-sm border ${p.color} flex items-center justify-center text-[8px] font-black shadow-sm`}
                    title={`${p.weight}kg`}
                  />
                ))
              )}
            </div>
            {/* Right Collar */}
            <div className="w-4 h-12 bg-slate-400 rounded-r"></div>
          </div>
        </div>

        {remaining > 0 && (
          <p className="text-[11px] text-amber-400 font-semibold">
            ⚠️ Quedan {remaining * 2} kg restantes no divisibles con los discos estándar.
          </p>
        )}
      </div>

      {/* Disks List Breakdown Bento Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 block">Lista de Discos (por extremo):</span>
        {platesPerSide.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {platesPerSide.map((plate) => (
              <div
                key={plate.weight}
                className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl flex items-center justify-between text-xs hover:border-slate-700 transition"
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-3.5 h-3.5 rounded-full border ${plate.color} inline-block shadow-sm`} />
                  <span className="font-bold text-slate-200">{plate.label}</span>
                </div>
                <span className="font-black text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-lg border border-cyan-500/20 text-xs">
                  x{plate.count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic bg-slate-900/50 p-3 rounded-2xl text-center border border-slate-800">
            Solo la barra ({barWeight} kg), sin discos adicionales.
          </p>
        )}
      </div>
    </div>
  );
};
