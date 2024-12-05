export interface OpenWeatherSearchCityResponse {
  message: string;
  cod: string;
  count: number;
  list: WeatherCity[];
}

export interface OpenWeatherCityWeatherResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: Wind;
  rain?: Precipitation;
  clouds: Clouds;
  dt: number;
  sys: System;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherCity {
  id: number;
  name: string;
  coord: Coordinates;
  main: WeatherMain;
  dt: number;
  wind: Wind;
  sys: System;
  rain?: Precipitation;
  snow?: Precipitation;
  clouds: Clouds;
  weather: Weather[];
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface System {
  country: string;
  sunrise?: number;
  sunset?: number;
  type?: number;
  id?: number;
}

export interface Precipitation {
  [key: string]: number;
}

export interface Clouds {
  all: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type City = Pick<WeatherCity, 'id' | 'name' | 'coord' | 'sys'>;
