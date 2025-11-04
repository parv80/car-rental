import React from "react";
import "../styles/CarCard.css";
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.imageUrl || "https://placehold.co/400x200"} alt={`${car.make} ${car.model}`} />
      <div className="car-card-body">
        <h3>{car.make} {car.model}</h3>
        <p>{car.location} • {car.year}</p>
        <p>₹{car.pricePerDay}/day</p>
        <Link to={`/cars/${car.id}`} className="btn">View</Link>
      </div>
    </div>
  );
}
