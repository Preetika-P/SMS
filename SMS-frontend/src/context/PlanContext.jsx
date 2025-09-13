// src/context/PlanContext.jsx
import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([
    { id: 1, name: "Basic Plan", price: "₹499", quota: "100GB" },
    { id: 2, name: "Premium Plan", price: "₹999", quota: "500GB" },
  ]);

  return (
    <PlanContext.Provider value={{ plans, setPlans }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlans = () => useContext(PlanContext);
