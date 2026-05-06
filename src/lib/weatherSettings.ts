import { useEffect, useState } from "react";

export interface WeatherToggles {
  clouds: boolean;
  sun: boolean;
  stars: boolean;
  rain: boolean;
  snow: boolean;
  storm: boolean;
  fog: boolean;
  gradient: boolean;
}

export const DEFAULT_TOGGLES: WeatherToggles = {
  clouds: true,
  sun: true,
  stars: true,
  rain: true,
  snow: true,
  storm: true,
  fog: true,
  gradient: true,
};

const KEY = "weather-toggles-v1";

export function loadToggles(): WeatherToggles {
  if (typeof window === "undefined") return DEFAULT_TOGGLES;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_TOGGLES;
    return { ...DEFAULT_TOGGLES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_TOGGLES;
  }
}

export function saveToggles(t: WeatherToggles) {
  try {
    localStorage.setItem(KEY, JSON.stringify(t));
    window.dispatchEvent(new CustomEvent("weather-toggles-change"));
  } catch {}
}

export function useWeatherToggles(): [WeatherToggles, (t: WeatherToggles) => void] {
  const [toggles, setToggles] = useState<WeatherToggles>(() => loadToggles());

  useEffect(() => {
    const onChange = () => setToggles(loadToggles());
    window.addEventListener("weather-toggles-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("weather-toggles-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const update = (t: WeatherToggles) => {
    setToggles(t);
    saveToggles(t);
  };

  return [toggles, update];
}

export const TOGGLE_LABELS: Record<keyof WeatherToggles, { title: string; desc: string }> = {
  gradient: { title: "Dégradé de ciel", desc: "Couleur du ciel selon la météo" },
  sun: { title: "Soleil", desc: "Halo lumineux par temps clair (jour)" },
  stars: { title: "Étoiles", desc: "Ciel étoilé la nuit" },
  clouds: { title: "Nuages", desc: "Couches de nuages animées" },
  rain: { title: "Pluie", desc: "Gouttes qui tombent" },
  snow: { title: "Neige", desc: "Flocons qui tombent" },
  storm: { title: "Éclairs", desc: "Flashs d'orage" },
  fog: { title: "Brouillard", desc: "Voile de brume" },
};
