import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./components/pages/Home";
import Explore from "./components/pages/Explore";
import Favorites from "./components/pages/Favorites";
import Trips from "./components/pages/Trips";
import CountryDetails from "./components/pages/CountryDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/country/:name" element={<CountryDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
     );
}

export default App;