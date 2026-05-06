// Service météo combinant Open-Meteo et OpenWeatherMap

export interface OpenWeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_deg: number;
    visibility: number;
    uv_index?: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  };
  hourly: Array<{
    dt: number;
    temp: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
    pop: number; // probability of precipitation
  }>;
  daily: Array<{
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    };
    pop: number;
  }>;
}

export interface CombinedWeatherData {
  openMeteo: any;
  openWeather?: OpenWeatherData;
  combined: {
    current: {
      temperature: number;
      feels_like: number;
      humidity: number;
      pressure: number;
      wind_speed: number;
      wind_direction: number;
      visibility: number;
      uv_index?: number;
      weather_code: number;
      is_day: number;
      description: string;
      precipitation?: number;
    };
    hourly: Array<{
      time: string;
      temperature: number;
      weather_code: number;
      is_day: number;
      precipitation_probability: number;
      description: string;
      pop?: number; // from OpenWeatherMap
    }>;
    daily: Array<{
      time: string;
      temperature_max: number;
      temperature_min: number;
      weather_code: number;
      precipitation_probability: number;
      precipitation_sum: number;
      description: string;
    }>;
  };
}

class WeatherService {
  private openWeatherApiKey: string;
  
  constructor() {
    // Vous devrez ajouter votre clé API OpenWeatherMap ici
    this.openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY || 'votre_clé_api_ici';
  }

  async fetchCombinedWeather(latitude: number, longitude: number): Promise<CombinedWeatherData> {
    try {
      // Récupérer les données des deux sources en parallèle
      const [openMeteoData, openWeatherData] = await Promise.allSettled([
        this.fetchOpenMeteoData(latitude, longitude),
        this.fetchOpenWeatherMapData(latitude, longitude)
      ]);

      const openMeteo = openMeteoData.status === 'fulfilled' ? openMeteoData.value : null;
      const openWeather = openWeatherData.status === 'fulfilled' ? openWeatherData.value : null;

      return this.combineWeatherData(openMeteo, openWeather);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
      throw error;
    }
  }

  private async fetchOpenMeteoData(latitude: number, longitude: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day,uv_index,visibility,pressure_msl,precipitation` +
      `&hourly=temperature_2m,weather_code,is_day,precipitation_probability,relative_humidity_2m,wind_speed_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max` +
      `&timezone=auto&forecast_days=7&wind_speed_unit=kmh&temperature_unit=celsius`;
    
    const response = await fetch(url);
    return await response.json();
  }

  private async fetchOpenWeatherMapData(latitude: number, longitude: number): Promise<OpenWeatherData | null> {
    if (!this.openWeatherApiKey || this.openWeatherApiKey === 'votre_clé_api_ici') {
      console.warn('Clé API OpenWeatherMap non configurée');
      return null;
    }

    try {
      // Current weather
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.openWeatherApiKey}&units=metric&lang=fr`;
      const currentResponse = await fetch(currentUrl);
      const currentData = await currentResponse.json();

      // Forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.openWeatherApiKey}&units=metric&lang=fr`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      // Daily forecast
      const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${this.openWeatherApiKey}&units=metric&lang=fr&cnt=7`;
      let dailyData = null;
      
      try {
        const dailyResponse = await fetch(dailyUrl);
        dailyData = await dailyResponse.json();
      } catch (e) {
        console.warn('Daily forecast non disponible, utilisation des données de forecast');
      }

      return {
        current: {
          temp: currentData.main.temp,
          feels_like: currentData.main.feels_like,
          humidity: currentData.main.humidity,
          pressure: currentData.main.pressure,
          wind_speed: currentData.wind?.speed || 0,
          wind_deg: currentData.wind?.deg || 0,
          visibility: currentData.visibility || 10000,
          uv_index: currentData.uvi,
          weather: currentData.weather[0]
        },
        hourly: forecastData.list.slice(0, 24).map((item: any) => ({
          dt: item.dt,
          temp: item.main.temp,
          weather: item.weather[0],
          pop: item.pop || 0
        })),
        daily: dailyData?.list || forecastData.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 7).map((item: any) => ({
          dt: item.dt,
          temp: {
            day: item.main.temp,
            min: item.main.temp_min,
            max: item.main.temp_max
          },
          weather: item.weather[0],
          pop: item.pop || 0
        }))
      };
    } catch (error) {
      console.error('Erreur OpenWeatherMap:', error);
      return null;
    }
  }

  private combineWeatherData(openMeteo: any, openWeather: OpenWeatherData | null): CombinedWeatherData {
    // Utiliser Open-Meteo comme source principale, enrichie avec OpenWeatherMap
    const current = {
      temperature: openMeteo?.current?.temperature_2m || openWeather?.current?.temp || 0,
      feels_like: openMeteo?.current?.apparent_temperature || openWeather?.current?.feels_like || 0,
      humidity: openMeteo?.current?.relative_humidity_2m || openWeather?.current?.humidity || 0,
      pressure: openMeteo?.current?.pressure_msl || openWeather?.current?.pressure || 0,
      wind_speed: openMeteo?.current?.wind_speed_10m || openWeather?.current?.wind_speed || 0,
      wind_direction: openMeteo?.current?.wind_direction_10m || openWeather?.current?.wind_deg || 0,
      visibility: openMeteo?.current?.visibility || openWeather?.current?.visibility || 0,
      uv_index: openMeteo?.current?.uv_index || openWeather?.current?.uv_index,
      weather_code: openMeteo?.current?.weather_code || 0,
      is_day: openMeteo?.current?.is_day || 1,
      description: openWeather?.current?.weather?.description || '',
      precipitation: openMeteo?.current?.precipitation || 0
    };

    // Combiner les données horaires
    const hourly = openMeteo?.hourly?.time?.map((time: string, index: number) => ({
      time,
      temperature: openMeteo.hourly.temperature_2m[index],
      weather_code: openMeteo.hourly.weather_code[index],
      is_day: openMeteo.hourly.is_day[index],
      precipitation_probability: openMeteo.hourly.precipitation_probability?.[index] || 0,
      description: openWeather?.hourly?.[index]?.weather?.description || '',
      pop: openWeather?.hourly?.[index]?.pop
    })) || [];

    // Combiner les données journalières
    const daily = openMeteo?.daily?.time?.map((time: string, index: number) => ({
      time,
      temperature_max: openMeteo.daily.temperature_2m_max[index],
      temperature_min: openMeteo.daily.temperature_2m_min[index],
      weather_code: openMeteo.daily.weather_code[index],
      precipitation_probability: openMeteo.daily.precipitation_probability_max?.[index] || 0,
      precipitation_sum: openMeteo.daily.precipitation_sum?.[index] || 0,
      description: openWeather?.daily?.[index]?.weather?.description || ''
    })) || [];

    return {
      openMeteo,
      openWeather,
      combined: {
        current,
        hourly,
        daily
      }
    };
  }
}

export const weatherService = new WeatherService();
