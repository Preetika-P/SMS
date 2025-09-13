// import { Link, useLocation } from "react-router-dom";
// import { ReactComponent as Logo } from "../assets/logo.svg";

// export default function Header() {
//   const location = useLocation();
//   const isAdmin = location.pathname.startsWith("/admin");

//   return (
//     <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
//       {/* Logo + Brand */}
//       <div className="flex items-center space-x-2">
//         <Logo className="w-10 h-10 text-orange-600" />
//         <span className="text-xl font-bold text-orange-600">Subscription Portal</span>
//       </div>

//       {/* Navigation only for Admin */}
//       {isAdmin && (
//         <nav className="flex space-x-6 text-gray-700 font-medium">
//           <Link to="/admin/dashboard" className="hover:text-orange-600">
//             Dashboard
//           </Link>
//           <Link to="/admin/add-plan" className="hover:text-orange-600">
//             Add Plan
//           </Link>
//           <Link to="/admin/analytics" className="hover:text-orange-600">
//             Analytics
//           </Link>
//         </nav>
//       )}
//     </header>
//   );
// }
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

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
      )}
    </header>
  );
}
