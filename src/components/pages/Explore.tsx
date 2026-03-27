import { useEffect, useState } from "react";
import { getAllCountries, type Country } from "../services/CountriesApi";

import CountryList from "../CountryList/CountryList";
import SearchBar from "../SearchBar";
import RegionFilter from "../RegionFilter";
import PopulationFilter from "../PopulationFilter";
import SkeletonList from "../SkeletonList/SkeletonList";

/**
 * 🔥 Props App-тен келеді
 */
type Props = {
  favorites: string[];
  onToggleFavorite: (name: string) => void;
};

function Explore({ favorites, onToggleFavorite }: Props) {
  /**
   * 📦 State (локальный)
   */
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔍 search + filters
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [sort, setSort] = useState("");

  /**
   * 🌍 API fetch
   */
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

  /**
   * 🧠 FILTER + SEARCH + SORT
   */
  let filteredCountries = countries;

  // 🔍 search
  if (search) {
    filteredCountries = filteredCountries.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🌍 region
  if (region) {
    filteredCountries = filteredCountries.filter(
      (c) => c.region === region
    );
  }

  // 📊 sorting
  if (sort === "asc") {
    filteredCountries = [...filteredCountries].sort(
      (a, b) => a.population - b.population
    );
  }

  if (sort === "desc") {
    filteredCountries = [...filteredCountries].sort(
      (a, b) => b.population - a.population
    );
  }

  /**
   * 🧠 UI STATES
   */
  if (loading) return <SkeletonList />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Explore Countries</h1>

      {/* 🔍 Search */}
      <SearchBar onSearch={setSearch} />

      {/* 🌍 Filters */}
      <RegionFilter value={region} onChange={setRegion} />
      <PopulationFilter value={sort} onChange={setSort} />

      {/* 📦 LIST */}
      <CountryList
        countries={filteredCountries}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

export default Explore;