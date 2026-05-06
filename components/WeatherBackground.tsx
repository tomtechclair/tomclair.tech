import { useMemo } from "react";
import { useWeatherToggles } from "@/lib/weatherSettings";

interface Props {
  code: number;
  isDay: boolean;
}

/**
 * Catégorise un code WMO Open-Meteo en type d'animation.
 */
function categorize(code: number): "clear" | "cloudy" | "overcast" | "rain" | "heavy-rain" | "snow" | "storm" | "fog" {
  if ([0, 1].includes(code)) return "clear";
  if (code === 2) return "cloudy";
  if (code === 3) return "overcast";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 56, 57, 61, 63, 66, 67, 80, 81].includes(code)) return "rain";
  if ([65, 82].includes(code)) return "heavy-rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "cloudy";
}

/**
 * Dégradé de ciel dans le style Apple iOS selon la météo + jour/nuit.
 */
function skyGradient(cat: ReturnType<typeof categorize>, day: boolean): string {
  if (!day) {
    // Nuit - Style Apple iOS
    switch (cat) {
      case "clear":
        return "linear-gradient(180deg, #0a0e27 0%, #151933 40%, #1a1f3a 70%, #2d3561 100%)";
      case "cloudy":
        return "linear-gradient(180deg, #1a1f3a 0%, #2d3561 40%, #3d4e6d 70%, #4a5f8a 100%)";
      case "overcast":
      case "fog":
        return "linear-gradient(180deg, #2d3561 0%, #3d4e6d 40%, #4a5f8a 70%, #5a6b8c 100%)";
      case "rain":
      case "heavy-rain":
        return "linear-gradient(180deg, #1a1f3a 0%, #2d3561 30%, #3d4e6d 60%, #4a5f8a 100%)";
      case "storm":
        return "linear-gradient(180deg, #0f1419 0%, #1a1f3a 40%, #2d3561 70%, #3d4e6d 100%)";
      case "snow":
        return "linear-gradient(180deg, #e8f4f8 0%, #d1e3f0 40%, #b8c6db 70%, #a5a4c4 100%)";
      default:
        return "linear-gradient(180deg, #1a1f3a 0%, #2d3561 50%, #3d4e6d 100%)";
    }
  }
  
  // Jour - Style Apple iOS
  switch (cat) {
    case "clear":
      return "linear-gradient(180deg, #4a90e2 0%, #7bb7f0 30%, #96ceb4 60%, #b8e6f4 100%)";
    case "cloudy":
      return "linear-gradient(180deg, #87ceeb 0%, #96ceb4 30%, #b8e6f4 60%, #d4e4bc 100%)";
    case "overcast":
    case "fog":
      return "linear-gradient(180deg, #b8c6db 0%, #d4e4bc 30%, #e8d5b7 60%, #f0e6d2 100%)";
    case "rain":
    case "heavy-rain":
      return "linear-gradient(180deg, #6c7a89 0%, #8b9dc3 30%, #a8b8d8 60%, #c5cae9 100%)";
    case "storm":
      return "linear-gradient(180deg, #4a5568 0%, #6c7a89 30%, #8b9dc3 60%, #a8b8d8 100%)";
    case "snow":
      return "linear-gradient(180deg, #ffffff 0%, #f8f9fa 30%, #e8f4f8 60%, #d1e3f0 100%)";
    default:
      return "linear-gradient(180deg, #87ceeb 0%, #96ceb4 50%, #b8e6f4 100%)";
  }
}

const WeatherBackground = ({ code, isDay }: Props) => {
  const cat = categorize(code);
  const day = !!isDay;
  const [toggles] = useWeatherToggles();

  // Génération mémoïsée des particules
  const drops = useMemo(
    () =>
      Array.from({ length: cat === "heavy-rain" || cat === "storm" ? 90 : 50 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.5 + Math.random() * 0.6,
        height: 50 + Math.random() * 40,
      })),
    [cat]
  );

  const flakes = useMemo(
    () =>
      Array.from({ length: 60 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 3 + Math.random() * 5,
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }).map(() => ({
        top: Math.random() * 70,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    []
  );

  const showClouds = toggles.clouds && ["cloudy", "overcast", "rain", "heavy-rain", "storm", "snow"].includes(cat);
  const showSun = toggles.sun && day && cat === "clear";
  const showRain = toggles.rain && (cat === "rain" || cat === "heavy-rain" || cat === "storm");
  const showSnow = toggles.snow && cat === "snow";
  const showStars = toggles.stars && !day && (cat === "clear" || cat === "cloudy");
  const showStorm = toggles.storm && cat === "storm";
  const showFog = toggles.fog && (cat === "fog" || cat === "overcast");

  const bg = toggles.gradient
    ? skyGradient(cat, day)
    : "linear-gradient(180deg, hsl(220 40% 20%) 0%, hsl(225 45% 12%) 100%)";

  return (
    <div className="weather-bg" style={{ background: bg }}>
      {/* Soleil Apple iOS style */}
      {showSun && (
        <div className="sun-container">
          <div className="sun-core" />
          <div className="sun-rays" />
        </div>
      )}

      {/* Étoiles Apple iOS style */}
      {showStars &&
        stars.map((s, i) => (
          <div
            key={`s${i}`}
            className="apple-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

      {/* Nuages Apple iOS style */}
      {showClouds && (
        <div className="clouds-container">
          <div className="apple-cloud cloud-1" />
          <div className="apple-cloud cloud-2" />
          <div className="apple-cloud cloud-3" />
        </div>
      )}

      {/* Brouillard Apple iOS style */}
      {showFog && (
        <div className="fog-container">
          <div className="fog-layer-1" />
          <div className="fog-layer-2" />
        </div>
      )}

      {/* Pluie Apple iOS style */}
      {showRain && (
        <div className="rain-container">
          {drops.map((d, i) => (
            <div
              key={`r${i}`}
              className="apple-rain-drop"
              style={{
                left: `${d.left}%`,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
                height: `${d.height}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Neige Apple iOS style */}
      {showSnow && (
        <div className="snow-container">
          {flakes.map((f, i) => (
            <div
              key={`f${i}`}
              className="apple-snow-flake"
              style={{
                left: `${f.left}%`,
                width: `${f.size}px`,
                height: `${f.size}px`,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Orage Apple iOS style */}
      {showStorm && (
        <div className="storm-container">
          <div className="lightning-flash" />
          <div className="storm-clouds">
            <div className="apple-cloud storm-cloud-1" />
            <div className="apple-cloud storm-cloud-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
