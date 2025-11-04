import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../auth/AuthProvider";
// import "../styles/UserDashboard.css";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(()=> {
    if (user) {
      api.get("/bookings/my").then(r => setBookings(r.data));
    }
  }, [user]);

  return (
    <div>
      <h2>My Bookings</h2>
      <div>
        {bookings.map(b => (
          <div key={b.id} className="booking-card">
            <h4>{b.car.make} {b.car.model}</h4>
            <p>{b.startDate} → {b.endDate}</p>
            <p>₹{b.totalAmount} • {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
