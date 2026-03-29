import { useState } from "react";

function Trips() {
  const [tripName, setTripName] = useState("");
  const [country, setCountry] = useState("");

  const [trips, setTrips] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!tripName || !country) return;

    const newTrip = {
      id: Date.now(),
      tripName,
      country,
    };

    setTrips((prev) => [...prev, newTrip]);

    setTripName("");
    setCountry("");
  }
  return (
    <div>
      <h1>Create Trip</h1>

      <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Trip name"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        />

        <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select country</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Japan">Japan</option>
          <option value="USA">USA</option>
        </select>

        <button type="submit">Create</button>
      </form>

      <div>
        {trips.map((trip) =>(
          <div key={trip.id}>
            <h3>{trip.tripName}</h3>
            <p>{trip.country}</p>
        </div>
        ))}
    </div> 

    
    </div> 
  );
}

export default Trips;