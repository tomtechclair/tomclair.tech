import { useMemo } from "react";
import { useWeatherToggles } from "@/lib/weatherSettings";

interface Props {
  code: number;
  isDay: boolean;
  className?: string;
}

function categorize(code: number) {
  if ([0, 1].includes(code)) return "clear" as const;
  if (code === 2) return "cloudy" as const;
  if (code === 3) return "overcast" as const;
  if ([45, 48].includes(code)) return "fog" as const;
  if ([51, 53, 55, 56, 57, 61, 63, 66, 67, 80, 81].includes(code)) return "rain" as const;
  if ([65, 82].includes(code)) return "heavy-rain" as const;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow" as const;
  if ([95, 96, 99].includes(code)) return "storm" as const;
  return "cloudy" as const;
}

function skyGradient(cat: ReturnType<typeof categorize>, day: boolean): string {
  if (!day) {
    if (cat === "storm" || cat === "heavy-rain")
      return "linear-gradient(180deg, hsl(230 40% 15%), hsl(215 30% 8%))";
    return "linear-gradient(180deg, hsl(225 60% 22%), hsl(235 50% 10%))";
  }
  switch (cat) {
    case "clear": return "linear-gradient(180deg, hsl(200 90% 60%), hsl(220 75% 35%))";
    case "cloudy": return "linear-gradient(180deg, hsl(205 70% 60%), hsl(220 55% 32%))";
    case "overcast":
    case "fog": return "linear-gradient(180deg, hsl(210 25% 65%), hsl(220 22% 35%))";
    case "rain":
    case "heavy-rain": return "linear-gradient(180deg, hsl(215 35% 45%), hsl(225 40% 22%))";
    case "snow": return "linear-gradient(180deg, hsl(210 45% 75%), hsl(220 38% 45%))";
    case "storm": return "linear-gradient(180deg, hsl(225 30% 30%), hsl(215 30% 12%))";
  }
}

/**
 * Aperçu compact (s'inscrit dans son parent), respecte les toggles utilisateur.
 */
const MiniWeatherBackground = ({ code, isDay, className = "" }: Props) => {
  const cat = categorize(code);
  const day = !!isDay;
  const [toggles] = useWeatherToggles();

  const drops = useMemo(
    () =>
      Array.from({ length: cat === "heavy-rain" || cat === "storm" ? 14 : 9 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 0.6 + Math.random() * 0.5,
      })),
    [cat]
  );

  const flakes = useMemo(
    () =>
      Array.from({ length: 12 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 3,
        size: 2 + Math.random() * 2,
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        top: Math.random() * 70,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 1.8 + Math.random() * 2,
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
    : "linear-gradient(180deg, hsl(220 40% 20%), hsl(225 45% 12%))";

  return (
    <div
      className={`mini-weather-bg ${className}`}
      style={{ background: bg }}
      aria-hidden
    >
      {showSun && <div className="mini-sun" />}

      {showStars &&
        stars.map((s, i) => (
          <div
            key={`s${i}`}
            className="mini-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

      {showClouds && (
        <>
          <div className="mini-cloud mini-cloud-a" />
          <div className="mini-cloud mini-cloud-b" />
          <div className="mini-cloud mini-cloud-c" />
        </>
      )}

      {showFog && <div className="mini-fog" />}

      {showRain &&
        drops.map((d, i) => (
          <div
            key={`r${i}`}
            className="mini-rain"
            style={{
              left: `${d.left}%`,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
            }}
          />
        ))}

      {showSnow &&
        flakes.map((f, i) => (
          <div
            key={`f${i}`}
            className="mini-snow"
            style={{
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
            }}
          />
        ))}

      {showStorm && <div className="mini-lightning" />}
    </div>
  );
};

export default MiniWeatherBackground;
