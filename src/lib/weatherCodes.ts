// WMO weather code → label + icon mapping (Open-Meteo)
import {
  SunIcon,
  CloudSunIcon,
  CloudIcon,
  CloudsIcon,
  RainIcon,
  HeavyRainIcon,
  StormIcon,
  SnowIcon,
  FogIcon,
  WindIcon,
  MoonIcon,
  CloudMoonIcon,
} from "@/components/WeatherIcons";

export type WeatherIconComponent = typeof SunIcon;

export interface WeatherInfo {
  label: string;
  Icon: WeatherIconComponent;
}

export function describeWeather(code: number, isDay = 1): WeatherInfo {
  const day = isDay === 1;
  switch (code) {
    case 0:
      return { label: "Ciel dégagé", Icon: day ? SunIcon : MoonIcon };
    case 1:
      return { label: "Plutôt dégagé", Icon: day ? SunIcon : MoonIcon };
    case 2:
      return { label: "Partiellement nuageux", Icon: day ? CloudSunIcon : CloudMoonIcon };
    case 3:
      return { label: "Couvert", Icon: CloudsIcon };
    case 45:
    case 48:
      return { label: "Brouillard", Icon: FogIcon };
    case 51:
    case 53:
    case 55:
      return { label: "Bruine", Icon: RainIcon };
    case 56:
    case 57:
      return { label: "Bruine verglaçante", Icon: RainIcon };
    case 61:
      return { label: "Pluie faible", Icon: RainIcon };
    case 63:
      return { label: "Pluie", Icon: RainIcon };
    case 65:
      return { label: "Fortes pluies", Icon: HeavyRainIcon };
    case 66:
    case 67:
      return { label: "Pluie verglaçante", Icon: RainIcon };
    case 71:
    case 73:
    case 75:
      return { label: "Neige", Icon: SnowIcon };
    case 77:
      return { label: "Grains de neige", Icon: SnowIcon };
    case 80:
    case 81:
      return { label: "Averses", Icon: RainIcon };
    case 82:
      return { label: "Averses violentes", Icon: HeavyRainIcon };
    case 85:
    case 86:
      return { label: "Averses de neige", Icon: SnowIcon };
    case 95:
      return { label: "Orage", Icon: StormIcon };
    case 96:
    case 99:
      return { label: "Orage avec grêle", Icon: StormIcon };
    default:
      return { label: "—", Icon: CloudIcon };
  }
}

export { WindIcon };
