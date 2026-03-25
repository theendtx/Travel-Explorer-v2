import { useEffect, useState } from "react";
import { getAllCountries,type Country } from "../services/CountriesApi.ts";
import CountryList from "../CountryList/CountryList.tsx";
import SkeletonList from "../SkeletonList/SkeletonList.tsx";

function Explore() {
  // 📦 3 негізгі state (әрқашан болады)
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      <CountryList countries={countries} />

      {/* 📌 Data-ны экранға шығару */}
      {countries.map((country) => (
        <div key={country.cca3}>
          {/* API structure: country.name.common */}
          <p>{country.name.common}</p>
        </div>
      ))}
    </div>
  );
}

export default Explore;
