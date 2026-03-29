import CountryCard from "../CountryCard/CountryCard";
import { type Country } from "../services/CountriesApi";

type CountryListProps = {
  countries: Country[];
  favorites: string[];
  onToggleFavorite: (name: string) => void;
};

function CountryList({ countries, favorites, onToggleFavorite }: CountryListProps) {
  return (
    <div className="country-list">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default CountryList;
