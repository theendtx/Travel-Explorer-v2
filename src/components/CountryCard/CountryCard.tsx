import { Link } from "react-router-dom";
import { type Country } from "../services/CountriesApi";

type Props = {
  country: Country;
  favorites: string[];
  onToggleFavorite: (name: string) => void;
};

function CountryCard({ country, favorites, onToggleFavorite }: Props) {
  const isFavorite = favorites.includes(country.name.common);

  return (
    <article className="country-card">
      <Link to={`/country/${country.name.common}`} className="country-card__link">
        <div className="country-card__image-wrap">
          <img src={country.flags?.png} alt={country.flags?.alt || country.name.common} />
          <span className="country-card__region">{country.region || "Global"}</span>
        </div>

        <div className="country-card__content">
          <h3>{country.name.common}</h3>
          <p>Capital: {country.capital?.[0] || "Unknown"}</p>
          <p>Population: {country.population.toLocaleString()}</p>
        </div>
      </Link>

      <button
        type="button"
        className={`favorite-btn ${isFavorite ? "is-active" : ""}`}
        onClick={() => onToggleFavorite(country.name.common)}
      >
        {isFavorite ? "Remove from favorites" : "Save to favorites"}
      </button>
    </article>
  );
}

export default CountryCard;
