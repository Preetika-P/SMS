import { createContext, useState } from "react";

export const PlansContext = createContext();

export function PlansProvider({ children }) {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      description: "Good for individuals",
      price: 499,
      dataQuota: 100,
      duration: 30,
      isActive: true,
      createdAt: new Date("2025-09-02"),
    },
    {
      id: 2,
      name: "Premium Plan",
      description: "Best for small teams",
      price: 999,
      dataQuota: 500,
      duration: 90,
      isActive: true,
      createdAt: new Date("2025-08-20"),
    },
    {
      id: 3,
      name: "Enterprise Plan",
      description: "Unlimited for companies",
      price: 2999,
      dataQuota: 2000,
      duration: 365,
      isActive: false,
      createdAt: new Date("2024-11-15"),
    },
  ]);

  return (
    <PlansContext.Provider value={{ plans, setPlans }}>
      {children}
    </PlansContext.Provider>
  );
}
