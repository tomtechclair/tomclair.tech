import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Loader2, Settings as SettingsIcon } from "lucide-react";
import CitySearch, { type GeoResult } from "@/components/CitySearch";
import { describeWeather } from "@/lib/weatherCodes";
import { DropletIcon, WindIcon, EyeIcon, SunIcon } from "@/components/WeatherIcons";
import WeatherBackground from "@/components/WeatherBackground";

// Hook personnalisé pour l'heure locale en temps réel (global)
const useLocalTime = () => {
  const [localTime, setLocalTime] = useState(() => new Date());
  
  useEffect(() => {
    // Synchroniser immédiatement avec l'heure système
    const syncTime = () => {
      const now = new Date();
      setLocalTime(new Date(now));
      
      // Log de synchronisation pour débogage
      console.log('Heure synchronisée:', now.toLocaleTimeString());
    };
    
    // Synchronisation immédiate
    syncTime();
    
    // Mise à jour chaque seconde pour temps réel
    const updateInterval = setInterval(syncTime, 1000);
    
    // Nettoyage
    return () => clearInterval(updateInterval);
  }, []); // Tableau vide pour exécution unique
  
  return localTime;
};

// Système de formatage d'heure dans le style Swift/iOS (optimisé pour temps réel)
const useTimeFormatter = () => {
  const formatDate = (date: Date, timezoneOffset?: number) => {
    // Utiliser directement l'heure locale du navigateur (temps réel)
    const targetDate = timezoneOffset !== undefined 
      ? new Date(date.getTime() + (timezoneOffset * 60000))
      : date;
    
    // Formatter l'heure en temps réel (juste l'heure, sans minutes)
    const hours = targetDate.getHours().toString().padStart(2, '0');
    
    return `${hours}H`; // Format 11H, 12H, etc.
  };
  
  const heurePourVille = (timestamp: number, timezoneOffset: number): string => {
    // Conversion précise pour n'importe quel fuseau horaire
    const date = new Date(timestamp + (timezoneOffset * 60000));
    return formatDate(date, 0); // UTC pour le calcul interne
  };
  
  const getCurrentTime = (): string => {
    // Obtenir l'heure actuelle formatée pour affichage (juste l'heure)
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    return `${hours}H`; // Format 11H, 12H, etc.
  };
  
  return { formatDate, heurePourVille, getCurrentTime };
};

interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
    is_day: number;
    uv_index?: number;
    visibility?: number;
    pressure_msl?: number;
    precipitation?: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    is_day: number[];
    precipitation_probability?: number[];
    relative_humidity_2m?: number[];
    wind_speed_10m?: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum?: number[];
    precipitation_probability_max?: number[];
  };
}

const DEFAULT_CITY: GeoResult = {
  id: 4164138,
  name: "Miami",
  country: "États-Unis",
  admin1: "Floride",
  latitude: 25.7617,
  longitude: -80.1918,
  timezone: "auto",
};

const windDir = (deg: number) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  return dirs[Math.round(deg / 45) % 8];
};

