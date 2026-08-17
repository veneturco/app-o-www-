import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Exercise } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Columns, 
  Activity, 
  Sparkles,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface AnimatedExerciseCanvasProps {
  exercise: Exercise;
  gender: 'male' | 'female';
}

type MainViewTab = 'animacion' | 'fotos' | 'pasos';

export const AnimatedExerciseCanvas: React.FC<AnimatedExerciseCanvasProps> = ({
  exercise,
  gender
}) => {
  const [activeTab, setActiveTab] = useState<MainViewTab>('animacion');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [photoFrame, setPhotoFrame] = useState<0 | 1>(0);

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Loop duration in seconds based on speed
  const cycleDuration = Math.max(1.2, 2.8 / speed);

  // Smooth continuous animation loop (0 to 1 and back to 0)
  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (progress * cycleDuration * 1000);

    const animate = () => {
      const elapsed = ((Date.now() - startTimeRef.current) / 1000) % cycleDuration;
      const linearProgress = elapsed / cycleDuration;
      
      // Ping-pong ease curve: 0 -> 1 -> 0
      const sinProgress = (Math.sin(linearProgress * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      setProgress(sinProgress);

      // Also toggle photoFrame for the photos tab
      if (linearProgress < 0.5) {
        setPhotoFrame(0);
      } else {
        setPhotoFrame(1);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, cycleDuration]);

  // Color constants
  const muscleColor = '#06B6D4'; // Cyan neon
  const muscleGlow = 'rgba(6, 182, 212, 0.4)';
  const secondaryColor = '#F59E0B'; // Amber stabilizer
  const plateColor = '#EF4444'; // Competition Red

  // Calculate phase based on progress
  const isDescending = progress > 0.5;
  const phaseText = progress < 0.2 
    ? '1. Posición Inicial (Preparación)' 
    : progress > 0.8 
    ? '2. Máxima Contracción / Extensión' 
    : isDescending 
    ? 'Bajando con control (Fase Excéntrica)' 
    : 'Empujando con fuerza (Fase Concéntrica)';

  // Render Illustrated Animated Character for each exercise type
  const renderAnimatedExercise = () => {
    const id = exercise.id;
    const type = exercise.svgGraphicType || 'press';

    // 1. SQUAT / SENTADILLA / PRENSA / HACK SQUAT / EXTENSIONES
    if (id.includes('sentadilla') || id.includes('prensa') || id.includes('pierna') || id.includes('cuadriceps') || type === 'squat' || type === 'extension') {
      const dropY = progress * 40;
      const kneeX = 200 + (progress * 22);
      const kneeY = 160 + (progress * 8);
      const hipX = 185 - (progress * 20);
      const hipY = 125 + (progress * 38);

      return (
        <svg viewBox="0 0 400 240" className="w-full h-full max-h-[300px]">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Floor */}
          <line x1="60" y1="210" x2="340" y2="210" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          
          {/* Vertical Bar Path Guide */}
          <line x1="185" y1="40" x2="185" y2="100" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          
          {/* Head */}
          <circle cx="185" cy={55 + dropY} r="14" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />

          {/* Torso */}
          <line x1="185" y1={69 + dropY} x2={hipX} y2={hipY} stroke="#F1F5F9" strokeWidth="18" strokeLinecap="round" />
          
          {/* Active Glutes & Core Highlight */}
          <circle cx={hipX} cy={hipY} r="14" fill={muscleColor} opacity={0.8} filter="url(#glow)" />

          {/* Thigh / Cuádriceps (Agonist Muscle) */}
          <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke={muscleColor} strokeWidth="14" strokeLinecap="round" filter="url(#glow)" />
          
          {/* Lower Leg / Tibia */}
          <line x1={kneeX} y1={kneeY} x2="185" y2="210" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />

          {/* Knee joint */}
          <circle cx={kneeX} cy={kneeY} r="6" fill="#00FF66" />
          
          {/* Olympic Barbell with Red Plates on shoulders */}
          <g transform={`translate(185, ${62 + dropY})`}>
            <line x1="-55" y1="0" x2="55" y2="0" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
            <rect x="-58" y="-16" width="8" height="32" rx="2" fill={plateColor} stroke="#FFF" strokeWidth="1" />
            <rect x="50" y="-16" width="8" height="32" rx="2" fill={plateColor} stroke="#FFF" strokeWidth="1" />
          </g>

          {/* Angle Callout Badge */}
          <g transform={`translate(${kneeX + 25}, ${kneeY - 10})`}>
            <rect x="-24" y="-12" width="48" height="20" rx="4" fill="#090D16" stroke="#00FF66" strokeWidth="1" />
            <text x="0" y="2" fill="#00FF66" fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
              {Math.round(175 - progress * 85)}°
            </text>
          </g>
        </svg>
      );
    }

    // 2. BENCH PRESS / PRESS MILITAR / DIPS / EMPUJES
    if (id.includes('press') || id.includes('militar') || id.includes('pecho') || type === 'press') {
      const isIncline = id.includes('inclinado') || id.includes('militar');
      const barY = isIncline ? 75 + (progress * 42) : 95 + (progress * 45);
      const elbowY = isIncline ? 100 + (progress * 35) : 125 + (progress * 30);

      return (
        <svg viewBox="0 0 400 240" className="w-full h-full max-h-[300px]">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Bench */}
          {isIncline ? (
            <line x1="120" y1="180" x2="260" y2="100" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
          ) : (
            <line x1="100" y1="155" x2="300" y2="155" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
          )}

          {/* Athlete Body on Bench */}
          <circle cx="250" cy={isIncline ? 90 : 145} r="14" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
          <line x1="240" y1={isIncline ? 102 : 148} x2="160" y2={isIncline ? 150 : 150} stroke="#F1F5F9" strokeWidth="20" strokeLinecap="round" />

          {/* Pectoral Muscle Glowing */}
          <circle cx="215" cy={isIncline ? 115 : 142} r="16" fill={muscleColor} opacity={0.85} filter="url(#glow)" />

          {/* Arms: Shoulder -> Elbow -> Hands */}
          <line x1="225" y1={isIncline ? 108 : 144} x2="200" y2={elbowY} stroke="#94A3B8" strokeWidth="10" strokeLinecap="round" />
          <line x1="200" y1={elbowY} x2="200" y2={barY} stroke={muscleColor} strokeWidth="8" strokeLinecap="round" filter="url(#glow)" />
          
          <circle cx="200" cy={elbowY} r="5" fill="#00FF66" />

          {/* Barbell / Dumbbell */}
          <g transform={`translate(200, ${barY})`}>
            <line x1="-65" y1="0" x2="65" y2="0" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
            <rect x="-70" y="-16" width="8" height="32" rx="2" fill={plateColor} stroke="#FFF" strokeWidth="1" />
            <rect x="62" y="-16" width="8" height="32" rx="2" fill={plateColor} stroke="#FFF" strokeWidth="1" />
          </g>

          <g transform={`translate(240, ${barY})`}>
            <rect x="-24" y="-10" width="48" height="20" rx="4" fill="#090D16" stroke="#00FF66" strokeWidth="1" />
            <text x="0" y="4" fill="#00FF66" fontSize="10" fontWeight="bold" textAnchor="middle">
              {Math.round(165 - progress * 80)}°
            </text>
          </g>
        </svg>
      );
    }

    // 3. DEADLIFT / RDL / HIP HINGE / FEMORAL
    if (id.includes('muerto') || id.includes('rdl') || id.includes('femorales') || type === 'rdl') {
      const hinge = progress * 48; // 0 to 48 degrees
      const barY = 120 + (progress * 60);
      const hipX = 195 - (progress * 26);

      return (
        <svg viewBox="0 0 400 240" className="w-full h-full max-h-[300px]">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Floor */}
          <line x1="60" y1="210" x2="340" y2="210" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

          {/* Legs */}
          <line x1="210" y1="210" x2="200" y2="175" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />
          <line x1="200" y1="175" x2={hipX} y2="140" stroke={muscleColor} strokeWidth="14" strokeLinecap="round" filter="url(#glow)" />

          {/* Torso pivoting on hips */}
          <g transform={`translate(${hipX}, 140) rotate(${hinge} 0 0)`}>
            <line x1="0" y1="0" x2="45" y2="-60" stroke="#F1F5F9" strokeWidth="18" strokeLinecap="round" />
            <circle cx="52" cy="-72" r="14" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
            
            {/* Erector Spinae & Glute Glow */}
            <line x1="5" y1="-5" x2="40" y2="-50" stroke={secondaryColor} strokeWidth="8" strokeLinecap="round" filter="url(#glow)" />

            {/* Hanging Arms */}
            <line x1="38" y1="-45" x2="38" y2="25" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
            <circle cx="38" cy="25" r="12" fill={plateColor} stroke="#FFF" strokeWidth="1.5" />
          </g>

          <g transform={`translate(${hipX - 30}, 130)`}>
            <rect x="-24" y="-10" width="48" height="20" rx="4" fill="#090D16" stroke="#00FF66" strokeWidth="1" />
            <text x="0" y="4" fill="#00FF66" fontSize="10" fontWeight="bold" textAnchor="middle">
              {Math.round(180 - progress * 90)}°
            </text>
          </g>
        </svg>
      );
    }

    // 4. LAT PULLDOWN / DOMINADAS / REMOS (ESPALDA)
    if (id.includes('jalon') || id.includes('dominadas') || id.includes('remo') || id.includes('espalda') || type === 'pull' || type === 'row') {
      const pullY = 45 + (progress * 48);

      return (
        <svg viewBox="0 0 400 240" className="w-full h-full max-h-[300px]">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Pulley Cable Top */}
          <rect x="180" y="10" width="40" height="15" rx="3" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
          <line x1="200" y1="18" x2="200" y2={pullY} stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 2" />

          {/* Seat & Athlete */}
          <line x1="150" y1="175" x2="250" y2="175" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
          <circle cx="200" cy="115" r="14" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
          <line x1="200" y1="125" x2="196" y2="170" stroke="#F1F5F9" strokeWidth="20" strokeLinecap="round" />

          {/* Glowing Lats (V-Taper) */}
          <g transform="translate(200, 142)">
            <path d="M -16 -12 Q 0 -5 16 -12 L 14 18 L -14 18 Z" fill={muscleColor} opacity={0.85} filter="url(#glow)" />
          </g>

          {/* Lat Barbell */}
          <g transform={`translate(200, ${pullY})`}>
            <path d="M -85 -3 Q 0 5 85 -3" fill="none" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
            <line x1="-75" y1="-2" x2="-18" y2={125 - pullY} stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
            <line x1="75" y1="-2" x2="18" y2={125 - pullY} stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
            <circle cx="-75" cy="-2" r="5" fill="#00FF66" />
            <circle cx="75" cy="-2" r="5" fill="#00FF66" />
          </g>
        </svg>
      );
    }

    // 5. ARMS (BICEPS CURL & TRICEPS)
    if (id.includes('curl') || id.includes('triceps') || id.includes('biceps') || type === 'curl') {
      const isBiceps = id.includes('curl') || id.includes('biceps');
      const armRot = isBiceps ? (-15 - (progress * 95)) : (65 - (progress * 90));

      return (
        <svg viewBox="0 0 400 240" className="w-full h-full max-h-[300px]">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Floor & Body */}
          <line x1="60" y1="210" x2="340" y2="210" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <circle cx="175" cy="65" r="14" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
          <line x1="175" y1="78" x2="172" y2="155" stroke="#F1F5F9" strokeWidth="18" strokeLinecap="round" />
          <line x1="172" y1="155" x2="170" y2="210" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />

          {/* Upper Arm (Humerus) */}
          <line x1="175" y1="88" x2="175" y2="135" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />
          
          {/* Glowing Biceps Peak */}
          <ellipse cx="170" cy="110" rx="8" ry="14" fill={muscleColor} opacity={0.9} filter="url(#glow)" />

          {/* Forearm & Dumbbell rotating */}
          <circle cx="175" cy="135" r="6" fill="#00FF66" />
          <g transform={`translate(175, 135) rotate(${armRot})`}>
            <line x1="0" y1="0" x2="0" y2="45" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
            <circle cx="0" cy="45" r="10" fill={plateColor} stroke="#FFF" strokeWidth="1.5" />
          </g>

          <g transform="translate(240, 130)">
            <rect x="-24" y="-10" width="48" height="20" rx="4" fill="#090D16" stroke="#00FF66" strokeWidth="1" />
            <text x="0" y="4" fill="#00FF66" fontSize="10" fontWeight="bold" textAnchor="middle">
              {Math.round(165 - progress * 110)}°
            </text>
          </g>
        </svg>
      );
    }

    // 6. DEFAULT GENERAL EXERCISE
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full max-h-[300px]">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Floor */}
        <line x1="60" y1="210" x2="340" y2="210" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        
        {/* Athletic Figure */}
        <circle cx="200" cy="65" r="14" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
        <line x1="200" y1="78" x2="198" y2="155" stroke="#F1F5F9" strokeWidth="20" strokeLinecap="round" />
        <line x1="198" y1="155" x2="185" y2="210" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />
        <line x1="198" y1="155" x2="215" y2="210" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />

        {/* Highlight target zone */}
        <circle cx="200" cy="110" r="18" fill={muscleColor} opacity={0.85} filter="url(#glow)" />

        <line x1="185" y1="95" x2={160 - (progress * 25)} y2={120 + (progress * 20)} stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
        <line x1="215" y1="95" x2={240 + (progress * 25)} y2={120 + (progress * 20)} stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#070A14] relative overflow-hidden rounded-2xl select-none border border-slate-800 shadow-2xl">
      
      {/* ========================================================================= */}
      {/* TOP HEADER CONTROLS: 3 Main Tabs (Animación 3D, Fotos Reales, Paso a Paso) */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950/80 border-b border-slate-800/80 z-20">
        
        {/* Main Tabs */}
        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('animacion')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'animacion'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Animación 3D</span>
          </button>

          <button
            onClick={() => setActiveTab('fotos')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'fotos'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Fotos Reales</span>
          </button>

          <button
            onClick={() => setActiveTab('pasos')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'pasos'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Paso a Paso</span>
          </button>
        </div>

        {/* Animation Play/Pause & Speed (Visible in Animation Mode) */}
        {activeTab === 'animacion' && (
          <div className="flex items-center space-x-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setIsPlaying(prev => !prev)}
              className="p-1 rounded-lg hover:bg-slate-800 text-white cursor-pointer transition flex items-center space-x-1"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span className="text-[10px] text-slate-300 font-bold hidden sm:inline">Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                  <span className="text-[10px] text-slate-300 font-bold hidden sm:inline">Play</span>
                </>
              )}
            </button>

            <button
              onClick={() => setSpeed(s => (s === 1 ? 0.5 : s === 0.5 ? 1.5 : 1))}
              className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-slate-800 text-cyan-300 hover:text-white transition cursor-pointer"
            >
              {speed}x
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MAIN VISUAL SHOWCASE */}
      {/* ========================================================================= */}
      <div className="w-full flex-1 flex items-center justify-center p-2 min-h-[220px]">
        
        {/* TAB 1: ANIMACIÓN 3D CONTINUA */}
        {activeTab === 'animacion' && (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {renderAnimatedExercise()}
            
            {/* Status indicator floating */}
            <div className="absolute top-2 left-3 bg-slate-950/90 border border-slate-800/90 rounded-xl px-3 py-1.5 text-xs font-bold text-white flex items-center space-x-2 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>{phaseText}</span>
            </div>
          </div>
        )}

        {/* TAB 2: FOTOS REALES (INICIO Y FIN) */}
        {activeTab === 'fotos' && (
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-3 p-2">
            <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-2 flex flex-col items-center justify-center">
              <div className="absolute top-3 left-3 bg-cyan-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-lg shadow">
                1. POSICIÓN INICIAL
              </div>
              <img
                src={exercise.imgMale}
                alt={`${exercise.name} - Inicio`}
                className="w-full h-full object-contain max-h-[220px] rounded-xl"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-2 flex flex-col items-center justify-center">
              <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-lg shadow">
                2. MÁXIMA EXTENSIÓN
              </div>
              <img
                src={exercise.imgFemale}
                alt={`${exercise.name} - Fin`}
                className="w-full h-full object-contain max-h-[220px] rounded-xl"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* TAB 3: PASO A PASO EN TEXTO GRANDE */}
        {activeTab === 'pasos' && (
          <div className="w-full h-full p-4 overflow-y-auto space-y-3 custom-scrollbar">
            {exercise.executionSteps?.map((step, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white mb-0.5">{step.title}</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM FOOTER: Resumen Claro del Ejercicio */}
      {/* ========================================================================= */}
      <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-slate-500">Músculo Principal:</span>
          <span className="font-bold text-cyan-400">{exercise.muscle}</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-400">
          <span>⏱️ Tempo:</span>
          <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
            {exercise.tempo}
          </span>
        </div>
      </div>
    </div>
  );
};
