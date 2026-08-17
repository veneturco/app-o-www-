import React, { useState, useMemo, memo } from 'react';
import { useAnimationFrame } from 'motion/react';
import { Exercise } from '../types';
import { 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Play, 
  Pause,
  Wind,
  Radio
} from 'lucide-react';

interface Stylized3DAvatarViewerProps {
  exercise: Exercise;
  gender?: 'male' | 'female';
  compact?: boolean;
}

type ViewAngle = 'isometric' | 'side' | 'front';
type RenderSkin = 'cyber' | 'xray' | 'neon';
type VisualLayer = 'muscles' | 'skeleton' | 'vectors' | 'all';

// =========================================================================
// 1. TOP TOOLBAR MEMOIZED COMPONENT (Protected against 60FPS phase renders)
// =========================================================================
interface TopToolbarProps {
  muscle: string;
  viewAngle: ViewAngle;
  setViewAngle: (angle: ViewAngle) => void;
  renderSkin: RenderSkin;
  setRenderSkin: (skin: RenderSkin | ((prev: RenderSkin) => RenderSkin)) => void;
  currentGender: 'male' | 'female';
  setCurrentGender: (gender: 'male' | 'female' | ((prev: 'male' | 'female') => 'male' | 'female')) => void;
}

export const TopToolbar = memo(({
  muscle,
  viewAngle,
  setViewAngle,
  renderSkin,
  setRenderSkin,
  currentGender,
  setCurrentGender
}: TopToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 z-10 w-full mb-2">
      {/* Title & Muscle Badge */}
      <div className="flex items-center space-x-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-xl flex items-center space-x-1.5 shadow-lg shadow-cyan-950/50">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
          <span>Avatar 3D Pro</span>
        </span>
        <span className="text-xs font-mono text-slate-300 font-bold bg-slate-900/90 px-2.5 py-1 rounded-xl border border-slate-800">
          {muscle}
        </span>
      </div>

      {/* 3D Perspective Angles Selector & Render Theme */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* View Angle Selector */}
        <div className="flex items-center space-x-0.5 bg-slate-900/90 p-0.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewAngle('isometric')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              viewAngle === 'isometric' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Perspectiva Isométrica 3D"
          >
            3D Isométrica
          </button>
          <button
            onClick={() => setViewAngle('side')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              viewAngle === 'side' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Perfil / Lateral"
          >
            Lateral
          </button>
          <button
            onClick={() => setViewAngle('front')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              viewAngle === 'front' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Frontal"
          >
            Frontal
          </button>
        </div>

        {/* Skin Toggle (X-Ray / 3D Clay) */}
        <button
          onClick={() => setRenderSkin(prev => prev === 'cyber' ? 'xray' : 'cyber')}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center space-x-1 ${
            renderSkin === 'xray'
              ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-lg shadow-sky-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
          title="Alternar modo Rayos X / Arcilla Cibernética"
        >
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px]">{renderSkin === 'xray' ? 'Rayos X' : 'Arcilla 3D'}</span>
        </button>

        {/* Gender Toggle */}
        <button
          onClick={() => setCurrentGender(prev => prev === 'male' ? 'female' : 'male')}
          className={`px-2 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
            currentGender === 'female' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
          }`}
          title="Cambiar complexión de avatar"
        >
          {currentGender === 'male' ? '♂ Masc.' : '♀ Fem.'}
        </button>
      </div>
    </div>
  );
});
TopToolbar.displayName = 'TopToolbar';

// =========================================================================
// 2. PLAYBACK CONTROLS MEMOIZED COMPONENT (Protected against 60FPS phase renders)
// =========================================================================
interface PlaybackControlsProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean | ((prev: boolean) => boolean)) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  tempo: string;
}

export const PlaybackControls = memo(({
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  tempo
}: PlaybackControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsPlaying(p => !p)}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" />
              <span>Reproducir 3D</span>
            </>
          )}
        </button>

        {/* Speed presets */}
        <div className="flex items-center space-x-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
          {[0.25, 0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                speed === s ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2 text-xs">
        <span className="text-slate-400 font-medium">Tempo:</span>
        <span className="font-mono text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
          {tempo}
        </span>
      </div>
    </div>
  );
});
PlaybackControls.displayName = 'PlaybackControls';

