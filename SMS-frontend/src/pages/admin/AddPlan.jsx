import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlansContext } from "../../context/PlansContext";

export default function AddPlan() {
  const { plans, setPlans } = useContext(PlansContext);
  const [plan, setPlan] = useState({
    name: "",
    description: "",
    price: "",
    dataQuota: "",
    duration: "",
    isActive: true,
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlan = {
      id: plans.length + 1,
      ...plan,
      price: Number(plan.price),
      dataQuota: Number(plan.dataQuota),
      duration: Number(plan.duration),
      createdAt: new Date(),
    };

    setPlans([...plans, newPlan]); // ✅ Adds to global plans list
    setPlan({
      name: "",
      description: "",
      price: "",
      dataQuota: "",
      duration: "",
      isActive: true,
    });
    navigate("/admin/dashboard"); // redirect to dashboard
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Plan Name"
          value={plan.name}
          onChange={(e) => setPlan({ ...plan, name: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={plan.description}
          onChange={(e) => setPlan({ ...plan, description: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={plan.price}
          onChange={(e) => setPlan({ ...plan, price: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Data Quota (GB)"
          value={plan.dataQuota}
          onChange={(e) => setPlan({ ...plan, dataQuota: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Validity (Days)"
          value={plan.duration}
          onChange={(e) => setPlan({ ...plan, duration: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <select
          value={plan.isActive}
          onChange={(e) =>
            setPlan({ ...plan, isActive: e.target.value === "true" })
          }
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
        >
          Add Plan
        </button>
      </form>
    </div>
  );
}
