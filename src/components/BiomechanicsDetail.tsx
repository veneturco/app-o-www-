import React from 'react';
import { Exercise } from '../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, Info, Zap, Settings, Activity } from 'lucide-react';

interface BiomechanicsDetailProps {
  exercise: Exercise;
}

export const BiomechanicsDetail: React.FC<BiomechanicsDetailProps> = ({ exercise }) => {
  return (
    <div className="space-y-4">
      {/* Biomechanical Target & Tempo Box */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Ficha Biomecánica & Prescripción</h3>
            <p className="text-[11px] text-slate-400">Parámetros de hipertrofia y tensión mecánica óptima</p>
          </div>
        </div>

        {/* 3 Metric Bento Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Rango Óptimo de Reps</span>
            <p className="text-xl font-black text-cyan-400">{exercise.repRange}</p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Intensidad Sugerida</span>
            <p className="text-xl font-black text-amber-400">{exercise.rpeRecommendation}</p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Tempo de Ejecución</span>
            <p className="text-xl font-black text-emerald-400">{exercise.tempoAdvice}</p>
          </div>
        </div>

        {/* Biomechanics Pro Tips Bento Block */}
        <div className="bg-gradient-to-r from-cyan-950/30 via-slate-900/90 to-blue-950/30 border border-cyan-500/30 rounded-2xl p-4 space-y-2.5 shadow-inner">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Claves Biomecánicas de Élite</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {exercise.biomechanicsTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2.5">
                <span className="text-cyan-400 font-black mt-0.5">•</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Common Mistakes & Fixes Bento Card */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Errores Comunes vs Corrección</h3>
            <p className="text-[11px] text-slate-400">Prevé lesiones y maximiza el reclutamiento muscular</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-1">
          {exercise.commonMistakes.map((mistake, index) => {
            const dangerColor =
              mistake.dangerLevel === 'Alto'
                ? 'border-red-500/40 bg-red-950/30 text-red-400'
                : mistake.dangerLevel === 'Medio'
                ? 'border-amber-500/40 bg-amber-950/30 text-amber-400'
                : 'border-blue-500/40 bg-blue-950/30 text-blue-400';

            return (
              <div key={index} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                {/* Mistake */}
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 flex-shrink-0 mt-0.5 border border-red-500/20">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-red-300 uppercase tracking-wider">Error Frecuente</span>
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${dangerColor}`}>
                        Riesgo {mistake.dangerLevel}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 mt-1">{mistake.mistake}</p>
                  </div>
                </div>

                {/* Fix */}
                <div className="flex items-start space-x-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0 mt-0.5 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Solución Técnica</span>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{mistake.fix}</p>
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
