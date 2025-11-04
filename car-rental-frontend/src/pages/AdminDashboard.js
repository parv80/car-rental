import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api, { setAuthToken } from "../api";
import { AuthContext } from "../auth/AuthProvider";
// import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.token) return;

    setAuthToken(user.token);

    const fetchData = async () => {
      try {
        // Fetch stats
        const statsRes = await api.get("/admin/stats");
        setStats(statsRes.data);

        // Fetch admin-specific cars
        const carsRes = await api.get("/admin/my-cars");
        setCars(carsRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Cars: {stats.totalCars || 0}</p>
      <p>Total Bookings: {stats.totalBookings || 0}</p>

      <h3>Your Cars</h3>
      {cars.length > 0 ? (
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              {car.make} {car.model} - {car.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cars added yet.</p>
      )}

      <Link to="/admin/my-cars" className="btn">
        Manage Cars
      </Link>
    </div>
  );
}
