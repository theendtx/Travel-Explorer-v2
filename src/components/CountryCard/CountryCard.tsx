import { Link } from "react-router-dom";

type Props = {
    country: any;
    favorites: string[];
    onToggleFavorite: (name: string) => void;
};

function CountryCard({ country, favorites, onToggleFavorite }: Props) {
    
    const isFavorite = favorites.includes(country.name.common);

    return (
    <div className="country-card">
      {/* 🔗 Деталь бетке өту */}
      <Link to={`/country/${country.name.common}`}>
        <img src={country.flags?.png} alt={country.name.common} />
        <h3>{country.name.common}</h3>
        <p>Population: {country.population}</p>
      </Link>

      {/* ❤️ Favorite батырма */}
      <button onClick={() => onToggleFavorite(country.name.common)}>
        {isFavorite ? "💔 Remove" : "❤️ Add"}
      </button>
    </div>
  );
}

export default CountryCard;