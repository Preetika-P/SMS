import React, { useState } from "react";
import "./Login.css"; // optional external CSS file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Add login logic here (API call, validation, etc.)
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          {/* <span role="img" aria-label="crown">
            👑
          </span> */}
        </div>
        <h2 className="title">Lumen Quest 2.0</h2>
        <p className="subtitle">Welcome back to your subscription portal</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
