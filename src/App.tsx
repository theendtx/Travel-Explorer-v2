import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

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
  const [favorites, setFavorites] = useState<string[]>([]);

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
        {/* Layout барлық беттерге ортақ */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* 🔥 Explore — favorites алады */}
          <Route
            path="/explore"
            element={
              <Explore
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          {/* 🔥 Favorites — тек favorites list алады */}
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} />}
          />

          <Route path="/trips" element={<Trips />} />

          <Route path="/country/:name" element={<CountryDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;