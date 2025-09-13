import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.includes("@")) {
      alert("Invalid email format");
      return;
    }

    const expectedPassword = username.split("@")[0]; // part before @

    if (password === expectedPassword) {
      // ✅ Login success → go to customer dashboard
      navigate("/customer/dashboard");
    } else {
      // ❌ Wrong password
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Lumen Quest 2.0</h2>
        <p className="text-gray-600 mb-6">Welcome back to your subscription portal</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
