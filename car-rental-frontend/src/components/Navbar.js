import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
// import "../styles/Navbar.css";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const n = useNavigate();

  const handleLogout = () => {
    logout();
    n("/");
  };

  const isAdmin = user?.roles?.includes("ADMIN");

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">GoldDrive</Link>
      </div>
      <div className="nav-right">
        <Link to="/search">Search</Link>
        {user ? (
          <>
            {isAdmin ? (
              <Link to="/admin" className="btn-link">Admin Dashboard</Link>
            ) : (
              <Link to="/dashboard" className="btn-link">{user.fullName}</Link>
            )}
            <button onClick={handleLogout} className="btn-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
