import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
// import "../styles/AuthPages.css";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);  // ✅ new state
  const { register } = useContext(AuthContext);
  const n = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await register(fullName, email, password, isAdmin); // pass isAdmin
    alert("Registered! Please login.");
    n("/login");
  };

  return (
    <form onSubmit={submit} className="auth-form">
      <h2>Register</h2>
      <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      
      {/* Admin Checkbox */}
     <div style={{ margin: "10px 0", display: "flex", alignItems: "center", gap: "10px" }}>
  <label style={{ display: "flex", alignItems: "center", color: "#fff", fontSize: "1rem" }}>
    <input
      type="checkbox"
      checked={isAdmin}
      onChange={e => setIsAdmin(e.target.checked)}
      style={{
        width: "18px",
        height: "18px",
        marginRight: "10px",
        accentColor: "#ffd700", // Gold checkbox to match your theme
        cursor: "pointer"
      }}
    />
    Register as Admin
  </label>
</div>


      <button className="btn">Register</button>
    </form>
  );
}
