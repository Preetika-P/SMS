import { useState } from "react";

export default function Dashboard() {
  const [plans, setPlans] = useState([
    { id: 1, name: "Basic Plan", price: "₹499", quota: "100GB" },
    { id: 2, name: "Premium Plan", price: "₹999", quota: "500GB" },
  ]);

  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", quota: "" });

  const handleDelete = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan.id);
    setFormData({ name: plan.name, price: plan.price, quota: plan.quota });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setPlans(
      plans.map((plan) =>
        plan.id === editingPlan ? { ...plan, ...formData } : plan
      )
    );
    setEditingPlan(null);
    setFormData({ name: "", price: "", quota: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      <div className="grid gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            {editingPlan === plan.id ? (
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full"
                />
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full"
                />
                <input
                  type="text"
                  value={formData.quota}
                  onChange={(e) =>
                    setFormData({ ...formData, quota: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full"
                />
                <div className="space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPlan(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{plan.name}</h2>
                  <p className="text-gray-600">
                    {plan.price} | {plan.quota}
                  </p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
