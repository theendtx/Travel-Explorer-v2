import { useState, useEffect } from "react";

function Trips() {
  const [tripName, setTripName] = useState("");
  const [country, setCountry] = useState("");
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [trips, setTrips] = useState<any[]>(() => {
    const saved = localStorage.getItem("trips");
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
  localStorage.setItem("trips", JSON.stringify(trips));
}, [trips]);



  const handleDelete = (id: number) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  const handleEdit = (trip: any) => {
    setTripName(trip.tripName);
    setCountry(trip.country);
    setEditingId(trip.id);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (editingId) {
      setTrips((prev) =>
      prev.map((trip) =>
      trip.id === editingId
    ? { ...trip, tripName, country }
  : trip
)
);
   setEditingId(null);
    } else {
      const newTrip = {
        id: Date.now(),
        tripName,
        country,
      };

      setTrips((prev) => [...prev, newTrip]);
    }


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

            <button onClick={() => handleEdit(trip)}>
              Edit
            </button>

            <button onClick={() => handleDelete(trip.id)}>
              Delete
            </button>
        </div>
        ))}
    </div> 

    
    </div> 
  );
}

export default Trips;