// =========================================================================
// 3. MAIN AVATAR COMPONENT
// =========================================================================
export const Stylized3DAvatarViewer: React.FC<Stylized3DAvatarViewerProps> = ({
  exercise,
  gender: initialGender = 'male',
  compact = false,
}) => {
  const [phase, setPhase] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [viewAngle, setViewAngle] = useState<ViewAngle>('isometric');
  const [renderSkin, setRenderSkin] = useState<RenderSkin>('cyber');
  const [visualLayer] = useState<VisualLayer>('all');
  const [currentGender, setCurrentGender] = useState<'male' | 'female'>(initialGender);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [showHudOverlays] = useState<boolean>(true);

  // Motor de animación V-Sync con Framer Motion (60FPS / 120FPS adaptativo)
  useAnimationFrame((_time, delta) => {
    if (!isPlaying || isScrubbing) return;
    
    // delta en ms con limitación de seguridad para evitar saltos tras pausar o cambiar de pestaña
    const clampedDelta = Math.min(delta, 64);
    const step = (clampedDelta * 0.072) * speed;

    setPhase((prevPhase) => {
      const next = prevPhase + step;
      return next >= 100 ? 0 : next;
    });
  });

  // Smooth sinusoidal motion curve (0 -> 1 -> 0)
  const progress = useMemo(() => {
    const norm = phase / 100;
    return Math.sin(norm * Math.PI);
  }, [phase]);

  // Movement classification
  const movementType = useMemo(() => {
    const id = (exercise.id || '').toLowerCase();
    const name = (exercise.name || '').toLowerCase();

    if (id.includes('squat') || id.includes('sentadilla') || id.includes('prensa') || id.includes('hack') || name.includes('sentadilla') || name.includes('prensa')) return 'squat';
    if (id.includes('banca') || id.includes('press_banca') || id.includes('flexiones') || name.includes('press banca') || name.includes('pecho')) return 'bench_press';
    if (id.includes('muerto') || id.includes('rdl') || id.includes('deadlift') || id.includes('hip_thrust') || name.includes('peso muerto')) return 'deadlift';
    if (id.includes('jalon') || id.includes('dominada') || id.includes('lat') || id.includes('pulldown') || name.includes('jalón') || name.includes('dominada')) return 'lat_pull';
    if (id.includes('remo') || id.includes('row') || name.includes('remo')) return 'row';
    if (id.includes('militar') || id.includes('hombro') || id.includes('overhead') || id.includes('lateral') || name.includes('militar') || name.includes('hombro')) return 'shoulder_press';
    if (id.includes('curl') || id.includes('biceps') || id.includes('bíceps') || name.includes('curl')) return 'bicep_curl';
    if (id.includes('triceps') || id.includes('tríceps') || id.includes('extension') || id.includes('frances') || name.includes('tríceps')) return 'tricep_pushdown';
    if (id.includes('abs') || id.includes('crunch') || id.includes('core') || id.includes('plancha') || name.includes('abdominal') || name.includes('crunch')) return 'core_abs';
    return 'general';
  }, [exercise]);

  const showMuscles = visualLayer === 'all' || visualLayer === 'muscles';
  const showSkeleton = visualLayer === 'all' || visualLayer === 'skeleton';
  const showVectors = visualLayer === 'all' || visualLayer === 'vectors';

  const isFemale = currentGender === 'female';
  const waistWidth = isFemale ? 18 : 24;

  // Real-time calculated degrees for HUD
  const calculatedAngle = useMemo(() => {
    switch (movementType) {
      case 'squat': return Math.round(175 - progress * 92);
      case 'bench_press': return Math.round(170 - progress * 88);
      case 'deadlift': return Math.round(180 - progress * 72);
      case 'lat_pull': return Math.round(175 - progress * 82);
      case 'bicep_curl': return Math.round(165 - progress * 120);
      case 'shoulder_press': return Math.round(85 + progress * 88);
      default: return Math.round(90 + progress * 75);
    }
  }, [movementType, progress]);

  // Instantaneous Muscular Tension Load (%)
  const tensionLoad = useMemo(() => {
    return Math.round(45 + progress * 53);
  }, [progress]);

  // Breathing guidance (Inhale on eccentric down, Exhale on concentric up)
  const breathingState = useMemo(() => {
    if (phase < 50) return { action: 'INHALAR (Fase Excéntrica)', icon: '⬇️', color: 'text-cyan-300' };
    return { action: 'EXHALAR (Empuje Concéntrico)', icon: '⬆️', color: 'text-emerald-300' };
  }, [phase]);

  // Current Biomechanical Phase Text
  const currentPhaseText = useMemo(() => {
    if (progress < 0.2) return '1. Posición Inicial y Retracción Escapular';
    if (progress >= 0.2 && progress < 0.6) return '2. Fase Excéntrica (Control Negativo)';
    if (progress >= 0.6 && progress < 0.9) return '3. Punto de Máximo Estiramiento / Tensión';
    return '4. Máxima Contracción Concéntrica Activa';
  }, [progress]);

  // Render High-Fidelity 3D Avatar Scene
  const render3DAvatar = () => {
    // Creador de Articulaciones Biomecánicas (Exoesqueleto)
    const renderJoint = (x: number, y: number, color: string, radius = 7) => (
      <g transform={`translate(${x}, ${y})`}>
        {/* Anillo exterior de anclaje */}
        <circle cx="0" cy="0" r={radius + 1.5} fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
        {/* Engranaje interior oscuro */}
        <circle cx="0" cy="0" r={radius - 1.5} fill="#1E293B" stroke={color} strokeWidth="1" />
        {/* Núcleo de Neón brillante */}
        <circle cx="0" cy="0" r={Math.max(2, radius - 4)} fill={color} filter="url(#neonBloom)" opacity="0.9" />
        {/* Mira táctica (cruceta mecánica) */}
        <line x1={-radius} y1="0" x2={radius} y2="0" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <line x1="0" y1={-radius} x2="0" y2={radius} stroke={color} strokeWidth="0.5" opacity="0.6" />
      </g>
    );

    return (
      <svg 
        viewBox="0 0 400 250" 
        className="w-full h-full max-h-[300px] select-none filter drop-shadow-2xl transition-all duration-300"
      >
        <defs>
          {/* Cybernetic Clay Body Shader */}
          <linearGradient id="claySkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={renderSkin === 'xray' ? '#38BDF8' : '#F8FAFC'} stopOpacity={renderSkin === 'xray' ? 0.35 : 1} />
            <stop offset="35%" stopColor={renderSkin === 'xray' ? '#0284C7' : '#CBD5E1'} stopOpacity={renderSkin === 'xray' ? 0.25 : 1} />
            <stop offset="70%" stopColor={renderSkin === 'xray' ? '#0F172A' : '#64748B'} stopOpacity={renderSkin === 'xray' ? 0.2 : 1} />
            <stop offset="100%" stopColor={renderSkin === 'xray' ? '#020617' : '#334155'} stopOpacity={renderSkin === 'xray' ? 0.4 : 1} />
          </linearGradient>

          {/* Muscle Agonist Glow (Electric Cyan) */}
          <linearGradient id="agonistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Muscle Synergist Glow (Amber Flame) */}
          <linearGradient id="synergistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Steel Knurled Barbell */}
          <linearGradient id="steelBar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Olympic Bumper Plate 20KG Red */}
          <linearGradient id="bumperPlate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>

          {/* Volumetric Neon Glow */}
          <filter id="neonBloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stage floor glow */}
          <radialGradient id="stageGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#0F172A" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. 3D ISOMETRIC STAGE FLOOR & GRID */}
        <g id="stage_grid">
          <ellipse cx="200" cy="205" rx="165" ry="35" fill="url(#stageGlow)" />
          
          {viewAngle === 'isometric' && (
            <>
              <polygon points="50,205 200,240 350,205 200,170" fill="#080D1A" stroke="#1E293B" strokeWidth="1.5" />
              <line x1="85" y1="195" x2="315" y2="195" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
              <line x1="120" y1="220" x2="280" y2="220" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
              <line x1="200" y1="170" x2="200" y2="240" stroke="#00F0FF" strokeWidth="1" opacity="0.3" />
            </>
          )}

          {viewAngle === 'front' && (
            <>
              <line x1="50" y1="210" x2="350" y2="210" stroke="#1E293B" strokeWidth="3" />
              <line x1="100" y1="210" x2="300" y2="210" stroke="#00F0FF" strokeWidth="1.5" opacity="0.4" />
            </>
          )}

          {viewAngle === 'side' && (
            <>
              <line x1="60" y1="210" x2="340" y2="210" stroke="#1E293B" strokeWidth="3" />
              <line x1="120" y1="210" x2="280" y2="210" stroke="#00F0FF" strokeWidth="2" opacity="0.5" />
            </>
          )}
        </g>

        {/* 2. SPECIFIC 3D MOVEMENT PATTERNS ACROSS PERSPECTIVES */}

        {/* ================= SQUAT PATTERN (ANATÓMICO 3D) ================= */}
        {movementType === 'squat' && (() => {
          const drop = progress * 48;
          const isFront = viewAngle === 'front';

          // Cinemática base
          const hipX = isFront ? 200 : (180 - progress * 32);
          const hipY = 115 + progress * 48;
          const kneeX = isFront ? 230 + progress * 10 : (220 + progress * 20);
          const kneeY = 160 + progress * 10;
          const barY = 58 + drop;
          const ankleX = isFront ? 230 : 195;
          const ankleY = 202;

          // Puntos medios para las curvas de volumen muscular dinámico
          const midThighY = (hipY + kneeY) / 2;
          const midCalfY = (kneeY + ankleY) / 2;

          // Curvas de Bézier para Tapering Anatómico
          const thighWidth = isFemale ? 14 : 16;
          const thighPath = `
            M ${hipX - (isFemale ? 10 : 12)} ${hipY} 
            Q ${hipX - (isFemale ? 14 : 17)} ${midThighY} ${kneeX - 7} ${kneeY} 
            L ${kneeX + 7} ${kneeY} 
            Q ${hipX + (isFemale ? 16 : 19)} ${midThighY + 5} ${hipX + (isFemale ? 10 : 12)} ${hipY} Z
          `;

          // Gemelos/Sóleo (Curva prominente en el vientre del gemelo, afilado en el talón de Aquiles)
          const calfPath = `
            M ${kneeX - 7} ${kneeY} 
            Q ${kneeX - 18} ${midCalfY - 8} ${ankleX - 4} ${ankleY} 
            L ${ankleX + 4} ${ankleY} 
            Q ${kneeX + 8} ${midCalfY} ${kneeX + 7} ${kneeY} Z
          `;

          // Torso en "V" (Dorsales anchos, cintura estrecha)
          const shoulderSpread = isFemale ? 18 : 24;
          const torsoPath = `
            M ${195 - shoulderSpread} ${65 + drop + 10}
            Q 185 ${(65 + drop + hipY) / 2} ${hipX - (isFemale ? 8 : 10)} ${hipY}
            L ${hipX + (isFemale ? 8 : 10)} ${hipY}
            Q 205 ${(65 + drop + hipY) / 2} ${195 + shoulderSpread} ${65 + drop + 10} Z
          `;

          return (
            <g id="squat_avatar_pro">
              {/* Vertical Laser Bar-Path Tracker */}
              {showVectors && (
                <g id="bar_path_laser">
                  <line x1="195" y1="40" x2="195" y2="135" stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
                  <circle cx="195" cy={barY} r="4" fill="#00FF66" />
                  <line x1="195" y1={barY} x2="195" y2={barY - 24} stroke="#00FF66" strokeWidth="2" strokeLinecap="round" />
                  <polygon points={`191,${barY - 20} 195,${barY - 28} 199,${barY - 20}`} fill="#00FF66" />
                </g>
              )}

              {/* Cabeza */}
              <circle cx="195" cy={50 + drop} r="16" fill="url(#claySkin)" />
              <circle cx="200" cy={46 + drop} r="4" fill="#FFFFFF" opacity="0.5" />

              {/* Torso Anatómico en V */}
              <path d={torsoPath} fill="url(#claySkin)" stroke="url(#claySkin)" strokeWidth="4" strokeLinejoin="round" />

              {/* Volumen Glúteo */}
              {showMuscles && (
                <ellipse 
                  cx={hipX - 4} 
                  cy={hipY + 2} 
                  rx={isFemale ? "20" : "18"} 
                  ry={isFemale ? "16" : "14"} 
                  fill="url(#agonistGrad)" 
                  filter="url(#neonBloom)" 
                  opacity={0.85 + progress * 0.15} 
                />
              )}

              {/* ================= PIERNAS ANATÓMICAS ================= */}
              {showMuscles ? (
                <g filter="url(#neonBloom)">
                  {/* Muslo Izquierdo Frontal */}
                  {isFront && (
                    <path 
                      d={`M ${400 - hipX - 12} ${hipY} Q ${400 - hipX - 18} ${midThighY + 5} ${400 - kneeX - 7} ${kneeY} L ${400 - kneeX + 7} ${kneeY} Q ${400 - hipX + 16} ${midThighY} ${400 - hipX + 12} ${hipY} Z`}
                      fill="url(#agonistGrad)" opacity={0.9} 
                    />
                  )}
                  {/* Muslo Principal */}
                  <path d={thighPath} fill="url(#agonistGrad)" opacity={0.9} />
                </g>
              ) : (
                <>
                  {isFront && (
                    <path 
                      d={`M ${400 - hipX - 12} ${hipY} Q ${400 - hipX - 18} ${midThighY + 5} ${400 - kneeX - 7} ${kneeY} L ${400 - kneeX + 7} ${kneeY} Q ${400 - hipX + 16} ${midThighY} ${400 - hipX + 12} ${hipY} Z`}
                      fill="url(#claySkin)" 
                    />
                  )}
                  <path d={thighPath} fill="url(#claySkin)" stroke="url(#claySkin)" strokeWidth="2" strokeLinejoin="round" />
                </>
              )}

              {/* Gemelos Anatómicos */}
              {isFront && (
                <path 
                  d={`M ${400 - kneeX - 7} ${kneeY} Q ${400 - kneeX - 8} ${midCalfY} ${400 - ankleX - 4} ${ankleY} L ${400 - ankleX + 4} ${ankleY} Q ${400 - kneeX + 18} ${midCalfY - 8} ${400 - kneeX + 7} ${kneeY} Z`}
                  fill="url(#claySkin)" 
                />
              )}
              <path d={calfPath} fill="url(#claySkin)" stroke="url(#claySkin)" strokeWidth="2" strokeLinejoin="round" />

              {/* Pie / Calzado de entrenamiento */}
              <ellipse cx={ankleX} cy={ankleY + 2} rx="16" ry="7" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              {isFront && <ellipse cx={400 - ankleX} cy={ankleY + 2} rx="16" ry="7" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />}

              {/* Skeletal Joints (Nodos Articulares High-Tech) */}
              {showSkeleton && (
                <g id="joints_squat">
                  {renderJoint(hipX, hipY, "#F59E0B", 7)}
                  {renderJoint(kneeX, kneeY, "#00F0FF", 7)}
                  {renderJoint(ankleX, ankleY, "#00FF66", 6)}
                </g>
              )}

              {/* Olympic Barbell with 3D Plates */}
              <g transform={`translate(195, ${barY})`}>
                <line x1="-95" y1="0" x2="95" y2="0" stroke="url(#steelBar)" strokeWidth="7" strokeLinecap="round" />
                <rect x="-86" y="-18" width="8" height="36" rx="2" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <rect x="78" y="-18" width="8" height="36" rx="2" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <ellipse cx="-86" cy="0" rx="6" ry="24" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <ellipse cx="86" cy="0" rx="6" ry="24" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <circle cx="-35" cy="0" r="7" fill="url(#claySkin)" />
                <circle cx="35" cy="0" r="7" fill="url(#claySkin)" />
              </g>

              {/* Biomechanical Angle Tag */}
              {showHudOverlays && (
                <g transform={`translate(${kneeX + 35}, ${kneeY - 14})`}>
                  <rect x="-24" y="-12" width="48" height="24" rx="6" fill="#020617" stroke="#00F0FF" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#00F0FF" fontSize="12" fontWeight="900" textAnchor="middle">
                    {calculatedAngle}°
                  </text>
                </g>
              )}
            </g>
          );
        })()}

        {/* ================= BENCH PRESS PATTERN ================= */}
        {movementType === 'bench_press' && (() => {
          const drop = progress * 44;
          const elbowY = 120 + progress * 26;
          const barY = 82 + drop;

          return (
            <g id="bench_press_avatar">
              {/* 3D Flat Bench */}
              <rect x="70" y="145" width="260" height="20" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              <line x1="110" y1="165" x2="110" y2="205" stroke="#1E293B" strokeWidth="14" strokeLinecap="round" />
              <line x1="290" y1="165" x2="290" y2="205" stroke="#1E293B" strokeWidth="14" strokeLinecap="round" />

              {/* Head & Spine on bench */}
              <circle cx="270" cy="136" r="15" fill="url(#claySkin)" />
              <line x1="255" y1="140" x2="140" y2="140" stroke="url(#claySkin)" strokeWidth="24" strokeLinecap="round" />

              {/* Pectoralis Major Glowing Fibers */}
              {showMuscles && (
                <g filter="url(#neonBloom)">
                  <ellipse cx="220" cy="132" rx="22" ry="14" fill="url(#agonistGrad)" opacity={0.9} />
                  <ellipse cx="220" cy="132" rx="14" ry="8" fill="#38BDF8" opacity={0.6} />
                </g>
              )}

              {/* Arm & Triceps pushing */}
              <line x1="230" y1="135" x2="200" y2={elbowY} stroke="url(#claySkin)" strokeWidth="14" strokeLinecap="round" />
              {showMuscles ? (
                <line x1="200" y1={elbowY} x2="200" y2={barY} stroke="url(#agonistGrad)" strokeWidth="12" strokeLinecap="round" filter="url(#neonBloom)" />
              ) : (
                <line x1="200" y1={elbowY} x2="200" y2={barY} stroke="url(#claySkin)" strokeWidth="12" strokeLinecap="round" />
              )}

              {/* Skeletal Joints */}
              {showSkeleton && (
                <g id="joints_bench">
                  {renderJoint(230, 135, "#F59E0B", 6)}
                  {renderJoint(200, elbowY, "#00F0FF", 6)}
                  {renderJoint(200, barY, "#00FF66", 6)}
                </g>
              )}

              {/* Olympic Barbell */}
              <g transform={`translate(200, ${barY})`}>
                <line x1="-95" y1="0" x2="95" y2="0" stroke="url(#steelBar)" strokeWidth="7" strokeLinecap="round" />
                <ellipse cx="-85" cy="0" rx="7" ry="26" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <ellipse cx="85" cy="0" rx="7" ry="26" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <circle cx="-25" cy="0" r="7" fill="url(#claySkin)" />
                <circle cx="25" cy="0" r="7" fill="url(#claySkin)" />
              </g>

              {/* Force Vectors */}
              {showVectors && (
                <g>
                  <line x1="200" y1="50" x2="200" y2="135" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="200" y1={barY} x2="200" y2={barY - 24} stroke="#00FF66" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}

              {/* Live Angle Tag */}
              {showHudOverlays && (
                <g transform={`translate(245, ${barY - 14})`}>
                  <rect x="-24" y="-12" width="48" height="24" rx="6" fill="#020617" stroke="#00FF66" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#00FF66" fontSize="12" fontWeight="900" textAnchor="middle">
                    {calculatedAngle}°
                  </text>
                </g>
              )}
            </g>
          );
        })()}

        {/* ================= DEADLIFT / RDL PATTERN (ANATÓMICO & EXOESQUELETO) ================= */}
        {movementType === 'deadlift' && (() => {
          const hinge = progress * 40;
          const barY = 190 - progress * 80;
          const hipX = 160 - progress * 30;
          const hipY = 135 - progress * 15;
          const headX = 225 - progress * 15;
          const headY = 100 - progress * 40;
          const kneeX = 195;
          const kneeY = 180;
          const ankleX = 200;
          const ankleY = 205;

          // Hinge dynamics (Estiramiento de la cadena posterior)
          const isStretched = 1 - progress; // 1 cuando está abajo, 0 cuando bloquea arriba
          
          // Puntos medios para el esculpido
          const midThighX = (hipX + kneeX) / 2;
          const midThighY = (hipY + kneeY) / 2;
          const midCalfX = (kneeX + ankleX) / 2;
          const midCalfY = (kneeY + ankleY) / 2;

          // Piernas con vientre muscular dinámico
          const thighPath = `
            M ${hipX - 12} ${hipY - 5} 
            Q ${midThighX - 18} ${midThighY} ${kneeX - 8} ${kneeY} 
            L ${kneeX + 8} ${kneeY} 
            Q ${midThighX + 15} ${midThighY + 5} ${hipX + 12} ${hipY + 5} Z
          `;

          const calfPath = `
            M ${kneeX - 8} ${kneeY} 
            Q ${midCalfX - 15} ${midCalfY - 5} ${ankleX - 5} ${ankleY} 
            L ${ankleX + 5} ${ankleY} 
            Q ${midCalfX + 12} ${midCalfY} ${kneeX + 8} ${kneeY} Z
          `;

          // Torso y Espalda
          const torsoPath = `
            M ${headX - 10} ${headY + 12}
            Q ${(headX + hipX)/2 - 15} ${(headY + hipY)/2} ${hipX - 12} ${hipY - 5}
            L ${hipX + 12} ${hipY + 5}
            Q ${(headX + hipX)/2 + 10} ${(headY + hipY)/2} ${headX + 5} ${headY + 15} Z
          `;

          // Brazo recto estabilizador
          const armPath = `
            M ${headX - 12} ${headY + 22}
            Q ${(headX + 215)/2 - 5} ${(headY + barY)/2} 210 ${barY}
            L 220 ${barY}
            Q ${(headX + 215)/2 + 5} ${(headY + barY)/2} ${headX - 2} ${headY + 25} Z
          `;

          return (
            <g id="deadlift_avatar_pro">
              {/* Cabeza */}
              <circle cx={headX} cy={headY} r="16" fill="url(#claySkin)" />
              
              {/* Torso Anatómico */}
              <path d={torsoPath} fill="url(#claySkin)" stroke="url(#claySkin)" strokeWidth="2" strokeLinejoin="round" />

              {/* ================= CADENA POSTERIOR DINÁMICA ================= */}
              {showMuscles && (
                <g filter="url(#neonBloom)">
                  {/* Glúteo (Se contrae intensamente al bloquear arriba) */}
                  <ellipse cx={hipX - 4} cy={hipY + 4} rx={18 - progress*4} ry={14 + progress*4} fill="url(#agonistGrad)" opacity={0.6 + progress * 0.4} />
                  {/* Isquiosurales (Brillan al máximo cuando la barra baja por el estiramiento) */}
                  <path d={thighPath} fill="url(#agonistGrad)" opacity={0.5 + isStretched * 0.5} />
                  {/* Zona Lumbar (Erectores Espinales como sinergistas) */}
                  <ellipse cx={hipX + 10} cy={hipY - 15} rx="8" ry="16" transform={`rotate(${hinge}, ${hipX}, ${hipY})`} fill="#F59E0B" opacity="0.6" />
                </g>
              )}

              {/* ================= ESTRUCTURA BASE ================= */}
              {!showMuscles && <path d={thighPath} fill="url(#claySkin)" stroke="#334155" strokeWidth="1" />}
              <path d={calfPath} fill="url(#claySkin)" stroke="#334155" strokeWidth="1" />
              <ellipse cx={ankleX} cy={ankleY + 2} rx="16" ry="6" fill="#1E293B" />
              
              {/* Brazo sujetando la barra */}
              <path d={armPath} fill="url(#claySkin)" opacity={showMuscles ? 0.8 : 1} stroke="#334155" strokeWidth="1" />

              {/* ================= ARTICULACIONES HIGH-TECH ================= */}
              {showSkeleton && (
                <g id="joints_hightech_deadlift">
                  {renderJoint(hipX, hipY, "#F59E0B", 8)}
                  {renderJoint(kneeX, kneeY, "#00F0FF", 7)}
                  {renderJoint(ankleX, ankleY, "#00FF66", 6)}
                  {renderJoint(headX - 8, headY + 20, "#38BDF8", 6)} {/* Hombro */}
                </g>
              )}

              {/* Barra Olímpica */}
              <g transform={`translate(215, ${barY})`}>
                <line x1="-90" y1="0" x2="90" y2="0" stroke="url(#steelBar)" strokeWidth="7" strokeLinecap="round" />
                <ellipse cx="-80" cy="0" rx="7" ry="26" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <ellipse cx="80" cy="0" rx="7" ry="26" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <circle cx="-2" cy="0" r="6" fill="url(#claySkin)" />
              </g>

              {/* HUD Articular (Bisagra de Cadera) */}
              {showHudOverlays && (
                <g transform={`translate(${hipX - 45}, ${hipY - 20})`}>
                  <rect x="-24" y="-12" width="48" height="24" rx="6" fill="#020617" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#F59E0B" fontSize="12" fontWeight="900" textAnchor="middle">
                    {calculatedAngle}°
                  </text>
                </g>
              )}
            </g>
          );
        })()}

        {/* ================= LAT PULLDOWN / PULLUP PATTERN (ANATÓMICO & EXOESQUELETO) ================= */}
        {movementType === 'lat_pull' && (() => {
          const pullY = 48 + progress * 50;
          const shoulderX = 200;
          const shoulderY = 115;
          const elbowLeftX = 150 + progress * 25;
          const elbowRightX = 250 - progress * 25;
          const elbowY = 80 + progress * 60;
          const wristLeftX = 115;
          const wristRightX = 285;
          const wristY = pullY - 4;

          // Expansión de los dorsales (V-taper). Más anchos cuando los brazos suben.
          const latFlare = (1 - progress) * 14; 

          // Torso y Dorsal Ancho dinámico
          const torsoPath = `
            M 185 100 
            Q ${165 - latFlare} 140 188 180 
            L 212 180 
            Q ${235 + latFlare} 140 215 100 Z
          `;

          // Brazos Anatómicos Articulados
          const leftUpperArm = `M ${shoulderX - 10} 110 Q ${elbowLeftX - 5} ${elbowY - 10} ${elbowLeftX} ${elbowY} L ${elbowLeftX + 12} ${elbowY - 5} Q ${shoulderX} 115 ${shoulderX} 120 Z`;
          const leftForearm = `M ${elbowLeftX} ${elbowY} Q ${wristLeftX + 8} ${wristY + 15} ${wristLeftX} ${wristY} L ${wristLeftX + 10} ${wristY - 5} Q ${elbowLeftX + 15} ${elbowY} ${elbowLeftX + 12} ${elbowY - 5} Z`;
          
          const rightUpperArm = `M ${shoulderX + 10} 110 Q ${elbowRightX + 5} ${elbowY - 10} ${elbowRightX} ${elbowY} L ${elbowRightX - 12} ${elbowY - 5} Q ${shoulderX} 115 ${shoulderX} 120 Z`;
          const rightForearm = `M ${elbowRightX} ${elbowY} Q ${wristRightX - 8} ${wristY + 15} ${wristRightX} ${wristY} L ${wristRightX - 10} ${wristY - 5} Q ${elbowRightX - 15} ${elbowY} ${elbowRightX - 12} ${elbowY - 5} Z`;

          return (
            <g id="lat_pull_avatar_pro">
              {/* Estructura Máquina de Polea */}
              <rect x="180" y="10" width="40" height="16" rx="4" fill="#0F172A" stroke="#00F0FF" strokeWidth="1.5" />
              <line x1="200" y1="20" x2="200" y2={pullY} stroke="#64748B" strokeWidth="3" strokeDasharray="3 2" />
              <line x1="140" y1="180" x2="260" y2="180" stroke="#1E293B" strokeWidth="14" strokeLinecap="round" />
              
              {/* Cabeza */}
              <circle cx="200" cy="95" r="16" fill="url(#claySkin)" />

              {/* ================= DORSALES (V-TAPER) ================= */}
              {showMuscles ? (
                <g filter="url(#neonBloom)">
                  {/* Músculo Dorsal Ancho que se expande */}
                  <path d={torsoPath} fill="url(#agonistGrad)" opacity={0.7 + progress * 0.3} />
                  {/* Fibras centrales de contracción máxima al jalar */}
                  <ellipse cx="200" cy="140" rx="12" ry="25" fill="#00F0FF" opacity={progress * 0.6} /> 
                </g>
              ) : (
                <path d={torsoPath} fill="url(#claySkin)" stroke="#334155" strokeWidth="2" />
              )}

              {/* ================= BRAZOS (Sinergistas) ================= */}
              {showMuscles ? (
                <g filter="url(#neonBloom)">
                  <path d={leftUpperArm} fill="#0284C7" opacity="0.6" />
                  <path d={leftForearm} fill="#0284C7" opacity="0.4" />
                  <path d={rightUpperArm} fill="#0284C7" opacity="0.6" />
                  <path d={rightForearm} fill="#0284C7" opacity="0.4" />
                  {/* Bíceps actuando como sinergista (se infla al jalar) */}
                  <circle cx={elbowLeftX + 5} cy={elbowY - 15} r={4 + progress*3} fill="#38BDF8" opacity={progress * 0.7} />
                  <circle cx={elbowRightX - 5} cy={elbowY - 15} r={4 + progress*3} fill="#38BDF8" opacity={progress * 0.7} />
                </g>
              ) : (
                <g fill="url(#claySkin)" stroke="#334155" strokeWidth="1">
                  <path d={leftUpperArm} />
                  <path d={leftForearm} />
                  <path d={rightUpperArm} />
                  <path d={rightForearm} />
                </g>
              )}

              {/* ================= ARTICULACIONES HIGH-TECH ================= */}
              {showSkeleton && (
                <g id="joints_hightech_lat">
                  {renderJoint(shoulderX, shoulderY, "#F59E0B", 8)}
                  {renderJoint(elbowLeftX, elbowY, "#00F0FF", 7)}
                  {renderJoint(elbowRightX, elbowY, "#00F0FF", 7)}
                </g>
              )}

              {/* Barra de Jalón / Dominada */}
              <g transform={`translate(200, ${pullY})`}>
                <path d="M -105 -6 Q 0 8 105 -6" fill="none" stroke="url(#steelBar)" strokeWidth="7" strokeLinecap="round" />
                <circle cx="-95" cy="-4" r="6" fill="#00FF66" />
                <circle cx="95" cy="-4" r="6" fill="#00FF66" />
                {/* Manos agarrando la barra */}
                <ellipse cx="-95" cy="-4" rx="8" ry="6" fill="url(#claySkin)" />
                <ellipse cx="95" cy="-4" rx="8" ry="6" fill="url(#claySkin)" />
              </g>

              {/* Vectores Láser */}
              {showVectors && (
                <g>
                  <line x1="200" y1="85" x2="200" y2="120" stroke="#00FF66" strokeWidth="2.5" strokeLinecap="round" />
                  <polygon points="196,115 200,123 204,115" fill="#00FF66" />
                </g>
              )}
            </g>
          );
        })()}

        {/* ================= BICEP CURL PATTERN (ANATÓMICO & EXOESQUELETO) ================= */}
        {movementType === 'bicep_curl' && (() => {
          const handX = 220 - progress * 24;
          const handY = 165 - progress * 68;
          const shoulderX = 190;
          const shoulderY = 80;
          const elbowX = 195;
          const elbowY = 125;

          // Puntos medios para las curvas del brazo
          const midForearmX = (elbowX + handX) / 2;
          const midForearmY = (elbowY + handY) / 2;
          
          // Magia física: El pico del bíceps crece a medida que 'progress' llega a 1
          const bicepContraction = progress * 14; 

          // Brazo Superior (Hombro a Codo) - Tríceps y Braquial
          const upperArmPath = `
            M ${shoulderX - 9} ${shoulderY} 
            Q ${shoulderX - 12} 100 ${elbowX - 6} ${elbowY} 
            L ${elbowX + 6} ${elbowY} 
            Q ${shoulderX + 10} 100 ${shoulderX + 8} ${shoulderY} Z
          `;

          // Antebrazo (Codo a Muñeca) con el vientre del Braquiorradial y Bíceps
          const forearmPath = `
            M ${elbowX - 6} ${elbowY} 
            Q ${midForearmX - 8 - (bicepContraction * 0.3)} ${midForearmY - 5 - bicepContraction} ${handX - 4} ${handY} 
            L ${handX + 4} ${handY} 
            Q ${midForearmX + 8} ${midForearmY + 4} ${elbowX + 6} ${elbowY} Z
          `;

          return (
            <g id="bicep_curl_avatar_pro">
              {/* Cabeza */}
              <circle cx="180" cy="55" r="16" fill="url(#claySkin)" />
              
              {/* Torso en V Esculpido */}
              <path d="M 165 70 Q 170 110 174 145 L 186 145 Q 190 110 195 70 Z" fill="url(#claySkin)" stroke="url(#claySkin)" strokeWidth="4" strokeLinejoin="round" />
              
              {/* Piernas base */}
              <line x1="174" y1="145" x2="165" y2="200" stroke="url(#claySkin)" strokeWidth="15" strokeLinecap="round" />
              <line x1="186" y1="145" x2="195" y2="200" stroke="url(#claySkin)" strokeWidth="15" strokeLinecap="round" />

              {/* ================= BRAZO DINÁMICO ================= */}
              {showMuscles ? (
                <g filter="url(#neonBloom)">
                  <path d={upperArmPath} fill="#0284C7" opacity={0.4} /> {/* Estabilizador */}
                  <path d={forearmPath} fill="url(#agonistGrad)" opacity={0.8 + (progress * 0.2)} /> {/* Agonista principal */}
                  
                  {/* Esfera brillante simulando el pico máximo del bíceps en contracción */}
                  {progress > 0.3 && (
                    <circle 
                      cx={midForearmX - 2} 
                      cy={midForearmY - bicepContraction + 2} 
                      r={6 + (progress * 4)} 
                      fill="#00F0FF" 
                      opacity={progress * 0.9} 
                    />
                  )}
                </g>
              ) : (
                <>
                  <path d={upperArmPath} fill="url(#claySkin)" stroke="#334155" strokeWidth="1" />
                  <path d={forearmPath} fill="url(#claySkin)" stroke="#334155" strokeWidth="1" />
                </>
              )}

              {/* ================= ARTICULACIONES HIGH-TECH ================= */}
              {showSkeleton && (
                <g id="joints_hightech">
                  {/* Usamos el nuevo renderJoint */}
                  {renderJoint(shoulderX, shoulderY, "#F59E0B", 8)}
                  {renderJoint(elbowX, elbowY, "#00F0FF", 8)}
                  {renderJoint(handX, handY, "#00FF66", 6)}
                </g>
              )}

              {/* Barra y Discos */}
              <g transform={`translate(${handX}, ${handY})`}>
                <line x1="-30" y1="0" x2="30" y2="0" stroke="url(#steelBar)" strokeWidth="6" strokeLinecap="round" />
                <ellipse cx="-28" cy="0" rx="5" ry="16" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <ellipse cx="28" cy="0" rx="5" ry="16" fill="url(#bumperPlate)" stroke="#FFF" strokeWidth="1" />
                <circle cx="0" cy="0" r="6" fill="url(#claySkin)" />
              </g>

              {/* HUD Angular */}
              {showHudOverlays && (
                <g transform={`translate(${handX + 40}, ${handY})`}>
                  <rect x="-24" y="-12" width="48" height="24" rx="6" fill="#020617" stroke="#00F0FF" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#00F0FF" fontSize="12" fontWeight="900" textAnchor="middle">
                    {calculatedAngle}°
                  </text>
                </g>
              )}
            </g>
          );
        })()}

        {/* ================= GENERAL & MACHINES PATTERN (PEC DECK, PRESS, REMO) ================= */}
        {(movementType === 'shoulder_press' || movementType === 'row' || movementType === 'tricep_pushdown' || movementType === 'core_abs' || movementType === 'general') && (() => {
          // El progress define qué tanto se mueven los brazos
          const move = progress * 40; 
          
          const shoulderX = 200;
          const shoulderY = 80;
          const leftElbowX = 160 - (progress * 15);
          const rightElbowX = 240 + (progress * 15);
          const handY = 65 - move;

          // Torso en V Esculpido
          const torsoPath = `
            M 175 75 Q 185 110 188 145 L 212 145 Q 215 110 225 75 Z
          `;

          // Brazos Musculares con Tapering
          const leftArmPath = `M ${shoulderX - 15} ${shoulderY} Q 150 90 ${leftElbowX} ${handY} L ${leftElbowX + 12} ${handY} Q 170 90 ${shoulderX - 5} ${shoulderY + 10} Z`;
          const rightArmPath = `M ${shoulderX + 15} ${shoulderY} Q 250 90 ${rightElbowX} ${handY} L ${rightElbowX - 12} ${handY} Q 230 90 ${shoulderX + 5} ${shoulderY + 10} Z`;

          return (
            <g id="general_machines_avatar_pro">
              {/* Cabeza */}
              <circle cx="200" cy="55" r="16" fill="url(#claySkin)" />
              
              {/* Torso Anatómico Base */}
              <path d={torsoPath} fill="url(#claySkin)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />

              {/* ================= MÚSCULOS DINÁMICOS ================= */}
              {showMuscles && (
                <g filter="url(#neonBloom)">
                  {/* Pectorales / Deltoides Frontales (Brillan y se expanden con el movimiento) */}
                  <circle cx="182" cy="85" r={10 + progress * 4} fill="url(#agonistGrad)" opacity={0.6 + progress * 0.4} />
                  <circle cx="218" cy="85" r={10 + progress * 4} fill="url(#agonistGrad)" opacity={0.6 + progress * 0.4} />
                  {/* Núcleo de máxima tensión (Cian intenso) */}
                  <circle cx="182" cy="85" r={5 + progress * 2} fill="#38BDF8" opacity={progress * 0.8} />
                  <circle cx="218" cy="85" r={5 + progress * 2} fill="#38BDF8" opacity={progress * 0.8} />
                </g>
              )}

              {/* Piernas Esculpidas Base */}
              <line x1="188" y1="145" x2="175" y2="200" stroke="url(#claySkin)" strokeWidth="14" strokeLinecap="round" />
              <line x1="212" y1="145" x2="225" y2="200" stroke="url(#claySkin)" strokeWidth="14" strokeLinecap="round" />

              {/* ================= BRAZOS ANATÓMICOS ================= */}
              {showMuscles ? (
                <g filter="url(#neonBloom)">
                  <path d={leftArmPath} fill="#0284C7" opacity="0.6" />
                  <path d={rightArmPath} fill="#0284C7" opacity="0.6" />
                </g>
              ) : (
                <g fill="url(#claySkin)" stroke="#334155" strokeWidth="1">
                  <path d={leftArmPath} />
                  <path d={rightArmPath} />
                </g>
              )}

              {/* ================= ARTICULACIONES HIGH-TECH ================= */}
              {showSkeleton && (
                <g id="joints_hightech_general">
                  {/* Llamamos al creador de articulaciones para hombros y codos/manos */}
                  {renderJoint(shoulderX - 12, shoulderY + 5, "#F59E0B", 6)}
                  {renderJoint(shoulderX + 12, shoulderY + 5, "#F59E0B", 6)}
                  {renderJoint(leftElbowX + 6, handY, "#00F0FF", 6)}
                  {renderJoint(rightElbowX - 6, handY, "#00F0FF", 6)}
                </g>
              )}

              {/* ================= AGARRES DE LA MÁQUINA (PEC DECK/POLEAS) ================= */}
              <g transform={`translate(${leftElbowX + 6}, ${handY})`}>
                <line x1="-10" y1="0" x2="10" y2="0" stroke="url(#steelBar)" strokeWidth="5" />
                <rect x="-12" y="-10" width="8" height="20" rx="3" fill="#1E293B" stroke="#00F0FF" strokeWidth="1" />
              </g>

              <g transform={`translate(${rightElbowX - 6}, ${handY})`}>
                <line x1="-10" y1="0" x2="10" y2="0" stroke="url(#steelBar)" strokeWidth="5" />
                <rect x="4" y="-10" width="8" height="20" rx="3" fill="#1E293B" stroke="#00F0FF" strokeWidth="1" />
              </g>
            </g>
          );
        })()}
      </svg>
    );
  };

  return (
    <div className={`w-full bg-[#030611] border border-slate-800/90 rounded-2xl relative overflow-hidden flex flex-col justify-between select-none shadow-2xl ${compact ? 'p-3' : 'p-4'}`}>
      
      {/* 1. TOP HUD / PRO TOOLBAR (Memoized Component) */}
      <TopToolbar 
        muscle={exercise.muscle}
        viewAngle={viewAngle}
        setViewAngle={setViewAngle}
        renderSkin={renderSkin}
        setRenderSkin={setRenderSkin}
        currentGender={currentGender}
        setCurrentGender={setCurrentGender}
      />

      {/* 2. MAIN 3D INTERACTIVE STAGE & BIOMECHANICAL GAUGES */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative py-1 min-h-[220px]">
        {render3DAvatar()}

        {/* Dynamic Phase HUD Tag */}
        <div className="absolute top-2 left-3 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-500/30 text-xs text-slate-200 flex items-center space-x-2.5 shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-slate-100">{currentPhaseText}</span>
        </div>

        {/* Breathing Synchronizer Tag (Top Right) */}
        <div className="absolute top-2 right-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-200 flex items-center space-x-2 shadow-xl">
          <Wind className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className={`font-mono font-bold text-[11px] ${breathingState.color}`}>
            {breathingState.action}
          </span>
        </div>

        {/* Real-Time Tension & Spinal Safety Gauges (Bottom Floating) */}
        <div className="absolute bottom-2 left-3 flex items-center space-x-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-slate-300 shadow-xl">
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tensión Muscular:</span>
            <strong className="text-cyan-300 font-mono">{tensionLoad}%</strong>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold">Columna: Neutra</span>
          </div>
        </div>

        {/* Target Muscles Heatmap Legend Floating */}
        <div className="absolute bottom-2 right-3 hidden sm:flex items-center space-x-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-slate-300 shadow-xl">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-sm shadow-cyan-400" />
            <span>Agonista (100%)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span>Carga 20kg</span>
          </span>
        </div>
      </div>

      {/* 3. SCRUBBER TIMELINE & PLAYBACK CONTROLS */}
      <div className="w-full pt-3 border-t border-slate-800/90 space-y-2.5">
        
        {/* Scrubber slider (High frequency interactive zone) */}
        <div className="flex items-center space-x-3 px-1">
          <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
            {Math.round(phase)}%
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={phase}
            onMouseDown={() => setIsScrubbing(true)}
            onMouseUp={() => setIsScrubbing(false)}
            onTouchStart={() => setIsScrubbing(true)}
            onTouchEnd={() => setIsScrubbing(false)}
            onChange={(e) => {
              setPhase(parseFloat(e.target.value));
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-[11px] font-mono text-cyan-400 font-bold w-12">
            {calculatedAngle}°
          </span>
        </div>

        {/* 4. BOTTOM PLAYBACK CONTROLS (Memoized Component) */}
        <PlaybackControls 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          speed={speed}
          setSpeed={setSpeed}
          tempo={exercise.tempo || 'Controlado'}
        />
      </div>
    </div>
  );
};
