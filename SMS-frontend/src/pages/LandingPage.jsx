// import { Link } from "react-router-dom";
// import { FaUserShield, FaUsers } from "react-icons/fa";

// export default function LandingPage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold text-gray-800 mb-10">
//         Welcome to Subscription Portal
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Admin Card */}
//         <Link
//           to="/admin/dashboard"
//           className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition"
//         >
//           <FaUserShield className="text-orange-600 text-6xl mb-4" />
//           <h2 className="text-xl font-semibold text-gray-700">Admin</h2>
//         </Link>

//         {/* Customer Card */}
//         <Link
//           to="/customer/dashboard"
//           className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition"
//         >
//           <FaUsers className="text-orange-600 text-6xl mb-4" />
//           <h2 className="text-xl font-semibold text-gray-700">Customer</h2>
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { FaUserShield, FaUsers } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Welcome to Subscription Portal
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Admin Card */}
        <Link
          to="/admin/dashboard"
          className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition"
        >
          <FaUserShield className="text-orange-600 text-6xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Admin</h2>
        </Link>

        {/* Customer Card */}
        <Link
          to="/customer/login"
          className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition"
        >
          <FaUsers className="text-orange-600 text-6xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Customer</h2>
        </Link>
      </div>
    </div>
  );
}
