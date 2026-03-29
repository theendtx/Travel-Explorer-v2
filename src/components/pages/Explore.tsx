import { useEffect, useState } from "react";
import { getAllCountries, type Country } from "../services/CountriesApi";

import CountryList from "../CountryList/CountryList";
import SearchBar from "../SearchBar";
import RegionFilter from "../RegionFilter";
import PopulationFilter from "../PopulationFilter";
import SkeletonList from "../SkeletonList/SkeletonList";

type Props = {
  favorites: string[];
  onToggleFavorite: (name: string) => void;
};

function Explore({ favorites, onToggleFavorite }: Props) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [sort, setSort] = useState("");

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

  let filteredCountries = countries;

  if (search) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (region) {
    filteredCountries = filteredCountries.filter((country) => country.region === region);
  }

  if (sort === "asc") {
    filteredCountries = [...filteredCountries].sort((a, b) => a.population - b.population);
  }

  if (sort === "desc") {
    filteredCountries = [...filteredCountries].sort((a, b) => b.population - a.population);
  }

  if (loading) return <SkeletonList />;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Explore</span>
          <h1>Browse countries with graceful motion.</h1>
          <p>Search, filter, and sort destinations in a bright travel-focused interface.</p>
        </div>
        <div className="results-pill">{filteredCountries.length} destinations</div>
      </div>

      <div className="toolbar">
        <SearchBar onSearch={setSearch} />
        <RegionFilter value={region} onChange={setRegion} />
        <PopulationFilter value={sort} onChange={setSort} />
      </div>

      {filteredCountries.length === 0 ? (
        <div className="empty-state">
          <h2>No countries found</h2>
          <p>Try adjusting the search text or switching the selected filters.</p>
        </div>
      ) : (
        <CountryList
          countries={filteredCountries}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  );
}

export default Explore;
