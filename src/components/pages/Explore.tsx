import { useEffect, useState } from "react";
import { getAllCountries,type Country } from "../services/CountriesApi.ts";
import CountryList from "../CountryList/CountryList.tsx";
import SkeletonList from "../SkeletonList/SkeletonList.tsx";
import SearchBar from "../SearchBar.tsx";
import RegionFilter from "../RegionFilter.tsx";
import PopulationFilter from "../PopulationFilter.tsx";

function Explore() {
  // 📦 3 негізгі state (әрқашан болады)
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [sort, setSort] = useState("");

  let filteredCountries = countries;

// 🔍 search (алдыңғы блок)
filteredCountries = filteredCountries.filter((country) =>
  country.name.common.toLowerCase().includes(search.toLowerCase())
);

// 🌍 region filter
if (region) {
  filteredCountries = filteredCountries.filter(
    (country) => country.region === region
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

  useEffect(() => {
    // ❗ useEffect ішінде async тікелей жазбаймыз
    // → сондықтан ішкі функция жасаймыз
    const fetchCountries = async () => {
      setLoading(true); // ⏳ загрузка басталды

      try {
        const data = await getAllCountries();

        // 📦 data state-қа сақтаймыз
        setCountries(data);
      } catch {
        // ❗ error болса — сақтаймыз
        setError("Failed to load countries");
      } finally {
        // 🔄 қандай жағдай болса да loading өшеді
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // 🧠 UI логика (state-қа байланысты өзгереді)
  if (loading) return <SkeletonList />;
  if (error) return <p className="error">{error}</p>;

  return (
  <div>
    <h1>Explore Countries</h1>

    {/* 🔍 search */}
    <SearchBar onSearch={setSearch} />

    {/* 🌍 filters */}
    <RegionFilter value={region} onChange={setRegion} />
    <PopulationFilter value={sort} onChange={setSort} />

    {/* 📦 result */}
    <CountryList countries={filteredCountries} />
  </div>
);
}

export default Explore;
