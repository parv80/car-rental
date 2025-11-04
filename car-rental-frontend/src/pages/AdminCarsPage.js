import React, { useEffect, useState, useContext } from "react";
import api, { setAuthToken } from "../api";
import { AuthContext } from "../auth/AuthProvider";
// import "../styles/AdminCarsPage.css";
export default function AdminCarsPage() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    make: "",
    model: "",
    location: "",
    year: 2022,
    pricePerDay: 0,
    description: "",
    status: "AVAILABLE",
    imageUrl: ""
  });
  const [loading, setLoading] = useState(true);

  // Set auth token for admin requests
  useEffect(() => {
    if (!user?.token) return;
    setAuthToken(user.token);

    const fetchCars = async () => {
      try {
        const res = await api.get("/admin/my-cars");
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  const addCar = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/cars", form);
      setForm({
        make: "",
        model: "",
        location: "",
        year: 2022,
        pricePerDay: 0,
        description: "",
        status: "AVAILABLE",
        imageUrl: ""
      });
      // Refresh car list
      const res = await api.get("/admin/my-cars");
      setCars(res.data);
    } catch (err) {
      console.error("Error adding car:", err);
      alert("Failed to add car. Make sure you are an admin.");
    }
  };

  const removeCar = async (id) => {
    try {
      await api.delete(`/admin/cars/${id}`);
      setCars((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting car:", err);
      alert("Failed to delete car.");
    }
  };

  if (loading) return <p>Loading your cars...</p>;

  return (
    <div>
      <h2>Manage Your Cars</h2>

      <form onSubmit={addCar}>
        <input
          value={form.make}
          onChange={(e) => setForm({ ...form, make: e.target.value })}
          placeholder="Make"
          required
        />
        <input
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          placeholder="Model"
          required
        />
        <input
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="Location"
          required
        />
        <input
          type="number"
          value={form.pricePerDay}
          onChange={(e) =>
            setForm({ ...form, pricePerDay: parseFloat(e.target.value) })
          }
          placeholder="Price per day"
          required
        />
        <button className="btn">Add</button>
      </form>

      <div className="car-grid">
        {cars.length > 0 ? (
          cars.map((c) => (
            <div className="car-card" key={c.id}>
              <h4>
                {c.make} {c.model}
              </h4>
              <p>₹{c.pricePerDay}</p>
              <p>{c.location}</p>
              <p>Status: {c.status}</p>
              <button className="btn" onClick={() => removeCar(c.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No cars added yet.</p>
        )}
      </div>
    </div>
  );
}
