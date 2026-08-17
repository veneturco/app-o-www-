import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Exercise } from '../types';
import { getExerciseVideo } from '../utils/exerciseVideos';
import { Stylized3DAvatarViewer } from './Stylized3DAvatarViewer';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Film,
  Sparkles,
  Volume2,
  VolumeX,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight,
  Maximize,
  Clock,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface NikeVideoPlayerProps {
  exercise: Exercise;
  gender: 'male' | 'female';
}

type ModeTab = 'video' | 'avatar3d' | 'motion' | 'coaching';

export const NikeVideoPlayer: React.FC<NikeVideoPlayerProps> = ({
  exercise,
  gender
}) => {
  const [activeMode, setActiveMode] = useState<ModeTab>('video');
  const [isPlayingMotion, setIsPlayingMotion] = useState<boolean>(true);
  const [motionFrame, setMotionFrame] = useState<0 | 1>(0);
  const [motionSpeed, setMotionSpeed] = useState<number>(1.2); // seconds
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  // Retrieve verified YouTube tutorial data
  const videoData = getExerciseVideo(exercise.id, exercise.name, exercise.muscle);

  // High-res real human athlete images
  const frame0 = exercise.imgMale || "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press/0.jpg";
  const frame1 = exercise.imgFemale || "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press/1.jpg";

  // Seamless real athlete loop
  useEffect(() => {
    if (!isPlayingMotion || activeMode !== 'motion') return;

    const interval = setInterval(() => {
      setMotionFrame(prev => (prev === 0 ? 1 : 0));
    }, motionSpeed * 1000);

    return () => clearInterval(interval);
  }, [isPlayingMotion, motionSpeed, activeMode]);

  // Voice narration coach (Web Speech API)
  const handleVoiceCoach = () => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const script = exercise.coachExplanation || 
      `Ejercicio: ${exercise.name}. Músculo principal: ${exercise.muscle}. ` +
      `Paso uno: ${exercise.executionSteps?.[0]?.description || 'Colócate en posición inicial con la espalda recta.'} ` +
      `Paso dos: ${exercise.executionSteps?.[1]?.description || 'Realiza el movimiento con control sintiendo la tensión muscular.'} ` +
      `Consejo clave de respiración: ${exercise.tips?.[0] || 'Inhala al bajar y exhala con potencia al empujar.'}`;

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${videoData.youtubeId}`;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoData.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${videoData.youtubeId}&playsinline=1&controls=1&rel=0&modestbranding=1`;

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#070A14] relative overflow-hidden rounded-2xl select-none border border-slate-800 shadow-2xl text-white">
      
      {/* ========================================================================= */}
      {/* TOP BAR CONTROLS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 z-20">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-slate-800 text-xs">
          
          <button
            onClick={() => setActiveMode('video')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeMode === 'video'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-rose-600/30 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Vídeo Pro (HD)</span>
          </button>

          <button
            onClick={() => setActiveMode('avatar3d')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeMode === 'avatar3d'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Avatar 3D Pro</span>
          </button>

          <button
            onClick={() => setActiveMode('motion')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeMode === 'motion'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Atleta Real</span>
          </button>

          <button
            onClick={() => setActiveMode('coaching')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeMode === 'coaching'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Guía Maestro</span>
          </button>
        </div>

        {/* Audio Coach Voice narration button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceCoach}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-cyan-300 hover:bg-slate-800'
            }`}
            title="Escuchar al Entrenador Nike narrar la técnica"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Pausar Voz</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Explicación por Voz</span>
                <span className="sm:hidden">Voz</span>
              </>
            )}
          </button>

          {activeMode === 'video' && (
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold transition cursor-pointer"
              title="Abrir tutorial completo en YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Abrir en YouTube</span>
            </a>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT */}
      {/* ========================================================================= */}
      <div className="w-full flex-1 relative flex items-center justify-center min-h-[300px] max-h-[440px] bg-black overflow-hidden">
        
        {/* 1. YOUTUBE HD EMBED WITH DIRECT FALLBACK */}
        {activeMode === 'video' && (
          <div className="w-full h-full relative flex items-center justify-center bg-black">
            <iframe
              src={youtubeEmbedUrl}
              title={`Tutorial HD: ${videoData.title}`}
              className="w-full h-full aspect-video border-0 max-h-[420px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Floating Top Banner info */}
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] text-slate-200 flex items-center space-x-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold">{videoData.channel}:</span>
              <span className="truncate max-w-[200px] text-slate-300">{videoData.title}</span>
            </div>

            {/* Quick action floating button if iframe is blocked by some adblockers */}
            <div className="absolute bottom-2 right-2 flex items-center space-x-2">
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/90 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 transition flex items-center space-x-1.5 shadow-2xl backdrop-blur-md"
              >
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                <span>Ver en 4K (YouTube)</span>
              </a>
            </div>
          </div>
        )}

        {/* 2. AVATAR 3D ESTILIZADO DE ALTA CALIDAD */}
        {activeMode === 'avatar3d' && (
          <div className="w-full h-full p-2 flex items-center justify-center">
            <Stylized3DAvatarViewer exercise={exercise} gender={gender} compact={false} />
          </div>
        )}

        {/* 3. ATLETA REAL EN BUCLE CINEMÁTICO (FOTO HD FASE 1 -> FASE 2) */}
        {activeMode === 'motion' && (
          <div className="w-full h-full relative flex flex-col items-center justify-center p-3">
            
            {/* Split comparison / Cinematic toggle */}
            <div className="relative w-full h-[250px] sm:h-[290px] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950 border border-slate-800">
              <img
                src={motionFrame === 0 ? frame0 : frame1}
                alt={exercise.name}
                className="w-full h-full object-contain p-2 transition-all duration-300 transform scale-100"
                referrerPolicy="no-referrer"
              />

              {/* Status Badge overlay */}
              <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-xl flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${motionFrame === 0 ? 'bg-cyan-400' : 'bg-emerald-400'} animate-pulse`} />
                <span>
                  {motionFrame === 0 ? '1. Posición Inicial (Preparación)' : '2. Máxima Extensión / Contracción'}
                </span>
              </div>

              {/* Muscle badge overlay */}
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[11px] text-cyan-300 font-mono">
                {exercise.muscle}
              </div>
            </div>

            {/* Bottom Motion Playback Controls */}
            <div className="flex items-center justify-between w-full mt-2 px-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlayingMotion(prev => !prev)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition flex items-center space-x-1.5"
                >
                  {isPlayingMotion ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      <span>Pausar Bucle</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                      <span>Continuar Bucle</span>
                    </>
                  )}
                </button>

                <div className="flex space-x-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => { setIsPlayingMotion(false); setMotionFrame(0); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition ${
                      motionFrame === 0 && !isPlayingMotion ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Foto 1 (Inicio)
                  </button>
                  <button
                    onClick={() => { setIsPlayingMotion(false); setMotionFrame(1); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition ${
                      motionFrame === 1 && !isPlayingMotion ? 'bg-emerald-500 text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Foto 2 (Fin)
                  </button>
                </div>
              </div>

              <button
                onClick={() => setMotionSpeed(s => (s === 1.2 ? 0.7 : s === 0.7 ? 2.0 : 1.2))}
                className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 font-bold hover:text-white transition cursor-pointer"
              >
                {motionSpeed === 0.7 ? '⚡ Rápido' : motionSpeed === 2.0 ? '🐢 Lento' : '⏱️ Normal'}
              </button>
            </div>
          </div>
        )}

        {/* 4. GUÍA MAESTRO ESTILO NIKE COACH */}
        {activeMode === 'coaching' && (
          <div className="w-full h-full p-4 overflow-y-auto space-y-3 custom-scrollbar max-h-[340px]">
            <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 p-4 rounded-2xl border border-cyan-500/30">
              <div className="flex items-center space-x-2 text-cyan-400 font-black text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Instrucciones de Entrenador Profesional</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {exercise.shortDesc || `Dominio de la técnica en ${exercise.name} para máxima hipertrofia del ${exercise.muscle}.`}
              </p>
            </div>

            <div className="space-y-2">
              {exercise.executionSteps?.map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-3 rounded-2xl border transition cursor-pointer flex items-start space-x-3 ${
                    activeStepIdx === idx
                      ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/60'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    activeStepIdx === idx 
                      ? 'bg-cyan-500 text-black shadow-md' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <h5 className={`text-xs font-bold mb-0.5 ${activeStepIdx === idx ? 'text-cyan-300' : 'text-white'}`}>
                      {step.title}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM METRICS FOOTER */}
      {/* ========================================================================= */}
      <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-slate-500">Músculo:</span>
          <span className="font-bold text-cyan-400">{exercise.muscle}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-slate-400">Tempo: <strong className="text-white font-mono">{exercise.tempo}</strong></span>
          <span className="text-slate-400">Descanso: <strong className="text-amber-400 font-mono">{exercise.rest}s</strong></span>
        </div>
      </div>
    </div>
  );
};
