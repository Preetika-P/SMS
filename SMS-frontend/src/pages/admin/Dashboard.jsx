import { useContext, useState } from "react";
import { PlansContext } from "../../context/PlansContext";

export default function Dashboard() {
  const { plans, setPlans } = useContext(PlansContext); // ✅ use global plans
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dataQuota: "",
    duration: "",
    price: "",
    isActive: true,
  });

  // ---- Handlers ----
  const handleEdit = (plan) => {
    setEditingPlanId(plan.id);
    setFormData({
      name: plan.name,
      dataQuota: plan.dataQuota,
      duration: plan.duration,
      price: plan.price,
      isActive: plan.isActive,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setPlans(
      plans.map((plan) =>
        plan.id === editingPlanId ? { ...plan, ...formData } : plan
      )
    );
    setEditingPlanId(null);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  // ---- Top Plans Helper ----
  const getTopPlans = (range) => {
    const now = new Date();
    let startDate, endDate;

    if (range === "recentMonth") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (range === "pastMonth") {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
    } else if (range === "year") {
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      endDate = now;
    }

    return plans
      .filter(
        (plan) =>
          new Date(plan.createdAt) >= startDate &&
          new Date(plan.createdAt) <= endDate
      )
      .sort((a, b) => b.price - a.price)
      .slice(0, 3);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* All Plans Button at Top */}
      <div className="mb-10">
        <button
          onClick={() => setShowAllPlans(!showAllPlans)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showAllPlans ? "Hide All Plans" : "View All Plans"}
        </button>

        {showAllPlans && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 All Plans</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">Type</th>
                  <th className="border px-4 py-2 text-left">Data (GB)</th>
                  <th className="border px-4 py-2 text-left">Validity (Days)</th>
                  <th className="border px-4 py-2 text-left">Amount (₹)</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    {editingPlanId === plan.id ? (
                      <>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="number"
                            value={formData.dataQuota}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                dataQuota: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="number"
                            value={formData.duration}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                duration: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                              setFormData({ ...formData, price: e.target.value })
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <select
                            value={formData.isActive}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                isActive: e.target.value === "true",
                              })
                            }
                            className="border rounded px-2 py-1 w-full"
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        </td>
                        <td className="border px-4 py-2 space-x-2">
                          <button
                            onClick={handleUpdate}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPlanId(null)}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border px-4 py-2">{plan.name}</td>
                        <td className="border px-4 py-2">{plan.dataQuota}</td>
                        <td className="border px-4 py-2">{plan.duration}</td>
                        <td className="border px-4 py-2">{plan.price}</td>
                        <td
                          className={`border px-4 py-2 ${
                            plan.isActive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {plan.isActive ? "Active" : "Inactive"}
                        </td>
                        <td className="border px-4 py-2 space-x-2">
                          <button
                            onClick={() => handleEdit(plan)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(plan.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Top Plans Section */}
      <div className="space-y-8">
        <TopPlansSection
          title="📅 Top Plans - This Month"
          plans={getTopPlans("recentMonth")}
        />
        <TopPlansSection
          title="📅 Top Plans - Last Month"
          plans={getTopPlans("pastMonth")}
        />
        <TopPlansSection
          title="📅 Top Plans - Last 12 Months"
          plans={getTopPlans("year")}
        />
      </div>
    </div>
  );
}

// ---- Top Plans Cards Section ----
function TopPlansSection({ title, plans }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-gray-500">{plan.description}</p>
              <p className="text-gray-700 font-medium mt-1">
                ₹{plan.price} | {plan.dataQuota}GB | {plan.duration} days
              </p>
              <p
                className={`text-sm mt-1 ${
                  plan.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {plan.isActive ? "Active" : "Inactive"}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(plan.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No plans available.</p>
        )}
      </div>
    </div>
  );
}