const Index = () => {
  const [city, setCity] = useState<GeoResult>(DEFAULT_CITY);
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const localTime = useLocalTime();
  const { formatDate, heurePourVille, getCurrentTime } = useTimeFormatter();
  const currentFormattedTime = getCurrentTime();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day,uv_index,visibility,pressure_msl,precipitation` +
      `&hourly=temperature_2m,weather_code,is_day,precipitation_probability,relative_humidity_2m,wind_speed_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max` +
      `&timezone=auto&forecast_days=7&wind_speed_unit=kmh&temperature_unit=celsius`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => !cancelled && setData(d))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [city]);

  const current = data?.current;
  const today = data?.daily;
  // Utiliser l'heure locale en temps réel
  const localHour = localTime.getHours();
  const isDayTime = localHour >= 6 && localHour < 20; // Jour de 6h à 20h
  const info = current ? describeWeather(current.weather_code, isDayTime ? 1 : 0) : null;

  // Next 24 hours starting from current hour
  const hourlySlice = (() => {
    if (!data) return [];
    
    // Utiliser l'heure locale en temps réel
    const now = localTime;
    const currentLocalHour = now.getHours();
    const currentLocalMinutes = now.getMinutes();
    
    // Calculer le décalage horaire local (en minutes)
    const timezoneOffset = now.getTimezoneOffset();
    const timezoneOffsetHours = timezoneOffset / 60;
    
    // Trouver l'index le plus proche de l'heure actuelle
    let bestIdx = 0;
    let minTimeDiff = Infinity;
    
    for (let i = 0; i < data.hourly.time.length; i++) {
      const hourTime = new Date(data.hourly.time[i]);
      const timeDiff = Math.abs(hourTime.getTime() - now.getTime());
      if (timeDiff < minTimeDiff) {
        minTimeDiff = timeDiff;
        bestIdx = i;
      }
    }
    
    const idx = bestIdx;
    const endIdx = Math.min(idx + 24, data.hourly.time.length);
    const result = [];
    
    for (let i = idx; i < endIdx; i++) {
      // Convertir le timestamp de l'API en heure locale
      const apiTime = new Date(data.hourly.time[i]);
      const localTime = new Date(apiTime.getTime() + (timezoneOffset * 60000));
      const hour = localTime.getHours();
      const minutes = localTime.getMinutes();
      
      // Utiliser la logique de jour/nuit basée sur l'heure locale
      const isDayTime = hour >= 6 && hour < 20; // Jour de 6h à 20h
      
      // Pour la première heure (maintenant), utiliser la température actuelle
      // Pour les autres, utiliser une interpolation si nécessaire pour éviter les sauts
      let temp = Math.round(data.hourly.temperature_2m[i]);
      if (i === idx && current) {
        temp = Math.round(current.temperature_2m);
      } else if (i > idx) {
        // Lisser les températures pour éviter les sauts brusques
        const prevTemp = result[result.length - 1]?.temp || temp;
        const maxDiff = 3; // Différence maximale autorisée entre heures
        if (Math.abs(temp - prevTemp) > maxDiff) {
          temp = prevTemp + (temp > prevTemp ? maxDiff : -maxDiff);
        }
      }

      // Afficher l'heure formatée avec le système Swift/iOS
      const displayHour = i === idx ? "Maintenant" : 
        formatDate(localTime, timezoneOffsetHours);

      result.push({
        time: displayHour,
        temp: temp,
        info: describeWeather(data.hourly.weather_code[i], isDayTime ? 1 : 0),
        isDay: isDayTime ? 1 : 0,
        hour: hour
      });
    }
    return result;
  })();

  const dailyList = (() => {
    if (!data) return [];
    return data.daily.time.map((t, i) => {
      const d = new Date(t);
      const labels = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
      return {
        day: i === 0 ? "Aujourd'hui" : labels[d.getDay()],
        info: describeWeather(data.daily.weather_code[i], 1),
        low: Math.round(data.daily.temperature_2m_min[i]),
        high: Math.round(data.daily.temperature_2m_max[i]),
      };
    });
  })();

  const weekMin = Math.min(...dailyList.map((d) => d.low), 0);
  const weekMax = Math.max(...dailyList.map((d) => d.high), 1);
  const range = Math.max(1, weekMax - weekMin);

  return (
    <main className="relative min-h-screen w-full text-foreground text-shadow-soft px-5 py-8 flex justify-center overflow-hidden">
      <WeatherBackground
        code={current?.weather_code ?? 1}
        isDay={isDayTime}
      />
      <div className="relative z-10 w-full max-w-md flex flex-col gap-4">
        <CitySearch onSelect={setCity} />

        {loading || !current || !today || !info ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin opacity-80" />
          </div>
        ) : (
          <>
            <header className="flex flex-col items-center pt-4 pb-2">
              <h1 className="text-4xl font-light tracking-wide">{city.name}</h1>
              <div className="text-[88px] font-extralight leading-none mt-1">
                {Math.round(current.temperature_2m)}°
              </div>
              <p className="text-lg font-medium mt-1">{info.label}</p>
              <p className="text-base opacity-90">
                Max.: {Math.round(today.temperature_2m_max[0])}°  Min.:{" "}
                {Math.round(today.temperature_2m_min[0])}°
              </p>
              {/* Affichage de l'heure actuelle en temps réel pour vérification */}
              <p className="text-sm opacity-70 mt-2">
                Heure locale: {currentFormattedTime}
              </p>
            </header>

            <section className="glass-card rounded-2xl px-4 py-3">
              <p className="text-sm opacity-95">
                {info.label}. Ressenti {Math.round(current.apparent_temperature)}°. Vent{" "}
                {Math.round(current.wind_speed_10m)} km/h {windDir(current.wind_direction_10m)}.
              </p>
            </section>

            <section className="glass-card rounded-3xl p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80 border-b border-white/20 pb-2 mb-3">
                <info.Icon size={16} />
                <span>Prévisions horaires</span>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
                {hourlySlice.map((h, i) => {
                  const Icon = h.info.Icon;
                  const isDayIcon = h.isDay === 1;
                  const isCurrentHour = h.time === "Maintenant";
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[44px]">
                      <span className="text-sm font-medium">{isCurrentHour ? "MTN" : h.time}</span>
                      <Icon size={30} className={isDayIcon ? "text-yellow-400" : "text-blue-300"} />
                      <span className="text-lg font-medium">{h.temp}°</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="glass-card rounded-3xl px-4 py-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80 border-b border-white/20 py-2">
                <span>Prévisions sur {dailyList.length} jours</span>
              </div>
              <ul>
                {dailyList.map((d, i) => {
                  const Icon = d.info.Icon;
                  const leftPct = ((d.low - weekMin) / range) * 100;
                  const rightPct = 100 - ((d.high - weekMin) / range) * 100;
                  return (
                    <li
                      key={i}
                      className={`flex items-center gap-3 py-3 ${
                        i !== dailyList.length - 1 ? "border-b border-white/10" : ""
                      }`}
                    >
                      <span className="w-20 text-base font-medium">{d.day}</span>
                      <Icon size={28} />
                      <span className="ml-auto w-8 text-right opacity-80">{d.low}°</span>
                      <div className="relative h-1.5 w-24 rounded-full bg-white/20 overflow-hidden">
                        <div
                          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400"
                          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-medium">{d.high}°</span>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="grid grid-cols-2 gap-3">
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider opacity-80">
                  <DropletIcon size={14} />
                  <span>Humidité</span>
                </div>
                <p className="text-3xl font-light mt-2">{current.relative_humidity_2m}%</p>
                <p className="text-sm opacity-80 mt-1">
                  Ressenti {Math.round(current.apparent_temperature)}°
                </p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider opacity-80">
                  <WindIcon size={14} />
                  <span>Vent</span>
                </div>
                <p className="text-3xl font-light mt-2">
                  {Math.round(current.wind_speed_10m)} km/h
                </p>
                <p className="text-sm opacity-80 mt-1">{windDir(current.wind_direction_10m)}</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider opacity-80">
                  <SunIcon size={14} />
                  <span>Indice UV</span>
                </div>
                <p className="text-3xl font-light mt-2">
                  {current.uv_index != null ? Math.round(current.uv_index) : "—"}
                </p>
                <p className="text-sm opacity-80 mt-1">
                  {current.uv_index != null && current.uv_index >= 6 ? "Élevé" : "Modéré"}
                </p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider opacity-80">
                  <EyeIcon size={14} />
                  <span>Visibilité</span>
                </div>
                <p className="text-3xl font-light mt-2">
                  {current.visibility != null ? Math.round(current.visibility / 1000) : "—"} km
                </p>
                <p className="text-sm opacity-80 mt-1">
                  {(current.visibility ?? 0) > 10000 ? "Parfaitement clair" : "Réduite"}
                </p>
              </div>
            </section>

            <Link
              to="/settings"
              aria-label="Réglages"
              className="glass-card-strong rounded-full p-4 self-center mt-2 transition-transform active:scale-95"
            >
              <SettingsIcon className="h-5 w-5" />
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default Index;
