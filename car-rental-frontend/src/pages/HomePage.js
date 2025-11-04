import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatISO } from "date-fns";
// import "../styles/HomePage.css";

export default function HomePage() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="home-hero">
      <h1>Find & Book Cars</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="City or location" />
        <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
        <button className="btn">Search</button>
      </form>
    </div>
  );
}
