import React from "react";
import { useLocation } from "react-router-dom";
// import "../styles/ConfirmationPage.css";

export default function ConfirmationPage() {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) return <div>No booking found</div>;
  return (
    <div>
      <h2>Booking Confirmed</h2>
      <p>Booking ID: {booking.id}</p>
      <p>Car: {booking.car.make} {booking.car.model}</p>
      <p>From: {booking.startDate} To: {booking.endDate}</p>
      <p>Total: ₹{booking.totalAmount}</p>
      <p>Payment Ref: {booking.paymentReference}</p>
    </div>
  );
}
