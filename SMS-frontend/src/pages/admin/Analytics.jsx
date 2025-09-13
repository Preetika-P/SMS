import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const analyticsData = [
  { name: 'Jan', active: 400, cancelled: 240, upgraded: 50, downgraded: 20 },
  { name: 'Feb', active: 300, cancelled: 139, upgraded: 40, downgraded: 15 },
  { name: 'Mar', active: 450, cancelled: 380, upgraded: 70, downgraded: 25 },
  { name: 'Apr', active: 278, cancelled: 390, upgraded: 60, downgraded: 30 },
  { name: 'May', active: 589, cancelled: 480, upgraded: 90, downgraded: 40 },
  { name: 'Jun', active: 390, cancelled: 380, upgraded: 80, downgraded: 35 },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-8">
      {/* Row 1 - Active vs Cancelled */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Active vs Cancelled Subscriptions
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="active" fill="#34D399" name="Active" />
            <Bar dataKey="cancelled" fill="#F87171" name="Cancelled" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Row 2 - Upgraded & Downgraded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upgraded */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upgraded Subscriptions
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="upgraded" fill="#60A5FA" name="Upgraded" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Downgraded */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Downgraded Subscriptions
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="downgraded" fill="#FBBF24" name="Downgraded" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
