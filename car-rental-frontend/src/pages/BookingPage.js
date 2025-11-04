import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { formatISO } from "date-fns";
import { AuthContext } from "../auth/AuthProvider";
// import "../styles/BookingPage.css";

export default function BookingPage() {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(()=>{ api.get(`/cars/${carId}`).then(r=>setCar(r.data)); }, [carId]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { carId: parseInt(carId), startDate, endDate };
      const res = await api.post("/bookings/create", payload);
      navigate("/confirmation", { state: { booking: res.data } });
    } catch (err) {
      alert("Booking failed");
    }
  };

  if (!car) return <div>Loading car...</div>;
  return (
    <form onSubmit={submit} className="booking-form">
      <h2>Booking: {car.make} {car.model}</h2>
      <label>Start</label>
      <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} required/>
      <label>End</label>
      <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} required/>
      <button className="btn">Complete Payment (Simulated)</button>
    </form>
  );
}
