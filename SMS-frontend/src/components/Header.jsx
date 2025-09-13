import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import logo from "../assets/logo.svg";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith("/admin");
  const isCustomer = location.pathname.startsWith("/customer/dashboard");

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    navigate("/"); // back to landing
  };

  const handleCustomerLogout = () => {
    localStorage.removeItem("customerToken");
    sessionStorage.removeItem("customerToken");
    navigate("/"); // back to landing
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo + Brand */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-orange-600">
          Subscription Portal
        </span>
      </div>

      {/* Admin Navigation */}
      {isAdmin && (
        <div className="flex items-center space-x-8">
          <nav className="flex space-x-6 text-gray-700 font-medium">
            <Link to="/admin/dashboard" className="hover:text-orange-600">
              Dashboard
            </Link>
            <Link to="/admin/add-plan" className="hover:text-orange-600">
              Add Plan
            </Link>
            <Link to="/admin/analytics" className="hover:text-orange-600">
              Analytics
            </Link>
          </nav>

          <div className="flex items-center space-x-2 text-gray-700 font-medium">
            <FaUserShield className="text-orange-600 w-5 h-5" />
            <span>Hi! Admin</span>
          </div>

          <button
            onClick={handleAdminLogout}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* Customer Logout */}
      {isCustomer && (
        <div>
          <button
            onClick={handleCustomerLogout}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
