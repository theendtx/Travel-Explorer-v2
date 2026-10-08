const BASE_URL = "https://api.restcountries.com/countries/v5";
const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

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
  };
};

type ApiCountry = {
  names?: {
    common?: string;
  };

  codes?: {
    alpha_3?: string;
  };

  capitals?: Array<{
    name?: string;
  }>;

  region?: string;

  population?: number;

  flag?: {
    url_png?: string;
    url_svg?: string;
    description?: string;
  };

  languages?: Array<{
    iso_639_1?: string;
    iso_639_3?: string;
    name?: string;
    native_name?: string;
  }>;
};

type ApiResponse = {
  data: {
    objects: ApiCountry[];
    meta?: {
      total?: number;
      count?: number;
      limit?: number;
      offset?: number;
      more?: boolean;
    };
  };
};

async function fetchCountries(endpoint: string): Promise<ApiCountry[]> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: ApiResponse = await response.json();

  return result.data.objects;
}

function mapCountry(country: ApiCountry): Country {
  const languages: Record<string, string> = {};

  country.languages?.forEach((language) => {
    const key =
      language.iso_639_3 ??
      language.iso_639_1 ??
      language.name ??
      "unknown";

    languages[key] = language.name ?? language.native_name ?? key;
  });

  return {
    cca3: country.codes?.alpha_3 ?? "",
    name: {
      common: country.names?.common ?? "",
    },
    capital: country.capitals
      ?.map((capital) => capital.name)
      .filter((name): name is string => Boolean(name)),
    region: country.region,
    population: country.population ?? 0,
    flags: {
      png: country.flag?.url_png,
      svg: country.flag?.url_svg,
      alt: country.flag?.description,
    },
    languages,
  };
}

export async function getAllCountries(): Promise<Country[]> {
  const limit = 100;

  const firstPage = await fetchCountries(
    `?limit=${limit}&offset=0&response_fields=names.common,codes.alpha_3,capitals,region,population,flag,languages`
  );

  const secondPage = await fetchCountries(
    `?limit=${limit}&offset=${limit}&response_fields=names.common,codes.alpha_3,capitals,region,population,flag,languages`
  );

  const thirdPage = await fetchCountries(
    `?limit=${limit}&offset=${limit * 2}&response_fields=names.common,codes.alpha_3,capitals,region,population,flag,languages`
  );

  return [...firstPage, ...secondPage, ...thirdPage].map(mapCountry);
}

export async function getCountryByName(
  name: string
): Promise<Country | null> {
  const countries = await fetchCountries(
    `/names.common/${encodeURIComponent(name)}?response_fields=names.common,codes.alpha_3,capitals,region,population,flag,languages`
  );

  return countries[0] ? mapCountry(countries[0]) : null;
}