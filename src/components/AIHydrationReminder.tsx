import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Sparkles, 
  MapPin, 
  Navigation,
  Thermometer, 
  CloudSun, 
  Timer, 
  BellRing, 
  BellOff, 
  Volume2, 
  CheckCircle2, 
  Plus, 
  RotateCcw, 
  User, 
  Play, 
  Pause, 
  Clock,
  Flame,
  Scale,
  RefreshCw,
  LocateFixed,
  ChevronDown,
  Info
} from 'lucide-react';
import { AIHydrationPlan, HydrationScheduleItem, UserHydrationProfile } from '../types';
import { playChime } from '../utils/audio';
import { HydrationBottleGraphic } from './HydrationBottleGraphic';
import { HydrationRingTimeline } from './HydrationRingTimeline';
import { HydrationWeeklyChart } from './HydrationWeeklyChart';

const DEFAULT_PROFILE: UserHydrationProfile = {
  weightKg: 75,
  gender: 'male',
  age: 26,
  city: 'Ubicación Automática',
  latitude: null,
  longitude: null,
  activityLevel: 'moderada_gym',
  wakeTime: '07:30',
  sleepTime: '23:00'
};

export const AIHydrationReminder: React.FC = () => {
  // Estado del perfil
  const [profile, setProfile] = useState<UserHydrationProfile>(() => {
    try {
      const saved = localStorage.getItem('hydrofit_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isLoadingPlan, setIsLoadingPlan] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsStatus, setGpsStatus] = useState<string>('Detectando automáticamente vía GPS...');

  // Plan IA
  const [plan, setPlan] = useState<AIHydrationPlan | null>(() => {
    try {
      const saved = localStorage.getItem('hydrofit_ai_hydration_plan');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Progreso de consumo del día
  const [consumedMl, setConsumedMl] = useState<number>(() => {
    try {
      const todayKey = `hydrofit_water_${new Date().toISOString().slice(0, 10)}`;
      const saved = localStorage.getItem(todayKey);
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Lista de tomas con estado completado
  const [schedules, setSchedules] = useState<HydrationScheduleItem[]>(() => {
    try {
      const todayKey = `hydrofit_schedules_${new Date().toISOString().slice(0, 10)}`;
      const saved = localStorage.getItem(todayKey);
      if (saved) return JSON.parse(saved);
      return plan ? plan.schedules : [];
    } catch {
      return [];
    }
  });

  // Alarmas y temporizador de recordatorio cíclico
  const [alarmEnabled, setAlarmEnabled] = useState<boolean>(true);
  const [nextDoseCountdown, setNextDoseCountdown] = useState<number>(5400); // 90 min en segundos
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [soundAlertTriggered, setSoundAlertTriggered] = useState<boolean>(false);

  // Modo visual de gráficos interactivos
  const [activeVisualTab, setActiveVisualTab] = useState<'termo' | 'anillo' | 'historial' | 'todos'>('termo');

  // Guardar perfil al cambiar
  useEffect(() => {
    localStorage.setItem('hydrofit_user_profile', JSON.stringify(profile));
  }, [profile]);

  // Guardar agua de hoy
  useEffect(() => {
    const todayKey = `hydrofit_water_${new Date().toISOString().slice(0, 10)}`;
    localStorage.setItem(todayKey, consumedMl.toString());
  }, [consumedMl]);

  // Guardar estado de tomas de hoy
  useEffect(() => {
    const todayKey = `hydrofit_schedules_${new Date().toISOString().slice(0, 10)}`;
    localStorage.setItem(todayKey, JSON.stringify(schedules));
  }, [schedules]);

  // Función principal para solicitar a la IA el plan médico
  const fetchAIPlan = async (currentProfile: UserHydrationProfile) => {
    setIsLoadingPlan(true);
    try {
      const response = await fetch('/api/hydration/ai-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProfile)
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }

      const data: AIHydrationPlan = await response.json();
      data.lastGeneratedAt = new Date().toISOString();
      setPlan(data);
      if (data.city && data.city !== "Tu Ubicación") {
        setProfile(prev => ({
          ...prev,
          city: data.city,
          state: data.state || prev.state,
          country: data.country || prev.country
        }));
      }
      setSchedules(data.schedules || []);
      setNextDoseCountdown((data.intervalMinutes || 90) * 60);
      setIsTimerRunning(true);
      localStorage.setItem('hydrofit_ai_hydration_plan', JSON.stringify(data));
      playChime('finish');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingPlan(false);
    }
  };

  // 📍 OBTENER UBICACIÓN GPS AUTOMÁTICA DEL DISPOSITIVO CON MÁXIMA PRECISIÓN
  const requestGPSLocationAndCalculate = (targetProfile = profile) => {
    if (!navigator.geolocation) {
      setGpsStatus('GPS no compatible con el navegador. Puedes ingresar tu Ciudad y Estado.');
      fetchAIPlan(targetProfile);
      return;
    }

    setIsLocating(true);
    setGpsStatus('Conectando con satélites GPS (Alta Precisión)...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = Math.round(position.coords.accuracy || 0);
        
        const updatedProfile = {
          ...targetProfile,
          latitude: lat,
          longitude: lon,
          city: '', // Permitir que el reverse geocode asigne el nombre exacto de Ciudad y Estado
          state: ''
        };
        setProfile(updatedProfile);
        setGpsStatus(`GPS satelital fijado ±${accuracy}m (${lat.toFixed(4)}°, ${lon.toFixed(4)}°)`);
        setIsLocating(false);
        fetchAIPlan(updatedProfile);
      },
      (error) => {
        console.warn("Geolocation permission error or unavailable:", error.message);
        let errorMsg = 'No se pudo obtener GPS satelital.';
        if (error.code === 1) errorMsg = 'Permiso GPS denegado. Escribe tu Ciudad y Estado en "Mis Datos".';
        else if (error.code === 2) errorMsg = 'Señal GPS no disponible. Escribe tu Ciudad y Estado en "Mis Datos".';
        else if (error.code === 3) errorMsg = 'Tiempo de espera GPS agotado. Escribe tu Ciudad y Estado en "Mis Datos".';
        
        setGpsStatus(errorMsg);
        setIsLocating(false);
        fetchAIPlan(targetProfile);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 0 // No usar caché de ubicación para garantizar datos frescos
      }
    );
  };

  // Inicialización automática si no existe plan previo
  useEffect(() => {
    if (!plan) {
      requestGPSLocationAndCalculate(profile);
    }
  }, []);

  // Temporizador de cuenta regresiva para la siguiente toma
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && nextDoseCountdown > 0) {
      interval = setInterval(() => {
        setNextDoseCountdown(prev => {
          if (prev <= 1) {
            // Disparar alarma sonora
            if (alarmEnabled) {
              playChime('alarm');
              setSoundAlertTriggered(true);
              setTimeout(() => setSoundAlertTriggered(false), 6000);
            }
            return (plan?.intervalMinutes || 90) * 60; // reiniciar ciclo
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, nextDoseCountdown, alarmEnabled, plan]);

  // Agregar agua rápidamente
  const handleAddWater = (amount: number) => {
    setConsumedMl(prev => prev + amount);
    playChime('water');
  };

  // Toggle de toma programada
  const toggleScheduleItem = (index: number) => {
    const nextSchedules = [...schedules];
    const item = nextSchedules[index];
    const newCompleted = !item.completed;
    item.completed = newCompleted;
    setSchedules(nextSchedules);

    if (newCompleted) {
      handleAddWater(item.amountMl);
    } else {
      setConsumedMl(prev => Math.max(0, prev - item.amountMl));
    }
  };

  // Reiniciar día
  const handleResetDay = () => {
    setConsumedMl(0);
    if (plan) {
      setSchedules(plan.schedules.map(s => ({ ...s, completed: false })));
      setNextDoseCountdown((plan.intervalMinutes || 90) * 60);
    }
  };

  const targetMl = plan?.totalDailyMl || 3000;
  const percentage = Math.min(100, Math.round((consumedMl / targetMl) * 100));

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* ================= HERO CARD CON GPS & CLIMA REAL ================= */}
      <div className={`bg-[#121826] border ${soundAlertTriggered ? 'border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.4)] animate-pulse' : 'border-slate-800 shadow-xl'} rounded-3xl p-5 sm:p-6 transition-all relative overflow-hidden space-y-4`}>
        {/* Glow decorativo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Encabezado Principal */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" /> IA Médica & Clima Real
                </span>
                
                {/* Badge de GPS Activo */}
                <span className="text-[10px] font-bold bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/80 flex items-center max-w-[280px] sm:max-w-md truncate">
                  <Navigation className="w-2.5 h-2.5 mr-1 text-cyan-400 animate-pulse flex-shrink-0" />
                  <span className="truncate">
                    {plan?.city ? `${plan.city}${plan.state ? `, ${plan.state}` : ''}` : 'Detectando GPS...'}
                  </span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Recordatorio Inteligente</h2>
            </div>
          </div>

          {/* Acciones de Cabecera */}
          <div className="flex items-center space-x-2 flex-wrap">
            {/* Botón de Actualizar GPS */}
            <button
              onClick={() => requestGPSLocationAndCalculate(profile)}
              disabled={isLocating || isLoadingPlan}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 transition cursor-pointer flex items-center space-x-1 text-xs font-bold disabled:opacity-50"
              title="Detectar Ciudad, Estado y clima en tiempo real vía GPS"
            >
              <LocateFixed className={`w-4 h-4 text-cyan-400 ${isLocating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">GPS En Vivo</span>
            </button>

            {/* Ajustar Perfil Rápido */}
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border cursor-pointer ${
                isEditingProfile 
                  ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{isEditingProfile ? 'Cerrar' : 'Mis Datos'}</span>
            </button>

            {/* Interruptor de Alarma Sonora */}
            <button
              onClick={() => {
                setAlarmEnabled(!alarmEnabled);
                if (!alarmEnabled) playChime('water');
              }}
              className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-center ${
                alarmEnabled 
                  ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={alarmEnabled ? 'Alarma sonora activa' : 'Alarma silenciada'}
            >
              {alarmEnabled ? <BellRing className="w-4 h-4 text-cyan-400 animate-bounce" /> : <BellOff className="w-4 h-4" />}
            </button>

            {/* Test de Audio */}
            <button
              onClick={() => playChime('alarm')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition cursor-pointer"
              title="Probar sonido de alarma"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= PANEL SIMPLIFICADO DE DATOS (FÁCIL E INTUITIVO) ================= */}
        {isEditingProfile && (
          <div className="bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black text-white uppercase tracking-wider flex items-center">
                <Scale className="w-3.5 h-3.5 text-cyan-400 mr-1.5" /> Ubicación & Datos para el Cálculo
              </span>
              <span className="text-[11px] text-cyan-400 font-bold">Precisión Total</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Ciudad / Municipio */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Ciudad / Municipio
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.city === 'Ubicación GPS' || profile.city === 'Ubicación Automática' ? '' : profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value, latitude: null, longitude: null })}
                    placeholder="Ej: Miami, Valencia, Caracas, Madrid..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Estado / Provincia */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Estado / Provincia / Región
                  </label>
                  <span className="text-[9px] text-cyan-400 font-mono">
                    {profile.latitude && profile.longitude ? `GPS Satelital` : ''}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.state || ''}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value, latitude: null, longitude: null })}
                    placeholder="Ej: Florida, Carabobo, Madrid..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => requestGPSLocationAndCalculate()}
                    className="absolute right-2 top-2 p-1 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition"
                    title="Obtener Ciudad y Estado con el GPS del dispositivo"
                  >
                    <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin text-amber-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Peso */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Tu Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={profile.weightKg}
                  onChange={(e) => setProfile({ ...profile, weightKg: Number(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400 font-mono"
                  required
                />
              </div>

              {/* Sexo */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Sexo
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as 'male' | 'female' })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="male">Hombre</option>
                  <option value="female">Mujer</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-400 flex items-center">
                <LocateFixed className="w-3 h-3 mr-1 text-cyan-400" />
                {gpsStatus}
              </span>

              <button
                type="button"
                onClick={() => {
                  setIsEditingProfile(false);
                  fetchAIPlan(profile);
                }}
                disabled={isLoadingPlan}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center space-x-2"
              >
                {isLoadingPlan ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Recalculando con IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Guardar y Actualizar Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= 4 TARJETAS CLAVE: CLIMA, META, ALARMA & PROGRESO ================= */}
        {plan && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
            {/* Clima de la Ubicación GPS */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Clima GPS Actual</span>
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-lg font-black text-white font-mono flex items-center">
                {plan.temperatureEstimateC}°C
                <span className="text-xs font-normal text-slate-400 ml-2 truncate">{plan.weatherCondition}</span>
              </p>
              <div className="text-[10px] text-slate-400 mt-1 space-y-0.5">
                <span className="block text-cyan-400 font-bold truncate">
                  📍 {plan.city}{plan.state ? `, Edo. ${plan.state}` : ''}
                </span>
                <span className="text-slate-500 block">
                  Humedad: {plan.humidityEstimatePct}% {plan.country ? `(${plan.country})` : ''}
                </span>
              </div>
            </div>

            {/* Meta Total Diaria Recomendada */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Tu Meta Diaria</span>
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="text-lg font-black text-cyan-400 font-mono">
                {plan.totalDailyMl.toLocaleString()} <span className="text-xs font-normal text-slate-400">ml</span>
              </p>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                ~{(plan.totalDailyMl / 1000).toFixed(2)} Litros para tu peso y clima
              </span>
            </div>

            {/* Siguiente Alarma de Hidratación */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center">
                  <Timer className="w-3 h-3 mr-1 text-purple-400" /> Próxima Alarma
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="text-slate-400 hover:text-white text-[10px] font-bold cursor-pointer"
                >
                  {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-cyan-400" />}
                </button>
              </div>
              <p className="text-lg font-black text-purple-400 font-mono">
                {formatCountdown(nextDoseCountdown)}
              </p>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Cada {plan.intervalMinutes || 90} min (~{plan.hourlyDoseMl || 300}ml)
              </span>
            </div>

            {/* Progreso del Día */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Ingesta Hoy</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{percentage}%</span>
              </div>
              <p className="text-lg font-black text-emerald-400 font-mono">
                {consumedMl.toLocaleString()} <span className="text-xs font-normal text-slate-400">ml</span>
              </p>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-1.5 border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ALERTA VISUAL DE ALARMA SONORA ================= */}
        {soundAlertTriggered && (
          <div className="bg-cyan-950/90 border border-cyan-400 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-cyan-200 shadow-xl">
            <div className="flex items-center space-x-2">
              <BellRing className="w-5 h-5 text-cyan-300 animate-spin" />
              <span>¡Hora de beber agua! Toma unos <strong>~{plan?.hourlyDoseMl || 300}ml</strong> para mantener tu hidratación óptima.</span>
            </div>
            <button
              onClick={() => {
                setSoundAlertTriggered(false);
                handleAddWater(plan?.hourlyDoseMl || 300);
              }}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-black cursor-pointer shadow-md transition"
            >
              Registrar Toma (+{plan?.hourlyDoseMl || 300}ml)
            </button>
          </div>
        )}

        {/* Consejo Médico & Fisiológico de la IA */}
        {plan?.aiExplanation && (
          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-3.5 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold uppercase tracking-wider text-[10px]">
              <Sparkles className="w-3 h-3" />
              <span>Pauta Médica Personalizada (ACSM / Fisiología)</span>
            </div>
            <p className="leading-relaxed">{plan.aiExplanation}</p>
            {plan.electrolytesAdvice && (
              <p className="text-[11px] text-amber-300/90 pt-1 border-t border-slate-800">
                ⚡ <strong>Consejo de Sales & Electrolitos:</strong> {plan.electrolytesAdvice}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ================= SELECTOR DE GRÁFICOS INTUITIVOS Y AMENOS ================= */}
      <div className="bg-[#121826] border border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-lg">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-1.5 min-w-max">
            <button
              type="button"
              onClick={() => setActiveVisualTab('termo')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                activeVisualTab === 'termo'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25 font-black'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Termo con Oleaje</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveVisualTab('anillo')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                activeVisualTab === 'anillo'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/25 font-black'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Anillo & Bio-Energía</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveVisualTab('historial')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                activeVisualTab === 'historial'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/25 font-black'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Historial Semanal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveVisualTab('todos')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                activeVisualTab === 'todos'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/25 font-black'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver Todos</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= GRÁFICOS VISUALES ACTIVOS ================= */}
      {(activeVisualTab === 'termo' || activeVisualTab === 'todos') && (
        <HydrationBottleGraphic
          consumedMl={consumedMl}
          targetMl={targetMl}
          onAddWater={handleAddWater}
        />
      )}

      {(activeVisualTab === 'anillo' || activeVisualTab === 'todos') && (
        <HydrationRingTimeline
          percentage={percentage}
          consumedMl={consumedMl}
          targetMl={targetMl}
          schedules={schedules}
          onToggleSchedule={toggleScheduleItem}
        />
      )}

      {(activeVisualTab === 'historial' || activeVisualTab === 'todos') && (
        <HydrationWeeklyChart
          todayConsumedMl={consumedMl}
          todayTargetMl={targetMl}
          todayTempC={plan?.temperatureEstimateC || 26}
        />
      )}

      {/* ================= BOTONES DE INGESTA RÁPIDA (1 SOLO TOQUE) ================= */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Añadir con 1 Toque</h3>
              <p className="text-[10px] text-slate-400">Toca el botón correspondiente al recipiente que bebas</p>
            </div>
          </div>

          <button
            onClick={handleResetDay}
            className="text-[10px] font-bold text-slate-500 hover:text-red-400 transition flex items-center space-x-1 p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer"
            title="Reiniciar contador de hoy"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar Día</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <button
            onClick={() => handleAddWater(200)}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 transition active:scale-95 cursor-pointer group"
          >
            <span className="text-xs font-black text-white group-hover:text-cyan-300">+200 ml</span>
            <span className="text-[10px] text-slate-500">Vaso Pequeño</span>
          </button>

          <button
            onClick={() => handleAddWater(330)}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 transition active:scale-95 cursor-pointer group"
          >
            <span className="text-xs font-black text-white group-hover:text-cyan-300">+330 ml</span>
            <span className="text-[10px] text-slate-500">Vaso Grande / Lata</span>
          </button>

          <button
            onClick={() => handleAddWater(500)}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 transition active:scale-95 cursor-pointer group"
          >
            <span className="text-xs font-black text-white group-hover:text-cyan-300">+500 ml</span>
            <span className="text-[10px] text-slate-500">Botella Deportiva</span>
          </button>

          <button
            onClick={() => handleAddWater(750)}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 transition active:scale-95 cursor-pointer group"
          >
            <span className="text-xs font-black text-white group-hover:text-cyan-300">+750 ml</span>
            <span className="text-[10px] text-slate-500">Shaker de Gimnasio</span>
          </button>
        </div>
      </div>

      {/* ================= CRONOGRAMA DE ALARMAS DEL DÍA (INTUITIVO) ================= */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-sm">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Cronograma del Día</h3>
              <p className="text-[10px] text-slate-400">Marca las tomas conforme vayas bebiendo</p>
            </div>
          </div>

          <span className="text-[10px] font-bold bg-slate-900 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-xl">
            {schedules.filter(s => s.completed).length} / {schedules.length} cumplidas
          </span>
        </div>

        <div className="space-y-2.5">
          {schedules.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">
              Cargando cronograma adaptado a tu ubicación y temperatura...
            </p>
          ) : (
            schedules.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleScheduleItem(idx)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group ${
                  item.completed 
                    ? 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`p-1.5 rounded-xl border transition ${
                      item.completed 
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400' 
                        : 'bg-slate-950 border-slate-700 text-slate-600 group-hover:text-cyan-400'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-black text-white">{item.time}</span>
                      <span className="text-[10px] font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                        {item.amountMl} ml
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.reason}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-bold ${item.completed ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {item.completed ? 'Tomada' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
