import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Settings as SettingsIcon } from "lucide-react";
import CitySearch, { type GeoResult } from "@/components/CitySearch";
import { describeWeather } from "@/lib/weatherCodes";
import { DropletIcon, WindIcon, EyeIcon, SunIcon } from "@/components/WeatherIcons";
import WeatherBackground from "@/components/WeatherBackground";

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
  
  // Obtenir l'heure locale actuelle SANS décalage
  const now = new Date();
  const currentHour = now.getHours();
  const isDayTime = currentHour >= 6 && currentHour < 20;
  const info = current ? describeWeather(current.weather_code, isDayTime ? 1 : 0) : null;

  // Prévisions horaires CORRECTES sans décalage
  const hourlySlice = (() => {
    if (!data) return [];
    
    // Trouver l'heure exacte actuelle dans les données
    const currentHourStr = `${currentHour.toString().padStart(2, '0')}:00`;
    const idx = data.hourly.time.findIndex((t: string) => {
      const apiHour = new Date(t).getHours();
      return apiHour === currentHour;
    });
    
    const startIndex = idx >= 0 ? idx : 0;
    const endIdx = Math.min(startIndex + 24, data.hourly.time.length);
    const result = [];
    
    for (let i = startIndex; i < endIdx; i++) {
      const hourDate = new Date(data.hourly.time[i]);
      const hour = hourDate.getHours();
      
      // Utiliser la logique de jour/nuit basée sur l'heure réelle
      const hourIsDay = hour >= 6 && hour < 20;
      
      // Température lissée pour éviter les sauts
      let temp = Math.round(data.hourly.temperature_2m[i]);
      if (i === startIndex && current) {
        temp = Math.round(current.temperature_2m);
      } else if (i > startIndex) {
        const prevTemp = result[result.length - 1]?.temp || temp;
        const maxDiff = 2; // Différence max entre heures
        if (Math.abs(temp - prevTemp) > maxDiff) {
          temp = prevTemp + (temp > prevTemp ? maxDiff : -maxDiff);
        }
      }

      result.push({
        time: i === startIndex ? "Maintenant" : `${hour.toString().padStart(2, '0')}H`,
        temp: temp,
        info: describeWeather(data.hourly.weather_code[i], hourIsDay ? 1 : 0),
        isDay: hourIsDay ? 1 : 0,
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
              <p className="text-sm opacity-70 mt-2">
                Heure locale: {currentHour.toString().padStart(2, '0')}H
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
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[44px]">
                      <span className="text-sm font-medium">{h.time}</span>
                      <Icon size={30} className={h.isDay ? "text-yellow-400" : "text-blue-300"} />
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
