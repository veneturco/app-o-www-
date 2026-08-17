import React from 'react';

interface HidroFitProLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const HidroFitProLogo: React.FC<HidroFitProLogoProps> = ({
  size = 'md',
  showText = true
}) => {
  // Dimensiones según el tamaño
  const dimensions = {
    sm: { icon: 'w-9 h-9', bottle: 'w-4.5 h-6.5', text: 'text-lg', subtext: 'text-[8px]' },
    md: { icon: 'w-11 h-11', bottle: 'w-5.5 h-8', text: 'text-xl', subtext: 'text-[9px]' },
    lg: { icon: 'w-16 h-16', bottle: 'w-8 h-12', text: 'text-2xl', subtext: 'text-[11px]' }
  }[size];

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* ================= ICONO SQUIRCLE CYBERPUNK (Exacto a la imagen) ================= */}
      <div className={`relative ${dimensions.icon} rounded-2xl bg-[#070e1b] border-2 border-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_18px_rgba(6,182,212,0.6),inset_0_0_12px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] overflow-hidden shrink-0`}>
        
        {/* Nodos de circuito y partículas holográficas de fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.8px,transparent_0.8px)] [background-size:6px_6px] opacity-25 pointer-events-none"></div>
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-cyan-400/20 rounded-full blur-xs pointer-events-none"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500/20 rounded-full blur-xs pointer-events-none"></div>

        {/* ================= SILUETA DE LA BOTELLA INTELIGENTE ================= */}
        <div className={`relative ${dimensions.bottle} flex flex-col items-center justify-end z-10`}>
          {/* Tapa deportiva H2O */}
          <div className="w-[50%] h-1.5 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 rounded-t-xs border-x border-t border-cyan-200 shadow-xs flex items-center justify-center z-20">
            <span className="text-[4px] font-black text-slate-950 leading-none font-mono">H2O</span>
          </div>
          <div className="w-[35%] h-0.5 bg-slate-900 border-x border-cyan-400/60 z-20"></div>

          {/* Cuerpo de vidrio contorneado con oleaje y chip */}
          <div className="w-full h-[80%] bg-slate-950/90 border border-cyan-300/80 rounded-b-md rounded-t-xs relative overflow-hidden flex flex-col justify-end shadow-[inset_0_0_6px_rgba(6,182,212,0.5)]">
            
            {/* Líquido interno en movimiento */}
            <div className="w-full h-[68%] bg-gradient-to-t from-blue-600 via-cyan-500 to-sky-400 relative">
              {/* Cresta de ola */}
              <div className="absolute -top-1 left-0 right-0 h-1.5 overflow-hidden">
                <svg className="w-[200%] h-full animate-wave-1 opacity-90" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,60 C200,10 400,100 600,60 C800,10 1000,100 1200,60 L1200,120 L0,120 Z" fill="#7dd3fc" />
                </svg>
              </div>
            </div>

            {/* Microchip AI Integrado */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-2.5 h-2.5 bg-slate-950 border border-cyan-300 rounded-[1.5px] flex items-center justify-center shadow-[0_0_5px_rgba(6,182,212,0.9)]">
                <span className="text-[4px] font-black text-cyan-200 font-mono tracking-tighter">AI</span>
              </div>
            </div>

            {/* Reflejo de cristal */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none z-30"></div>
          </div>

          {/* Anillo de telemetría sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-2.5 border border-cyan-400/40 rounded-full rotate-[-15deg] pointer-events-none"></div>
        </div>
      </div>

      {/* ================= TIPOGRAFÍA OFICIAL DE MARCA ================= */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 font-black tracking-tight leading-none">
            {/* HIDRO en Cyan Eléctrico */}
            <span className={`text-cyan-400 font-black tracking-tight ${dimensions.text} drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]`}>
              HIDRO
            </span>

            {/* FIT en Amarillo Ámbar / Oro */}
            <span className={`text-amber-400 font-black tracking-tight ${dimensions.text} drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]`}>
              FIT
            </span>

            {/* PRO en Blanco Nieve */}
            <span className={`text-white font-black tracking-tight ${dimensions.text}`}>
              PRO
            </span>
          </div>

          {/* Subtítulo de Rendimiento */}
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className={`text-cyan-400/80 font-mono font-bold uppercase tracking-widest ${dimensions.subtext}`}>
              HYDRATION PERFORMANCE
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-400/80"></span>
            <span className={`text-slate-400 font-mono font-semibold uppercase tracking-wider ${dimensions.subtext} hidden sm:inline`}>
              BIOMECÁNICA
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
