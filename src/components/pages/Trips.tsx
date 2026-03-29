import { useEffect, useState, type FormEvent } from "react";
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
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem("trips");
    return saved ? JSON.parse(saved) : [];
  });

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
    setEditingId(trip.id);
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

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          disabled={countriesLoading || !!countriesError}
        >
          <option value="">
            {countriesLoading
              ? "Loading countries..."
              : countriesError
                ? "Countries unavailable"
                : "Select country"}
          </option>

          {countries.map((item) => (
            <option key={item.cca3} value={item.name.common}>
              {item.name.common}
            </option>
          ))}
        </select>

        <button type="submit" className="button-primary" disabled={countriesLoading || !!countriesError}>
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
