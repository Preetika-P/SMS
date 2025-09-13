// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/admin/Dashboard";
import AddPlan from "./pages/admin/AddPlan";
import Analytics from "./pages/admin/Analytics";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import Header from "./components/Header";
import Login from "./pages/Login.jsx";
import { useState } from "react";

function App() {
  const [userRole, setUserRole] = useState(null); // 'admin' or 'customer'

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login setUserRole={setUserRole} />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={userRole === "admin" ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/add-plan"
          element={userRole === "admin" ? <AddPlan /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/analytics"
          element={userRole === "admin" ? <Analytics /> : <Navigate to="/" />}
        />

        {/* Customer routes */}
        <Route
          path="/customer/dashboard"
          element={userRole === "customer" ? <CustomerDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/customer/login"
          element={<Login setUserRole={setUserRole} />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;