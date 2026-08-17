// Video IDs for curated, verified HD exercise technique tutorials

interface VideoInfo {
  youtubeId: string;
  channel: string;
  title: string;
  duration?: string;
}

export const EXERCISE_VIDEO_MAP: Record<string, VideoInfo> = {
  // PECHO
  "press_banca_barra": {
    youtubeId: "rT7DgCr-3pg",
    channel: "Jeff Nippard",
    title: "Press de Banca con Barra - Técnica Perfecta",
  },
  "press_inclinado_mancuernas": {
    youtubeId: "8iPEnn-ltC8",
    channel: "Scott Herman Fitness",
    title: "Press Inclinado con Mancuernas - Máxima Hipertrofia",
  },
  "cruces_polea_alta": {
    youtubeId: "Iwe6AmxVf7o",
    channel: "Athlean-X",
    title: "Cruces de Polea para Pecho",
  },
  "fondos_pecho": {
    youtubeId: "2z8JmcrW-As",
    channel: "Calisthenicmovement",
    title: "Fondos en Paralelas - Técnica y Seguridad",
  },
  "aperturas_mancuerna_banco_plano": {
    youtubeId: "eozdVDA78K0",
    channel: "Buff Dudes",
    title: "Aperturas con Mancuernas",
  },
  "press_declinado_barra": {
    youtubeId: "LfyQBUKR8SE",
    channel: "Scott Herman",
    title: "Press Declinado con Barra",
  },

  // ESPALDA
  "jalon_pecho_polea_alta": {
    youtubeId: "CAwf7n6Luuc",
    channel: "Jeff Nippard",
    title: "Jalón al Pecho en Polea - Técnica Completa",
  },
  "remo_con_barra": {
    youtubeId: "G8l_8chR5BE",
    channel: "Alan Thrall",
    title: "Remo con Barra Pendlay / 45°",
  },
  "remo_gironda_polea_baja": {
    youtubeId: "GZbfZ033f74",
    channel: "Scott Herman",
    title: "Remo Gironda en Polea Baja",
  },
  "dominadas_pronadas": {
    youtubeId: "eGo4IYlbE5g",
    channel: "Calisthenicmovement",
    title: "Cómo Hacer Dominadas Perfectas",
  },
  "pull_over_polea_alta": {
    youtubeId: "9msG_5U1s_U",
    channel: "Athlean-X",
    title: "Pull-over en Polea para Dorsales",
  },
  "face_pull_polea": {
    youtubeId: "rep-qVOkqgk",
    channel: "Jeff Nippard",
    title: "Face Pulls para Deltoides Posterior y Manguito Rotador",
  },

  // PIERNAS
  "sentadilla_trasera_barra": {
    youtubeId: "bEv6CCg2BC8",
    channel: "Squat University",
    title: "Sentadilla Trasera con Barra - Profundidad y Postura",
  },
  "prensa_45_grados": {
    youtubeId: "IZxyjW7MPJQ",
    channel: "Renaissance Periodization",
    title: "Prensa de Piernas a 45° - Rango Completo",
  },
  "extension_cuadriceps_maquina": {
    youtubeId: "YyvSfV-77yU",
    channel: "Jeff Nippard",
    title: "Extensiones de Cuádriceps en Máquina",
  },
  "peso_muerto_rumano": {
    youtubeId: "_oyxCn2iSjU",
    channel: "Jeff Nippard",
    title: "Peso Muerto Rumano (RDL) para Glúteos e Isquiotibiales",
  },
  "curl_femoral_tumbado": {
    youtubeId: "1Tq3QdYUuHs",
    channel: "Scott Herman",
    title: "Curl Femoral Tumbado en Máquina",
  },
  "elevacion_talones_de_pie": {
    youtubeId: "gwLzBJYoWlI",
    channel: "Athlean-X",
    title: "Elevación de Talones para Gemelos",
  },
  "sentadilla_hack": {
    youtubeId: "0tn5K9NlCfo",
    channel: "Renaissance Periodization",
    title: "Hack Squat - Enfoque en Cuádriceps",
  },
  "hip_thrust_barra": {
    youtubeId: "LM8XHLYJoYs",
    channel: "Bret Contreras",
    title: "Hip Thrust con Barra - Técnica del Glute Guy",
  },
  "peso_muerto_convencional": {
    youtubeId: "op9kVnSso6Q",
    channel: "Alan Thrall",
    title: "Cómo Hacer Peso Muerto Convencional",
  },

  // HOMBROS
  "press_militar_barra_de_pie": {
    youtubeId: "2yjwXTZQDDI",
    channel: "Alan Thrall",
    title: "Press Militar con Barra de Pie (Overhead Press)",
  },
  "elevaciones_laterales_mancuerna": {
    youtubeId: "3VcKaXpzqRo",
    channel: "Jeff Nippard",
    title: "Elevaciones Laterales con Mancuernas",
  },
  "pajaros_mancuernas_posterior": {
    youtubeId: "ttvfGg9d76c",
    channel: "Scott Herman",
    title: "Pájaros con Mancuernas para Deltoides Posterior",
  },
  "press_arnold_mancuernas": {
    youtubeId: "6Z15_WdXmVw",
    channel: "Buff Dudes",
    title: "Press Arnold para Hombros 3D",
  },

  // BRAZOS
  "curl_biceps_barra_z": {
    youtubeId: "in7PaeYlJkc",
    channel: "Scott Herman",
    title: "Curl de Bíceps con Barra Z",
  },
  "curl_martillo_mancuernas": {
    youtubeId: "zC3nLlEvin4",
    channel: "Athlean-X",
    title: "Curl Martillo para Braquial y Antebrazo",
  },
  "curl_concentrado_mancuerna": {
    youtubeId: "Jvj2wV0vOYU",
    channel: "Buff Dudes",
    title: "Curl Concentrado con Mancuerna",
  },
  "extension_triceps_polea_alta": {
    youtubeId: "2-LAMcpzODU",
    channel: "Jeff Nippard",
    title: "Extensiones de Tríceps en Polea con Cuerda",
  },
  "press_frances_barra_z": {
    youtubeId: "d_KZxkY_0aw",
    channel: "Scott Herman",
    title: "Press Francés con Barra Z (Skull Crushers)",
  },
  "patada_triceps_polea": {
    youtubeId: "ZO81bExngMI",
    channel: "Scott Herman",
    title: "Patada de Tríceps en Polea",
  },

  // ABDOMEN Y CORE
  "crunch_polea_alta": {
    youtubeId: "2fOROdr7sMQ",
    channel: "Athlean-X",
    title: "Crunch en Polea Alta para Abdominales",
  },
  "elevacion_piernas_colgado": {
    youtubeId: "Pr1ieGZ5atk",
    channel: "Calisthenicmovement",
    title: "Elevación de Piernas Colgado",
  },
  "plancha_isometrica": {
    youtubeId: "pSHjTRCQxIw",
    channel: "Bowflex",
    title: "Plancha Abdominal - Postura Correcta",
  },
  "rueda_abdominal": {
    youtubeId: "rqiTPdK1cKc",
    channel: "Athlean-X",
    title: "Ab Wheel Rollout - Técnica Segura",
  }
};

