import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCarsPage from "./pages/AdminCarsPage";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<ListingPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User protected routes */}
          <Route
            path="/book/:carId"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/confirmation"
            element={
              <PrivateRoute>
                <ConfirmationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />

          {/* Admin protected routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/my-cars"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminCarsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
