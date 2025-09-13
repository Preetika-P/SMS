import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import logo from "../assets/logo.svg";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); 
    sessionStorage.removeItem("adminToken");

    // Redirect to landing page
    navigate("/");
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

      {/* Navigation only for Admin */}
      {isAdmin && (
        <div className="flex items-center space-x-8">
          {/* Nav Links */}
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

          {/* Hi! Admin + Icon */}
          <div className="flex items-center space-x-2 text-gray-700 font-medium">
            <FaUserShield className="text-orange-600 w-5 h-5" />
            <span>Hi! Admin</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