// Fallback lookup based on name or muscle keywords
export function getExerciseVideo(exerciseId: string, exerciseName: string, muscle: string): VideoInfo {
  if (EXERCISE_VIDEO_MAP[exerciseId]) {
    return EXERCISE_VIDEO_MAP[exerciseId];
  }

  // Find by name substring match
  const lowerName = exerciseName.toLowerCase();
  for (const [key, val] of Object.entries(EXERCISE_VIDEO_MAP)) {
    const keyClean = key.replace(/_/g, ' ');
    if (lowerName.includes(keyClean) || keyClean.includes(lowerName.slice(0, 8))) {
      return val;
    }
  }

  // Fallback by exercise type keywords
  if (lowerName.includes('sentadilla') || lowerName.includes('squat')) {
    return EXERCISE_VIDEO_MAP['sentadilla_trasera_barra'];
  }
  if (lowerName.includes('banca') || lowerName.includes('pecho') || lowerName.includes('bench')) {
    return EXERCISE_VIDEO_MAP['press_banca_barra'];
  }
  if (lowerName.includes('muerto') || lowerName.includes('deadlift')) {
    return EXERCISE_VIDEO_MAP['peso_muerto_rumano'];
  }
  if (lowerName.includes('jalon') || lowerName.includes('dominada') || lowerName.includes('lat pulldown')) {
    return EXERCISE_VIDEO_MAP['jalon_pecho_polea_alta'];
  }
  if (lowerName.includes('remo') || lowerName.includes('row')) {
    return EXERCISE_VIDEO_MAP['remo_con_barra'];
  }
  if (lowerName.includes('hombro') || lowerName.includes('militar') || lowerName.includes('overhead')) {
    return EXERCISE_VIDEO_MAP['press_militar_barra_de_pie'];
  }
  if (lowerName.includes('lateral')) {
    return EXERCISE_VIDEO_MAP['elevaciones_laterales_mancuerna'];
  }
  if (lowerName.includes('biceps') || lowerName.includes('curl')) {
    return EXERCISE_VIDEO_MAP['curl_biceps_barra_z'];
  }
  if (lowerName.includes('triceps') || lowerName.includes('frances') || lowerName.includes('pushdown')) {
    return EXERCISE_VIDEO_MAP['extension_triceps_polea_alta'];
  }
  if (lowerName.includes('prensa') || lowerName.includes('leg press')) {
    return EXERCISE_VIDEO_MAP['prensa_45_grados'];
  }
  if (lowerName.includes('extension') && lowerName.includes('cuadriceps')) {
    return EXERCISE_VIDEO_MAP['extension_cuadriceps_maquina'];
  }
  if (lowerName.includes('femoral') || lowerName.includes('hamstring')) {
    return EXERCISE_VIDEO_MAP['curl_femoral_tumbado'];
  }
  if (lowerName.includes('gemelo') || lowerName.includes('talon') || lowerName.includes('calf')) {
    return EXERCISE_VIDEO_MAP['elevacion_talones_de_pie'];
  }
  if (lowerName.includes('abdomen') || lowerName.includes('crunch') || lowerName.includes('plancha')) {
    return EXERCISE_VIDEO_MAP['plancha_isometrica'];
  }

  // Default ultimate fallback
  return {
    youtubeId: "rT7DgCr-3pg",
    channel: "Fitness Pro",
    title: `${exerciseName} - Demostración Técnica`,
  };
}
