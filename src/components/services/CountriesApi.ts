const BASE_URL = "https://restcountries.com/v3.1";
const COUNTRY_FIELDS = "name,capital,region,population,flags,cca3,languages";

export type Country = {
  cca3: string;
  name: {
    common: string;
  };
  capital?: string[];
  region?: string;
  population: number;
  flags?: {
    png?: string;
    svg?: string;
    alt?: string;
   };
    languages?: {
      [key: string]: string;
    }
  
};

async function fetchCountries<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getAllCountries(): Promise<Country[]> {
  return fetchCountries<Country[]>(`/all?fields=${COUNTRY_FIELDS}`);
}

export async function getCountryByName(name: string): Promise<Country | null> {
  const countries = await fetchCountries<Country[]>(
    `/name/${encodeURIComponent(name)}?fullText=true&fields=${COUNTRY_FIELDS}`
  );

  return countries[0] ?? null;
}
