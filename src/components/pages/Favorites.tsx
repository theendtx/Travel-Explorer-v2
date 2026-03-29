import { useEffect, useState } from "react";
import { getAllCountries, type Country } from "../services/CountriesApi";

import CountryList from "../CountryList/CountryList";
import SkeletonList from "../SkeletonList/SkeletonList";

type Props = {
  favorites: string[];
  onToggleFavorite: (name: string) => void;
};

function Favorites({ favorites, onToggleFavorite }: Props) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);

      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch {
        setError("Failed to load countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const favoriteCountries = countries.filter((country) =>
    favorites.includes(country.name.common)
  );

  if (loading) return <SkeletonList />;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Favorites</span>
          <h1>Your saved destinations.</h1>
          <p>Collect the countries that match your travel style and revisit them anytime.</p>
        </div>
        <div className="results-pill">{favoriteCountries.length} saved</div>
      </div>

      {favoriteCountries.length === 0 ? (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Head to Explore and save a few countries to build your shortlist.</p>
        </div>
      ) : (
        <CountryList
          countries={favoriteCountries}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  );
}

export default Favorites;
