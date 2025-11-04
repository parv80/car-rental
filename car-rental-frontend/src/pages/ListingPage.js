import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import CarCard from "../components/CarCard";
// import "../styles/ListingPage.css";

export default function ListingPage() {
  const [cars, setCars] = useState([]);
  const [params] = useSearchParams();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetch = async () => {
    const q = {};
    if (params.get("location")) q.location = params.get("location");
    if (minPrice) q.minPrice = minPrice;
    if (maxPrice) q.maxPrice = maxPrice;
    const res = await api.get("/cars", { params: q });
    setCars(res.data);
  };

  useEffect(()=>{ fetch(); }, [params, minPrice, maxPrice]);

  return (
    <div>
      <h2>Available Cars</h2>
      <div className="filters">
        <input placeholder="min price" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
        <input placeholder="max price" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
      </div>
      <div className="car-grid">
        {cars.map(c => <CarCard key={c.id} car={c} />)}
      </div>
    </div>
  );
}
