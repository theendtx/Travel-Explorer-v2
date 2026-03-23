import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryByName, type Country } from "../services/CountriesApi";

function CountryDetails() {
  // 📌 URL-дан name аламыз (/country/kazakhstan)
  const { name } = useParams();

  // 📦 state
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ❗ name жоқ болса — тоқтаймыз
    if (!name) return;

    const fetchCountry = async () => {
      setLoading(true);

      try {
        const data = await getCountryByName(name);

        setCountry(data);
      } catch {
        setError("Failed to load country");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // ❗ data келмей тұрса
  if (!country) return null;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Population: {country.population}</p>
    </div>
  );
}

export default CountryDetails;


