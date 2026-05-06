import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  useWeatherToggles,
  TOGGLE_LABELS,
  DEFAULT_TOGGLES,
  type WeatherToggles,
} from "@/lib/weatherSettings";
import WeatherBackground from "@/components/WeatherBackground";
import MiniWeatherBackground from "@/components/MiniWeatherBackground";
import { describeWeather } from "@/lib/weatherCodes";

const PREVIEW_CONDITIONS: { code: number; isDay: 0 | 1; label: string }[] = [
  { code: 0, isDay: 1, label: "Ciel dégagé (jour)" },
  { code: 0, isDay: 0, label: "Ciel dégagé (nuit)" },
  { code: 2, isDay: 1, label: "Partiellement nuageux" },
  { code: 3, isDay: 1, label: "Couvert" },
  { code: 45, isDay: 1, label: "Brouillard" },
  { code: 61, isDay: 1, label: "Pluie" },
  { code: 65, isDay: 1, label: "Fortes pluies" },
  { code: 71, isDay: 1, label: "Neige" },
  { code: 95, isDay: 0, label: "Orage" },
];

const Settings = () => {
  const [toggles, setToggles] = useWeatherToggles();

  const set = (key: keyof WeatherToggles, value: boolean) =>
    setToggles({ ...toggles, [key]: value });

  return (
    <main className="relative min-h-screen w-full text-foreground text-shadow-soft px-5 py-8 flex justify-center overflow-hidden">
      <WeatherBackground code={0} isDay={true} />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="glass-card rounded-full p-2.5 transition-transform active:scale-95"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-medium">Réglages</h1>
          <button
            onClick={() => setToggles(DEFAULT_TOGGLES)}
            className="glass-card rounded-full p-2.5 transition-transform active:scale-95"
            aria-label="Réinitialiser"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </header>

        <section className="glass-card rounded-3xl p-4">
          <h2 className="text-xs uppercase tracking-wider opacity-80 mb-3">
            Animations de fond
          </h2>
          <ul className="divide-y divide-white/10">
            {(Object.keys(TOGGLE_LABELS) as (keyof WeatherToggles)[]).map((key) => (
              <li key={key} className="flex items-center justify-between py-3 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium">{TOGGLE_LABELS[key].title}</p>
                  <p className="text-xs opacity-75">{TOGGLE_LABELS[key].desc}</p>
                </div>
                <Switch
                  checked={toggles[key]}
                  onCheckedChange={(v) => set(key, v)}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-4">
          <h2 className="text-xs uppercase tracking-wider opacity-80 mb-3">
            Aperçu des conditions
          </h2>
          <p className="text-xs opacity-75 mb-3">
            Aperçu en direct selon les animations activées ci-dessus.
          </p>
          <ul className="grid grid-cols-3 gap-2">
            {PREVIEW_CONDITIONS.map((c) => {
              const info = describeWeather(c.code, c.isDay);
              const Icon = info.Icon;
              return (
                <li
                  key={`${c.code}-${c.isDay}`}
                  className="relative overflow-hidden rounded-2xl aspect-square border border-white/15 flex flex-col items-center justify-end gap-1 p-2"
                >
                  <MiniWeatherBackground code={c.code} isDay={!!c.isDay} />
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <Icon size={34} />
                    <span className="text-[10px] text-center leading-tight font-medium drop-shadow">
                      {c.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Settings;
