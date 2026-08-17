import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Category, 
  Exercise, 
  LoggedSet, 
  MuscleGroup 
} from './types';
import { EXERCISES_DATABASE } from './data/exercises';
import { Header } from './components/Header';
import { ExerciseViewer } from './components/ExerciseViewer';
import { InteractiveBodyMap } from './components/InteractiveBodyMap';
import { RestTimer } from './components/RestTimer';
import { OneRMCalculator } from './components/OneRMCalculator';
import { PlateCalculator } from './components/PlateCalculator';
import { WorkoutSessionTracker } from './components/WorkoutSessionTracker';
import { WorkoutHistory } from './components/WorkoutHistory';
import { AIHydrationReminder } from './components/AIHydrationReminder';
import { 
  Search, 
  Bookmark, 
  Info,
  SlidersHorizontal
} from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'enciclopedia' | 'bodymap' | 'tracker' | 'history' | 'hydration' | 'calculators'>('enciclopedia');
  
  // Search and Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<MuscleGroup | null>(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(EXERCISES_DATABASE[0].id);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  // Favorites state (persisted in localStorage)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hydrofit_favorites');
      return saved ? JSON.parse(saved) : ['press_inclinado_mancuernas', 'prensa_piernas', 'jalon_pecho'];
    } catch {
      return ['press_inclinado_mancuernas', 'prensa_piernas', 'jalon_pecho'];
    }
  });

  // Logged sets state (persisted in localStorage)
  const [loggedSetsRecord, setLoggedSetsRecord] = useState<Record<string, LoggedSet[]>>(() => {
    try {
      const saved = localStorage.getItem('hydrofit_sets_today');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Rest Timer State
  const [timerOpen, setTimerOpen] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(90);
  const [timerRemaining, setTimerRemaining] = useState<number>(90);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerMinimized, setTimerMinimized] = useState<boolean>(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hydrofit_favorites', JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  useEffect(() => {
    try {
      localStorage.setItem('hydrofit_sets_today', JSON.stringify(loggedSetsRecord));
    } catch {
      // ignore
    }
  }, [loggedSetsRecord]);

  // Rest Timer ticking logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerRemaining]);

  const startRestTimer = (seconds: number) => {
    setTimerDuration(seconds);
    setTimerRemaining(seconds);
    setTimerRunning(true);
    setTimerOpen(true);
    setTimerMinimized(false);
  };

  const handleToggleTimerPlay = () => {
    if (timerRemaining === 0) {
      setTimerRemaining(timerDuration);
      setTimerRunning(true);
    } else {
      setTimerRunning(prev => !prev);
    }
  };

  const handleResetTimer = () => {
    setTimerRemaining(timerDuration);
    setTimerRunning(false);
  };

  const handleAddTimerSeconds = (secs: number) => {
    setTimerRemaining(prev => prev + secs);
    setTimerDuration(prev => prev + secs);
  };

  const handleSetTimerPreset = (secs: number) => {
    setTimerDuration(secs);
    setTimerRemaining(secs);
    setTimerRunning(true);
  };

  const handleToggleFavorite = (exerciseId: string) => {
    setFavoriteIds(prev =>
      prev.includes(exerciseId) ? prev.filter(id => id !== exerciseId) : [...prev, exerciseId]
    );
  };

  // Set management handlers
  const handleAddSet = (exerciseId: string, set: Omit<LoggedSet, 'id' | 'timestamp'>) => {
    const newSet: LoggedSet = {
      ...set,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    setLoggedSetsRecord(prev => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] || []), newSet]
    }));
  };

  const handleDeleteSet = (exerciseId: string, setId: string) => {
    setLoggedSetsRecord(prev => ({
      ...prev,
      [exerciseId]: (prev[exerciseId] || []).filter(s => s.id !== setId)
    }));
  };

  const handleToggleCompleteSet = (exerciseId: string, setId: string) => {
    setLoggedSetsRecord(prev => ({
      ...prev,
      [exerciseId]: (prev[exerciseId] || []).map(s =>
        s.id === setId ? { ...s, completed: !s.completed } : s
      )
    }));
  };

  const handleClearSession = () => {
    if (window.confirm('¿Seguro que deseas reiniciar el registro de series de hoy?')) {
      setLoggedSetsRecord({});
    }
  };

  // Category definitions from prompt
  const categories = [
    { id: 'ALL', label: 'Todos', icon: '⚡' },
    { id: 'DUMBBELL', label: 'Mancuernas', icon: '💪' },
    { id: 'MACHINE', label: 'Máquinas & Poleas', icon: '⚙️' },
    { id: 'CARDIO', label: 'Cardio & Bici', icon: '🚴' }
  ];

  // Filtered exercises based on Category, Search query, Favorites, and Muscle Map
  const filteredExercises = useMemo(() => {
    return EXERCISES_DATABASE.filter(ex => {
      // Search text match across name, muscle, equipment, machine, etc.
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ex.name.toLowerCase().includes(q);
        const matchesMuscle = ex.muscle.toLowerCase().includes(q) || ex.primaryMuscle?.toLowerCase().includes(q);
        const matchesEquipment = ex.equipment.toLowerCase().includes(q);
        const matchesMachine = ex.machineName?.toLowerCase().includes(q);
        const matchesTarget = ex.targetZone?.toLowerCase().includes(q);
        if (!matchesName && !matchesMuscle && !matchesEquipment && !matchesMachine && !matchesTarget) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'ALL' && ex.category !== selectedCategory) {
        return false;
      }

      // Body Map muscle filter
      if (selectedMuscleFilter) {
        const matchesPrimary = ex.primaryMuscle === selectedMuscleFilter;
        const matchesSecondary = ex.secondaryMuscles && ex.secondaryMuscles.includes(selectedMuscleFilter);
        const matchesMuscleName = ex.muscle.toLowerCase().includes(selectedMuscleFilter.toLowerCase());
        if (!matchesPrimary && !matchesSecondary && !matchesMuscleName) {
          return false;
        }
      }

      // Favorites filter
      if (showOnlyFavorites && !favoriteIds.includes(ex.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedMuscleFilter, showOnlyFavorites, favoriteIds]);

  const currentExercise = useMemo(() => {
    return (
      EXERCISES_DATABASE.find(ex => ex.id === selectedExerciseId) ||
      filteredExercises[0] ||
      EXERCISES_DATABASE[0]
    );
  }, [selectedExerciseId, filteredExercises]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans">
      {/* Header with quick stats and tabs */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timerActive={timerRunning}
        timerSecondsRemaining={timerRemaining}
        openTimer={() => {
          setTimerOpen(true);
          setTimerMinimized(false);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-5 py-5 space-y-5">
        <AnimatePresence mode="wait">
          {/* VIEW 1: ENCICLOPEDIA & TRACKER */}
          {activeTab === 'enciclopedia' && (
            <motion.div
              key="enciclopedia"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-5"
            >
              {/* Search and Category Bento Section */}
              <div className="bg-[#121826] border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3.5">
                {/* Main Search Input */}
                <div className="relative">
                  <input
                    id="searchInput"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar máquina, mancuerna, músculo (ej. prensa, polea, pecho)..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl px-4 py-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded-xl transition cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Muscle Group Quick Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 custom-scrollbar text-[11px]">
                  <span className="text-[10px] font-bold uppercase text-slate-500 mr-1 flex-shrink-0">Músculo:</span>
                  {[
                    { id: null, label: 'Todos' },
                    { id: 'pecho', label: 'Pecho' },
                    { id: 'espalda', label: 'Espalda' },
                    { id: 'trapecio', label: 'Trapecio' },
                    { id: 'lumbares', label: 'Lumbares' },
                    { id: 'cuadriceps', label: 'Cuádriceps' },
                    { id: 'isquios', label: 'Isquios' },
                    { id: 'gluteos', label: 'Glúteos' },
                    { id: 'gemelos', label: 'Gemelos' },
                    { id: 'hombros', label: 'Hombros' },
                    { id: 'biceps', label: 'Bíceps' },
                    { id: 'triceps', label: 'Tríceps' },
                    { id: 'antebrazos', label: 'Antebrazos' },
                    { id: 'core', label: 'Abdomen' },
                    { id: 'cardio', label: 'Cardio' }
                  ].map((m) => {
                    const isSelected = selectedMuscleFilter === m.id;
                    return (
                      <button
                        key={m.label}
                        onClick={() => {
                          setSelectedMuscleFilter(m.id as MuscleGroup | null);
                          setSelectedCategory('ALL');
                        }}
                        className={`px-3 py-1 rounded-xl font-bold transition whitespace-nowrap border cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                            : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>

                {/* Category Tabs */}
                <div id="categoryTabs" className="flex items-center justify-between gap-2 overflow-x-auto pb-1 custom-scrollbar">
                  <div className="flex space-x-2">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setSelectedMuscleFilter(null);
                          }}
                          className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap border cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                              : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Favorites quick toggle */}
                  <button
                    onClick={() => setShowOnlyFavorites(prev => !prev)}
                    className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                      showOnlyFavorites
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
                        : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current' : ''}`} />
                    <span>Favoritos ({favoriteIds.length})</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Exercise Chips Bento List */}
              <div id="exerciseChips" className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-medium">
                  <span>{filteredExercises.length} ejercicios encontrados</span>
                  <span>Selecciona para ver la ficha técnica completa</span>
                </div>

                <div className="flex space-x-3 overflow-x-auto pb-2 custom-scrollbar">
                  {filteredExercises.map((ex) => {
                    const isSelected = currentExercise.id === ex.id;
                    const isFav = favoriteIds.includes(ex.id);
                    const setsCount = loggedSetsRecord[ex.id]?.length || 0;

                    return (
                      <div
                        key={ex.id}
                        onClick={() => setSelectedExerciseId(ex.id)}
                        className={`flex-shrink-0 w-52 sm:w-60 p-4 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/30 border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                            : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                              {ex.categoryLabel || ex.category}
                            </span>
                            {isFav && <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-current" />}
                          </div>
                          <h4 className="text-xs font-bold text-white line-clamp-1 leading-tight">{ex.name}</h4>
                          <p className="text-[10px] text-slate-400 capitalize">{ex.muscle.split('(')[0]}</p>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                          <span className="font-semibold text-cyan-300">⏱️ {ex.rest}s</span>
                          {setsCount > 0 && (
                            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              {setsCount} series
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Exercise Viewer */}
              <div id="exerciseViewer">
                <ExerciseViewer
                  exercise={currentExercise}
                  loggedSets={loggedSetsRecord[currentExercise.id] || []}
                  onAddSet={(set) => handleAddSet(currentExercise.id, set)}
                  onDeleteSet={(setId) => handleDeleteSet(currentExercise.id, setId)}
                  onToggleComplete={(setId) => handleToggleCompleteSet(currentExercise.id, setId)}
                  onStartRestTimer={startRestTimer}
                  isFavorite={favoriteIds.includes(currentExercise.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            </motion.div>
          )}

          {/* VIEW 2: MAPA ANATÓMICO INTERACTIVO */}
          {activeTab === 'bodymap' && (
            <motion.div
              key="bodymap"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-4"
            >
              <InteractiveBodyMap
                selectedMuscle={selectedMuscleFilter}
                onSelectMuscle={(muscle) => {
                  setSelectedMuscleFilter(muscle);
                  setSelectedCategory('ALL');
                  setActiveTab('enciclopedia');
                }}
              />

              {/* Explanatory banner */}
              <div className="bg-[#121826] border border-slate-800 rounded-3xl p-5 flex items-center space-x-3.5 text-xs text-slate-300 shadow-xl">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 flex-shrink-0 border border-cyan-500/20">
                  <Info className="w-5 h-5" />
                </div>
                <p className="leading-relaxed">
                  Al seleccionar cualquier grupo muscular (Pectorales, Dorsales, Cuádriceps, Deltoides, Bíceps, etc.) la aplicación filtrará instantáneamente la biblioteca con los ejercicios más efectivos y su ficha técnica.
                </p>
              </div>
            </motion.div>
          )}

          {/* VIEW 3: TRACKER & HISTORIAL DE SERIES */}
          {activeTab === 'tracker' && (
            <motion.div
              key="tracker"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <WorkoutSessionTracker
                exercises={EXERCISES_DATABASE}
                allLoggedSets={loggedSetsRecord}
                onSelectExercise={(exId) => {
                  setSelectedExerciseId(exId);
                  setActiveTab('enciclopedia');
                }}
                onClearSession={handleClearSession}
              />
            </motion.div>
          )}

          {/* VIEW 4: HISTORIAL DE ENTRENAMIENTOS GUARDADOS */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <WorkoutHistory />
            </motion.div>
          )}

          {/* VIEW 5: RECORDATORIO DE HIDRATACIÓN IA CON CLIMA & ALARMAS */}
          {activeTab === 'hydration' && (
            <motion.div
              key="hydration"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <AIHydrationReminder />
            </motion.div>
          )}

          {/* VIEW 6: CALCULADORAS (1RM & DISCOS) */}
          {activeTab === 'calculators' && (
            <motion.div
              key="calculators"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-5"
            >
              <OneRMCalculator />
              <PlateCalculator />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating or Modal Rest Timer */}
      <RestTimer
        isOpen={timerOpen}
        onClose={() => {
          setTimerOpen(false);
          setTimerRunning(false);
        }}
        secondsRemaining={timerRemaining}
        totalDuration={timerDuration}
        isRunning={timerRunning}
        onTogglePlay={handleToggleTimerPlay}
        onReset={handleResetTimer}
        onAddSeconds={handleAddTimerSeconds}
        onSetPreset={handleSetTimerPreset}
        isMinimized={timerMinimized}
        setIsMinimized={setTimerMinimized}
      />

      {/* Bottom Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0B0F19] px-4 py-4 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-1.5">
            <span className="text-cyan-400 font-black">HYDROFIT GYM PRO</span>
            <span>• Enciclopedia & Tracker de Series</span>
          </div>
          <span>Técnica segura & biomecánica basada en evidencia</span>
        </div>
      </footer>
    </div>
  );
}
