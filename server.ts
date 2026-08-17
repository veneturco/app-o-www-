import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for AI Smart Hydration calculation based on biometrics, GPS coordinates or city & weather conditions
  app.post("/api/hydration/ai-plan", async (req, res) => {
    try {
      const { weightKg, gender, age, city, latitude, longitude, activityLevel, wakeTime, sleepTime } = req.body;

      if (!weightKg || !gender) {
        return res.status(400).json({ error: "Faltan parámetros biométricos requeridos (peso y sexo)." });
      }

      let detectedCity = "Tu Ubicación";
      let detectedState = "";
      let detectedCountry = "";
      let formattedLocation = "Tu Ubicación";
      let liveTemperatureC: number | null = null;
      let liveHumidityPct: number | null = null;
      let liveWeatherDesc: string | null = null;

      // 1. Si se proporciona ciudad escrita o coordenadas, resolver meteorología y geocodificación
      if (city && city.trim() !== "" && city !== "Ubicación GPS" && city !== "Ubicación Automática") {
        detectedCity = city.trim();
        // Si el usuario escribió una ciudad, buscar sus coordenadas para traer el clima real
        try {
          const geoCityUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(detectedCity)}&count=1&language=es&format=json`;
          const geoCityRes = await fetch(geoCityUrl);
          if (geoCityRes.ok) {
            const geoCityData = await geoCityRes.json();
            if (geoCityData?.results && geoCityData.results.length > 0) {
              const res0 = geoCityData.results[0];
              const cLat = res0.latitude;
              const cLon = res0.longitude;
              detectedCity = res0.name;
              detectedState = res0.admin1 || "";
              detectedCountry = res0.country || "";
              formattedLocation = `${res0.name}${detectedState ? ', ' + detectedState : ''}${detectedCountry ? ' (' + detectedCountry + ')' : ''}`;
              
              const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${cLat}&longitude=${cLon}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
              const weatherRes = await fetch(weatherUrl);
              if (weatherRes.ok) {
                const wData = await weatherRes.json();
                if (wData?.current) {
                  liveTemperatureC = Math.round(wData.current.temperature_2m);
                  liveHumidityPct = Math.round(wData.current.relative_humidity_2m);
                  const code = wData.current.weather_code;
                  if (code === 0) liveWeatherDesc = "Despejado / Soleado";
                  else if (code <= 3) liveWeatherDesc = "Parcialmente nublado";
                  else if (code <= 48) liveWeatherDesc = "Neblina / Nuboso";
                  else if (code <= 67) liveWeatherDesc = "Lluvioso";
                  else if (code <= 77) liveWeatherDesc = "Nieve ligera";
                  else if (code <= 99) liveWeatherDesc = "Tormenta eléctrica";
                  else liveWeatherDesc = "Clima templado";
                }
              }
            }
          }
        } catch (cityLookupErr) {
          console.warn("City lookup error:", cityLookupErr);
        }
      } else if (latitude !== undefined && longitude !== undefined && latitude !== null && longitude !== null) {
        try {
          const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
          const weatherRes = await fetch(weatherUrl);
          if (weatherRes.ok) {
            const wData = await weatherRes.json();
            if (wData?.current) {
              liveTemperatureC = Math.round(wData.current.temperature_2m);
              liveHumidityPct = Math.round(wData.current.relative_humidity_2m);
              
              // Mapeo simple de código WMO meteorológico
              const code = wData.current.weather_code;
              if (code === 0) liveWeatherDesc = "Despejado / Soleado";
              else if (code <= 3) liveWeatherDesc = "Parcialmente nublado";
              else if (code <= 48) liveWeatherDesc = "Neblina / Nuboso";
              else if (code <= 67) liveWeatherDesc = "Lluvioso";
              else if (code <= 77) liveWeatherDesc = "Nieve ligera";
              else if (code <= 99) liveWeatherDesc = "Tormenta eléctrica";
              else liveWeatherDesc = "Clima templado";
            }
          }
        } catch (weatherErr) {
          console.warn("Could not fetch Open-Meteo current weather:", weatherErr);
        }

        // Obtener nombre exacto de la Ciudad y el Estado vía reverse geocoding
        try {
          const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`;
          const geoRes = await fetch(geoUrl);
          if (geoRes.ok) {
            const gData = await geoRes.json();
            const cityName = gData.city || gData.locality || gData.localityInfo?.administrative?.[2]?.name || gData.localityInfo?.administrative?.[1]?.name;
            const stateName = gData.principalSubdivision || gData.localityInfo?.administrative?.[1]?.name || "";
            const countryName = gData.countryName || "";
            
            if (cityName) detectedCity = cityName;
            if (stateName) detectedState = stateName;
            if (countryName) detectedCountry = countryName;
            
            if (cityName || stateName) {
              formattedLocation = `${detectedCity}${detectedState ? ', ' + detectedState : ''}${detectedCountry ? ' (' + detectedCountry + ')' : ''}`;
            }
          }
        } catch (geoErr) {
          console.warn("Reverse geocode lookup warning:", geoErr);
        }

        // Si aún no tenemos el estado, consultar OSM Nominatim como respaldo
        if (!detectedState || detectedCity === "Tu Ubicación") {
          try {
            const nomUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
            const nomRes = await fetch(nomUrl, {
              headers: { 'User-Agent': 'HydroFit-GymPro-App/1.0' }
            });
            if (nomRes.ok) {
              const nData = await nomRes.json();
              if (nData?.address) {
                const addr = nData.address;
                const nCity = addr.city || addr.town || addr.village || addr.municipality || addr.county;
                const nState = addr.state || addr.province || addr.region;
                const nCountry = addr.country;
                if (nCity) detectedCity = nCity;
                if (nState) detectedState = nState;
                if (nCountry) detectedCountry = nCountry;
                formattedLocation = `${detectedCity}${detectedState ? ', ' + detectedState : ''}${detectedCountry ? ' (' + detectedCountry + ')' : ''}`;
              }
            }
          } catch (nomErr) {
            console.warn("Nominatim fallback warning:", nomErr);
          }
        }
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback biológico exacto
        const temp = liveTemperatureC ?? 24;
        const hum = liveHumidityPct ?? 50;
        // Ajuste térmico: +10% cada 5°C por encima de 22°C
        const heatMultiplier = temp > 22 ? 1 + ((temp - 22) * 0.02) : 1;
        const baseMl = Math.round(Number(weightKg) * (gender === 'male' ? 38 : 34) * heatMultiplier);
        
        return res.json({
          city: detectedCity,
          state: detectedState,
          country: detectedCountry,
          formattedLocation: formattedLocation,
          temperatureEstimateC: temp,
          weatherCondition: liveWeatherDesc || (temp >= 28 ? "Cálido y seco" : temp >= 20 ? "Templado agradable" : "Fresco"),
          humidityEstimatePct: hum,
          totalDailyMl: baseMl,
          hourlyDoseMl: Math.round(baseMl / 7),
          intervalMinutes: temp > 30 ? 75 : 90,
          schedules: [
            { time: "08:00", amountMl: Math.round(baseMl * 0.15), reason: "Activación matutina y rehidratación en ayunas" },
            { time: "10:30", amountMl: Math.round(baseMl * 0.15), reason: "Mantenimiento del volumen plasmático" },
            { time: "13:00", amountMl: Math.round(baseMl * 0.15), reason: "Digestión y balance metabólico pre-almuerzo" },
            { time: "15:30", amountMl: Math.round(baseMl * 0.20), reason: "Ventana intra-actividad / pico de rendimiento" },
            { time: "17:30", amountMl: Math.round(baseMl * 0.15), reason: "Reposición electrolítica celular" },
            { time: "19:30", amountMl: Math.round(baseMl * 0.12), reason: "Recuperación nocturna y síntesis proteica" },
            { time: "21:30", amountMl: Math.round(baseMl * 0.08), reason: "Hidratación ligera previa al sueño" }
          ],
          aiExplanation: `Cálculo biométrico adaptado a ${weightKg}kg (${gender === 'male' ? 'Hombre' : 'Mujer'}) en ${formattedLocation} con ${temp}°C de temperatura actual.`,
          electrolytesAdvice: temp >= 27 ? "Se recomienda añadir una pizca de sal marina o electrolitos por mayor tasa de sudoración térmica." : "Hidratación estándar balanceada.",
          source: "HydroFit Algoritmo Fisiológico Clínico"
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const weatherContext = (liveTemperatureC !== null && liveHumidityPct !== null) 
        ? `Condiciones reales medidas por estación meteorológica: ${liveTemperatureC}°C de temperatura, ${liveHumidityPct}% de humedad (${liveWeatherDesc || 'estable'}).`
        : `Estima la temperatura y humedad habituales en ${detectedCity}.`;

      const prompt = `Actúa como un médico especialista en fisiología del ejercicio y bio-hidratación deportiva según consensos de medicina del deporte (ACSM).
Calcula las necesidades hídricas precisas para la siguiente persona y su entorno:
- Ubicación: ${formattedLocation} (Ciudad: ${detectedCity}, Estado: ${detectedState || 'N/D'}, País: ${detectedCountry || 'N/D'})
- Datos meteorológicos: ${weatherContext}
- Peso corporal: ${weightKg} kg
- Sexo: ${gender === 'male' ? 'Hombre' : 'Mujer'}
- Edad: ${age || 26} años
- Nivel de actividad: ${activityLevel || 'moderada_entrenamiento'}
- Horario de vigilia: ${wakeTime || '07:30'} a ${sleepTime || '23:00'}

Devuelve EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura exacta:
{
  "city": "${detectedCity}",
  "state": "${detectedState}",
  "country": "${detectedCountry}",
  "formattedLocation": "${formattedLocation}",
  "temperatureEstimateC": ${liveTemperatureC !== null ? liveTemperatureC : "<temperatura estimada en °C>"},
  "weatherCondition": "${liveWeatherDesc || "<breve descripción del clima ej: Soleado cálido, Templado, etc>"}",
  "humidityEstimatePct": ${liveHumidityPct !== null ? liveHumidityPct : "<humedad estimada en %>"},
  "totalDailyMl": <número total de ml diarios recomendados, adaptado a peso y clima>,
  "hourlyDoseMl": <ml por toma recomendada, ej: 250 a 400>,
  "intervalMinutes": <intervalo recomendado entre tomas en minutos, entre 60 y 120>,
  "schedules": [
    { "time": "HH:MM", "amountMl": <ml>, "reason": "<motivo clínico breve de la toma>" }
  ],
  "aiExplanation": "<explicación clara, sencilla y motivadora de 2-3 frases>",
  "electrolytesAdvice": "<consejo breve y comprensible sobre sales o electrolitos según el calor>"
}`;

      // Modelos soportados según las pautas de Google GenAI con resiliencia ante picos de demanda
      const candidateModels = ["gemini-3.7-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let parsedData: any = null;
      let usedModel: string = candidateModels[0];

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              temperature: 0.2
            }
          });

          const responseText = response.text || "{}";
          parsedData = JSON.parse(responseText);
          usedModel = modelName;
          if (parsedData && parsedData.totalDailyMl) {
            break;
          }
        } catch (modelErr: any) {
          console.warn(`Model ${modelName} unavailable (${modelErr?.status || modelErr?.code || 'High demand'}), trying fallback...`);
        }
      }

      if (parsedData && parsedData.totalDailyMl) {
        return res.json({
          city: detectedCity,
          state: detectedState,
          country: detectedCountry,
          formattedLocation: formattedLocation,
          ...parsedData,
          source: `Gemini AI Bio-Hydration Engine (${usedModel})`
        });
      }

      // Si todos los modelos remotos están temporalmente saturados (503), calcular plan fisiológico exacto con el clima en vivo
      const w = Number(weightKg) || 75;
      const isMale = gender === 'male';
      const temp = liveTemperatureC ?? 24;
      const hum = liveHumidityPct ?? 50;
      const heatMultiplier = temp > 22 ? 1 + ((temp - 22) * 0.02) : 1;
      const baseMl = Math.round(w * (isMale ? 38 : 34) * heatMultiplier);

      return res.json({
        city: detectedCity,
        state: detectedState,
        country: detectedCountry,
        formattedLocation: formattedLocation,
        temperatureEstimateC: temp,
        weatherCondition: liveWeatherDesc || (temp >= 28 ? "Cálido y soleado" : temp >= 20 ? "Templado agradable" : "Fresco"),
        humidityEstimatePct: hum,
        totalDailyMl: baseMl,
        hourlyDoseMl: Math.round(baseMl / 7),
        intervalMinutes: temp > 30 ? 75 : 90,
        schedules: [
          { time: "08:00", amountMl: Math.round(baseMl * 0.15), reason: "Activación matutina y rehidratación en ayunas" },
          { time: "10:30", amountMl: Math.round(baseMl * 0.15), reason: "Mantenimiento del volumen plasmático" },
          { time: "13:00", amountMl: Math.round(baseMl * 0.15), reason: "Digestión y balance metabólico pre-almuerzo" },
          { time: "15:30", amountMl: Math.round(baseMl * 0.20), reason: "Ventana intra-actividad / pico de rendimiento" },
          { time: "17:30", amountMl: Math.round(baseMl * 0.15), reason: "Reposición electrolítica celular" },
          { time: "19:30", amountMl: Math.round(baseMl * 0.12), reason: "Recuperación nocturna y síntesis proteica" },
          { time: "21:30", amountMl: Math.round(baseMl * 0.08), reason: "Hidratación ligera previa al descanso" }
        ],
        aiExplanation: `Cálculo biométrico adaptado a ${w}kg (${isMale ? 'Hombre' : 'Mujer'}, ${age || 26} años) en ${formattedLocation} con ${temp}°C de temperatura actual. Mantener una ingesta sostenida cada 90 min previene caídas en el volumen plasmático y optimiza el rendimiento neuromuscular.`,
        electrolytesAdvice: temp >= 27 ? "Se recomienda añadir una pizca de sal marina o electrolitos por mayor tasa de sudoración térmica." : "Hidratación estándar balanceada.",
        source: "HydroFit Algoritmo Fisiológico Pro (Clínico)"
      });
    } catch (err: any) {
      console.warn("Failsafe in /api/hydration/ai-plan:", err?.message || err);
      const w = Number(req.body.weightKg) || 75;
      const g = req.body.gender || 'male';
      const c = req.body.city || 'Ciudad';
      const fallbackMl = Math.round(w * (g === 'male' ? 38 : 34));
      return res.json({
        city: c,
        temperatureEstimateC: 24,
        weatherCondition: "Condiciones estándar",
        humidityEstimatePct: 50,
        totalDailyMl: fallbackMl,
        hourlyDoseMl: Math.round(fallbackMl / 7),
        intervalMinutes: 90,
        schedules: [
          { time: "08:00", amountMl: Math.round(fallbackMl * 0.15), reason: "Reactivación de volemia plasmática" },
          { time: "10:30", amountMl: Math.round(fallbackMl * 0.15), reason: "Mantenimiento osmolar" },
          { time: "13:00", amountMl: Math.round(fallbackMl * 0.15), reason: "Digestión y balance metabólico" },
          { time: "15:30", amountMl: Math.round(fallbackMl * 0.20), reason: "Ventana de rendimiento físico" },
          { time: "17:30", amountMl: Math.round(fallbackMl * 0.15), reason: "Recuperación tisular" },
          { time: "19:30", amountMl: Math.round(fallbackMl * 0.12), reason: "Balance celular nocturno" },
          { time: "21:30", amountMl: Math.round(fallbackMl * 0.08), reason: "Hidratación antes del sueño" }
        ],
        aiExplanation: `Plan calculado para ${w}kg en ${c} basado en requerimientos metabólicos y osmolaridad celular.`,
        electrolytesAdvice: "Mantén un consumo balanceado de agua y electrolitos esenciales.",
        source: "HydroFit Algoritmo de Contingencia"
      });
    }
  });

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "HydroFit Server" });
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
