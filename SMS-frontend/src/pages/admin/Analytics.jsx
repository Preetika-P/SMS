// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const analyticsData = [
//   { name: 'Jan', active: 400, cancelled: 240, upgraded: 50, downgraded: 20 },
//   { name: 'Feb', active: 300, cancelled: 139, upgraded: 40, downgraded: 15 },
//   { name: 'Mar', active: 450, cancelled: 380, upgraded: 70, downgraded: 25 },
//   { name: 'Apr', active: 278, cancelled: 390, upgraded: 60, downgraded: 30 },
//   { name: 'May', active: 589, cancelled: 480, upgraded: 90, downgraded: 40 },
//   { name: 'Jun', active: 390, cancelled: 380, upgraded: 80, downgraded: 35 },
// ];

// export default function Analytics() {
//   return (
//     <div className="p-6 space-y-8">
//       {/* Row 1 - Active vs Cancelled */}
//       <div className="bg-white p-4 rounded-2xl shadow-md">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Active vs Cancelled Subscriptions
//         </h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={analyticsData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="active" fill="#34D399" name="Active" />
//             <Bar dataKey="cancelled" fill="#F87171" name="Cancelled" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Row 2 - Upgraded & Downgraded */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Upgraded */}
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Upgraded Subscriptions
//           </h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={analyticsData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="upgraded" fill="#60A5FA" name="Upgraded" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Downgraded */}
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Downgraded Subscriptions
//           </h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={analyticsData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="downgraded" fill="#FBBF24" name="Downgraded" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// 

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- Mock Data ---
const analyticsData = [
    { name: 'Jan', active: 400, cancelled: 240, upgraded: 50, downgraded: 20 },
    { name: 'Feb', active: 300, cancelled: 139, upgraded: 40, downgraded: 15 },
    { name: 'Mar', active: 450, cancelled: 380, upgraded: 70, downgraded: 25 },
    { name: 'Apr', active: 278, cancelled: 390, upgraded: 60, downgraded: 30 },
    { name: 'May', active: 589, cancelled: 480, upgraded: 90, downgraded: 40 },
    { name: 'Jun', active: 390, cancelled: 380, upgraded: 80, downgraded: 35 },
];

const planAnalyticsData = [
  { name: 'Fibernet Basic', subscribers: 1250 },
  { name: 'Fibernet Pro', subscribers: 850 },
  { name: 'Fibernet Ultra', subscribers: 450 },
  { name: 'Copper Essentials', subscribers: 600 },
  { name: 'Copper Plus', subscribers: 750 },
];

const PIE_CHART_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];

// --- Analytics Component ---
export default function AnalyticsPage() {
    return (
        <div className="p-4 md:p-8 space-y-8 bg-gray-100">
            <h2 className="text-4xl font-bold text-gray-800 text-center">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Subscription Trends Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Subscription Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}/>
                            <Legend />
                            <Bar dataKey="active" fill="#4f46e5" name="Active" />
                            <Bar dataKey="cancelled" fill="#ef4444" name="Cancellations" />
                            <Bar dataKey="upgraded" fill="#22c55e" name="Upgrades" />
                            <Bar dataKey="downgraded" fill="#f97316" name="Downgrades" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Subscriptions by Plan Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Subscriptions by Plan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={planAnalyticsData} dataKey="subscribers" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {planAnalyticsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
