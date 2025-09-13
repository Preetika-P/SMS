// pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ users }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!users || users.length === 0) {
      setError("User data not loaded yet.");
      return;
    }

    // ✅ Match username and email from Excel data
    const user = users.find(
      (u) =>
        String(u.username).toLowerCase() === username.toLowerCase() &&
        String(u.email).toLowerCase() === email.toLowerCase()
    );

    if (user) {
      console.log("Login success:", user);
      navigate("/customer/dashboard", { state: { user } });
    } else {
      setError("Invalid username or email");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 mb-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-orange-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;