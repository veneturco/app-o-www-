export type MuscleGroup = 
  | 'pecho'
  | 'espalda'
  | 'cuadriceps'
  | 'isquios'
  | 'gluteos'
  | 'gemelos'
  | 'hombros'
  | 'biceps'
  | 'triceps'
  | 'antebrazos'
  | 'lumbares'
  | 'trapecio'
  | 'core'
  | 'cardio';

export type EquipmentType = 
  | 'maquina'
  | 'mancuerna'
  | 'barra'
  | 'polea'
  | 'peso_corporal'
  | 'cardio_maquina';

export type Category = 
  | 'ALL'
  | 'DUMBBELL'
  | 'MACHINE'
  | 'CARDIO'
  | 'todos'
  | 'pecho'
  | 'espalda'
  | 'piernas'
  | 'hombros'
  | 'brazos'
  | 'trapecio'
  | 'lumbares'
  | 'antebrazos'
  | 'gemelos'
  | 'core'
  | 'cardio';

export type DifficultyLevel = 'Principiante' | 'Intermedio' | 'Avanzado';

export type SetType = 'warmup' | 'working' | 'dropset' | 'failure';

export interface CommonMistake {
  mistake: string;
  fix: string;
  dangerLevel: 'Bajo' | 'Medio' | 'Alto';
}

export interface MachineSetup {
  seatHeight?: string;
  backrestAngle?: string;
  pinOrCableLevel?: string;
  handleOrGrip?: string;
  safetyCatch?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  categoryLabel?: string;
  muscle: string;
  secondary: string[];
  tempo: string;
  equipment: string;
  rest: number;
  tips: string[];
  mistakes: string[];
  imgMale: string;
  imgFemale: string;
  videoUrl?: string;
  youtubeId?: string;
  coachExplanation?: string;
  videoTutorialGuide?: {
    focusPoints: string[];
    breathingGuide: string;
    cadenceText: string;
  };

  // Rich extensions
  machineName?: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  difficulty: DifficultyLevel;
  shortDesc: string;
  machineSetup: MachineSetup;
  executionSteps: {
    title: string;
    description: string;
  }[];
  biomechanicsTips: string[];
  commonMistakes: CommonMistake[];
  targetZone: string;
  repRange: string;
  rpeRecommendation: string;
  tempoAdvice: string;
  svgGraphicType: 
    | 'press' 
    | 'pull' 
    | 'squat' 
    | 'extension' 
    | 'curl' 
    | 'cable' 
    | 'treadmill' 
    | 'abs'
    | 'row'
    | 'rdl'
    | 'hip_thrust'
    | 'dips'
    | 'lateral'
    | 'calf'
    | 'crunch'
    | 'fly'
    | 'forearm'
    | 'hyperextension';
}

export interface LoggedSet {
  id: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  rpe?: number;
  setType: SetType;
  completed: boolean;
  timestamp: number;
}

export interface ExerciseHistory {
  exerciseId: string;
  sets: LoggedSet[];
  date: string;
  personalRecordKg?: number;
}

export interface ActiveWorkout {
  id: string;
  name: string;
  startedAt: number;
  exercises: {
    exerciseId: string;
    sets: LoggedSet[];
  }[];
}

export interface RoutinePreset {
  id: string;
  title: string;
  subtitle: string;
  frequency: string;
  focus: string;
  exerciseIds: string[];
  tag: string;
}

export interface HydrationScheduleItem {
  time: string; // "08:30"
  amountMl: number;
  reason: string;
  completed?: boolean;
}

export interface AIHydrationPlan {
  city: string;
  state?: string;
  country?: string;
  formattedLocation?: string;
  temperatureEstimateC: number;
  weatherCondition: string;
  humidityEstimatePct: number;
  totalDailyMl: number;
  hourlyDoseMl: number;
  intervalMinutes: number;
  schedules: HydrationScheduleItem[];
  aiExplanation: string;
  electrolytesAdvice: string;
  source?: string;
  lastGeneratedAt?: string;
}

export interface UserHydrationProfile {
  weightKg: number;
  gender: 'male' | 'female';
  age: number;
  city: string;
  state?: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  activityLevel: string;
  wakeTime: string;
  sleepTime: string;
}

export interface HydrationDayRecord {
  dateStr: string; // "2026-08-17"
  dayName: string; // "Lun", "Mar", "Mié"...
  consumedMl: number;
  targetMl: number;
  temperatureC?: number;
  completedGoal: boolean;
}
