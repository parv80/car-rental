import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
// import "../styles/CarDetailsPage.css";

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(()=>{
    api.get(`/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h2>{car.make} {car.model}</h2>
      <img src={car.imageUrl} style={{maxWidth:600}} />
      <p>{car.description}</p>
      <p>Location: {car.location}</p>
      <p>Price per day: ₹{car.pricePerDay}</p>
      <Link to={`/book/${car.id}`} className="btn">Book Now</Link>
    </div>
  );
}
