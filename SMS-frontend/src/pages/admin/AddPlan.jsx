import { useState} from "react";
import { useNavigate } from 'react-router-dom';

export default function AddPlan() {
  const [plan, setPlan] = useState({ name: "", price: "", quota: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Plan Added: ${plan.name} - ${plan.price} - ${plan.quota}`);
    setPlan({ name: "", price: "", quota: "" });
    navigate('/admin/dashboard');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Plan Name"
          value={plan.name}
          onChange={(e) => setPlan({ ...plan, name: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Price"
          value={plan.price}
          onChange={(e) => setPlan({ ...plan, price: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Quota"
          value={plan.quota}
          onChange={(e) => setPlan({ ...plan, quota: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
        />
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
