import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./components/Layout/Layout";
import Home from "./components/pages/Home";
import Explore from "./components/pages/Explore";
import Favorites from "./components/pages/Favorites";
import Trips from "./components/pages/Trips";
import CountryDetails from "./components/pages/CountryDetails";

function App() {
  /**
   * ❤️ GLOBAL STATE
   * Барлық беттерге ортақ favorites
   */
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * ❤️ Toggle функция
   * бар болса → remove
   * жоқ болса → add
   */
  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/explore"
            element={
              <Explore
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route path="/trips" element={<Trips />} />

          <Route path="/country/:name" element={<CountryDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;