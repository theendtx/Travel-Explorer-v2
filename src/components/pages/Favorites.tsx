import { useEffect, useState } from "react";
import { getAllCountries, type Country } from "../services/CountriesApi";

import CountryList  from "../CountryList/CountryList";

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

if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;

return (
  <div>
    <h1>Favorites</h1>

    {favoriteCountries.length === 0 ? (
      <p>No favorites yet</p>
    ) : (
      <CountryList
      countries={favoriteCountries}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
      />
    )}
  </div>
);
}
export default Favorites;