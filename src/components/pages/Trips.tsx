import { useDeferredValue, useEffect, useState, type FormEvent } from "react";
import { getAllCountries, type Country } from "../services/CountriesApi";

type Trip = {
  id: number;
  tripName: string;
  country: string;
};

function Trips() {
  const [tripName, setTripName] = useState("");
  const [country, setCountry] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [countriesError, setCountriesError] = useState<string | null>(null);
  const [countrySearch, setCountrySearch] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem("trips");
    return saved ? JSON.parse(saved) : [];
  });
  const deferredCountrySearch = useDeferredValue(countrySearch);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    const fetchCountries = async () => {
      setCountriesLoading(true);

      try {
        const data = await getAllCountries();
        const sortedCountries = [...data].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedCountries);
      } catch {
        setCountriesError("Failed to load countries");
      } finally {
        setCountriesLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleDelete = (id: number) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  const handleEdit = (trip: Trip) => {
    setTripName(trip.tripName);
    setCountry(trip.country);
    setCountrySearch(trip.country);
    setEditingId(trip.id);
  };

  const filteredCountries = countries
    .filter((item) =>
      item.name.common.toLowerCase().includes(deferredCountrySearch.toLowerCase())
    )
    .slice(0, 8);

  const handleSelectCountry = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setCountrySearch(selectedCountry);
    setIsPickerOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === editingId ? { ...trip, tripName, country } : trip
        )
      );
      setEditingId(null);
    } else {
      setTrips((prev) => [
        ...prev,
        {
          id: Date.now(),
          tripName,
          country,
        },
      ]);
    }

    setTripName("");
    setCountry("");
    setCountrySearch("");
  };

  return (
    <section className="page trips-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Trips</span>
          <h1>Shape your next itinerary.</h1>
          <p>Create simple travel plans and choose from any available country.</p>
        </div>
        <div className="results-pill">{trips.length} plans</div>
      </div>

      <form onSubmit={handleSubmit} className="trip-form">
        <input
          type="text"
          placeholder="Trip name"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          required
        />

        <div className="country-picker">
          <input
            type="text"
            className="country-picker__input"
            placeholder={
              countriesLoading
                ? "Loading countries..."
                : countriesError
                  ? "Countries unavailable"
                  : "Search country"
            }
            value={countrySearch}
            onFocus={() => setIsPickerOpen(true)}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setCountry("");
              setIsPickerOpen(true);
            }}
            onBlur={() => {
              window.setTimeout(() => {
                setIsPickerOpen(false);

                if (!country && countrySearch) {
                  setCountrySearch("");
                }
              }, 120);
            }}
            disabled={countriesLoading || !!countriesError}
          />

          <div className="country-picker__meta">
            {country
              ? `Selected: ${country}`
              : countriesLoading
                ? "Loading destination list..."
                : "Type to search from all countries"}
          </div>

          {isPickerOpen && !countriesLoading && !countriesError && (
            <div className="country-picker__menu">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((item) => (
                  <button
                    key={item.cca3}
                    type="button"
                    className="country-picker__option"
                    onMouseDown={() => handleSelectCountry(item.name.common)}
                  >
                    <span>{item.name.common}</span>
                    <small>{item.region || "Region"}</small>
                  </button>
                ))
              ) : (
                <div className="country-picker__empty">No matching countries</div>
              )}
            </div>
          )}
        </div>

        <button type="submit" className="button-primary" disabled={countriesLoading || !!countriesError || !country}>
          {editingId ? "Update trip" : "Create trip"}
        </button>
      </form>

      {countriesError ? <p className="error">{countriesError}</p> : null}

      <div className="trip-grid">
        {trips.length === 0 ? (
          <div className="empty-state">
            <h2>No trips created yet</h2>
            <p>Pick any country from the list above and start planning.</p>
          </div>
        ) : (
          trips.map((trip) => (
            <article key={trip.id} className="trip-card">
              <h3>{trip.tripName}</h3>
              <p>{trip.country}</p>

              <div className="trip-card__actions">
                <button type="button" className="button-secondary" onClick={() => handleEdit(trip)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => handleDelete(trip.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Trips;
