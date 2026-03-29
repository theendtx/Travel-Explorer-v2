import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountryByName, type Country } from "../services/CountriesApi";

function CountryDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  if (loading) return <p className="status-text">Loading country details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!country) return null;

  return (
    <section className="page">
      <Link to="/explore" className="back-link">
        Back to explore
      </Link>

      <div className="country-details">
        <img
          src={country.flags?.png}
          alt={country.flags?.alt || country.name.common}
          className="country-flag"
        />

        <div className="country-info">
          <span className="eyebrow">{country.region || "Destination"}</span>
          <h1>{country.name.common}</h1>

          <div className="country-info__grid">
            <p>
              <strong>Capital</strong>
              <span>{country.capital?.[0] || "Unknown"}</span>
            </p>
            <p>
              <strong>Population</strong>
              <span>{country.population.toLocaleString()}</span>
            </p>
            <p>
              <strong>Region</strong>
              <span>{country.region || "Unknown"}</span>
            </p>
            <p>
              <strong>Languages</strong>
              <span>{Object.values(country.languages || {}).join(", ") || "Unknown"}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CountryDetails;
