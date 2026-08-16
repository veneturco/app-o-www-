import { Exercise, RoutinePreset } from '../types';

export const EXERCISES_DATABASE: Exercise[] = [
  // 1. MANCUERNAS - PRESS INCLINADO
  {
    id: "press_inclinado_mancuernas",
    name: "Press Inclinado con Mancuernas",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas",
    muscle: "Pectoral Superior (Haz Clavicular)",
    secondary: ["Deltoides Anterior", "Tríceps"],
    tempo: "3-1-1 (3s bajada / 1s pausa / 1s empuje)",
    equipment: "Mancuernas + Banco 30°",
    rest: 90,
    tips: [
      "Inclinación del banco entre 30° y 45°.",
      "Codos en ángulo de 60° respecto al tronco (evitar abrirlos en cruz a 90°).",
      "Empuje en arco convergente hacia el centro sin chocar las mancuernas."
    ],
    mistakes: [
      "Poner el banco a más de 45° (transfiere el esfuerzo a los hombros).",
      "Chocar las mancuernas en la parte alta perdiendo tensión."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Bench_Press/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Bench_Press/1.jpg",
    primaryMuscle: "pecho",
    secondaryMuscles: ["hombros", "triceps"],
    difficulty: "Intermedio",
    shortDesc: "Sobrecarga específica para la porción clavicular del pectoral con mayor rango articular que la barra.",
    machineName: "Banco Regulable 30° + Mancuernas",
    machineSetup: {
      backrestAngle: "Banco inclinado a 30°-45° clavado en posición fija.",
      seatHeight: "Asiento inclinado una muesca hacia arriba para no resbalar.",
      handleOrGrip: "Mancuernas tomadas con agarre semipronado firme."
    },
    executionSteps: [
      {
        title: "Montaje con Rodillas",
        description: "Coloca las mancuernas en las rodillas y patéalas hacia el pecho al acostarte hacia atrás."
      },
      {
        title: "Retracción Escapular",
        description: "Retrae y deprime escápulas contra el banco sacando el pecho."
      },
      {
        title: "Descenso Controlado",
        description: "Baja en 3 segundos abriendo los codos a 60° hasta tocar el borde del pectoral superior."
      },
      {
        title: "Empuje Convergente",
        description: "Empuja en arco suave hacia arriba y al centro sin bloquear los codos ni chocar las pesas."
      }
    ],
    biomechanicsTips: [
      "Un banco a 30° maximiza la activación de la cabeza clavicular con mínima interferencia del deltoides anterior.",
      "El agarre a 45° (semi-neutro) reduce el estrés en el manguito rotador."
    ],
    commonMistakes: [
      {
        mistake: "Inclinación excesiva a 60° (convirtiéndolo en press de hombro)",
        fix: "Mantén el respaldo a 30° exactos.",
        dangerLevel: "Medio"
      },
      {
        mistake: "Chocar las mancuernas arriba",
        fix: "Detente con las mancuernas a 5 cm de distancia manteniendo tensión constante.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Pectoral Mayor (Cabeza Clavicular), Deltoides Anterior, Tríceps Braquial",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3-1-1-0",
    svgGraphicType: "press"
  },

  // 2. MANCUERNAS - ELEVACIONES LATERALES
  {
    id: "elevaciones_laterales",
    name: "Elevaciones Laterales",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas",
    muscle: "Deltoides Lateral (Hombros 3D)",
    secondary: ["Trapecio Superior", "Supraespinoso"],
    tempo: "2-1-3 (2s subida / 1s pausa arriba / 3s bajada lenta)",
    equipment: "Mancuernas Ligeras/Medias",
    rest: 60,
    tips: [
      "Elevar en el plano escapular (unos 30° adelantado del cuerpo).",
      "Codos con ligera flexión (15°), guiando la subida desde el codo.",
      "Subir solo hasta la altura del hombro para no sobrecargar el trapecio."
    ],
    mistakes: [
      "Balancear la espalda baja para tomar impulso.",
      "Girar las muñecas hacia arriba (el pulgar debe quedar neutro o ligeramente abajo)."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg",
    primaryMuscle: "hombros",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Principiante",
    shortDesc: "El constructor indiscutible de amplitud y silueta en V para los hombros.",
    machineName: "Mancuernas",
    machineSetup: {
      handleOrGrip: "Mancuernas sostenidas lateralmente con palmas hacia el cuerpo."
    },
    executionSteps: [
      {
        title: "Postura",
        description: "Pies al ancho de caderas, torso con inclinación imperceptible (5°) al frente."
      },
      {
        title: "Elevación en Plano Escapular",
        description: "Eleva los codos hacia los laterales en un plano 30° hacia el frente."
      },
      {
        title: "Pico Isométrico",
        description: "Sostén 1 segundo cuando los brazos alcancen la línea horizontal de los hombros."
      },
      {
        title: "Descenso Lento",
        description: "Baja en 3 segundos frenando la gravedad hasta las caderas."
      }
    ],
    biomechanicsTips: [
      "Pensar en empujar las paredes hacia los lados en vez de levantar el peso hacia arriba.",
      "Mantén las escápulas deprimidas para no activar prematuramente el trapecio superior."
    ],
    commonMistakes: [
      {
        mistake: "Balancear el torso con tirón lumbar",
        fix: "Usa un peso moderado y haz pausa abajo antes de cada repetición.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Deltoides Lateral (Cabeza Media)",
    repRange: "12 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 10",
    tempoAdvice: "2-1-3-0",
    svgGraphicType: "cable"
  },

  // 3. MANCUERNAS - CURL MARTILLO
  {
    id: "curl_martillo",
    name: "Curl Martillo Neutral",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas",
    muscle: "Braquial Anterior & Braquiorradial",
    secondary: ["Bíceps Braquial", "Antebrazo"],
    tempo: "2-1-2 (2s flexión / 1s squeeze / 2s bajada)",
    equipment: "Mancuernas",
    rest: 60,
    tips: [
      "Palmas mirándose entre sí durante todo el trayecto (agarre neutro).",
      "Codos fijos a los lados de las costillas.",
      "Apretar el antebrazo en la parte superior."
    ],
    mistakes: [
      "Mover los codos hacia adelante restando tensión al braquial.",
      "Balancear el tronco hacia atrás."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/1.jpg",
    primaryMuscle: "biceps",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Principiante",
    shortDesc: "Desarrollo del grosor del brazo superior y fuerza de agarre en muñecas y antebrazos.",
    machineName: "Mancuernas",
    machineSetup: {
      handleOrGrip: "Agarre neutro (palmas enfrentadas) cerrado firme."
    },
    executionSteps: [
      {
        title: "Inicio",
        description: "Brazos totalmente extendidos a los costados con mancuernas paralelas."
      },
      {
        title: "Flexión Neutra",
        description: "Flexiona los codos subiendo las mancuernas sin rotar las muñecas."
      },
      {
        title: "Contracción",
        description: "Aprieta con fuerza los antebrazos y braquial arriba."
      },
      {
        title: "Bajada Controlada",
        description: "Desciende en 2 segundos hasta el estiramiento completo del bíceps."
      }
    ],
    biomechanicsTips: [
      "El agarre neutro coloca al bíceps en desventaja mecánica, transfiriendo la mayor carga al braquial profundo.",
      "Mantén los hombros fijos hacia atrás."
    ],
    commonMistakes: [
      {
        mistake: "Llevar los codos adelante usando el deltoides anterior",
        fix: "Pega los codos a tus costados como si fueran bisagras fijas.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Braquial Anterior, Braquiorradial (Antebrazo), Bíceps Braquial",
    repRange: "10 - 14 reps",
    rpeRecommendation: "RPE 8 - 9.5",
    tempoAdvice: "2-1-2-0",
    svgGraphicType: "curl"
  },

  // 4. MÁQUINAS Y POLEAS - JALÓN AL PECHO
  {
    id: "jalon_pecho",
    name: "Jalón al Pecho en Polea Alta",
    category: "MACHINE",
    categoryLabel: "Máquinas & Poleas",
    muscle: "Dorsal Ancho (Espalda en V)",
    secondary: ["Bíceps", "Redondo Mayor", "Trapecio Inferior"],
    tempo: "2-1-3 (2s tirón / 1s pecho afuera / 3s retorno)",
    equipment: "Máquina de Polea Alta + Barra",
    rest: 75,
    tips: [
      "Ajustar el rodillo para fijar bien los muslos.",
      "Llevar la barra a la parte superior del esternón sacando el pecho.",
      "Conducir el movimiento con los codos hacia abajo."
    ],
    mistakes: [
      "Tirarse hacia atrás casi horizontal.",
      "Bajar la barra detrás de la nuca (peligro articular en manguito rotador)."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg",
    primaryMuscle: "espalda",
    secondaryMuscles: ["biceps", "hombros"],
    difficulty: "Principiante",
    shortDesc: "Tracción vertical fundamental para amplitud dorsal y desarrollo de redondo mayor.",
    machineName: "Torre Lat Pulldown",
    machineSetup: {
      seatHeight: "Ajustar el rodillo para fijar con firmeza los muslos contra el asiento.",
      handleOrGrip: "Barra ancha con agarre prono a 1.5 anchos de hombros."
    },
    executionSteps: [
      {
        title: "Inicio y Estiramiento",
        description: "Brazos extendidos arriba permitiendo la elevación escapular controlada."
      },
      {
        title: "Depresión Escapular",
        description: "Tira los omóplatos hacia abajo antes de doblar los codos."
      },
      {
        title: "Tracción al Esternón",
        description: "Tira la barra a la clavícula guiando con los codos hacia tus costillas."
      },
      {
        title: "Retorno en 3s",
        description: "Permite que la barra ascienda despacio sintiendo el estiramiento dorsal."
      }
    ],
    biomechanicsTips: [
      "Inclinación leve de 10°-15° de torso para abrir la línea de tracción hacia el esternón.",
      "Visualiza clavar los codos en los bolsillos traseros del pantalón."
    ],
    commonMistakes: [
      {
        mistake: "Bajar la barra trasnuca",
        fix: "Tira siempre al frente al pecho para proteger el manguito rotador.",
        dangerLevel: "Alto"
      },
      {
        mistake: "Columpiarse usando balanceo lumbar",
        fix: "Mantén el torso rígido y estricto.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Dorsal Ancho, Redondo Mayor, Trapecio medio e inferior, Bíceps",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "2-1-3-0",
    svgGraphicType: "pull"
  },

  // 5. MÁQUINAS Y POLEAS - PRENSA DE PIERNAS 45°
  {
    id: "prensa_piernas",
    name: "Prensa de Piernas 45° (Leg Press)",
    category: "MACHINE",
    categoryLabel: "Máquinas & Poleas",
    muscle: "Cuádriceps, Glúteo Mayor & Aductores",
    secondary: ["Isquiotibiales", "Gemelos"],
    tempo: "3-1-1 (3s descenso / 1s pausa / 1s empuje)",
    equipment: "Máquina Prensa 45°",
    rest: 90,
    tips: [
      "Pies al ancho de hombros en el centro de la plataforma.",
      "Mantener la espalda baja firmemente pegada al respaldo.",
      "No bloquear completamente las rodillas arriba."
    ],
    mistakes: [
      "Despegar la zona lumbar del asiento al bajar demasiado.",
      "Hiperextender las rodillas con fuerza en el bloqueo."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/1.jpg",
    primaryMuscle: "cuadriceps",
    secondaryMuscles: ["gluteos", "isquios"],
    difficulty: "Principiante",
    shortDesc: "Sobrecarga masiva multiarticular guiada para cuádriceps y glúteos.",
    machineName: "Leg Press 45° Incline",
    machineSetup: {
      backrestAngle: "Respaldo a 45°-60° para neutralidad pélvica.",
      safetyCatch: "Topes mecánicos colocados para impedir compresión lumbar.",
      handleOrGrip: "Sujetar firmemente los agarres laterales para anclar el glúteo."
    },
    executionSteps: [
      {
        title: "Posición de Pies",
        description: "Pies al ancho de hombros en el centro de la plataforma, puntas abiertas 15°."
      },
      {
        title: "Bajada en 3s",
        description: "Baja controladamente hasta 90° de flexión de rodilla sin levantar la pelvis."
      },
      {
        title: "Pausa en el Fondo",
        description: "Pausa de 1 segundo en el punto más profundo."
      },
      {
        title: "Empuje Total",
        description: "Empuja con toda la planta del pie parando justo antes de bloquear rodillas."
      }
    ],
    biomechanicsTips: [
      "Pies bajos en plataforma: Mayor reclutamiento de cuádriceps.",
      "Pies altos en plataforma: Mayor activación de glúteo e isquiotibiales."
    ],
    commonMistakes: [
      {
        mistake: "Hiperextender rodillas con violencia en el bloqueo",
        fix: "Mantén una microflexión constante al llegar arriba.",
        dangerLevel: "Alto"
      },
      {
        mistake: "Despegar la zona lumbar del respaldo (butt wink)",
        fix: "Reduce la profundidad a tu límite de movilidad de cadera.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Cuádriceps (Vasto externo, medial e intermedio), Glúteo Mayor, Aductores",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9.5",
    tempoAdvice: "3-1-1-0",
    svgGraphicType: "squat"
  },

  // 6. MÁQUINAS Y POLEAS - EXTENSIÓN DE CUÁDRICEPS
  {
    id: "extension_cuadriceps",
    name: "Extensión de Cuádriceps",
    category: "MACHINE",
    categoryLabel: "Máquinas & Poleas",
    muscle: "Recto Femoral & Cuádriceps",
    secondary: ["Tendón Rotuliano"],
    tempo: "2-1-3 (2s subida / 1s contracción / 3s bajada)",
    equipment: "Máquina de Cuádriceps",
    rest: 60,
    tips: [
      "Alinear el eje de la máquina con la rodilla.",
      "Sujetarse firmemente de los agarres laterales.",
      "Pausar 1 segundo completo arriba con cuádriceps apretados."
    ],
    mistakes: [
      "Dar tirones bruscos con impulso.",
      "Dejar caer el peso en el retorno."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/1.jpg",
    primaryMuscle: "cuadriceps",
    secondaryMuscles: [],
    difficulty: "Principiante",
    shortDesc: "Aislamiento directo y tensión en acortamiento para todas las cabezas del cuádriceps.",
    machineName: "Leg Extension Machine",
    machineSetup: {
      seatHeight: "Eje de rotación alineado exactamente con la articulación de la rodilla.",
      backrestAngle: "Respaldo ajustado para que la corva descanse sin compresión.",
      pinOrCableLevel: "Rodillo acolchado sobre la tibia inferior justo sobre los tobillos."
    },
    executionSteps: [
      {
        title: "Anclaje",
        description: "Sujétate con fuerza a los mangos laterales tirando hacia arriba."
      },
      {
        title: "Extensión",
        description: "Extiende las piernas hacia arriba de forma fluida."
      },
      {
        title: "Pico de Tensión",
        description: "Aprieta los cuádriceps 1 segundo en la cima."
      },
      {
        title: "Bajada Lenta",
        description: "Desciende en 3 segundos resistiendo el peso."
      }
    ],
    biomechanicsTips: [
      "Inclinar el respaldo ligeramente hacia atrás estira el recto femoral en la cadera para mayor activación.",
      "Puntas de pies en ligera dorsiflexión."
    ],
    commonMistakes: [
      {
        mistake: "Despegar la cadera del asiento usando el impulso de los brazos",
        fix: "Tracciona de los mangos laterales para mantener el glúteo pegado.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Recto Femoral, Vasto Lateral, Vasto Medial (Lágrima), Vasto Intermedio",
    repRange: "12 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 10",
    tempoAdvice: "2-1-3-0",
    svgGraphicType: "extension"
  },

  // 7. MÁQUINAS Y POLEAS - TRÍCEPS EN POLEA CON CUERDA
  {
    id: "triceps_polea_cuerda",
    name: "Tríceps en Polea con Cuerda",
    category: "MACHINE",
    categoryLabel: "Máquinas & Poleas",
    muscle: "Tríceps Braquial (Cabeza Lateral)",
    secondary: ["Cabeza Larga", "Ancóneo"],
    tempo: "2-1-2 (2s empuje / 1s apertura / 2s subida)",
    equipment: "Polea Alta + Cuerda",
    rest: 60,
    tips: [
      "Codos pegados al cuerpo y estables.",
      "Al llegar abajo, abrir las puntas de la cuerda hacia los lados.",
      "Inclinación leve del torso para recorrido libre."
    ],
    mistakes: [
      "Separar los codos y balancear los hombros.",
      "No extender los codos por completo abajo."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_Rope_Attachment/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_Rope_Attachment/1.jpg",
    primaryMuscle: "triceps",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Principiante",
    shortDesc: "Aislamiento de la cabeza lateral y medial del tríceps con libertad de pronación al final del rango.",
    machineName: "Cable Tower + Rope",
    machineSetup: {
      pinOrCableLevel: "Polea en la posición más alta.",
      handleOrGrip: "Cuerda trenzada de tríceps sujeta por los topes plásticos."
    },
    executionSteps: [
      {
        title: "Posición Inicial",
        description: "De pie con ligera inclinación de torso (15°), codos fijos pegados a los costados."
      },
      {
        title: "Extensión Hacia Abajo",
        description: "Empuja la cuerda hacia abajo usando únicamente la articulación del codo."
      },
      {
        title: "Apertura Final (Pronación)",
        description: "Al llegar al bloqueo, separa los extremos de la cuerda hacia afuera."
      },
      {
        title: "Fase de Retorno",
        description: "Sube controladamente hasta 90° para estirar el tríceps."
      }
    ],
    biomechanicsTips: [
      "Mantén los codos fijos como si tuvieran un eje atornillado a tus costados.",
      "No dejes que los hombros se adelanten al subir el peso."
    ],
    commonMistakes: [
      {
        mistake: "Mover los codos hacia adelante y atrás convirtiéndolo en un remo/press",
        fix: "Aísla el movimiento estrictamente en la flexoextensión del codo.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Tríceps Braquial (Cabeza Lateral, Cabeza Medial y Cabeza Larga)",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8 - 10",
    tempoAdvice: "2-1-2-0",
    svgGraphicType: "cable"
  },

  // 8. CARDIO & BICI - BICICLETA ESTÁTICA
  {
    id: "bici_estatica",
    name: "Bicicleta Estática / Spinning",
    category: "CARDIO",
    categoryLabel: "Cardio & Bici",
    muscle: "Sistema Cardiovascular & Cuádriceps",
    secondary: ["Glúteos", "Gemelos", "Core"],
    tempo: "Cadencia Rítmica Constante (80-90 RPM)",
    equipment: "Bici Estática Gym",
    rest: 45,
    tips: [
      "Ajustar el sillín a la altura de la cadera.",
      "Al pedalear abajo, mantener una microflexión de rodilla de 25°.",
      "Espalda recta y hombros relajados."
    ],
    mistakes: [
      "Sillín muy bajo que sobrecarga la rótula.",
      "Rebotar en el sillín por falta de resistencia."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bicycling_Stationary/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bicycling_Stationary/1.jpg",
    primaryMuscle: "cardio",
    secondaryMuscles: ["cuadriceps", "gemelos", "gluteos"],
    difficulty: "Principiante",
    shortDesc: "Acondicionamiento cardiopulmonar de bajo impacto articular con alta quema calórica.",
    machineName: "Spinning Bike / Stationary Cycle",
    machineSetup: {
      seatHeight: "Sillín ajustado exactamente a la altura de la cresta ilíaca (cadera).",
      handleOrGrip: "Manillar a la misma altura o 2 cm más alto que el sillín para confort lumbar.",
      safetyCatch: "Calapiés ajustados sobre el mediopié."
    },
    executionSteps: [
      {
        title: "Calentamiento",
        description: "3 minutos de pedaleo suave a baja resistencia (70-80 RPM)."
      },
      {
        title: "Fase de Trabajo",
        description: "Pedaleo continuo a 85-90 RPM con resistencia moderada, manteniendo el torso estable."
      },
      {
        title: "Intervalos",
        description: "Opcional: 30s a máxima potencia de pie seguido de 60s de recuperación sentado."
      },
      {
        title: "Enfriamiento",
        description: "2 minutos de pedaleo sin resistencia para bajar pulsaciones."
      }
    ],
    biomechanicsTips: [
      "Pedalea en círculos fluidos: empuja hacia abajo y raspa hacia atrás como si limpiaras la suela.",
      "Evita rebotar en el asiento manteniendo siempre un punto de resistencia de volante."
    ],
    commonMistakes: [
      {
        mistake: "Sillín demasiado bajo causando dolor anterior de rodilla",
        fix: "Eleva el sillín hasta que tu rodilla tenga 25° de flexión en el punto más bajo del pedal.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Sistema Cardiovascular, Resistencia Aeróbica, Cuádriceps",
    repRange: "20 - 35 min",
    rpeRecommendation: "RPE 6 - 8.5",
    tempoAdvice: "Cadencia 80-90 RPM",
    svgGraphicType: "treadmill"
  },

  // 9. PRESS BANCA BARRA
  {
    id: "press_banca_barra",
    name: "Press de Banca Plano con Barra",
    category: "MACHINE",
    categoryLabel: "Barras & Pesas Libres",
    muscle: "Pectoral Mayor (Cabeza Esternocostal)",
    secondary: ["Deltoides Anterior", "Tríceps Braquial"],
    tempo: "3-1-1 (3s bajada / 1s pausa / 1s empuje)",
    equipment: "Barra Olímpica + Banco Plano",
    rest: 90,
    tips: [
      "Pies plantados firmes en el suelo generando leg drive.",
      "Retracción escapular activa durante todo el levantamiento.",
      "Bajar la barra a la parte media del esternón con codos a 45°-60°."
    ],
    mistakes: [
      "Rebotar la barra en el pecho.",
      "Abrir los codos en cruz a 90° sobrecargando los hombros."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/1.jpg",
    primaryMuscle: "pecho",
    secondaryMuscles: ["triceps", "hombros"],
    difficulty: "Intermedio",
    shortDesc: "El levantamiento rey de empuje horizontal para fuerza y masa global de pectoral y tren superior.",
    machineName: "Olympic Flat Bench",
    machineSetup: {
      seatHeight: "Ojos directamente bajo la barra antes de desrackear.",
      safetyCatch: "Soportes de seguridad a 2 cm sobre el pecho comprimido."
    },
    executionSteps: [
      {
        title: "Setup y Arco Escapular",
        description: "Pies firmes, glúteos en el banco y escápulas retraídas."
      },
      {
        title: "Despegue",
        description: "Agarre a 1.5 anchos de hombro, coloca la barra sobre el esternón."
      },
      {
        title: "Bajada en J",
        description: "Baja controladamente hasta tocar suavemente el esternón."
      },
      {
        title: "Empuje Potente",
        description: "Empuja con fuerza hacia arriba y ligeramente hacia la vertical de los ojos."
      }
    ],
    biomechanicsTips: [
      "Trayectoria en curva de J: Toca el esternón abajo y termina sobre las articulaciones del hombro arriba."
    ],
    commonMistakes: [
      {
        mistake: "Rebotar la barra en el esternón",
        fix: "Toca con suavidad y control sin usar elasticidad costal.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Pectoral Mayor, Deltoides Anterior, Tríceps Braquial",
    repRange: "6 - 10 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3-1-1-0",
    svgGraphicType: "press"
  },

  // 10. PEC DECK / CONTRACTOR
  {
    id: "pec_deck",
    name: "Pec Deck / Contractor Pectoral",
    category: "MACHINE",
    categoryLabel: "Máquinas & Poleas",
    muscle: "Pectoral Mayor (Fibras Esternales)",
    secondary: ["Deltoides Anterior"],
    tempo: "2-1-2 (2s cierre / 1s squeeze / 2s apertura)",
    equipment: "Máquina Pec Deck",
    rest: 60,
    tips: [
      "Ajustar el asiento para que los agarres queden a la altura del pezón.",
      "Mantener las escápulas pegadas al respaldo sin adelantar los hombros.",
      "Pensar en juntar los bíceps contra los pectorales."
    ],
    mistakes: [
      "Despegar la espalda alta para empujar con los hombros.",
      "Abrir en exceso forzando la cápsula anterior del hombro."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/1.jpg",
    primaryMuscle: "pecho",
    secondaryMuscles: ["hombros"],
    difficulty: "Principiante",
    shortDesc: "Aislamiento puro del pectoral en aducción horizontal sin fatiga de tríceps.",
    machineName: "Pec Fly Machine",
    machineSetup: {
      seatHeight: "Manerales alineados con el centro del esternón.",
      pinOrCableLevel: "Rango del brazo ajustado a la flexibilidad del hombro."
    },
    executionSteps: [
      {
        title: "Inicio",
        description: "Espalda pegada, escápulas retraídas y codos ligeramente flexionados."
      },
      {
        title: "Cierre Concéntrico",
        description: "Junta las manijas al centro describiendo un arco de abrazo."
      },
      {
        title: "Contracción de 1s",
        description: "Aprieta fuertemente el pecho en el centro."
      },
      {
        title: "Apertura Lenta",
        description: "Abre lentamente sintiendo el estiramiento pectoral."
      }
    ],
    biomechanicsTips: [
      "Imagina apretar un lápiz entre tus pectorales al cerrar."
    ],
    commonMistakes: [
      {
        mistake: "Convertir la apertura en un press flexionando los codos",
        fix: "Mantén el ángulo del codo fijo durante todo el movimiento.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Pectoral Mayor (Aducción Horizontal)",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 10",
    tempoAdvice: "2-1-2-0",
    svgGraphicType: "press"
  }
];

export const ROUTINE_PRESETS: RoutinePreset[] = [
  {
    id: 'push-day',
    title: 'Push Day (Empuje)',
    subtitle: 'Pecho, Hombros y Tríceps',
    frequency: '2x / semana',
    focus: 'Hipertrofia & Fuerza de Empuje',
    tag: 'Clásico PPL',
    exerciseIds: ['press_inclinado_mancuernas', 'press_banca_barra', 'pec_deck', 'elevaciones_laterales', 'triceps_polea_cuerda']
  },
  {
    id: 'pull-day',
    title: 'Pull Day (Tracción)',
    subtitle: 'Espalda, Deltoides Posterior y Bíceps',
    frequency: '2x / semana',
    focus: 'Amplitud & Grosor Dorsal',
    tag: 'Clásico PPL',
    exerciseIds: ['jalon_pecho', 'curl_martillo']
  },
  {
    id: 'legs-core',
    title: 'Legs & Core (Piernas Masivas)',
    subtitle: 'Cuádriceps, Isquios y Glúteos',
    frequency: '2x / semana',
    focus: 'Fuerza Tren Inferior & Tensión Mecánica',
    tag: 'Clásico PPL',
    exerciseIds: ['prensa_piernas', 'extension_cuadriceps']
  },
  {
    id: 'cardio-hiit-burn',
    title: 'Cardio Engine & Fat Burn',
    subtitle: 'Acondicionamiento Físico & VO2 Max',
    frequency: '3x / semana',
    focus: 'Capacidad Cardiopulmonar',
    tag: 'Resistencia',
    exerciseIds: ['bici_estatica']
  }
];
