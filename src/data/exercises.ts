import { Exercise, RoutinePreset } from '../types';

export const EXERCISES_DATABASE: Exercise[] = [
  // ==========================================
  // 1. PECHO (CHEST)
  // ==========================================
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
        mistake: "Inclinación excesiva a 60°",
        fix: "Ajusta la muesca del respaldo en 30° para aislar el pectoral clavicular.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Pectoral Clavicular (Superior)",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Desciende en 3s sintiendo el estiramiento profundo en el pecho superior.",
    svgGraphicType: "press"
  },
  {
    id: "press_banca_barra",
    name: "Press de Banca Plano con Barra",
    category: "MACHINE",
    categoryLabel: "Barra Olímpica",
    muscle: "Pectoral Mayor (Haz Esternocostal)",
    secondary: ["Tríceps", "Deltoides Anterior"],
    tempo: "3-1-1 (3s excéntrica / 1s pausa esternón / 1s concéntrica)",
    equipment: "Barra Olímpica + Banco Plano",
    rest: 120,
    tips: [
      "Retracción y depresión escapular completa antes de sacar la barra.",
      "Trayectoria en 'J': desciende a la parte baja del esternón y empuja hacia los ojos.",
      "Apoyo firme de ambos pies en el suelo ejerciendo leg drive continuo."
    ],
    mistakes: [
      "Rebotar la barra violentamente en el esternón.",
      "Abrir los codos a 90° respecto al torso provocando pinzamiento de hombro."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press/1.jpg",
    primaryMuscle: "pecho",
    secondaryMuscles: ["triceps", "hombros"],
    difficulty: "Intermedio",
    shortDesc: "El movimiento fundamental de empuje horizontal para desarrollo masivo de fuerza y densidad pectoral.",
    machineName: "Rack Olímpico + Banco Plano",
    machineSetup: {
      seatHeight: "Banco plano horizontal.",
      safetyCatch: "Soportes de seguridad colocados a la altura del pecho comprimido."
    },
    executionSteps: [
      {
        title: "Agarre y Posicionamiento",
        description: "Agarre a 1.5 veces el ancho biacromial. Ojos alineados verticalmente bajo la barra."
      },
      {
        title: "Unrack y Bloqueo Escapular",
        description: "Saca la barra con escápulas apretadas y clava los pies firmemente en el suelo."
      },
      {
        title: "Descenso Controlado",
        description: "Baja la barra en 3 segundos apuntando al tercio inferior del esternón manteniendo codos a 45°."
      },
      {
        title: "Prensa Explosiva",
        description: "Empuja con fuerza desde el pecho empujando el suelo con las piernas sin despegar los glúteos."
      }
    ],
    biomechanicsTips: [
      "El arco lumbar natural con glúteos apoyados protege los hombros y optimiza el plano de empuje del pectoral.",
      "La trayectoria curva (J-path) respeta el vector de fuerza anatómico del esternón a los hombros."
    ],
    commonMistakes: [
      {
        mistake: "Despegar los glúteos del banco para forzar repeticiones",
        fix: "Mantén contacto de 3 puntos (cabeza, espalda alta y glúteos) y usa leg drive horizontal.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Pectoral Medio e Inferior",
    repRange: "6 - 10 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Control estricto en la bajada, pausa nítida de 1s en esternón y empuje potente.",
    svgGraphicType: "press"
  },
  {
    id: "pec_deck",
    name: "Pec Deck / Contractor Pectoral",
    category: "MACHINE",
    categoryLabel: "Máquina",
    muscle: "Pectoral Mayor (Aducción Horizontal)",
    secondary: ["Deltoides Anterior"],
    tempo: "3-1-2 (3s apertura / 1s estiramiento / 2s cierre con contracción isométrica)",
    equipment: "Máquina Pec Deck Guiada",
    rest: 60,
    tips: [
      "Ajusta la altura del asiento para que los agarres queden a la altura media del pecho.",
      "Mantén el pecho erguido y las escápulas pegadas al respaldo.",
      "Imagina juntar los codos o bíceps en el centro, no solo las manos."
    ],
    mistakes: [
      "Dejar que los hombros se adelanten en el punto de contracción máxima.",
      "Permitir que las placas choquen al abrir los brazos."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/1.jpg",
    primaryMuscle: "pecho",
    secondaryMuscles: ["hombros"],
    difficulty: "Principiante",
    shortDesc: "Aislamiento biomecánico puro de aducción pectoral con curva de tensión constante y nula demanda estabilizadora.",
    machineName: "Máquina Pec Deck / Contractor",
    machineSetup: {
      seatHeight: "Asiento a la altura en que los manillares queden al nivel de los pezones.",
      backrestAngle: "Espalda completamente apoyada de arriba a abajo.",
      handleOrGrip: "Agarre neutro con codos ligeramente semiflexionados."
    },
    executionSteps: [
      {
        title: "Alineación y Retracción",
        description: "Siéntate con la espalda firme en el respaldo y el pecho inflado."
      },
      {
        title: "Apertura en Rango Seguro",
        description: "Abre los brazos de forma controlada hasta sentir tensión agradable en el pectoral sin forzar el hombro."
      },
      {
        title: "Abrazo Central / Squeeze",
        description: "Junta los brazos en un movimiento de abrazo amplio, apretando el centro del pecho 1 segundo."
      }
    ],
    biomechanicsTips: [
      "A diferencia de las mancuernas, la máquina mantiene tensión máxima incluso cuando las manos se tocan en el centro.",
      "Mantener los codos con flexión constante de 10° protege la articulación del bíceps distal."
    ],
    commonMistakes: [
      {
        mistake: "Extensión excesiva hacia atrás que compromete la cápsula del hombro",
        fix: "Limita el tope de las palancas para que los codos no sobrepasen la línea del torso.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Pectoral Mayor (Enfoque Esfuerzo de Aducción Esternal)",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 10",
    tempoAdvice: "Aguanta 1-2 segundos de pico de contracción en el centro.",
    svgGraphicType: "fly"
  },
  {
    id: "cruces_polea_alta",
    name: "Cruces de Polea Alta a Baja",
    category: "MACHINE",
    categoryLabel: "Poleas Dobles",
    muscle: "Pectoral Inferior y Haz Esternal",
    secondary: ["Deltoides Anterior", "Serrato Anterior"],
    tempo: "3-1-1 (3s retorno / 1s estiramiento / 1s cruce)",
    equipment: "Torre de Polea Cruzada (Crossover)",
    rest: 60,
    tips: [
      "Da un paso adelante con una pierna para ganar estabilidad en el tronco.",
      "Lleva las manos en diagonal descendente cruzando ligeramente las muñecas frente a la cintura.",
      "Conserva una ligera flexión de codos durante todo el recorrido."
    ],
    mistakes: [
      "Balancear el torso hacia adelante y atrás para impulsar el peso.",
      "Transformar el cruce en un press empujando con los tríceps."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/1.jpg",
    primaryMuscle: "pecho",
    secondaryMuscles: ["hombros", "core"],
    difficulty: "Intermedio",
    shortDesc: "Alineación de fibras con el haz inferior del pectoral mediante vector de fuerza en declinación continua.",
    machineName: "Torre Dual de Poleas Ajustables",
    machineSetup: {
      pinOrCableLevel: "Poleas situadas en la muesca superior por encima de la cabeza.",
      handleOrGrip: "Mangos individuales en D con agarre pronado o neutro."
    },
    executionSteps: [
      {
        title: "Postura Escalonada",
        description: "Toma ambos agarres, sitúate en el centro de la torre y adelanta un pie inclinando el torso 15°."
      },
      {
        title: "Cruce Diagonal",
        description: "Baja las manos hacia abajo y al centro en dirección a las caderas como si abrazaras un árbol."
      },
      {
        title: "Retorno Elástico",
        description: "Regresa en 3 segundos abriendo los brazos hasta la altura de los hombros con tensión continua."
      }
    ],
    biomechanicsTips: [
      "El cruce en dirección a la pelvis sigue con precisión la orientación de las fibras del pectoral inferior.",
      "Cruzar una muñeca sobre otra aumenta el pico de acortamiento de la fibra muscular."
    ],
    commonMistakes: [
      {
        mistake: "Flexionar y extender los codos como en un press",
        fix: "Fija el ángulo de los codos (15° de flexión) y muévete únicamente desde el hombro.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Pectoral Inferior y Fibras Costales",
    repRange: "12 - 15 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Siente el estiramiento en la parte alta y aprieta con fuerza abajo.",
    svgGraphicType: "cable"
  },

  // ==========================================
  // 2. ESPALDA (BACK)
  // ==========================================
  {
    id: "jalon_pecho",
    name: "Jalón al Pecho en Polea Alta",
    category: "MACHINE",
    categoryLabel: "Máquina de Polea",
    muscle: "Dorsal Ancho (Latissimus Dorsi)",
    secondary: ["Bíceps", "Braquiorradial", "Redondo Mayor", "Trapecio Medio"],
    tempo: "3-1-1 (3s subida controlada / 1s pausa abajo / 1s tracción)",
    equipment: "Torre de Polea Alta + Barra Larga",
    rest: 90,
    tips: [
      "Ajusta los rodillos para que tus muslos queden firmemente fijados sin levantarse.",
      "Inclina el torso 10° hacia atrás y mantén el pecho apuntando a la polea.",
      "Dirige el movimiento pensando en clavar los codos en tus bolsillos traseros."
    ],
    mistakes: [
      "Tirar la barra por detrás de la nuca (peligro para las vértebras cervicales).",
      "Balancear el cuerpo hacia atrás como un columpio usando la inercia lumbar."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Lat_Pulldown/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Lat_Pulldown/1.jpg",
    primaryMuscle: "espalda",
    secondaryMuscles: ["biceps", "hombros"],
    difficulty: "Principiante",
    shortDesc: "El constructor principal de amplitud de espalda y forma en V con control de peso progresivo.",
    machineName: "Estación de Jalón en Polea Alta (Lat Pulldown)",
    machineSetup: {
      seatHeight: "Ajuste de los rodillos almohadillados para fijar los cuádriceps con firmeza.",
      handleOrGrip: "Barra ancha tomada a 1.5 veces el ancho de los hombros con agarre prono."
    },
    executionSteps: [
      {
        title: "Bloqueo de Piernas",
        description: "Encaja las piernas bajo los rodillos con los pies planos en el piso."
      },
      {
        title: "Depresión Escapular Inicial",
        description: "Antes de doblar los codos, desciende los hombros para enganchar los dorsales."
      },
      {
        title: "Tracción a la Clavícula",
        description: "Conduce los codos hacia abajo y ligeramente hacia atrás llevando la barra al pecho alto."
      },
      {
        title: "Retorno Elástico Controlado",
        description: "Extiende los brazos en 3 segundos permitiendo que las escápulas asciendan al final."
      }
    ],
    biomechanicsTips: [
      "La tracción frontal al esternón permite el rango articular óptimo de aducción del húmero sin impacto cervical.",
      "El agarre con pulgares sobre la barra (agarre suicida/sin pulgar) reduce la tracción del antebrazo y activa mejor el dorsal."
    ],
    commonMistakes: [
      {
        mistake: "Llevar la barra detrás del cuello",
        fix: "Tira siempre hacia la parte alta del esternón manteniendo el pecho erguido.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Dorsal Ancho (Anchura y V-Taper)",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Sube en 3 segundos estirando la espalda y baja con tracción explosiva.",
    svgGraphicType: "pull"
  },
  {
    id: "remo_barra_45",
    name: "Remo con Barra 45°",
    category: "MACHINE",
    categoryLabel: "Barra Olímpica",
    muscle: "Espalda Media, Dorsal & Romboides",
    secondary: ["Bíceps", "Erectores Espinales", "Trapecio"],
    tempo: "3-1-1 (3s descenso / 1s pausa en ombligo / 1s tirón)",
    equipment: "Barra Olímpica + Discos",
    rest: 120,
    tips: [
      "Mantén la columna neutra con flexión de cadera a 45° y rodillas semiflexionadas.",
      "Tira de la barra hacia el ombligo rozando los muslos con los codos pegados.",
      "Aprieta las escápulas fuertemente al final de cada repetición."
    ],
    mistakes: [
      "Redondear la zona lumbar (pérdida de curvatura neutral).",
      "Erguirse verticalmente para trampear la subida."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bent_Over_Row/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bent_Over_Row/1.jpg",
    primaryMuscle: "espalda",
    secondaryMuscles: ["biceps", "core"],
    difficulty: "Avanzado",
    shortDesc: "Ejercicio compuesto de grosor de espalda que demanda gran estabilidad de cadena posterior y fuerza de tracción.",
    machineName: "Plataforma de Peso Libre / Barra Olímpica",
    machineSetup: {
      handleOrGrip: "Agarre prono o supino al ancho de los hombros."
    },
    executionSteps: [
      {
        title: "Bisagra de Cadera (Hinge)",
        description: "Lleva las caderas hacia atrás con la espalda recta hasta inclinar el torso 45°."
      },
      {
        title: "Tracción hacia la Cintura",
        description: "Tira de la barra hacia la zona del ombligo guiando con los codos hacia el techo."
      },
      {
        title: "Pico de Contracción",
        description: "Pausa 1 segundo con escápulas fuertemente retraídas antes de bajar controladamente."
      }
    ],
    biomechanicsTips: [
      "Tirar hacia la cadera activa prioritariamente las fibras del dorsal ancho; tirar hacia el pecho activa romboides y deltoides posterior.",
      "Activar el abdomen (Bracing) protege las vértebras lumbares del torque gravitacional."
    ],
    commonMistakes: [
      {
        mistake: "Flexionar la columna lumbar bajo carga",
        fix: "Saca pecho, activa el core y empuja el suelo con los talones.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Espalda Media, Densidad Dorsal y Romboides",
    repRange: "6 - 10 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Descenso estricto en 3 segundos sin perder la bisagra de cadera.",
    svgGraphicType: "row"
  },
  {
    id: "remo_gironda",
    name: "Remo Gironda en Polea Baja",
    category: "MACHINE",
    categoryLabel: "Polea Sentada",
    muscle: "Espalda Media, Dorsales & Trapecio Medio",
    secondary: ["Bíceps", "Deltoides Posterior"],
    tempo: "3-1-1 (3s extensión / 1s contracción isométrica / 1s tracción)",
    equipment: "Máquina de Remo Sentado con Agarre Estrecho (V-Grip)",
    rest: 90,
    tips: [
      "Siéntate con las rodillas ligeramente flexionadas para proteger los isquiotibiales.",
      "Inicia la tracción retrayendo las escápulas y llevando el manillar al abdomen bajo.",
      "Evita balancear el tronco hacia atrás más de 10°."
    ],
    mistakes: [
      "Usar inercia balanceando la espalda como un péndulo.",
      "Elevar los hombros hacia las orejas durante la tracción."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Row/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Row/1.jpg",
    primaryMuscle: "espalda",
    secondaryMuscles: ["biceps", "hombros"],
    difficulty: "Principiante",
    shortDesc: "Excelente constructor de grosor escapular y espalda media con soporte seguro para la zona lumbar.",
    machineName: "Estación de Remo en Polea Baja (Low Cable Row)",
    machineSetup: {
      handleOrGrip: "Agarre en V (triángulo cerrado) o barra neutra.",
      safetyCatch: "Pies firmemente apoyados en las plataformas metálicas."
    },
    executionSteps: [
      {
        title: "Posición de Inicio",
        description: "Pecho erguido, columna recta, brazos extendidos con dorsales estirados hacia adelante."
      },
      {
        title: "Tirón al Abdomen",
        description: "Tracciona el manillar hacia la parte baja del abdomen conduciendo los codos hacia atrás pegados al cuerpo."
      },
      {
        title: "Contracción y Retorno",
        description: "Junta las escápulas 1 segundo y regresa en 3 segundos estirando la espalda."
      }
    ],
    biomechanicsTips: [
      "Permitir una leve protracción escapular al inicio del recorrido alarga los dorsales y mejora el reclutamiento motor."
    ],
    commonMistakes: [
      {
        mistake: "Tirar con los brazos en vez de con la espalda",
        fix: "Piensa en empujar los codos hacia la pared de atrás.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Espalda Media, Romboides y Dorsal Inferior",
    repRange: "10 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Control absoluto en la fase excéntrica sintiendo la apertura dorsal.",
    svgGraphicType: "row"
  },
  {
    id: "remo_mancuerna_unilateral",
    name: "Remo con Mancuerna a 1 Mano",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas",
    muscle: "Dorsal Ancho Unilateral & Espalda Media",
    secondary: ["Bíceps", "Deltoides Posterior", "Core"],
    tempo: "3-1-1 (3s descenso / 1s pausa / 1s tirón a la cadera)",
    equipment: "Mancuerna Pesada + Banco Plano",
    rest: 75,
    tips: [
      "Apoya una rodilla y mano en el banco con la espalda paralela al piso.",
      "Tira de la mancuerna en un arco curvo hacia el bolsillo trasero de tu pantalón.",
      "Mantén el hombro bajo sin rotar excesivamente el torso."
    ],
    mistakes: [
      "Girar el tronco bruscamente hacia el techo para subir el peso.",
      "Tirar la mancuerna hacia el pecho en línea recta."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Row/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Row/1.jpg",
    primaryMuscle: "espalda",
    secondaryMuscles: ["biceps", "core"],
    difficulty: "Intermedio",
    shortDesc: "Aislamiento unilateral del dorsal con gran libertad de movimiento y corrección de asimetrías de fuerza.",
    machineName: "Banco Plano + Mancuerna",
    machineSetup: {
      seatHeight: "Banco plano horizontal.",
      handleOrGrip: "Mancuerna con agarre neutro."
    },
    executionSteps: [
      {
        title: "Apoyo en Trípode",
        description: "Mano y rodilla izquierda en el banco; pie derecho firme en el suelo; columna horizontal."
      },
      {
        title: "Trayectoria en Arco a la Cadera",
        description: "Eleva la mancuerna hacia la cadera derecha rozando las costillas con el codo."
      },
      {
        title: "Estiramiento Inferior",
        description: "Baja la mancuerna permitiendo que el dorsal se elongue completamente hacia el suelo."
      }
    ],
    biomechanicsTips: [
      "La trayectoria curva en arco activa con mayor eficacia las fibras oblicuas del dorsal ancho que un tirón vertical recto."
    ],
    commonMistakes: [
      {
        mistake: "Rotación descontrolada de la columna torácica",
        fix: "Mantén el pecho mirando siempre hacia el suelo y fija el core.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Dorsal Ancho Unilateral",
    repRange: "8 - 12 reps por lado",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Siente el estiramiento completo abajo y la contracción en la cadera.",
    svgGraphicType: "row"
  },

  // ==========================================
  // 3. PIERNAS (LEGS: CUÁDRICEPS, ISQUIOS, GEMELOS)
  // ==========================================
  {
    id: "prensa_piernas",
    name: "Prensa de Piernas 45°",
    category: "MACHINE",
    categoryLabel: "Máquina de Placas",
    muscle: "Cuádriceps (Vasto Lateral, Medial, Recto Femoral)",
    secondary: ["Glúteo Mayor", "Isquiosurales", "Aductores"],
    tempo: "3-1-1 (3s bajada / 1s pausa en ángulo 90° / 1s empuje)",
    equipment: "Prensa Inclinada a 45°",
    rest: 120,
    tips: [
      "Pies al ancho de hombros en el centro de la plataforma.",
      "Nunca bloquees (hiperextiendas) las rodillas en la parte alta.",
      "Mantén la pelvis y el sacro firmemente pegados al respaldo durante todo el descenso."
    ],
    mistakes: [
      "Despegar la zona lumbar y el glúteo del asiento al bajar demasiado (retroversión pélvica / butt wink).",
      "Dejar que las rodillas colapsen hacia adentro (valgo de rodilla)."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_45_Leg_Press/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_45_Leg_Press/1.jpg",
    primaryMuscle: "cuadriceps",
    secondaryMuscles: ["gluteos", "isquios"],
    difficulty: "Principiante",
    shortDesc: "Sobrecarga masiva de tren inferior con nula compresión axial en la columna vertebral.",
    machineName: "Prensa de Discos 45° (Incline Leg Press)",
    machineSetup: {
      backrestAngle: "Respaldo ajustado a unos 45° para que la cadera no se redondee.",
      safetyCatch: "Topes de seguridad colocados a la altura máxima de descenso seguro."
    },
    executionSteps: [
      {
        title: "Colocación de Pies",
        description: "Pies a la anchura de las caderas en el centro de la plataforma con puntas ligeramente hacia afuera."
      },
      {
        title: "Liberación de Seguros",
        description: "Extiende las piernas sin bloquear las rodillas y gira las palancas de seguridad laterales."
      },
      {
        title: "Descenso Controlado",
        description: "Baja la plataforma en 3 segundos hasta que las rodillas alcancen 90° sin despegar la pelvis del respaldo."
      },
      {
        title: "Empuje con Talones y Planta",
        description: "Empuja la plataforma con toda la planta del pie, dejando las rodillas ligeramente semiflexionadas arriba."
      }
    ],
    biomechanicsTips: [
      "Colocar los pies más abajo en la plataforma enfatiza los cuádriceps; pies más arriba enfatizan glúteos e isquiosurales.",
      "Mantener las manos sujetando las asas laterales ayuda a comprimir la pelvis contra el asiento."
    ],
    commonMistakes: [
      {
        mistake: "Hiperextensión violenta de rodillas al llegar arriba",
        fix: "Conserva siempre una microflexión de 5° en las rodillas para proteger meniscos y ligamentos cruzados.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Cuádriceps y Glúteo Mayor",
    repRange: "8 - 15 reps",
    rpeRecommendation: "RPE 8 - 9.5",
    tempoAdvice: "Control estricto en la bajada en 3s sin rebotar en los topes.",
    svgGraphicType: "squat"
  },
  {
    id: "sentadilla_barra",
    name: "Sentadilla Trasera con Barra",
    category: "MACHINE",
    categoryLabel: "Barra Olímpica",
    muscle: "Cuádriceps, Glúteos & Cadena Posterior",
    secondary: ["Isquiosurales", "Erectores Espinales", "Core / Abdominales"],
    tempo: "3-1-1 (3s descenso profundo / 1s pausa / 1s subida potente)",
    equipment: "Rack de Sentadilla + Barra Olímpica",
    rest: 150,
    tips: [
      "Apoya la barra sobre los trapecios (barra alta) o deltoides posteriores (barra baja).",
      "Pies al ancho de hombros con puntas a 20°-30° hacia afuera.",
      "Desciende rompiendo en cadera y rodillas al mismo tiempo manteniendo el pecho erguido."
    ],
    mistakes: [
      "Colapso de rodillas hacia adentro al iniciar la subida.",
      "Redondear la espalda lumbar en el fondo de la sentadilla."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/1.jpg",
    primaryMuscle: "cuadriceps",
    secondaryMuscles: ["gluteos", "isquios", "core"],
    difficulty: "Avanzado",
    shortDesc: "El ejercicio rey del tren inferior para desarrollo atlético, hipertrofia general y fuerza funcional.",
    machineName: "Power Rack / Jaula de Sentadillas",
    machineSetup: {
      pinOrCableLevel: "Ganchos colocados a la altura de la clavícula para salir con facilidad.",
      safetyCatch: "Barras de seguridad ajustadas justo debajo de la profundidad de sentadilla paralela."
    },
    executionSteps: [
      {
        title: "Colocación y Unrack",
        description: "Entra bajo la barra, aprieta la espalda alta, saca la barra y da solo 2 pasos atrás."
      },
      {
        title: "Bracing Abdominal",
        description: "Inhala profundamente inflando el diafragma y endurece todo el abdomen."
      },
      {
        title: "Descenso Paralelo",
        description: "Baja en 3 segundos abriendo las rodillas en dirección a las puntas de los pies hasta romper el paralelo."
      },
      {
        title: "Empuje desde el Suelo",
        description: "Empuja con fuerza los talones y el mediopié extendiendo caderas y rodillas simultáneamente."
      }
    ],
    biomechanicsTips: [
      "Un calzado de suela plana y dura o zapatillas de halterofilia con talón elevado mejoran la dorsiflexión del tobillo.",
      "Mantener la barra alineada verticalmente sobre el mediopié minimiza el brazo de momento sobre la zona lumbar."
    ],
    commonMistakes: [
      {
        mistake: "Despegar los talones del suelo al bajar",
        fix: "Mejora la movilidad de tobillo y empuja firmemente con toda la superficie del pie.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Cuádriceps, Glúteo Mayor y Core Completo",
    repRange: "5 - 10 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3 segundos de bajada controlada, controlando la inercia sin caer en picada.",
    svgGraphicType: "squat"
  },
  {
    id: "extension_cuadriceps",
    name: "Extensión de Cuádriceps en Máquina",
    category: "MACHINE",
    categoryLabel: "Máquina de Placas",
    muscle: "Cuádriceps (Énfasis en Recto Femoral)",
    secondary: ["Tensor de la Fascia Lata"],
    tempo: "3-1-1 (3s bajada / 1s contracción máxima arriba / 1s extensión)",
    equipment: "Máquina de Extensión de Piernas Sentado",
    rest: 60,
    tips: [
      "Alinea el eje de rotación de la máquina exactamente con la articulación de tus rodillas.",
      "Almohadilla apoyada en el tercio inferior de las tibias (justo sobre los tobillos).",
      "Sujeta firmemente las asas laterales para no despegar los glúteos del asiento."
    ],
    mistakes: [
      "Lanzar el peso con impulso brusco al inicio del movimiento.",
      "Poner la almohadilla demasiado alta (en la espinilla) o demasiado baja (en los dedos del pie)."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/1.jpg",
    primaryMuscle: "cuadriceps",
    secondaryMuscles: [],
    difficulty: "Principiante",
    shortDesc: "Aislamiento monoarticular único que entrena el cuádriceps en su posición de máximo acortamiento.",
    machineName: "Máquina de Extensión de Cuádriceps (Leg Extension)",
    machineSetup: {
      seatHeight: "Respaldo ajustado para que la corva de la rodilla quede al borde del asiento sin comprimirse.",
      pinOrCableLevel: "Rodillo inferior ajustado justo por encima de los tobillos sobre el empeine tibial."
    },
    executionSteps: [
      {
        title: "Alineación Articular",
        description: "Verifica que el pivote de la máquina esté alineado con el centro de tu rodilla."
      },
      {
        title: "Extensión Completa",
        description: "Extiende las piernas hacia la horizontal hasta bloquear suavemente los cuádriceps."
      },
      {
        title: "Squeeze Isométrico",
        description: "Aprieta los cuádriceps fuertemente arriba durante 1 segundo entero."
      },
      {
        title: "Descenso Suave",
        description: "Baja en 3 segundos sin dejar caer las placas."
      }
    ],
    biomechanicsTips: [
      "Es el único ejercicio que carga al 100% el recto femoral en su función extensora con cadera fija a 90°.",
      "El pico de tensión en máxima extensión genera un gran estímulo de hipertrofia por acortamiento."
    ],
    commonMistakes: [
      {
        mistake: "Despegar los muslos del asiento al levantar mucho peso",
        fix: "Usa las manijas laterales para clavar la pelvis al asiento y reduce la carga.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Cuádriceps Aislado (Recto Femoral y Vastos)",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 10",
    tempoAdvice: "Mantén 1 segundo de contracción estricta en la parte alta.",
    svgGraphicType: "extension"
  },
  {
    id: "curl_femoral_tumbado",
    name: "Curl Femoral Tumbado en Máquina",
    category: "MACHINE",
    categoryLabel: "Máquina de Placas",
    muscle: "Isquiosurales (Bíceps Femoral, Semitendinoso, Semimembranoso)",
    secondary: ["Gemelos (Gastrocnemio)"],
    tempo: "3-1-1 (3s extensión / 1s flexión completa / 1s subida)",
    equipment: "Máquina de Leg Curl Tumbado",
    rest: 75,
    tips: [
      "Ajusta el rodillo para que descanse justo debajo de las pantorrillas (sobre el tendón de Aquiles).",
      "Mantén las caderas y el pubis pegados a la almohadilla sin levantarlos al flexionar las piernas.",
      "Haz dorsiflexión de tobillos (puntas hacia las espinillas) para maximizar la tensión en isquios."
    ],
    mistakes: [
      "Arquear la zona lumbar y levantar la cadera del banco para ayudar en la flexión.",
      "Bajar de golpe sin resistir la fase excéntrica."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curl/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curl/1.jpg",
    primaryMuscle: "isquios",
    secondaryMuscles: ["gemelos", "gluteos"],
    difficulty: "Principiante",
    shortDesc: "Aislamiento directo de la flexión de rodilla de los isquiosurales para equilibrio muscular y salud articular.",
    machineName: "Máquina de Curl Femoral Tumbado (Lying Leg Curl)",
    machineSetup: {
      pinOrCableLevel: "Rodillo colocado justo por encima de los talones.",
      seatHeight: "Banco en ángulo anatómico para aliviar la tensión lumbar."
    },
    executionSteps: [
      {
        title: "Posicionamiento Tumbado",
        description: "Túmbate boca abajo con el rodillo apoyado en el tendón de Aquiles y sujeta las asas delanteras."
      },
      {
        title: "Flexión hacia los Glúteos",
        description: "Flexiona las rodillas llevando los talones hacia los glúteos de forma fluida y continua."
      },
      {
        title: "Pausa Isométrica",
        description: "Aprieta los isquiosurales en máxima flexión 1 segundo."
      },
      {
        title: "Descenso Lento",
        description: "Regresa en 3 segundos estirando la parte posterior del muslo sin que las placas choquen."
      }
    ],
    biomechanicsTips: [
      "Los isquiosurales son predominantemente fibras rápidas (Tipo II), por lo que responden de forma excelente a fases excéntricas lentas."
    ],
    commonMistakes: [
      {
        mistake: "Elevar la pelvis del banco al doblar las piernas",
        fix: "Presiona el pubis contra el banco y reduce el peso si es necesario.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Isquiosurales (Flexores de Rodilla)",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "3 segundos de bajada lenta sintiendo la quema en la parte posterior del muslo.",
    svgGraphicType: "curl"
  },
  {
    id: "peso_muerto_rumano",
    name: "Peso Muerto Rumano con Mancuernas (RDL)",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas",
    muscle: "Isquiosurales & Glúteo Mayor (Cadena Posterior)",
    secondary: ["Erectores Espinales", "Trapecios", "Core"],
    tempo: "3-1-1 (3s descenso en bisagra / 1s estiramiento profundo / 1s extensión de cadera)",
    equipment: "Par de Mancuernas",
    rest: 90,
    tips: [
      "Inicia el movimiento empujando las caderas hacia atrás como si quisieras tocar una pared con los glúteos.",
      "Mantén las mancuernas rozando las piernas en todo momento.",
      "Conserva una ligera flexión de rodillas fija (20°) sin doblarlas más durante el descenso."
    ],
    mistakes: [
      "Doblar las rodillas como en una sentadilla perdiendo el estiramiento en los isquios.",
      "Redondear la espalda para intentar que las mancuernas toquen el piso."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Romanian_Deadlift/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Romanian_Deadlift/1.jpg",
    primaryMuscle: "isquios",
    secondaryMuscles: ["gluteos", "core"],
    difficulty: "Intermedio",
    shortDesc: "El mejor ejercicio para hipertrofia de isquiotibiales y glúteos mediante sobrecarga en máxima elongación muscular.",
    machineName: "Área de Peso Libre + Mancuernas",
    machineSetup: {
      handleOrGrip: "Mancuernas sostenidas al frente de los muslos con agarre prono."
    },
    executionSteps: [
      {
        title: "Postura Inicial",
        description: "De pie con pies a la anchura de las caderas, hombros atrás y mancuernas sobre los muslos."
      },
      {
        title: "Bisagra de Cadera (Hip Hinge)",
        description: "Empuja la pelvis hacia atrás manteniendo la espalda recta mientras las pesas se deslizan por los muslos."
      },
      {
        title: "Punto de Máxima Elongación",
        description: "Detén el descenso cuando sientas el estiramiento intenso en los isquios (habitualmente justo bajo la rodilla)."
      },
      {
        title: "Extensión de Cadera",
        description: "Empuja las caderas hacia adelante contrayendo los glúteos para volver a la posición erguida."
      }
    ],
    biomechanicsTips: [
      "El estímulo hipertrófico mediado por estiramiento bajo tensión es máximo en el RDL.",
      "Mantener las mancuernas pegadas al cuerpo minimiza el brazo de palanca sobre las vértebras L4-L5."
    ],
    commonMistakes: [
      {
        mistake: "Bajar flexionando la columna en vez de la cadera",
        fix: "Mantén el pecho orgulloso y piensa en llevar el culo a la pared de atrás.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Isquiotibiales en Elongación y Glúteo Mayor",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Baja en 3 segundos sintiendo la tensión elástica en los isquios.",
    svgGraphicType: "rdl"
  },
  {
    id: "gemelos_elevacion_talones",
    name: "Elevación de Talones de Pie en Máquina",
    category: "MACHINE",
    categoryLabel: "Máquina de Placas",
    muscle: "Gemelos / Pantorrillas (Gastrocnemio & Sóleo)",
    secondary: ["Tendón de Aquiles", "Flexores Plantares"],
    tempo: "3-2-1 (3s bajada / 2s pausa en estiramiento máximo / 1s elevación explosiva)",
    equipment: "Máquina de Gemelos de Pie",
    rest: 60,
    tips: [
      "Apoya el metatarso en el borde del escalón y mantén las rodillas casi bloqueadas (microflexión de 5°).",
      "Baja los talones lo máximo posible hasta sentir un estiramiento profundo del tendón de Aquiles.",
      "Pausa 2 segundos completos en el fondo para eliminar el rebote elástico antes de subir."
    ],
    mistakes: [
      "Rebotar a gran velocidad usando la elasticidad del tendón de Aquiles en lugar de activar el músculo.",
      "Flexionar las rodillas durante la subida."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/1.jpg",
    primaryMuscle: "gemelos",
    secondaryMuscles: [],
    difficulty: "Principiante",
    shortDesc: "Desarrollo completo de la cabeza medial y lateral del gastrocnemio mediante carga axial con rodilla extendida.",
    machineName: "Máquina de Gemelos de Pie (Standing Calf Raise)",
    machineSetup: {
      seatHeight: "Almohadillas sobre los hombros ajustadas para permitir rango completo de subida y bajada."
    },
    executionSteps: [
      {
        title: "Colocación en el Escalón",
        description: "Apoya los metatarsos en la plataforma dejando los talones suspendidos en el aire."
      },
      {
        title: "Estiramiento Profundo y Pausa",
        description: "Baja los talones lentamente por debajo de la plataforma y mantén 2 segundos de pausa estática."
      },
      {
        title: "Extensión Plantar Potente",
        description: "Sube lo más alto posible sobre las puntas de los pies contrayendo los gemelos al máximo 1 segundo."
      }
    ],
    biomechanicsTips: [
      "La pausa de 2s en el estiramiento disipa la energía elástica pasiva del tendón de Aquiles forzando al gastrocnemio a trabajar.",
      "Con rodillas extendidas el gastrocnemio asume el 80% de la carga; con rodillas a 90° (sentado) el sóleo toma el control."
    ],
    commonMistakes: [
      {
        mistake: "Rebotes rápidos sin rango de movimiento real",
        fix: "Usa un tempo estricto 3-2-1 con pausa total abajo.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Gastrocnemio (Cabezas Lateral y Medial)",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 9 - 10",
    tempoAdvice: "Pausa obligatoria de 2 segundos en el punto de máximo estiramiento.",
    svgGraphicType: "calf"
  },

  // ==========================================
  // 4. GLÚTEOS (GLUTES)
  // ==========================================
  {
    id: "hip_thrust_barra",
    name: "Hip Thrust con Barra en Banco",
    category: "MACHINE",
    categoryLabel: "Barra Olímpica",
    muscle: "Glúteo Mayor (Máxima Tensión en Acortamiento)",
    secondary: ["Isquiosurales", "Cuádriceps", "Core"],
    tempo: "2-2-1 (2s bajada / 2s squeeze arriba / 1s empuje de cadera)",
    equipment: "Barra Olímpica + Banco de Hip Thrust + Almohadilla",
    rest: 120,
    tips: [
      "Apoya la parte inferior de las escápulas en el borde del banco.",
      "Coloca la barra acolchada justo sobre el pliegue de las caderas.",
      "Al subir, las espinillas deben quedar verticales (ángulo de 90° en rodillas) y la mirada hacia adelante."
    ],
    mistakes: [
      "Arquear la columna lumbar en la parte alta en lugar de hacer retroversión pélvica.",
      "Tirar la cabeza hacia atrás mirando al techo (desconecta el glúteo)."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/1.jpg",
    primaryMuscle: "gluteos",
    secondaryMuscles: ["isquios", "core"],
    difficulty: "Intermedio",
    shortDesc: "El ejercicio de mayor activación electromiográfica para el glúteo mayor en su posición de máximo acortamiento.",
    machineName: "Banco de Hip Thrust / Plataforma",
    machineSetup: {
      seatHeight: "Banco acolchado a una altura aproximada de 35-40 cm.",
      handleOrGrip: "Barra cubierta con almohadilla de alta densidad."
    },
    executionSteps: [
      {
        title: "Posición de Inicio",
        description: "Espalda apoyada en el banco a la altura de escápulas, barra sobre caderas, pies al ancho de hombros."
      },
      {
        title: "Extensión y Retroversión Pélvica",
        description: "Empuja con los talones elevando la pelvis hasta que el torso y los muslos formen una línea horizontal."
      },
      {
        title: "Squeeze de Glúteos 2 Segundos",
        description: "Aprieta fuertemente los glúteos en la cima manteniendo barbilla al pecho y mirada al frente."
      },
      {
        title: "Descenso Controlado",
        description: "Baja la cadera en 2 segundos sin que los discos golpeen el suelo bruscamente."
      }
    ],
    biomechanicsTips: [
      "A diferencia de las sentadillas, el hip thrust produce el pico de tensión mecánica en la extensión completa de cadera.",
      "La rotación externa suave de pies (15°) optimiza el reclutamiento de las fibras superiores del glúteo."
    ],
    commonMistakes: [
      {
        mistake: "Hiperextensión lumbar al final del recorrido",
        fix: "Mantén la mirada al frente, costillas hacia abajo y realiza retroversión pélvica.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Glúteo Mayor (Máxima Contracción y Densidad)",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "Sostén 2 segundos de contracción isométrica máxima en la cima.",
    svgGraphicType: "hip_thrust"
  },
  {
    id: "patada_gluteo_polea",
    name: "Patada de Glúteo en Polea Baja",
    category: "MACHINE",
    categoryLabel: "Polea Baja",
    muscle: "Glúteo Mayor & Porción Superior",
    secondary: ["Isquiosurales"],
    tempo: "3-1-1 (3s retorno / 1s squeeze atrás / 1s patada)",
    equipment: "Polea Baja + Tobillera de Velcro",
    rest: 60,
    tips: [
      "Fija la tobillera en el tobillo y engancha el mosquetón en la polea baja.",
      "Inclina el torso 45° sujetando la columna de la máquina para estabilizarte.",
      "Lleva la pierna hacia atrás y ligeramente hacia afuera (30°) apretando el glúteo."
    ],
    mistakes: [
      "Arquear la zona lumbar para subir más la pierna.",
      "Usar impulso de balanceo rápido."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Glute_Kickback/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Glute_Kickback/1.jpg",
    primaryMuscle: "gluteos",
    secondaryMuscles: ["isquios"],
    difficulty: "Principiante",
    shortDesc: "Aislamiento unilateral continuo con cable que sigue la orientación diagonal anatómica de las fibras del glúteo.",
    machineName: "Torre de Polea Regulable Baja",
    machineSetup: {
      pinOrCableLevel: "Polea situada en la posición más baja a ras de suelo.",
      handleOrGrip: "Tobillera acolchada asegurada alrededor del tobillo."
    },
    executionSteps: [
      {
        title: "Postura Inclinada",
        description: "Inclina el torso 45°, apoya las manos en la estructura y flexiona levemente la pierna de apoyo."
      },
      {
        title: "Extensión Diagonal",
        description: "Patea hacia atrás y 30° hacia afuera con la rodilla casi extendida hasta apretar el glúteo."
      },
      {
        title: "Pico y Retorno",
        description: "Aguanta 1 segundo y regresa en 3 segundos con control total sin que la placa toque fondo."
      }
    ],
    biomechanicsTips: [
      "La trayectoria a 30° hacia afuera activa tanto el glúteo mayor como el glúteo medio superior simultáneamente."
    ],
    commonMistakes: [
      {
        mistake: "Extensión lumbar excesiva durante la patada",
        fix: "Fija el core y mantén la pelvis neutra durante todo el movimiento.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Glúteo Mayor y Glúteo Medio (Enfoque Unilateral)",
    repRange: "12 - 15 reps por pierna",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "Squeeze de 1s atrás y 3s de bajada lenta.",
    svgGraphicType: "cable"
  },
  {
    id: "maquina_abductora",
    name: "Máquina de Abducción de Cadera",
    category: "MACHINE",
    categoryLabel: "Máquina de Placas",
    muscle: "Glúteo Medio y Glúteo Menor",
    secondary: ["Tensor de la Fascia Lata"],
    tempo: "3-1-1 (3s cierre / 1s pausa en máxima apertura / 1s apertura)",
    equipment: "Máquina de Abducción Sentado",
    rest: 60,
    tips: [
      "Siéntate con la espalda firme o inclínate ligeramente hacia adelante para mayor activación del glúteo superior.",
      "Abre las piernas con fuerza venciendo la resistencia de las almohadillas exteriores.",
      "Aguanta 1 segundo en máxima apertura antes de cerrar despacio."
    ],
    mistakes: [
      "Dejar que las placas choquen al cerrar las piernas.",
      "Usar inercia o balanceo del torso."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Abduction/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Abduction/1.jpg",
    primaryMuscle: "gluteos",
    secondaryMuscles: [],
    difficulty: "Principiante",
    shortDesc: "Aislamiento fundamental del glúteo medio para estabilidad de cadera, silueta lateral y prevención de valgo de rodilla.",
    machineName: "Máquina Abductora de Cadera (Hip Abductor)",
    machineSetup: {
      seatHeight: "Palancas ajustadas en el rango de apertura más cómodo para iniciar el movimiento.",
      backrestAngle: "Espalda apoyada o ligeramente despegada con tronco a 15° hacia adelante."
    },
    executionSteps: [
      {
        title: "Posicionamiento",
        description: "Coloca la parte externa de los muslos/rodillas contra las almohadillas y sujeta las asas laterales."
      },
      {
        title: "Abducción Máxima",
        description: "Abre las piernas lo máximo posible sintiendo la contracción en la parte lateral y alta del glúteo."
      },
      {
        title: "Retorno Resistido",
        description: "Cierra en 3 segundos manteniendo la tensión antes de que las placas se toquen."
      }
    ],
    biomechanicsTips: [
      "Inclinar el torso ligeramente hacia adelante (flexión de cadera a 60°) optimiza la línea de tracción del glúteo medio y superior."
    ],
    commonMistakes: [
      {
        mistake: "Cierre brusco sin control excéntrico",
        fix: "Resiste el cierre durante 3 segundos enteros.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Glúteo Medio y Porción Superior Lateral",
    repRange: "12 - 20 reps",
    rpeRecommendation: "RPE 9 - 10",
    tempoAdvice: "Pausa en máxima apertura y bajada muy controlada.",
    svgGraphicType: "extension"
  },

  // ==========================================
  // 5. BÍCEPS & ANTEBRAZOS (BICEPS)
  // ==========================================
  {
    id: "curl_martillo_neutral",
    name: "Curl Martillo Neutral con Mancuernas",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas",
    muscle: "Braquial Anterior & Braquiorradial",
    secondary: ["Bíceps Braquial (Cabeza Larga)", "Flexores del Antebrazo"],
    tempo: "3-1-1 (3s bajada / 1s pausa abajo / 1s subida)",
    equipment: "Par de Mancuernas",
    rest: 60,
    tips: [
      "Mantén las palmas mirándose entre sí (agarre neutro) en todo momento.",
      "Codos fijados como bisagras pegados a las costillas.",
      "Evita balancear el torso hacia atrás para levantar el peso."
    ],
    mistakes: [
      "Mover los codos hacia adelante y atrás para generar inercia.",
      "Rotar las muñecas durante la subida perdiendo la posición neutra."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/1.jpg",
    primaryMuscle: "biceps",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Principiante",
    shortDesc: "El mejor movimiento para ensanchar los brazos y dar grosor al empujar el bíceps hacia afuera gracias al braquial.",
    machineName: "Mancuernas de Peso Libre",
    machineSetup: {
      handleOrGrip: "Mancuernas con agarre neutro centrado."
    },
    executionSteps: [
      {
        title: "Postura Firme",
        description: "De pie o sentado, core firme, hombros atrás y mancuernas a los costados con palmas enfrentadas."
      },
      {
        title: "Flexión en Agarre Neutro",
        description: "Eleva las mancuernas manteniendo las palmas mirándose hasta que el antebrazo supere los 90°."
      },
      {
        title: "Contracción y Descenso",
        description: "Aprieta el braquial 1 segundo arriba y baja en 3 segundos completos hasta la extensión total."
      }
    ],
    biomechanicsTips: [
      "El agarre neutro desactiva parcialmente el bíceps como supinador y sobrecarga el braquial y el braquiorradial del antebrazo.",
      "El braquial se encuentra debajo del bíceps; al hipertrofiarse, empuja al bíceps hacia arriba aumentando el pico del brazo."
    ],
    commonMistakes: [
      {
        mistake: "Balanceo del tronco hacia atrás",
        fix: "Realiza el ejercicio sentado con la espalda pegada al banco si tiendes a trampear.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Braquial Anterior y Grosor del Brazo",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "3 segundos de descenso controlado sin soltar la tensión en antebrazos.",
    svgGraphicType: "curl"
  },
  {
    id: "curl_banco_scott",
    name: "Curl con Barra Z en Banco Scott (Predicador)",
    category: "MACHINE",
    categoryLabel: "Banco Scott + Barra Z",
    muscle: "Bíceps Braquial (Cabeza Corta / Enfoque Interno)",
    secondary: ["Braquial Anterior"],
    tempo: "3-1-1 (3s descenso / 1s estiramiento / 1s flexión)",
    equipment: "Banco Scott (Preacher) + Barra Z",
    rest: 75,
    tips: [
      "Apoya las axilas cómodamente en la parte superior del pupitre.",
      "Los brazos deben quedar completamente planos sobre la almohadilla.",
      "Baja la barra de forma muy controlada sin bloquear bruscamente los codos al final."
    ],
    mistakes: [
      "Dejar caer la barra en la parte baja provocando hiperflexión peligrosa del tendón distal del bíceps.",
      "Despegar el pecho y los brazos del pupitre para hacer palanca."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Curl/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Curl/1.jpg",
    primaryMuscle: "biceps",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Intermedio",
    shortDesc: "Aislamiento estricto que elimina toda posibilidad de inercia y sobrecarga el bíceps en posición adelantada.",
    machineName: "Banco Predicador (Scott Bench) + Barra Z",
    machineSetup: {
      seatHeight: "Asiento regulado para que el pecho quede pegado al respaldo y las axilas en el vértice superior.",
      handleOrGrip: "Barra Z tomada en las curvas internas en supinación."
    },
    executionSteps: [
      {
        title: "Colocación en el Pupitre",
        description: "Siéntate con el pecho apoyado y los brazos descansando en la almohadilla inclinada a 45°."
      },
      {
        title: "Flexión Estricta",
        description: "Flexiona los codos llevando la barra Z hacia los hombros sin despegar los brazos del banco."
      },
      {
        title: "Descenso Lento y Seguro",
        description: "Baja la barra en 3 segundos frenando el peso antes de la hiperextensión total articular."
      }
    ],
    biomechanicsTips: [
      "El ángulo del pupitre traslada el pico de máxima resistencia al inicio y mitad del rango de movimiento.",
      "La barra Z alivia la tensión de torsión en la articulación de la muñeca y el codo."
    ],
    commonMistakes: [
      {
        mistake: "Hiperextensión brusca de codos bajo carga pesada",
        fix: "Detén el descenso cuando falten 5° para el bloqueo articular completo.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Cabeza Corta del Bíceps y Pico de Contracción",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Extrema precaución en la fase excéntrica con 3 segundos de frenado estricto.",
    svgGraphicType: "curl"
  },
  {
    id: "curl_inclinado_mancuernas",
    name: "Curl Inclinado con Mancuernas en Banco 45°",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas",
    muscle: "Bíceps Braquial (Cabeza Larga / Pico del Bíceps)",
    secondary: ["Braquial Anterior"],
    tempo: "3-1-1 (3s bajada / 1s estiramiento profundo / 1s subida con supinación)",
    equipment: "Par de Mancuernas + Banco 45°",
    rest: 75,
    tips: [
      "Banco inclinado a 45°-60° con la cabeza y espalda bien apoyadas.",
      "Deja que los brazos cuelguen verticalmente hacia el suelo sintiendo el estiramiento en los hombros y bíceps.",
      "Supina fuertemente las muñecas (girando el meñique hacia arriba) al elevar el peso."
    ],
    mistakes: [
      "Adelantar los codos al subir convirtiéndolo en un curl normal.",
      "Despegar la espalda del banco para balancear las mancuernas."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Curl/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Curl/1.jpg",
    primaryMuscle: "biceps",
    secondaryMuscles: [],
    difficulty: "Intermedio",
    shortDesc: "El ejercicio por excelencia para desarrollar el pico del bíceps gracias a la elongación pasiva de la cabeza larga.",
    machineName: "Banco Regulable 45° + Mancuernas",
    machineSetup: {
      backrestAngle: "Respaldo ajustado a 45°-60°.",
      handleOrGrip: "Mancuernas en supinación."
    },
    executionSteps: [
      {
        title: "Posición Reclinada",
        description: "Túmbate en el banco con los brazos colgando hacia el piso detrás del torso."
      },
      {
        title: "Curl con Supinación",
        description: "Flexiona los codos manteniendo los brazos verticales mientras rotas las muñecas hacia afuera."
      },
      {
        title: "Contracción y Descenso Lento",
        description: "Aprieta el bíceps arriba y baja en 3 segundos sintiendo el estiramiento completo en la cabeza larga."
      }
    ],
    biomechanicsTips: [
      "La extensión de hombro pone la cabeza larga del bíceps en tensión pasiva máxima (relación longitud-tensión óptima).",
      "Girar el dedo meñique más alto que el pulgar maximiza la función supinadora del bíceps."
    ],
    commonMistakes: [
      {
        mistake: "Mover los codos hacia adelante al subir",
        fix: "Mantén los codos apuntando perpendiculares al suelo durante toda la repetición.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Cabeza Larga del Bíceps (Pico)",
    repRange: "10 - 12 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "Siente el estiramiento abajo y baja en 3 segundos.",
    svgGraphicType: "curl"
  },

  // ==========================================
  // 6. TRÍCEPS (TRICEPS)
  // ==========================================
  {
    id: "triceps_polea_cuerda",
    name: "Tríceps en Polea Alta con Cuerda",
    category: "MACHINE",
    categoryLabel: "Polea Alta",
    muscle: "Tríceps Braquial (Cabeza Lateral & Medial)",
    secondary: ["Cabeza Larga del Tríceps", "Antebrazos"],
    tempo: "3-1-1 (3s subida / 1s apertura isométrica abajo / 1s empuje)",
    equipment: "Torre de Polea Alta + Accesorio de Cuerda Doble",
    rest: 60,
    tips: [
      "Codos pegados a las costillas y hombros deprimidos.",
      "Extiende los brazos hacia abajo y separa los extremos de la cuerda al final del recorrido.",
      "Controla la subida hasta que los antebrazos formen un ángulo de 90° sin mover los codos."
    ],
    mistakes: [
      "Mover los codos hacia adelante y atrás como si remaras.",
      "Usar el peso corporal inclinándote sobre la polea para aplastar el peso."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Triceps_Pushdown/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Triceps_Pushdown/1.jpg",
    primaryMuscle: "triceps",
    secondaryMuscles: [],
    difficulty: "Principiante",
    shortDesc: "Aislamiento clave para definir y dar forma a la cabeza lateral del tríceps con libertad de muñeca.",
    machineName: "Torre de Polea Alta",
    machineSetup: {
      pinOrCableLevel: "Polea colocada en la posición más alta.",
      handleOrGrip: "Cuerda doble de tríceps con topes de goma."
    },
    executionSteps: [
      {
        title: "Postura y Fijación",
        description: "Pequeña inclinación del torso hacia adelante (10°), codos fijados a los costados del tórax."
      },
      {
        title: "Extensión y Apertura",
        description: "Empuja la cuerda hacia abajo y abre las manos hacia los muslos en pronación al final."
      },
      {
        title: "Pausa y Retorno",
        description: "Aprieta los tríceps 1 segundo abajo y regresa en 3 segundos hasta los 90° de flexión."
      }
    ],
    biomechanicsTips: [
      "La apertura de la cuerda al final añade rotación interna que incrementa el pico de acortamiento de la cabeza lateral.",
      "Fijar el codo evita la implicación del dorsal ancho y deltoides posterior."
    ],
    commonMistakes: [
      {
        mistake: "Subir las manos por encima del pecho despegando los codos",
        fix: "Frena la subida cuando los antebrazos lleguen a 90° respecto al brazo.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Cabeza Lateral y Medial del Tríceps",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 10",
    tempoAdvice: "1 segundo de apertura y bloqueo estricto abajo.",
    svgGraphicType: "cable"
  },
  {
    id: "press_frances_barra_z",
    name: "Press Francés con Barra Z (Skull Crushers)",
    category: "MACHINE",
    categoryLabel: "Barra Z + Banco Plano",
    muscle: "Tríceps Braquial (Énfasis Cabeza Larga)",
    secondary: ["Cabeza Medial y Lateral"],
    tempo: "3-1-1 (3s bajada a la frente/coronilla / 1s pausa / 1s extensión)",
    equipment: "Barra Z + Banco Plano",
    rest: 90,
    tips: [
      "Acuéstate en el banco plano con la barra extendida sobre el pecho.",
      "Inclina los brazos ligeramente hacia atrás (15° respecto a la vertical) para mantener tensión continua.",
      "Flexiona los codos llevando la barra hacia la frente o coronilla sin abrir los codos en exceso."
    ],
    mistakes: [
      "Abrir los codos en ángulo hacia afuera perdiendo el aislamiento de tríceps.",
      "Mover los brazos hacia adelante en la subida convirtiéndolo en un press de pecho."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Lying_Triceps_Extension/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Lying_Triceps_Extension/1.jpg",
    primaryMuscle: "triceps",
    secondaryMuscles: [],
    difficulty: "Intermedio",
    shortDesc: "El ejercicio de masa número 1 para tríceps que involucra masivamente la cabeza larga.",
    machineName: "Banco Plano + Barra Z",
    machineSetup: {
      handleOrGrip: "Barra Z en agarre prono cerrado en los ángulos internos."
    },
    executionSteps: [
      {
        title: "Alineación en Banco",
        description: "Túmbate boca arriba con pies en el suelo y barra Z sostenida con brazos inclinados 15° hacia la cabeza."
      },
      {
        title: "Flexión hacia la Coronilla",
        description: "Baja la barra en 3 segundos doblando los codos hacia atrás hasta que la barra roce la parte superior de la cabeza."
      },
      {
        title: "Extensión Pura",
        description: "Extiende los codos volviendo a la posición inclinada de 15° sin llevar los brazos verticales."
      }
    ],
    biomechanicsTips: [
      "Bajar hacia la coronilla en vez de la frente aumenta el rango de estiramiento de la cabeza larga y reduce la presión sobre el tendón del codo."
    ],
    commonMistakes: [
      {
        mistake: "Codos abiertos en 45° durante el descenso",
        fix: "Imagina que tienes una pelota entre los codos y apriétala hacia adentro.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Cabeza Larga del Tríceps (Masa y Volumen)",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3 segundos de descenso riguroso hacia la coronilla.",
    svgGraphicType: "extension"
  },
  {
    id: "fondos_paralelas_triceps",
    name: "Fondos en Paralelas para Tríceps",
    category: "MACHINE",
    categoryLabel: "Barras Paralelas / Máquina Asistida",
    muscle: "Tríceps Braquial (Las 3 Cabezas)",
    secondary: ["Pectoral Inferior", "Deltoides Anterior"],
    tempo: "3-1-1 (3s descenso / 1s pausa abajo a 90° / 1s empuje)",
    equipment: "Estación de Barras Paralelas o Máquina Asistida",
    rest: 90,
    tips: [
      "Mantén el torso lo más erguido posible para enfocar el esfuerzo en los tríceps (inclinarse adelante traslada la carga al pecho).",
      "Codos pegados al cuerpo descendiendo hasta un ángulo de 90° en los codos.",
      "Bloquea fuertemente los tríceps en la parte alta."
    ],
    mistakes: [
      "Descender demasiado profundo (más de 90°) si no tienes buena movilidad de hombro.",
      "Abrir los codos hacia los lados."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dips/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dips/1.jpg",
    primaryMuscle: "triceps",
    secondaryMuscles: ["pecho", "hombros"],
    difficulty: "Avanzado",
    shortDesc: "Ejercicio compuesto de empuje con peso corporal de alta demanda neuromuscular para tríceps y hombros.",
    machineName: "Estación de Fondos en Paralelas / Dip Station",
    machineSetup: {
      handleOrGrip: "Barras paralelas al ancho de los hombros."
    },
    executionSteps: [
      {
        title: "Suspensión Inicial",
        description: "Sostén tu peso con brazos extendidos, torso vertical y piernas cruzadas."
      },
      {
        title: "Descenso Controlado",
        description: "Baja en 3 segundos flexionando los codos hacia atrás hasta alcanzar los 90°."
      },
      {
        title: "Empuje Vertical",
        description: "Empuja con las palmas extendiendo los codos hasta volver a la posición de bloqueo superior."
      }
    ],
    biomechanicsTips: [
      "Mantener el torso vertical a 90° maximiza el brazo de momento en la articulación del codo, sobrecargando los tríceps."
    ],
    commonMistakes: [
      {
        mistake: "Descenso descontrolado con rebote en hombros",
        fix: "Baja en 3 segundos y frena cuando el codo forme ángulo recto.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Tríceps Completo (Cabezas Lateral, Medial y Larga)",
    repRange: "6 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Descenso en 3 segundos con control total articular.",
    svgGraphicType: "dips"
  },

  // ==========================================
  // 7. ABDOMINALES & CORE (ABS & CORE)
  // ==========================================
  {
    id: "crunch_polea_alta",
    name: "Crunch en Polea Alta con Cuerda",
    category: "MACHINE",
    categoryLabel: "Polea Alta",
    muscle: "Recto Abdominal (Fibras Superiores y Medias)",
    secondary: ["Oblicuos", "Serrato"],
    tempo: "3-1-1 (3s extensión / 1s contracción máxima / 1s flexión espinal)",
    equipment: "Torre de Polea Alta + Cuerda",
    rest: 60,
    tips: [
      "Arrodíllate frente a la polea y apoya las manos con la cuerda pegadas a las sienes.",
      "El movimiento consiste en enrollar la columna (llevar las costillas hacia la pelvis), no en doblar la cadera.",
      "Mantén las caderas fijas y bloqueadas sin sentarte sobre los talones."
    ],
    mistakes: [
      "Flexionar las caderas sentándose en los talones (activando psoas en lugar de abdominales).",
      "Tirar con los brazos en lugar de flexionar la columna con el abdomen."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Kneeling_Crunch/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Kneeling_Crunch/1.jpg",
    primaryMuscle: "core",
    secondaryMuscles: [],
    difficulty: "Intermedio",
    shortDesc: "El ejercicio más eficaz para sobrecarga progresiva del abdomen mediante tensión mecánica continua en cable.",
    machineName: "Torre de Polea Alta con Cuerda",
    machineSetup: {
      pinOrCableLevel: "Polea alta en el nivel superior.",
      handleOrGrip: "Cuerda doble apoyada contra la frente/sienes."
    },
    executionSteps: [
      {
        title: "Posición de Rodillas",
        description: "Arrodíllate a 1 metro de la polea, sujeta la cuerda junto a las sienes y fija las caderas."
      },
      {
        title: "Enrollamiento Espinal",
        description: "Flexiona el tronco enrollando la columna hacia adentro como si quisieras tocar tus rodillas con los codos."
      },
      {
        title: "Pico y Retorno",
        description: "Aprieta el abdomen al máximo 1 segundo y regresa en 3 segundos extendiendo la espalda hasta la posición neutra."
      }
    ],
    biomechanicsTips: [
      "El recto abdominal solo tiene la función de flexionar la columna vertebral (acercar esternón a pubis); el resto de flexión pertenece a los flexores de cadera."
    ],
    commonMistakes: [
      {
        mistake: "Mover las caderas hacia atrás como en una sentadilla",
        fix: "Mantén el ángulo de cadera a 90° congelado y muévete exclusivamente desde el tronco.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Recto Abdominal (Six Pack) con Sobrecarga Progresiva",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 9 - 10",
    tempoAdvice: "Aprieta el abdomen 1 segundo abajo y sube en 3 segundos estirando la pared abdominal.",
    svgGraphicType: "crunch"
  },
  {
    id: "elevacion_piernas_colgado",
    name: "Elevación de Piernas Colgado en Barra",
    category: "MACHINE",
    categoryLabel: "Barra de Dominadas / Torre",
    muscle: "Recto Abdominal Inferior & Core Profundo",
    secondary: ["Flexores de Cadera (Psoas)", "Oblicuos", "Antebrazos"],
    tempo: "3-1-1 (3s descenso / 1s pausa arriba / 1s elevación)",
    equipment: "Barra de Dominadas o Estación Romana",
    rest: 75,
    tips: [
      "Cuélgate de la barra con agarre prono y escápulas activadas.",
      "Eleva las piernas o rodillas curvando la pelvis hacia el pecho (retroversión pélvica activa).",
      "Controla la bajada para evitar balanceos pendulares."
    ],
    mistakes: [
      "Balancear el cuerpo usando la inercia para subir las piernas.",
      "Solo flexionar la cadera sin redondear la pelvis hacia arriba (anula el trabajo abdominal)."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/1.jpg",
    primaryMuscle: "core",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Avanzado",
    shortDesc: "Gran ejercicio de control abdominal y fuerza funcional de core en cadena cinética abierta.",
    machineName: "Barra de Dominadas / Torre de Core",
    machineSetup: {
      handleOrGrip: "Barra tomada con agarre prono firme al ancho de los hombros."
    },
    executionSteps: [
      {
        title: "Suspensión Estable",
        description: "Cuélgate con los brazos estirados, core activo y piernas juntas sin oscilar."
      },
      {
        title: "Elevación Pélvica",
        description: "Eleva las piernas hacia la horizontal flexionando la pelvis hacia el ombligo."
      },
      {
        title: "Descenso sin Inercia",
        description: "Baja las piernas en 3 segundos manteniendo el abdomen apretado para no balancearte."
      }
    ],
    biomechanicsTips: [
      "Para activar el recto abdominal es imprescindible que la pelvis rote hacia arriba al final del recorrido.",
      "Si resulta muy difícil con piernas estiradas, flexionar las rodillas a 90° reduce el brazo de palanca manteniendo el estímulo."
    ],
    commonMistakes: [
      {
        mistake: "Columpiarse usando balanceo de hombros",
        fix: "Detén la inercia en cada repetición antes de iniciar la siguiente.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Porción Inferior del Recto Abdominal y Flexores de Cadera",
    repRange: "8 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "Bajada de 3 segundos frenando por completo cualquier balanceo.",
    svgGraphicType: "abs"
  },
  {
    id: "plancha_isometrica",
    name: "Plancha Abdominal Isométrica (Plank)",
    category: "MACHINE",
    categoryLabel: "Peso Corporal / Suelo",
    muscle: "Transverso Abdominal & Core Estabilizador",
    secondary: ["Recto Abdominal", "Oblicuos", "Glúteos", "Serrato"],
    tempo: "Isométrico (45s - 60s tensión máxima continua)",
    equipment: "Esterilla / Suelo",
    rest: 60,
    tips: [
      "Apoya los antebrazos en el suelo alineando los codos exactamente bajo los hombros.",
      "Contrae activamente glúteos, cuádriceps y abdomen formando una tabla recta de tobillos a cabeza.",
      "Haz fuerza con los codos hacia las puntas de los pies (tensión RKC) para multiplicar el estímulo."
    ],
    mistakes: [
      "Dejar caer la cadera hacia el suelo arqueando la zona lumbar.",
      "Elevar los glúteos en forma de pirámide para descansar."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg",
    primaryMuscle: "core",
    secondaryMuscles: ["gluteos", "hombros"],
    difficulty: "Principiante",
    shortDesc: "El ejercicio fundamental de anti-extensión espinal para fuerza profunda de core y salud vertebral.",
    machineName: "Suelo / Esterilla",
    machineSetup: {
      seatHeight: "Superficie plana sobre colchoneta."
    },
    executionSteps: [
      {
        title: "Alineación de Antebrazos",
        description: "Codos bajo hombros, antebrazos paralelos en el suelo."
      },
      {
        title: "Bloqueo de Cadena",
        description: "Aprieta glúteos, mete el ombligo hacia la columna y mantén la espalda neutra."
      },
      {
        title: "Respiración Diafragmática",
        description: "Respira de forma corta y controlada manteniendo la máxima rigidez durante el tiempo fijado."
      }
    ],
    biomechanicsTips: [
      "La plancha entrena el transverso abdominal en su función natural de cinturón anatómico protector de la columna."
    ],
    commonMistakes: [
      {
        mistake: "Hiperextensión lumbar por fatiga abdominal",
        fix: "Detén la serie si la pelvis cae por debajo de la línea neutra.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Transverso del Abdomen y Estabilidad Lumbar",
    repRange: "30 - 60 segundos",
    rpeRecommendation: "RPE 9",
    tempoAdvice: "Tensión activa sostenida sin aflojar.",
    svgGraphicType: "abs"
  },

  // ==========================================
  // 8. HOMBROS (SHOULDERS)
  // ==========================================
  {
    id: "elevaciones_laterales",
    name: "Elevaciones Laterales con Mancuernas",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas",
    muscle: "Deltoides Lateral (Cabeza Media)",
    secondary: ["Deltoides Anterior", "Trapecio Superior"],
    tempo: "3-1-1 (3s bajada lenta / 1s pausa arriba / 1s elevación)",
    equipment: "Par de Mancuernas Ligeras/Medias",
    rest: 60,
    tips: [
      "Inclina el torso 5°-10° hacia adelante.",
      "Eleva los brazos en el plano escapular (30° por delante del cuerpo, no en cruz estricta a 90°).",
      "Imagina empujar las mancuernas hacia las paredes laterales en vez de hacia arriba."
    ],
    mistakes: [
      "Encoger los hombros activando el trapecio superior en lugar del deltoides.",
      "Usar impulso de piernas y cadera para balancear las mancuernas."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg",
    primaryMuscle: "hombros",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Principiante",
    shortDesc: "El movimiento definitivo para crear hombros anchos en forma de bola de cañón y silueta en V.",
    machineName: "Área de Peso Libre / Mancuernas",
    machineSetup: {
      handleOrGrip: "Mancuernas tomadas con agarre prono equilibrado."
    },
    executionSteps: [
      {
        title: "Postura y Ángulo Escapular",
        description: "Pies al ancho de caderas, tronco inclinado 10° al frente y codos con leve semiflexión fija (15°)."
      },
      {
        title: "Elevación en Arco Amplio",
        description: "Eleva los brazos 30° adelantados respecto al torso hasta la altura paralela de los hombros."
      },
      {
        title: "Pausa en Paralelo",
        description: "Sostén 1 segundo con las mancuernas a la altura de los hombros y baja en 3 segundos."
      }
    ],
    biomechanicsTips: [
      "Moverse en el plano escapular (30° hacia adelante) previene el pinzamiento subacromial del tendón supraespinoso.",
      "Pensar en alejar las mancuernas hacia los lados aumenta el brazo de palanca y maximiza el aislamiento del deltoides medio."
    ],
    commonMistakes: [
      {
        mistake: "Elevar las mancuernas por encima de la línea de los hombros",
        fix: "Detén la subida cuando los brazos queden paralelos al suelo para no transferir el esfuerzo al trapecio.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Deltoides Lateral (Anchura de Hombros)",
    repRange: "12 - 15 reps",
    rpeRecommendation: "RPE 9 - 10",
    tempoAdvice: "3 segundos de descenso controlado sin dejar caer las mancuernas.",
    svgGraphicType: "lateral"
  },

  // ==========================================
  // 9. CARDIO (CARDIOVASCULAR & VO2)
  // ==========================================
  {
    id: "bicicleta_estatica",
    name: "Bicicleta Estática / Spinning",
    category: "CARDIO",
    categoryLabel: "Cardio",
    muscle: "Sistema Cardiovascular & Cuádriceps",
    secondary: ["Glúteos", "Gemelos", "Isquiosurales"],
    tempo: "Cadencia Continua (80 - 95 RPM)",
    equipment: "Bicicleta Estática / Ciclo Indoor",
    rest: 60,
    tips: [
      "Ajusta el sillín a la altura de la cresta ilíaca (hueso de la cadera).",
      "Al pedalear abajo, la rodilla debe conservar una ligera flexión de 25°-30° (nunca bloquearse).",
      "Mantén los hombros relajados sin crispar el cuello sobre el manillar."
    ],
    mistakes: [
      "Sillín demasiado bajo (sobrecarga patelar de rodilla).",
      "Sillín demasiado alto (balanceo de caderas y sobrecarga lumbar)."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stationary_Bike/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stationary_Bike/1.jpg",
    primaryMuscle: "cardio",
    secondaryMuscles: ["cuadriceps", "gemelos"],
    difficulty: "Principiante",
    shortDesc: "Acondicionamiento cardiovascular de bajo impacto articular ideal para quema calórica y salud metabólica.",
    machineName: "Bicicleta Estática de Resistencia Magnética",
    machineSetup: {
      seatHeight: "Sillín regulado a la altura de la cadera.",
      handleOrGrip: "Manillar a la altura del sillín o 2 cm por encima."
    },
    executionSteps: [
      {
        title: "Ajuste Biomecánico",
        description: "Coloca los pies en los calapiés y ajusta las correas firmemente."
      },
      {
        title: "Pedaleo Redondo",
        description: "Aplica fuerza tanto al empujar hacia abajo como al traccionar hacia arriba en cadencia fluida de 85 RPM."
      },
      {
        title: "Regulación de Resistencia",
        description: "Ajusta la resistencia para mantener la frecuencia cardíaca en Zona 2 o Zona 3."
      }
    ],
    biomechanicsTips: [
      "La flexión de rodilla de 25°-30° en el punto muerto inferior protege el cartílago rotuliano y optimiza la potencia del cuádriceps."
    ],
    commonMistakes: [
      {
        mistake: "Pedalear con resistencia nula botando en el sillín",
        fix: "Aplica suficiente resistencia para mantener control firme y contacto fluido.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Capacidad Aeróbica (Zona 2) y Resistencia Muscular",
    repRange: "20 - 45 minutos",
    rpeRecommendation: "RPE 6 - 7 (Conversacional)",
    tempoAdvice: "Cadencia rítmica fluida de 85 RPM.",
    svgGraphicType: "treadmill"
  },

  // ==========================================
  // 16. GEMELOS & SÓLEO (CALVES & SOLEUS)
  // ==========================================
  {
    id: "gemelos_maquina_sentado",
    name: "Elevación de Talones en Máquina Sentado (Sóleo)",
    category: "MACHINE",
    categoryLabel: "Máquina de Placas / Discos",
    muscle: "Sóleo (Músculo profundo de la pantorrilla)",
    secondary: ["Gastrocnemio", "Tendón de Aquiles"],
    tempo: "3-2-1 (3s descenso / 2s estiramiento profundo / 1s elevación)",
    equipment: "Máquina de Gemelos Sentado",
    rest: 60,
    tips: [
      "Con la rodilla flexionada a 90°, el gastrocnemio se desactiva y el sóleo asume el 90% de la carga.",
      "Mantén una pausa estricta de 2 segundos abajo para disipar el rebote elástico del tendón de Aquiles.",
      "Empuja principalmente a través de la base del primer y segundo metatarso."
    ],
    mistakes: [
      "Rebotar violentamente en la parte baja aprovechando el rebote pasivo del tendón.",
      "Realizar repeticiones cortas sin llegar a la máxima dorsiflexión."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Calf_Raise/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Calf_Raise/1.jpg",
    primaryMuscle: "gemelos",
    secondaryMuscles: [],
    difficulty: "Principiante",
    shortDesc: "Aislamiento biomecánico puro del sóleo mediante flexión de rodilla a 90° para ensanchar la pantorrilla lateral e inferior.",
    machineName: "Máquina Seated Calf Raise",
    machineSetup: {
      seatHeight: "Ajusta la almohadilla superior sobre los muslos distales justo por encima de las rodillas.",
      handleOrGrip: "Sujeta las agarraderas laterales para fijar la pelvis contra el asiento.",
      safetyCatch: "Libera la palanca de seguridad tras levantar la carga con los talones."
    },
    executionSteps: [
      {
        title: "Colocación y Desbloqueo",
        description: "Apoya los metatarsos en el borde del escalón y encaja la almohadilla sobre los muslos."
      },
      {
        title: "Descenso y Pausa Isométrica",
        description: "Baja los talones lentamente sintiendo cómo se elonga el sóleo y mantén 2s abajo sin rebotar."
      },
      {
        title: "Extensión Completa",
        description: "Empuja con fuerza sobre la bola del pie elevando los talones al máximo y aprieta 1 segundo arriba."
      }
    ],
    biomechanicsTips: [
      "El sóleo es un músculo predominantemente compuesto por fibras tipo I (lentas), respondiendo excepcionalmente bien a rangos de 12-20 repeticiones con tempo controlado."
    ],
    commonMistakes: [
      {
        mistake: "Rebotar usando la elasticidad del tendón de Aquiles",
        fix: "Pausa obligatoria de 2 segundos en el punto de máximo estiramiento.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Sóleo (Anchura y Grosor de la Pantorrilla)",
    repRange: "12 - 20 reps",
    rpeRecommendation: "RPE 8.5 - 10 (Fallo muscular controlado)",
    tempoAdvice: "3 segundos de bajada, 2 segundos de pausa en estiramiento, 1 segundo concéntrico.",
    svgGraphicType: "calf"
  },
  {
    id: "gemelos_prensa_45",
    name: "Elevación de Gemelos en Prensa de Piernas 45°",
    category: "MACHINE",
    categoryLabel: "Prensa Inclinada",
    muscle: "Gastrocnemio (Cabeza Medial y Lateral)",
    secondary: ["Sóleo", "Tibial Posterior"],
    tempo: "3-2-1 (3s bajada / 2s pausa / 1s empuje)",
    equipment: "Prensa 45° de Discos",
    rest: 75,
    tips: [
      "Mantén las rodillas con una microflexión de seguridad (bloqueo suave) para no hiperextender.",
      "Deja los topes de seguridad activados a una altura que proteja en caso de resbalón.",
      "Baja los talones por debajo de la plataforma para un estiramiento completo."
    ],
    mistakes: [
      "Bloquear las rodillas en hiperextensión aumentando el estrés articular sobre la cápsula posterior.",
      "Colocar muy poco pie sobre el borde con riesgo de resbalamiento."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press_On_The_Leg_Press_Machine/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press_On_The_Leg_Press_Machine/1.jpg",
    primaryMuscle: "gemelos",
    secondaryMuscles: [],
    difficulty: "Intermedio",
    shortDesc: "Sobrecarga pesada con rodillas extendidas para maximizar la tensión mecánica sobre las dos cabezas del gastrocnemio.",
    machineName: "Prensa 45° con Rodillos Guía",
    machineSetup: {
      seatHeight: "Respaldo ajustado a 45° con cadera bien pegada.",
      handleOrGrip: "Manijas de bloqueo aseguradas con tope cerca del rango de trabajo.",
      pinOrCableLevel: "Carga de discos balanceada en ambos cuernos."
    },
    executionSteps: [
      {
        title: "Posición Inicial",
        description: "Coloca el tercio anterior de ambos pies en el borde inferior de la plataforma de la prensa."
      },
      {
        title: "Dorsiflexión Controlada",
        description: "Deja que el peso flexione los tobillos llevando los talones hacia atrás con rodillas casi extendidas."
      },
      {
        title: "Flexión Plantar Potente",
        description: "Empuja sobre las almohadillas metatarsales elevando la plataforma hacia la extensión máxima de tobillo."
      }
    ],
    biomechanicsTips: [
      "Con la rodilla extendida, el gastrocnemio se encuentra en una longitud óptima para generar su máxima fuerza de contracción."
    ],
    commonMistakes: [
      {
        mistake: "Hiperextensión brusca de rodillas con carga pesada",
        fix: "Mantén un ángulo de rodilla fijado con microflexión constante durante toda la serie.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Gastrocnemio Medial y Lateral",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3s de descenso excéntrico estirando el gemelo, 2s pausa, 1s empuje.",
    svgGraphicType: "calf"
  },
  {
    id: "gemelos_maquina_smith",
    name: "Elevación de Talones de Pie en Máquina Smith sobre Step",
    category: "MACHINE",
    categoryLabel: "Multipower / Smith Machine",
    muscle: "Gastrocnemio (Gemelo Mayor)",
    secondary: ["Sóleo", "Core"],
    tempo: "3-2-1",
    equipment: "Máquina Smith + Bloque/Step",
    rest: 75,
    tips: [
      "Coloca un step firme directamente debajo de la trayectoria de la barra guiada.",
      "Usa almohadilla en la barra sobre los trapecios para mayor confort cervical.",
      "Realiza el movimiento de forma vertical sin balancear la cadera."
    ],
    mistakes: [
      "Usar un bloque inestable que pueda volcarse durante el ejercicio.",
      "Flexionar las rodillas convirtiendo el ejercicio en un medio squat."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/1.jpg",
    primaryMuscle: "gemelos",
    secondaryMuscles: ["core"],
    difficulty: "Intermedio",
    shortDesc: "Trabajo pesado y guiado de pantorrillas de pie eliminando los requerimientos de equilibrio libre.",
    machineName: "Smith Machine (Multipower)",
    machineSetup: {
      safetyCatch: "Ganchos de seguridad colocados justo debajo de la profundidad de estiramiento.",
      handleOrGrip: "Barra apoyada sobre trapecios con agarre medio de manos."
    },
    executionSteps: [
      {
        title: "Apoyo en Step",
        description: "Coloca la parte delantera de los pies sobre el borde del step bajo la barra Smith."
      },
      {
        title: "Estiramiento Profundo",
        description: "Baja los talones hacia el suelo todo lo que permita tu movilidad de tobillo."
      },
      {
        title: "Extensión Plantar",
        description: "Sube hasta ponerte de puntillas sobre los dedos manteniendo el tronco recto."
      }
    ],
    biomechanicsTips: [
      "La trayectoria 100% lineal de la Smith permite concentrar toda la fuerza en el vector vertical del tríceps sural."
    ],
    commonMistakes: [
      {
        mistake: "Inclinar el torso hacia delante",
        fix: "Mantén el cuerpo completamente alineado en la vertical.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Vientres Musculares del Gastrocnemio",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "Descenso 3s, parada isométrica 2s, subida 1s.",
    svgGraphicType: "calf"
  },

  // ==========================================
  // 17. ANTEBRAZOS (FOREARMS & GRIP)
  // ==========================================
  {
    id: "curl_antebrazo_barra_prono",
    name: "Extensión de Muñeca en Banco con Barra (Extensores)",
    category: "DUMBBELL",
    categoryLabel: "Barra / Mancuernas",
    muscle: "Extensores del Antebrazo (Radial y Cubital)",
    secondary: ["Braquiorradial"],
    tempo: "3-1-1 (3s bajada / 1s contracción arriba)",
    equipment: "Barra Recta Ligera o Mancuernas + Banco Plano",
    rest: 60,
    tips: [
      "Apoya los antebrazos sobre un banco plano o tus muslos dejando las muñecas libres por fuera.",
      "Usa agarre en pronación (palmas mirando hacia el suelo).",
      "Eleva la barra utilizando exclusivamente la extensión articular de muñecas."
    ],
    mistakes: [
      "Usar pesos excesivos que fuercen la articulación de la muñeca.",
      "Separar los antebrazos del banco durante la repetición."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Down_Wrist_Curl_Over_A_Bench/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Down_Wrist_Curl_Over_A_Bench/1.jpg",
    primaryMuscle: "antebrazos",
    secondaryMuscles: [],
    difficulty: "Principiante",
    shortDesc: "Desarrollo del compartimento posterior y lateral del antebrazo, mejorando la fuerza de agarre y previniendo epicondilitis.",
    machineName: "Banco Plano + Barra Recta",
    machineSetup: {
      seatHeight: "De rodillas junto al banco plano apoyando los antebrazos con firmeza.",
      handleOrGrip: "Agarre en pronación al ancho de los hombros con barra corta."
    },
    executionSteps: [
      {
        title: "Fijación de Antebrazos",
        description: "Apoya los antebrazos en el banco dejando colgar las muñecas en el borde."
      },
      {
        title: "Descenso en Flexión",
        description: "Deja que la barra baje suavemente flexionando las muñecas hacia el suelo."
      },
      {
        title: "Extensión Dorsal",
        description: "Extiende las muñecas hacia arriba lo más alto posible contrayendo la cara dorsal del antebrazo."
      }
    ],
    biomechanicsTips: [
      "Los extensores de muñeca estabilizan la mano en todos los movimientos de empuje y tracción pesada."
    ],
    commonMistakes: [
      {
        mistake: "Despegar los codos y antebrazos del banco para ayudarse con los hombros",
        fix: "Fija los antebrazos inmóviles contra la superficie acolchada.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Extensores de Muñeca y Cara Dorsal del Antebrazo",
    repRange: "15 - 20 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3 segundos de bajada controlada y 1 segundo apretando arriba.",
    svgGraphicType: "forearm"
  },
  {
    id: "curl_antebrazo_supino",
    name: "Flexión Palmar de Muñeca en Banco (Flexores)",
    category: "DUMBBELL",
    categoryLabel: "Barra / Mancuernas",
    muscle: "Flexores del Antebrazo (Flexor Radial y Cubital del Carpo)",
    secondary: ["Flexor Profundo de los Dedos"],
    tempo: "3-1-1",
    equipment: "Barra o Mancuernas + Banco",
    rest: 60,
    tips: [
      "Agarre en supinación (palmas mirando hacia arriba).",
      "Permite que la barra ruede levemente hacia las puntas de los dedos en la parte baja para un estiramiento integral.",
      "Cierra la mano y flexiona la muñeca con fuerza hacia tu cuerpo."
    ],
    mistakes: [
      "Movimientos bruscos y descontrolados con cargas altas.",
      "No abrir los dedos en la fase excéntrica perdiendo recorrido de los flexores profundos."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Up_Wrist_Curl_Over_A_Bench/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Up_Wrist_Curl_Over_A_Bench/1.jpg",
    primaryMuscle: "antebrazos",
    secondaryMuscles: [],
    difficulty: "Principiante",
    shortDesc: "Aumento del grosor masivo en la cara anterior e interna del antebrazo y potenciamiento del agarre palmar.",
    machineName: "Banco Plano + Mancuernas / Barra",
    machineSetup: {
      seatHeight: "Antebrazos descansando sobre los muslos o banco plano con muñecas sobresaliendo.",
      handleOrGrip: "Agarre supino cerrado con barra olímpica o EZ."
    },
    executionSteps: [
      {
        title: "Apertura Excéntrica",
        description: "Baja la muñeca y permite que la barra ruede suavemente hacia las yemas de los dedos."
      },
      {
        title: "Cierre de Agarre",
        description: "Flexiona los dedos primero para recuperar la barra en la palma de la mano."
      },
      {
        title: "Flexión Completa",
        description: "Flexiona la muñeca hacia arriba en contracción máxima del vientre flexor."
      }
    ],
    biomechanicsTips: [
      "El compartimento flexor representa más del 60% del volumen muscular total del antebrazo."
    ],
    commonMistakes: [
      {
        mistake: "Soltar la barra por abrir los dedos demasiado rápido",
        fix: "Controla cada milímetro de rodadura en la mano.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Flexores de Muñeca y Dedos (Grosor Interno)",
    repRange: "15 - 20 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "3s bajada con apertura controlada de dedos, 1s flexión potente.",
    svgGraphicType: "forearm"
  },
  {
    id: "paseo_del_granjero",
    name: "Paseo del Granjero con Mancuernas Pesadas (Farmer's Walk)",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas / Trap Bar",
    muscle: "Antebrazo (Fuerza de Agarre Isométrico)",
    secondary: ["Trapecio Superior", "Core y Oblicuos", "Glúteos"],
    tempo: "Tensión Isométrica Continua (30-45s por serie)",
    equipment: "2 Mancuernas Pesadas o Trap Bar",
    rest: 90,
    tips: [
      "Mantén la columna neutra, pecho inflado y escápulas ligeramente retraídas.",
      "Da pasos cortos y controlados en línea recta evitando el balanceo lateral del tronco.",
      "Aprieta las mancuernas con toda la fuerza de tus manos como si quisieras aplastar el acero."
    ],
    mistakes: [
      "Permitir que los hombros caigan en protracción excesiva encorvando la espalda.",
      "Caminar demasiado rápido tropezando o perdiendo la alineación pélvica."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/1.jpg",
    primaryMuscle: "antebrazos",
    secondaryMuscles: ["trapecio", "core", "gluteos"],
    difficulty: "Intermedio",
    shortDesc: "Ejercicio compuesto de transporte de carga para desarrollar un agarre indestructible, trapecios densos y core blindado.",
    machineName: "Par de Mancuernas Pesadas / Kettlebells",
    machineSetup: {
      handleOrGrip: "Levantar desde el suelo manteniendo técnica perfecta de peso muerto.",
      backrestAngle: "Cuerpo vertical erguido sin inclinaciones."
    },
    executionSteps: [
      {
        title: "Levantamiento Seguro",
        description: "Haz una sentadilla/peso muerto para levantar las dos mancuernas simultáneamente."
      },
      {
        title: "Caminar Erguido",
        description: "Camina a paso firme, constante y rítmico manteniendo la mirada al frente y hombros alineados."
      },
      {
        title: "Descenso Controlado",
        description: "Al finalizar el tiempo, flexiona caderas y rodillas para depositar las cargas en el suelo."
      }
    ],
    biomechanicsTips: [
      "Genera una enorme co-contracción isométrica de todos los músculos estabilizadores del tronco y la cintura escapular."
    ],
    commonMistakes: [
      {
        mistake: "Dejar que las mancuernas golpeen los muslos",
        fix: "Separa los brazos 2 centímetros del cuerpo manteniendo tensión activa en dorsales.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Agarre Isométrico, Trapecios y Anti-Inclinación Lateral de Core",
    repRange: "30 - 45 segundos por serie (o 30 metros)",
    rpeRecommendation: "RPE 9 (Hasta el límite del agarre)",
    tempoAdvice: "Paso cadencioso y constante con tensión ininterrumpida.",
    svgGraphicType: "forearm"
  },
  {
    id: "curl_martillo_polea_cuerda",
    name: "Curl Martillo en Polea Baja con Cuerda",
    category: "MACHINE",
    categoryLabel: "Poleas / Cables",
    muscle: "Braquiorradial (Antebrazo y Brazo Externo)",
    secondary: ["Braquial Anterior", "Bíceps Braquial"],
    tempo: "3-1-1",
    equipment: "Torre de Polea Baja + Cuerda Tríceps",
    rest: 60,
    tips: [
      "Polea colocada en el punto más bajo.",
      "Agarre neutro con los pulgares apuntando hacia arriba en las puntas de la cuerda.",
      "Abre los extremos de la cuerda en la parte alta para mayor pico de contracción."
    ],
    mistakes: [
      "Balancear el torso hacia atrás usando la inercia lumbar.",
      "Llevar los codos hacia delante perdiendo tensión en el braquiorradial."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment/1.jpg",
    primaryMuscle: "antebrazos",
    secondaryMuscles: ["biceps"],
    difficulty: "Principiante",
    shortDesc: "Tensión constante del cable para hipertrofiar el braquiorradial y dar volumen al antebrazo proximal.",
    machineName: "Torre de Poleas Regulable",
    machineSetup: {
      pinOrCableLevel: "Polea fijada en el orificio inferior a nivel de suelo.",
      handleOrGrip: "Accesorio de cuerda trenzada tomado con agarre neutro."
    },
    executionSteps: [
      {
        title: "Posición Estable",
        description: "De pie frente a la polea con pies al ancho de caderas y codos pegados a los costados."
      },
      {
        title: "Flexión en Martillo",
        description: "Flexiona los codos subiendo la cuerda hacia los hombros con muñecas firmes y neutras."
      },
      {
        title: "Apertura Superior",
        description: "En el punto más alto, separa ligeramente las manos hacia los lados y aprieta 1s."
      }
    ],
    biomechanicsTips: [
      "La posición semipronada neutral desfavorece al bíceps y pone toda la ventaja mecánica en el braquiorradial."
    ],
    commonMistakes: [
      {
        mistake: "Flexionar las muñecas hacia dentro",
        fix: "Mantén la muñeca en línea recta con el antebrazo sin flexión cubital ni palmar.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Braquiorradial y Cara Externa del Brazo",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3 segundos de bajada resistiendo la tensión constante del cable.",
    svgGraphicType: "curl"
  },

  // ==========================================
  // 18. LUMBARES & ERECTORES ESPINALES (LOWER BACK)
  // ==========================================
  {
    id: "hiperextensiones_lumbares_45",
    name: "Hiperextensiones en Banco 45° (Erectores Espinales)",
    category: "MACHINE",
    categoryLabel: "Banco Regulable 45°",
    muscle: "Erectores Espinales (Iliocostal, Longísimo, Espinoso)",
    secondary: ["Glúteo Mayor", "Isquiosurales"],
    tempo: "3-1-2 (3s bajada / 1s parada abajo / 2s extensión controlada)",
    equipment: "Banco Romano / Banco de Hiperextensión 45°",
    rest: 75,
    tips: [
      "Ajusta el cojín superior por debajo de la cresta ilíaca para permitir la flexión de cadera.",
      "Extiende el tronco hasta alinear la espalda con las piernas (NO hiper-arquear la zona lumbar hacia atrás).",
      "Cruza los brazos sobre el pecho o sujeta un disco pegado al esternón para añadir sobrecarga."
    ],
    mistakes: [
      "Hiperextender bruscamente la columna hacia atrás comprimiendo las carillas articulares lumbares.",
      "Usar impulso y balanceo rápido en vez de contracción muscular estricta."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_Back_Extensions/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_Back_Extensions/1.jpg",
    primaryMuscle: "lumbares",
    secondaryMuscles: ["gluteos", "isquios"],
    difficulty: "Principiante",
    shortDesc: "Fortalecimiento biomecánico fundamental de la musculatura erectora profunda para blindar la espalda baja y mejorar la postura.",
    machineName: "Banco de Hiperextensiones 45°",
    machineSetup: {
      seatHeight: "Cojín pélvico fijado justo a la altura del pliegue de la cadera.",
      safetyCatch: "Rodillos de tobillo ajustados cómodamente detrás de los tendones de Aquiles."
    },
    executionSteps: [
      {
        title: "Colocación",
        description: "Engancha los talones en los rodillos traseros y apoya la pelvis en el soporte inclinado."
      },
      {
        title: "Flexión Espinal / Cadera",
        description: "Baja el torso hacia el suelo de manera controlada doblando desde las caderas."
      },
      {
        title: "Extensión a Neutro",
        description: "Sube contrayendo glúteos y lumbares hasta formar una línea recta perfecta con el cuerpo."
      }
    ],
    biomechanicsTips: [
      "Detener el ascenso cuando la columna alcanza su posición neutra evita el cizallamiento anterior en L4-L5 y L5-S1."
    ],
    commonMistakes: [
      {
        mistake: "Arquear la espalda hacia arriba en exceso (hiperextensión patológica)",
        fix: "Detén el movimiento en la línea neutra entre piernas y tronco.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Erectores de la Columna y Cadena Posterior Lumbar",
    repRange: "12 - 15 reps",
    rpeRecommendation: "RPE 8 - 8.5",
    tempoAdvice: "3 segundos de descenso suave y 2 segundos de subida sin tirones.",
    svgGraphicType: "hyperextension"
  },
  {
    id: "good_mornings_smith",
    name: "Buenos Días en Máquina Smith (Good Mornings)",
    category: "MACHINE",
    categoryLabel: "Smith Machine",
    muscle: "Erectores Lumbares y Cadena Posterior",
    secondary: ["Isquiosurales", "Glúteos", "Core"],
    tempo: "3-1-1",
    equipment: "Máquina Smith con Almohadilla",
    rest: 90,
    tips: [
      "Barra apoyada en la parte media/baja de los trapecios (barra baja).",
      "Empuja la cadera hacia atrás flexionando ligeramente las rodillas (bisagra de cadera pura).",
      "Mantén la columna vertebral 100% neutra durante toda la inclinación."
    ],
    mistakes: [
      "Redondear la espalda lumbar al bajar por falta de flexibilidad en los isquios.",
      "Doblar las rodillas en exceso convirtiéndolo en sentadilla."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Good_Morning/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Good_Morning/1.jpg",
    primaryMuscle: "lumbares",
    secondaryMuscles: ["isquios", "gluteos"],
    difficulty: "Avanzado",
    shortDesc: "Sobrecarga en estiramiento de la cadena posterior con el carril guiado de la Smith para máxima estabilidad.",
    machineName: "Multipower (Smith Machine)",
    machineSetup: {
      safetyCatch: "Topes de seguridad de la Smith colocados a la altura del pecho paralelo al suelo.",
      handleOrGrip: "Barra sobre los trapecios con agarre firme."
    },
    executionSteps: [
      {
        title: "Desbloqueo y Postura",
        description: "Pies al ancho de hombros con rodillas desbloqueadas y abdomen comprimido."
      },
      {
        title: "Bisagra de Cadera",
        description: "Empuja el trasero hacia atrás mientras el torso se inclina hacia delante hasta quedar casi paralelo."
      },
      {
        title: "Retorno a la Vertical",
        description: "Extiende la cadera hacia delante contrayendo glúteos y erectores hasta quedar erguido."
      }
    ],
    biomechanicsTips: [
      "La máquina Smith elimina la oscilación anteroposterior permitiendo un enfoque absoluto en la elongación excéntrica lumbar e isquiotibial."
    ],
    commonMistakes: [
      {
        mistake: "Flexión lumbar cifótica (chepa en espalda baja)",
        fix: "Mantén el pecho orgulloso y no bajes más allá de lo que tus isquios permitan sin redondear.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Erectores Espinales, Isquiosurales y Cadera",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 7.5 - 8.5",
    tempoAdvice: "3 segundos de bajada controlada sintiendo la bisagra de cadera.",
    svgGraphicType: "hyperextension"
  },
  {
    id: "superman_suelo_isometrico",
    name: "Superman Isométrico en Suelo (Back Extension)",
    category: "DUMBBELL",
    categoryLabel: "Peso Corporal / Colchoneta",
    muscle: "Erectores Espinales y Multífidos",
    secondary: ["Glúteos", "Deltoides Posterior", "Isquios"],
    tempo: "1-3-1 (Pausa isométrica de 3s en la cúspide)",
    equipment: "Esterilla / Colchoneta",
    rest: 45,
    tips: [
      "Tumbado boca abajo en la esterilla con brazos y piernas extendidos.",
      "Eleva brazos, pecho y muslos del suelo simultáneamente usando la musculatura posterior.",
      "Mantén la cabeza en posición neutra mirando a la colchoneta para no hiperextender el cuello."
    ],
    mistakes: [
      "Mirar hacia arriba hiper-arqueando las vértebras cervicales.",
      "Hacer tirones bruscos sin sostener la contracción isométrica."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/1.jpg",
    primaryMuscle: "lumbares",
    secondaryMuscles: ["gluteos", "espalda"],
    difficulty: "Principiante",
    shortDesc: "Activación profunda de los erectores de columna y multífidos sin carga externa sobre la compresión discal.",
    machineName: "Suelo / Esterilla de Fitness",
    machineSetup: {
      seatHeight: "Posición en decúbito prono sobre superficie acolchada."
    },
    executionSteps: [
      {
        title: "Posición Inicial",
        description: "Tumbado boca abajo con brazos extendidos hacia delante y piernas juntas."
      },
      {
        title: "Elevación Simultánea",
        description: "Contrae glúteos y lumbares elevando pecho y rodillas del suelo 5-10 centímetros."
      },
      {
        title: "Sostén Isométrico",
        description: "Mantén la posición 3 segundos respirando de manera fluida y desciende con control."
      }
    ],
    biomechanicsTips: [
      "Excelente ejercicio de reclutamiento para los músculos multífidos, responsables de la estabilización segmentaria de la columna."
    ],
    commonMistakes: [
      {
        mistake: "Contener la respiración durante la elevación",
        fix: "Exhala al subir y mantén respiraciones cortas y controladas arriba.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Multífidos y Erectores Espinales en Cadena Abierta",
    repRange: "12 - 15 reps (con 3s de pausa)",
    rpeRecommendation: "RPE 7 - 8",
    tempoAdvice: "Sube en 1s, aguanta 3s en tensión máxima, baja en 1s.",
    svgGraphicType: "hyperextension"
  },

  // ==========================================
  // 19. TRAPECIO & CUELLO (TRAPEZIUS & UPPER BACK)
  // ==========================================
  {
    id: "encogimientos_trapecio_smith",
    name: "Encogimientos de Hombros en Máquina Smith (Shrugs)",
    category: "MACHINE",
    categoryLabel: "Smith Machine / Multipower",
    muscle: "Trapecio Superior y Elevador de la Escápula",
    secondary: ["Trapecio Medio", "Antebrazos"],
    tempo: "2-2-1 (2s elevación / 2s contracción isométrica / 2s descenso)",
    equipment: "Máquina Smith",
    rest: 75,
    tips: [
      "Coloca la barra a la altura media del muslo.",
      "Eleva los hombros directamente hacia las orejas en una línea vertical pura (NO rotar los hombros en círculos).",
      "Sostén la contracción durante 2 segundos en el punto más alto."
    ],
    mistakes: [
      "Rotar los hombros hacia delante o atrás (daña la articulación acromioclavicular sin aportar beneficio muscular).",
      "Flexionar los codos usando los bíceps para subir la barra."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Shrug/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Shrug/1.jpg",
    primaryMuscle: "trapecio",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Principiante",
    shortDesc: "Sobrecarga vertical directa para la masa y altura del trapecio superior con trayectoria 100% estable.",
    machineName: "Máquina Multipower Smith",
    machineSetup: {
      safetyCatch: "Ganchos fijados a la altura de la cadera para desenclavar con comodidad.",
      handleOrGrip: "Agarre prono al ancho de hombros con muñequeras o correas si se maneja gran peso."
    },
    executionSteps: [
      {
        title: "Desenganche de Barra",
        description: "De pie frente a la barra, gira los ganchos manteniendo los brazos completamente estirados."
      },
      {
        title: "Elevación Escapular Pura",
        description: "Sube los hombros hacia arriba como si quisieras tocar tus orejas con ellos."
      },
      {
        title: "Pausa en Pico y Descenso",
        description: "Aprieta 2 segundos en máxima elevación y baja lentamente sintiendo el estiramiento del trapecio."
      }
    ],
    biomechanicsTips: [
      "Las fibras del trapecio superior tienen una orientación vertical oblicua; elevar con un ángulo ligeramente posterior optimiza su activación."
    ],
    commonMistakes: [
      {
        mistake: "Girar los hombros en círculo (rolling shrugs)",
        fix: "El movimiento debe ser estrictamente vertical arriba y abajo.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Trapecio Superior y Cuello",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "Sube en 1s, aprieta 2s arriba, desciende en 2s controlados.",
    svgGraphicType: "lateral"
  },
  {
    id: "encogimientos_mancuernas_sentado",
    name: "Encogimientos con Mancuernas Sentado con Ligera Inclinación",
    category: "DUMBBELL",
    categoryLabel: "Mancuernas + Banco 75°",
    muscle: "Trapecio Superior y Porción Clavicular",
    secondary: ["Trapecio Medio", "Romboides"],
    tempo: "2-2-1",
    equipment: "Mancuernas Pesadas + Banco Ajustable",
    rest: 60,
    tips: [
      "Siéntate en un banco con respaldo inclinado a 75°-80° inclinando el pecho ligeramente hacia el frente.",
      "La ligera inclinación alinea la resistencia de la gravedad perfectamente con la dirección de las fibras del trapecio.",
      "Mantén las mancuernas a los lados con agarre neutro."
    ],
    mistakes: [
      "Usar impulso de las piernas rebotando en el asiento.",
      "Tirar la cabeza hacia delante (protracción cervical) al contraer."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shrug/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shrug/1.jpg",
    primaryMuscle: "trapecio",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Principiante",
    shortDesc: "Aislamiento estricto del trapecio sin balanceo del tren inferior y con un ángulo de tracción óptimo para las fibras.",
    machineName: "Banco Regulable a 75° + Mancuernas",
    machineSetup: {
      backrestAngle: "Respaldo ajustado a 75°-80° con asiento fijado.",
      handleOrGrip: "Mancuernas tomadas a los lados con agarre neutro."
    },
    executionSteps: [
      {
        title: "Acomodación",
        description: "Siéntate apoyando la espalda en el respaldo de 75° con las mancuernas colgando libremente."
      },
      {
        title: "Encogimiento Escapular",
        description: "Eleva las escápulas hacia las orejas y ligeramente hacia atrás."
      },
      {
        title: "Descenso y Estiramiento",
        description: "Baja con control permitiendo que las mancuernas estiren el trapecio hacia abajo en el fondo."
      }
    ],
    biomechanicsTips: [
      "Estar sentado elimina cualquier trampa de extensión de rodillas o cadera, forzando al trapecio a mover el 100% de la carga."
    ],
    commonMistakes: [
      {
        mistake: "Encoger el cuello empujando la barbilla hacia el esternón",
        fix: "Mantén el cuello neutro y la mirada al frente.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Trapecio Superior y Fibras Medias",
    repRange: "12 - 15 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Sube 1s, sostén 2s en la cima, baja en 2s.",
    svgGraphicType: "lateral"
  },
  {
    id: "face_pull_polea_alta",
    name: "Face Pull en Polea Alta con Cuerda y Rotación Externa",
    category: "MACHINE",
    categoryLabel: "Polea Regulable",
    muscle: "Trapecio Medio, Romboides y Deltoides Posterior",
    secondary: ["Manguito Rotador (Infraespinoso, Redondo Menor)", "Trapecio Superior"],
    tempo: "2-2-1 (2s tirón con rotación / 2s pausa / 2s retorno)",
    equipment: "Torre de Poleas + Cuerda Larga",
    rest: 60,
    tips: [
      "Coloca la polea a la altura de los ojos o de la frente.",
      "Agarra la cuerda con los pulgares apuntando hacia atrás.",
      "Tracciona hacia la cara abriendo las manos y rotando los hombros externamente para que los nudillos apunten hacia atrás en 'doble bíceps'."
    ],
    mistakes: [
      "Traccionar hacia el pecho convirtiéndolo en un remo de dorsales.",
      "Cargar demasiado peso y balancear el cuerpo hacia atrás."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/1.jpg",
    primaryMuscle: "trapecio",
    secondaryMuscles: ["hombros", "espalda"],
    difficulty: "Intermedio",
    shortDesc: "El mejor ejercicio para salud de hombro, retracción escapular, grosor del trapecio medio y deltoides posterior.",
    machineName: "Polea Regulable en Altura",
    machineSetup: {
      pinOrCableLevel: "Polea fijada a la altura de la frente o nariz.",
      handleOrGrip: "Cuerda doble tomada con agarre neutro o pulgares atrás."
    },
    executionSteps: [
      {
        title: "Postura Base",
        description: "Paso escalonado con un pie adelantado para estabilizar el torso frente a la polea."
      },
      {
        title: "Tracción y Rotación",
        description: "Tira de la cuerda hacia los ojos mientras separas los codos a 90° y rotas los antebrazos hacia arriba."
      },
      {
        title: "Contracción Escapular",
        description: "Junta las escápulas con fuerza atrás durante 2 segundos y regresa de forma lenta."
      }
    ],
    biomechanicsTips: [
      "Combina aducción escapular con rotación externa gleno-humeral, fortaleciendo los estabilizadores posteriores del hombro."
    ],
    commonMistakes: [
      {
        mistake: "Dejar los codos caídos hacia abajo",
        fix: "Mantén los codos altos alineados con las orejas en la fase de contracción.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Trapecio Medio, Deltoides Posterior y Manguito Rotador",
    repRange: "12 - 18 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Tracción en 1s, aguante en pico de 2s, retorno en 2s.",
    svgGraphicType: "pull"
  },
  {
    id: "remo_al_menton_polea",
    name: "Remo al Mentón en Polea Baja con Barra (Upright Row)",
    category: "MACHINE",
    categoryLabel: "Poleas / Cables",
    muscle: "Trapecio Superior y Deltoides Lateral",
    secondary: ["Bíceps", "Braquial Anterior"],
    tempo: "2-1-2",
    equipment: "Polea Baja + Barra Recta / EZ",
    rest: 60,
    tips: [
      "Usa un agarre al ancho de hombros o ligeramente más amplio (evita el agarre estrecho para no pinzar el hombro).",
      "Sube la barra hasta la altura de la parte media del pecho guiando con los codos.",
      "Los codos siempre deben quedar ligeramente más altos que las muñecas."
    ],
    mistakes: [
      "Usar agarre muy estrecho forzando la rotación interna y pinzando el supraespinoso.",
      "Subir la barra por encima de las clavículas innecesariamente."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Cable_Row/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Cable_Row/1.jpg",
    primaryMuscle: "trapecio",
    secondaryMuscles: ["hombros", "biceps"],
    difficulty: "Intermedio",
    shortDesc: "Tracción vertical con cable para estimular simultáneamente la cabeza lateral del deltoides y la cima del trapecio.",
    machineName: "Polea Baja",
    machineSetup: {
      pinOrCableLevel: "Polea anclada en el piso.",
      handleOrGrip: "Barra corta recta o barra Z con agarre medio."
    },
    executionSteps: [
      {
        title: "Posición",
        description: "De pie erguido sosteniendo la barra frente a los muslos."
      },
      {
        title: "Tirón Vertical Guiado",
        description: "Tira de la barra en vertical hacia el pecho subiendo los codos hacia afuera y arriba."
      },
      {
        title: "Descenso Suave",
        description: "Baja la barra de manera controlada hasta la extensión completa de brazos."
      }
    ],
    biomechanicsTips: [
      "El agarre a anchura de hombros reduce la rotación interna lesiva en comparación con el agarre cerrado tradicional."
    ],
    commonMistakes: [
      {
        mistake: "Subir la barra tirando con las muñecas en vez de los codos",
        fix: "Imagina que tus codos son tirados hacia el techo por cables invisibles.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Trapecios y Cabeza Lateral del Hombro",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "Subida en 1s, pausa 1s, bajada controlada en 2s.",
    svgGraphicType: "row"
  },

  // ==========================================
  // 20. VARIACIONES EN MÁQUINA SMITH
  // ==========================================
  {
    id: "sentadilla_smith_pies_adelantados",
    name: "Sentadilla Hack en Máquina Smith con Pies Adelantados",
    category: "MACHINE",
    categoryLabel: "Smith Machine",
    muscle: "Cuádriceps (Énfasis en Vasto Lateral y Recto Femoral)",
    secondary: ["Glúteo Mayor", "Aductores"],
    tempo: "3-1-1",
    equipment: "Máquina Smith",
    rest: 90,
    tips: [
      "Coloca los pies unos 30-40 cm por delante de la barra.",
      "Apoya la espalda contra la barra permitiendo que el torso baje completamente vertical.",
      "Flexiona las rodillas profundamente buscando el máximo estiramiento del cuádriceps sin levantar los talones."
    ],
    mistakes: [
      "Colocar los pies justo debajo de la barra sobrecargando la zona lumbar.",
      "Despegar los talones del suelo en el punto más profundo."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Squat/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Squat/1.jpg",
    primaryMuscle: "cuadriceps",
    secondaryMuscles: ["gluteos"],
    difficulty: "Intermedio",
    shortDesc: "Simula el patrón de la Sentadilla Hack aislando los cuádriceps con cero demanda de equilibrio y mínimo estrés lumbar.",
    machineName: "Smith Machine (Multipower)",
    machineSetup: {
      safetyCatch: "Topes de seguridad fijados en la profundidad de 90° de rodilla.",
      handleOrGrip: "Barra apoyada sobre trapecios con agarre firme."
    },
    executionSteps: [
      {
        title: "Posición de Pies Adelantados",
        description: "Coloca los pies 30-40 cm hacia delante apoyando el torso contra la barra."
      },
      {
        title: "Descenso Vertical Profundo",
        description: "Baja con el torso vertical doblando las rodillas hasta romper el paralelo."
      },
      {
        title: "Empuje de Cuádriceps",
        description: "Empuja contra el suelo a través de los talones extendiendo las piernas sin bloquear rodillas."
      }
    ],
    biomechanicsTips: [
      "Al adelantar los pies se reduce el momento de fuerza en la cadera y se traslada casi todo el brazo de palanca a la articulación de la rodilla."
    ],
    commonMistakes: [
      {
        mistake: "Inclinarse hacia delante perdiendo el apoyo en la barra",
        fix: "Mantén la espalda firmemente apoyada contra la barra Smith durante todo el trayecto.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Vasto Lateral, Vasto Medial y Recto Femoral",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "3 segundos de bajada controlando la rodilla, 1s pausa, 1s empuje.",
    svgGraphicType: "squat"
  },
  {
    id: "press_banca_inclinado_smith",
    name: "Press Inclinado 30° en Máquina Smith",
    category: "MACHINE",
    categoryLabel: "Smith Machine + Banco 30°",
    muscle: "Pectoral Superior (Haz Clavicular)",
    secondary: ["Deltoides Anterior", "Tríceps"],
    tempo: "3-1-1",
    equipment: "Máquina Smith + Banco Inclinado 30°",
    rest: 90,
    tips: [
      "Alinea el banco para que la barra Smith descienda justo en la parte superior del pecho (1 cm bajo las clavículas).",
      "Retrae escápulas y apoya los pies con firmeza en el piso.",
      "Desciende la barra hasta rozar el pecho y empuja con fuerza sin despegar las escápulas."
    ],
    mistakes: [
      "Colocar el banco muy atrás o muy adelante respecto al eje de la barra.",
      "Abrir los codos a 90° provocando roce subacromial."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Incline_Bench_Press/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Incline_Bench_Press/1.jpg",
    primaryMuscle: "pecho",
    secondaryMuscles: ["hombros", "triceps"],
    difficulty: "Intermedio",
    shortDesc: "Máxima sobrecarga y estabilidad para el pectoral superior sin riesgo de pérdida de control de la barra.",
    machineName: "Multipower + Banco Regulable",
    machineSetup: {
      backrestAngle: "Banco inclinado a 30° centrado exactamente bajo la barra.",
      safetyCatch: "Topes de seguridad a 2 cm del pecho."
    },
    executionSteps: [
      {
        title: "Alineación",
        description: "Acuéstate en el banco y verifica que la barra caiga en la porción clavicular del pecho."
      },
      {
        title: "Descenso a Clavícula",
        description: "Baja la barra en 3 segundos abriendo los codos en ángulo de 60° respecto al tronco."
      },
      {
        title: "Empuje Explosivo",
        description: "Empuja la barra hacia arriba contrayendo el pecho superior sin bloquear los codos."
      }
    ],
    biomechanicsTips: [
      "La trayectoria fija permite trabajar cerca o en el fallo muscular con total seguridad gracias a los ganchos giratorios de la Smith."
    ],
    commonMistakes: [
      {
        mistake: "Descolocar las escápulas al empujar",
        fix: "Mantén las escápulas pegadas al respaldo durante toda la serie.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Haz Clavicular del Pectoral",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "Descenso en 3s, pausa de 1s tocando la camiseta, subida en 1s.",
    svgGraphicType: "press"
  },
  {
    id: "press_militar_smith",
    name: "Press Militar Sentado en Máquina Smith (Deltoides)",
    category: "MACHINE",
    categoryLabel: "Smith Machine + Banco 80°",
    muscle: "Deltoides Anterior y Deltoides Lateral",
    secondary: ["Tríceps", "Trapecio Superior", "Pectoral Clavicular"],
    tempo: "3-1-1",
    equipment: "Máquina Smith + Banco Regulable a 80°",
    rest: 90,
    tips: [
      "Ajusta el respaldo a 75°-80° (no a 90° para proteger la movilidad del hombro).",
      "La barra debe bajar justo por delante de la nariz o hasta la barbilla.",
      "Mantén los codos ligeramente adelantados respecto al plano coronal."
    ],
    mistakes: [
      "Bajar la barra por detrás de la nuca (peligro para el manguito rotador).",
      "Arquear la espalda baja despegando los lumbares del respaldo."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Shoulder_Press/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Shoulder_Press/1.jpg",
    primaryMuscle: "hombros",
    secondaryMuscles: ["triceps", "trapecio"],
    difficulty: "Intermedio",
    shortDesc: "Empuje vertical guiado para hipertrofia de hombros pesada y sin fatiga en la estabilización lumbar.",
    machineName: "Smith Machine con Banco Vertical",
    machineSetup: {
      backrestAngle: "Respaldo fijado en 80°.",
      safetyCatch: "Topes de seguridad a la altura de la barbilla.",
      handleOrGrip: "Agarre prono ligeramente más ancho que los hombros."
    },
    executionSteps: [
      {
        title: "Desenganche Superior",
        description: "Sujeta la barra a la anchura de hombros y gira la barra para desbloquearla."
      },
      {
        title: "Descenso Controlado",
        description: "Baja la barra en 3 segundos por delante de la cara hasta el nivel de la barbilla."
      },
      {
        title: "Prensa Vertical",
        description: "Empuja con fuerza hacia arriba extendiendo los brazos sin bloquear completamente los codos."
      }
    ],
    biomechanicsTips: [
      "La estabilidad de la máquina Smith permite una activación del deltoides anterior y lateral superior a la del press con mancuernas en rangos pesados."
    ],
    commonMistakes: [
      {
        mistake: "Bajar la barra por detrás de la cabeza",
        fix: "Siempre baja la barra por delante de la cara hacia las clavículas.",
        dangerLevel: "Alto"
      }
    ],
    targetZone: "Deltoides Anterior y Cabeza Lateral",
    repRange: "8 - 12 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3 segundos de descenso suave, 1s pausa, 1s empuje potente.",
    svgGraphicType: "press"
  },
  {
    id: "hip_thrust_smith",
    name: "Hip Thrust en Máquina Smith con Almohadilla",
    category: "MACHINE",
    categoryLabel: "Smith Machine + Banco",
    muscle: "Glúteo Mayor",
    secondary: ["Isquiosurales", "Cuádriceps", "Aductores"],
    tempo: "2-2-1 (2s subida / 2s pausa arriba / 2s bajada)",
    equipment: "Máquina Smith + Banco Plano + Pad de Espuma",
    rest: 90,
    tips: [
      "Coloca el banco detrás de la barra Smith a la altura de la escápula inferior.",
      "Usa almohadilla gruesa en la barra para evitar dolor en las crestas ilíacas.",
      "En la cima del movimiento, realiza retroversión pélvica manteniendo la mirada hacia delante."
    ],
    mistakes: [
      "Mirar hacia el techo arqueando la zona lumbar en lugar de extender la cadera.",
      "Colocar los pies demasiado lejos o demasiado cerca de los glúteos."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/1.jpg",
    primaryMuscle: "gluteos",
    secondaryMuscles: ["isquios", "core"],
    difficulty: "Intermedio",
    shortDesc: "Empuje de cadera de máxima sobrecarga con la facilidad de carga y bloqueo de la máquina Smith.",
    machineName: "Smith Machine + Banco Plano",
    machineSetup: {
      seatHeight: "Banco a la altura de las rodillas (~40 cm de alto).",
      handleOrGrip: "Almohadilla colocada en el centro de la barra sobre la pelvis."
    },
    executionSteps: [
      {
        title: "Posición de Inicio",
        description: "Apoya las escápulas en el banco con la barra Smith sobre la cadera y pies a 90° de flexión."
      },
      {
        title: "Empuje Pélvico",
        description: "Empuja a través de los talones elevando la cadera hasta quedar alineada con el torso y los muslos."
      },
      {
        title: "Bloqueo y Descenso",
        description: "Aprieta los glúteos al máximo durante 2 segundos arriba y baja con control."
      }
    ],
    biomechanicsTips: [
      "La barra guiada de la Smith evita el balanceo de la barra libre, permitiendo centrarse 100% en la contracción del glúteo mayor."
    ],
    commonMistakes: [
      {
        mistake: "Hiperextender la espalda baja al final del recorrido",
        fix: "Mantén el mentón pegado al pecho y las costillas hacia abajo.",
        dangerLevel: "Medio"
      }
    ],
    targetZone: "Glúteo Mayor (Máxima Tensión en Acortamiento)",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "Sube en 1s, sostén 2s apretando glúteos, baja en 2s.",
    svgGraphicType: "hip_thrust"
  },

  // ==========================================
  // 21. VARIACIONES DE POLEAS & CABLES (CABLES / PULLEYS)
  // ==========================================
  {
    id: "cruces_polea_baja",
    name: "Cruces en Polea Baja a Alta (Pectoral Superior)",
    category: "MACHINE",
    categoryLabel: "Doble Polea Cruzada",
    muscle: "Pectoral Clavicular (Superior)",
    secondary: ["Deltoides Anterior", "Serrato Anterior"],
    tempo: "3-1-1",
    equipment: "Doble Torre de Poleas + Estribos",
    rest: 60,
    tips: [
      "Poleas ancladas en la posición más baja a nivel del suelo.",
      "Da un paso al frente para tensionar los cables con codos ligeramente flexionados.",
      "Eleva y cruza las manos en arco hacia la altura de la barbilla o los ojos."
    ],
    mistakes: [
      "Transformar el ejercicio en un curl de bíceps flexionando demasiado los codos.",
      "Inclinarse excesivamente hacia delante perdiendo el enfoque clavicular."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Cable_Crossover/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Cable_Crossover/1.jpg",
    primaryMuscle: "pecho",
    secondaryMuscles: ["hombros"],
    difficulty: "Intermedio",
    shortDesc: "Aducción y flexión glenohumeral que sigue con precisión la orientación anatómica de las fibras del pectoral superior.",
    machineName: "Doble Polea Regulable",
    machineSetup: {
      pinOrCableLevel: "Ambas poleas fijadas en el nivel más bajo (suelo).",
      handleOrGrip: "Manijas de estribo individuales en cada mano."
    },
    executionSteps: [
      {
        title: "Apertura en Estiramiento",
        description: "Brazos abiertos hacia abajo y atrás sintiendo el estiramiento del pecho superior."
      },
      {
        title: "Elevación Convergente",
        description: "Lleva las manos hacia arriba y al centro formando un arco hasta la altura del cuello."
      },
      {
        title: "Squeeze Superior",
        description: "Aprieta el pectoral clavicular 1 segundo y regresa lentamente en 3 segundos."
      }
    ],
    biomechanicsTips: [
      "La tracción ascendente a 45° coincide con la línea de acción del haz clavicular del pectoral mayor."
    ],
    commonMistakes: [
      {
        mistake: "Balancear el torso hacia atrás para elevar el peso",
        fix: "Bloquea el tronco firme con ligera inclinación hacia delante.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Porción Clavicular del Pectoral",
    repRange: "12 - 15 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3 segundos de bajada resistiendo el cable, 1s apriete arriba.",
    svgGraphicType: "fly"
  },
  {
    id: "pull_over_polea_alta",
    name: "Pullover en Polea Alta con Barra Recta / Cuerda (Lat Prayer)",
    category: "MACHINE",
    categoryLabel: "Polea Alta",
    muscle: "Dorsal Ancho (Extensión de Hombro)",
    secondary: ["Redondo Mayor", "Pectoral Menor", "Tríceps (Cabeza Larga)"],
    tempo: "3-1-1",
    equipment: "Polea Alta + Barra Recta / Cuerda",
    rest: 60,
    tips: [
      "Da 2 pasos atrás inclinando el torso a 45° con rodillas suaves.",
      "Mantén los codos con una ligera flexión fija durante todo el movimiento.",
      "Tracciona la barra hacia los muslos en un arco amplio usando solo los dorsales."
    ],
    mistakes: [
      "Doblar los codos convirtiéndolo en un pushdown de tríceps.",
      "Encorvar la espalda superior al llegar arriba perdiendo el estiramiento dorsal."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Pulldown/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Pulldown/1.jpg",
    primaryMuscle: "espalda",
    secondaryMuscles: ["triceps", "core"],
    difficulty: "Principiante",
    shortDesc: "Aislamiento puro del dorsal ancho en extensión sin interferencia ni fatiga temprana de los bíceps.",
    machineName: "Torre de Polea Alta",
    machineSetup: {
      pinOrCableLevel: "Polea en el punto superior.",
      handleOrGrip: "Barra recta o cuerda de tríceps."
    },
    executionSteps: [
      {
        title: "Estiramiento en la Cima",
        description: "Brazos arriba a la altura de las orejas sintiendo cómo los dorsales se abren y estiran."
      },
      {
        title: "Tracción en Arco",
        description: "Empuja la barra hacia abajo y hacia tus muslos en un arco amplio con el pecho abierto."
      },
      {
        title: "Contracción Abajo",
        description: "Toca los muslos con la barra apretando los dorsales contra las costillas y regresa en 3s."
      }
    ],
    biomechanicsTips: [
      "Elimina completamente la flexión de codo, permitiendo fatigar el dorsal ancho antes de los ejercicios compuestos."
    ],
    commonMistakes: [
      {
        mistake: "Flexionar y extender los codos como en un tríceps",
        fix: "Fija el ángulo del codo inmutable durante toda la serie.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Dorsal Ancho (Aislamiento en Extensión)",
    repRange: "12 - 15 reps",
    rpeRecommendation: "RPE 8 - 9",
    tempoAdvice: "3 segundos de subida sintiendo el estiramiento profundo del dorsal.",
    svgGraphicType: "pull"
  },
  {
    id: "jalon_unilateral_polea",
    name: "Jalón Unilateral en Polea Alta con Agarre Neutro",
    category: "MACHINE",
    categoryLabel: "Polea Alta Unilateral",
    muscle: "Dorsal Ancho (Porción Ilíaca y Lumbar)",
    secondary: ["Bíceps Braquial", "Braquial Anterior", "Romboides"],
    tempo: "3-1-1",
    equipment: "Polea Alta + Estribo / Agarre D",
    rest: 60,
    tips: [
      "Siéntate o arrodíllate de lado a la polea alineando el cable con la dirección de tu brazo.",
      "Tracciona el codo hacia la cadera con el brazo pegado al costado.",
      "Permite que el hombro suba en la parte alta para estirar la inserción ilíaca del dorsal."
    ],
    mistakes: [
      "Rotar el torso de forma exagerada para compensar falta de fuerza.",
      "Abrir el codo hacia afuera perdiendo el aislamiento de las fibras bajas del dorsal."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single_Arm_Lat_Pulldown/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single_Arm_Lat_Pulldown/1.jpg",
    primaryMuscle: "espalda",
    secondaryMuscles: ["biceps"],
    difficulty: "Intermedio",
    shortDesc: "Tracción unilateral biomecánicamente óptima para conectar con la división ilíaca inferior del dorsal ancho.",
    machineName: "Polea Alta Regulable",
    machineSetup: {
      pinOrCableLevel: "Polea en la posición más alta.",
      handleOrGrip: "Estribo ergonómico giratorio con agarre neutro."
    },
    executionSteps: [
      {
        title: "Elongación Dorsal",
        description: "Brazo extendido hacia arriba y ligeramente hacia afuera con elevación escapular completa."
      },
      {
        title: "Tracción hacia la Cadera",
        description: "Conduce el codo hacia abajo y hacia el bolsillo trasero del pantalón manteniendo el pecho erguido."
      },
      {
        title: "Contracción y Retorno",
        description: "Aprieta 1 segundo el dorsal en el fondo y deja que el cable te estire en 3 segundos de subida."
      }
    ],
    biomechanicsTips: [
      "El movimiento unilateral permite ajustar el plano de tracción a la orientación individual de las fibras ilíacas del dorsal."
    ],
    commonMistakes: [
      {
        mistake: "Tirar con la mano hacia el hombro",
        fix: "Enfócate en mover el codo hacia la cresta ilíaca.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Fibras Ilíacas y Lumbares del Dorsal Ancho",
    repRange: "10 - 12 reps por brazo",
    rpeRecommendation: "RPE 8.5 - 9",
    tempoAdvice: "3s excéntrica con estiramiento completo, 1s concéntrica.",
    svgGraphicType: "pull"
  },
  {
    id: "woodchopper_oblicuos_polea",
    name: "Leñador en Polea para Oblicuos y Core (Cable Woodchopper)",
    category: "MACHINE",
    categoryLabel: "Polea Regulable",
    muscle: "Oblicuos Internos y Externos",
    secondary: ["Transverso del Abdomen", "Deltoides", "Glúteos"],
    tempo: "2-1-2 (2s rotación / 1s parada en torsión / 2s retorno controlado)",
    equipment: "Torre de Poleas + Manija D",
    rest: 60,
    tips: [
      "Coloca la polea a la altura del hombro o ligeramente más alta.",
      "Pies al ancho de hombros con rodillas flexionadas para rotar sobre la bola del pie trasero.",
      "Gira el torso en diagonal manteniendo los brazos extendidos con una ligera flexión de codo."
    ],
    mistakes: [
      "Mover solo los brazos sin rotar el tronco ni activar la faja abdominal.",
      "Bloquear la pierna trasera limitando la rotación de cadera y forzando las rodillas."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Woodchopper/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Woodchopper/1.jpg",
    primaryMuscle: "core",
    secondaryMuscles: ["hombros", "gluteos"],
    difficulty: "Intermedio",
    shortDesc: "Potencia rotacional y definición de los oblicuos transfiriendo fuerza desde el suelo a través del core.",
    machineName: "Polea Regulable",
    machineSetup: {
      pinOrCableLevel: "Polea ajustada a la altura del pecho o los hombros.",
      handleOrGrip: "Manija de estribo sostenida con ambas manos entrelazadas."
    },
    executionSteps: [
      {
        title: "Inicio en Tensión",
        description: "De pie de lado a la polea con ambas manos sujetando la manija frente al hombro proximal."
      },
      {
        title: "Rotación Diagonal",
        description: "Gira el torso contrayendo los oblicuos llevando las manos en diagonal hacia la cadera opuesta."
      },
      {
        title: "Retorno Resistido",
        description: "Resiste el regreso del cable controlando con los oblicuos y el abdomen durante 2 segundos."
      }
    ],
    biomechanicsTips: [
      "Desarrolla la fuerza rotacional y anti-rotacional en el plano transversal, vital para atletas y estabilidad lumbar."
    ],
    commonMistakes: [
      {
        mistake: "Doblar los codos transformándolo en un tirón de brazos",
        fix: "Mantén los brazos como una palanca fija girando desde la cintura.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Oblicuo Externo, Oblicuo Interno y Cinturón Abdominal",
    repRange: "12 - 15 reps por lado",
    rpeRecommendation: "RPE 8 - 8.5",
    tempoAdvice: "Rotación fluida en 2s, 1s pausa, retorno en 2s.",
    svgGraphicType: "abs"
  },
  {
    id: "kat_extension_triceps_polea",
    name: "Extensión Katana Overhead de Tríceps en Polea Cruzada",
    category: "MACHINE",
    categoryLabel: "Doble Polea Alta",
    muscle: "Tríceps Braquial (Cabeza Larga en Elongación Máxima)",
    secondary: ["Cabeza Lateral y Medial del Tríceps"],
    tempo: "3-1-1",
    equipment: "Torre de Doble Polea + Cables Libres",
    rest: 60,
    tips: [
      "Cruza los cables agarrando la bola del cable izquierdo con la mano derecha y viceversa.",
      "Codos elevados por encima de la cabeza y abiertos a 45°.",
      "Extiende los codos en diagonal hacia afuera sintiendo el pico de contracción de la cabeza larga."
    ],
    mistakes: [
      "Bajar los codos al nivel del pecho perdiendo la posición de estiramiento overhead.",
      "Usar peso excesivo que curve la espalda lumbar hacia atrás."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/1.jpg",
    primaryMuscle: "triceps",
    secondaryMuscles: [],
    difficulty: "Avanzado",
    shortDesc: "La variante más biomecánicamente amigable para la articulación del codo para sobrecargar la cabeza larga del tríceps en estiramiento.",
    machineName: "Doble Polea Ajustable",
    machineSetup: {
      pinOrCableLevel: "Poleas fijadas a la altura de la cabeza / orejas.",
      handleOrGrip: "Tomar directamente los topes esféricos del cable con agarre neutro."
    },
    executionSteps: [
      {
        title: "Posición Katana",
        description: "De espaldas a la torre con codos flexionados detrás de la cabeza y cables cruzados."
      },
      {
        title: "Extensión Diagonal",
        description: "Extiende los codos proyectando los antebrazos hacia arriba y afuera en el plano escapular."
      },
      {
        title: "Flexión Excéntrica",
        description: "Flexiona lentamente los codos sintiendo una profunda elongación en la cabeza larga del tríceps."
      }
    ],
    biomechanicsTips: [
      "Al elevar el brazo por encima de la cabeza, la cabeza larga del tríceps (biarticular) entra en estiramiento pasivo óptimo para hipertrofia mediada por estiramiento."
    ],
    commonMistakes: [
      {
        mistake: "Mover los codos hacia delante y atrás",
        fix: "Fija los codos en el espacio y solo mueve los antebrazos.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Cabeza Larga del Tríceps (Masa Posterior del Brazo)",
    repRange: "10 - 15 reps",
    rpeRecommendation: "RPE 8.5 - 9.5",
    tempoAdvice: "3 segundos de descenso sintiendo el estiramiento profundo detrás de la cabeza.",
    svgGraphicType: "dips"
  },
  {
    id: "curl_biceps_bayesian_polea",
    name: "Curl de Bíceps Bayesian en Polea Baja por Detrás del Torso",
    category: "MACHINE",
    categoryLabel: "Polea Baja Unilateral",
    muscle: "Bíceps Braquial (Cabeza Larga en Estiramiento Extremo)",
    secondary: ["Braquial Anterior"],
    tempo: "3-1-1",
    equipment: "Polea Baja + Manija D",
    rest: 60,
    tips: [
      "Coloca la polea en el punto más bajo y da 1-2 pasos hacia delante dando la espalda a la torre.",
      "El brazo queda extendido por detrás del cuerpo con el hombro en hiperextensión.",
      "Flexiona el codo hacia delante llevando la mano hacia el hombro manteniendo el codo retrasado."
    ],
    mistakes: [
      "Adelantar el codo antes de empezar a flexionar eliminando la tensión en estiramiento.",
      "Inclinarse hacia atrás usando balanceo del torso."
    ],
    imgMale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Preacher_Curl/0.jpg",
    imgFemale: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Preacher_Curl/1.jpg",
    primaryMuscle: "biceps",
    secondaryMuscles: ["antebrazos"],
    difficulty: "Intermedio",
    shortDesc: "El curl de bíceps con mayor perfil de tensión excéntrica gracias al brazo colocado por detrás del torso con el cable.",
    machineName: "Polea Baja Regulable",
    machineSetup: {
      pinOrCableLevel: "Polea anclada a ras de suelo.",
      handleOrGrip: "Estribo individual con agarre en supinación."
    },
    executionSteps: [
      {
        title: "Posición Adelantada",
        description: "De espaldas a la polea con el brazo estirado hacia atrás bajo la tensión constante del cable."
      },
      {
        title: "Flexión en Supinación",
        description: "Flexiona el codo contrayendo el bíceps mientras mantienes el codo anclado detrás del cuerpo."
      },
      {
        title: "Descenso y Estiramiento",
        description: "Baja la mano despacio en 3 segundos sintiendo cómo el bíceps se abre y estira al máximo."
      }
    ],
    biomechanicsTips: [
      "La hiperextensión del hombro estira la cabeza larga del bíceps en su origen escapular, maximizando la tensión pasiva y el daño sarcomérico controlado."
    ],
    commonMistakes: [
      {
        mistake: "Llevar el codo hacia el frente",
        fix: "Mantén el codo firmemente anclado por detrás de la línea del torso durante toda la repetición.",
        dangerLevel: "Bajo"
      }
    ],
    targetZone: "Cabeza Larga del Bíceps (Pico y Volumen)",
    repRange: "10 - 14 reps",
    rpeRecommendation: "RPE 8.5 - 9",
    tempoAdvice: "3 segundos de bajada excéntrica sintiendo la tensión máxima atrás.",
    svgGraphicType: "curl"
  }
];

// Presets de Rutinas Populares
export const ROUTINE_PRESETS: RoutinePreset[] = [
  {
    id: "push_day",
    title: "Rutina Push (Empuje: Pecho, Hombro, Tríceps)",
    subtitle: "Enfoque hipertrofia de empuje",
    frequency: "2 veces por semana",
    focus: "Pecho + Deltoides + Tríceps",
    exerciseIds: [
      "press_inclinado_mancuernas",
      "press_banca_barra",
      "pec_deck",
      "elevaciones_laterales",
      "triceps_polea_cuerda"
    ],
    tag: "Hipertrofia"
  },
  {
    id: "pull_day",
    title: "Rutina Pull (Tracción: Espalda, Bíceps, Core)",
    subtitle: "Enfoque grosor y amplitud dorsal",
    frequency: "2 veces por semana",
    focus: "Dorsales + Romboides + Bíceps + Abdominales",
    exerciseIds: [
      "jalon_pecho",
      "remo_barra_45",
      "remo_gironda",
      "curl_martillo_neutral",
      "crunch_polea_alta"
    ],
    tag: "Fuerza & Grosor"
  },
  {
    id: "legs_glutes_day",
    title: "Rutina Leg & Glutes (Piernas y Glúteos)",
    subtitle: "Cuádriceps, Isquiosurales, Glúteos y Gemelos",
    frequency: "2 veces por semana",
    focus: "Tren Inferior Completo",
    exerciseIds: [
      "sentadilla_barra",
      "prensa_piernas",
      "hip_thrust_barra",
      "peso_muerto_rumano",
      "extension_cuadriceps",
      "gemelos_elevacion_talones"
    ],
    tag: "Volumen Piernas"
  },
  {
    id: "smith_cables_full",
    title: "Torso & Brazos: Smith & Cables Masterclass",
    subtitle: "Máxima tensión mecánica continua y estabilidad",
    frequency: "2 veces por semana",
    focus: "Pectoral Clavicular + Dorsales + Trapecio + Hombro + Brazos",
    exerciseIds: [
      "press_banca_inclinado_smith",
      "press_militar_smith",
      "pull_over_polea_alta",
      "face_pull_polea_alta",
      "encogimientos_trapecio_smith",
      "kat_extension_triceps_polea",
      "curl_biceps_bayesian_polea"
    ],
    tag: "Aislamiento & Cables"
  },
  {
    id: "posterior_chain_grip",
    title: "Cadena Posterior, Antebrazo & Core",
    subtitle: "Lumbares, Trapecios, Femorales, Gemelos y Agarre",
    frequency: "1-2 veces por semana",
    focus: "Erectores Espinales + Sóleo/Gemelos + Antebrazos + Oblicuos",
    exerciseIds: [
      "hiperextensiones_lumbares_45",
      "good_mornings_smith",
      "gemelos_maquina_sentado",
      "paseo_del_granjero",
      "curl_antebrazo_barra_prono",
      "woodchopper_oblicuos_polea"
    ],
    tag: "Salud Articular & Fuerza"
  }
];
