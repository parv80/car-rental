import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
// import "../styles/AuthPages.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const n = useNavigate();

 const submit = async (e) => {
  e.preventDefault();
  try {
    const u = await login(email, password);

    // Redirect admin to /admin, user to /
    if (u.roles.includes("ADMIN")) {
      n("/admin");
    } else {
      n("/");
    }
  } catch (err) {
    alert("Login failed");
  }
};


  return (
    <form onSubmit={submit} className="auth-form">
      <h2>Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button className="btn">Login</button>
    </form>
  );
}
