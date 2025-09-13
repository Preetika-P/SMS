import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/admin/Dashboard";
import AddPlan from "./pages/admin/AddPlan";
import Analytics from "./pages/admin/Analytics";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-plan" element={<AddPlan />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/customer/login" element={<Login/>} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
