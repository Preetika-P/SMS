import React, { useState, useEffect } from "react";
import { Users, Package, XCircle, RefreshCw, Bell } from "lucide-react";
 
// --- Global CSS for new components ---
const GlobalStyles = () => (
  <style>{`
    .notification-list {
      list-style: none;
      padding: 0;
      max-height: 100%;
      overflow-y: auto;
    }
    .notification-item {
      padding: 14px 16px;
      border-left: 5px solid #3498db;
      background-color: #f8fafc;
      margin-bottom: 15px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .notification-item:hover {
      background-color: #f1f5f9;
      transform: translateX(5px);
    }
    .notification-item.subscribe, .notification-item.upgrade {
      border-left-color: #ea580c; /* orange-600 */
    }
    .notification-item.downgrade {
      border-left-color: #f97316; /* orange-500 */
    }
    .notification-item.renew {
      border-left-color: #c2410c; /* orange-700 */
    }
    .notification-item.cancel {
      border-left-color: #dc2626; /* red-600 */
    }
    .message {
      font-weight: 600;
      color: #2c3e50;
    }
    .date {
      font-size: 0.85rem;
      color: #7f8c8d;
      margin-top: 6px;
    }
    .empty {
      text-align: center;
      color: #999;
      padding: 20px;
    }
 
    /* Notification Panel Styles */
    .notification-panel-overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 100;
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    }
    .notification-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      height: 100%;
      background-color: white;
      box-shadow: -5px 0 25px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      animation: slideInRight 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .notification-panel-header {
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e7eb;
    }
    .notification-panel-header h3 {
        font-size: 1.25rem;
        font-weight: bold;
        color: #111827;
    }
    .notification-panel-header button {
        font-size: 1.75rem;
        font-weight: bold;
        line-height: 1;
        background: none;
        border: none;
        cursor: pointer;
        color: #6b7280;
        transition: color 0.2s;
    }
    .notification-panel-header button:hover {
        color: #111827;
    }
    .notification-panel .notification-list {
        padding: 1.5rem;
    }
  `}</style>
);
 
// --- Mock Data ---
const initialPlans = [
  { id: 1, name: "Fibernet Basic", product: "Fibernet", price: 29.99, quota: "100 GB", speed: "50 Mbps", active: true },
  { id: 2, name: "Fibernet Pro", product: "Fibernet", price: 49.99, quota: "500 GB", speed: "200 Mbps", active: true },
  { id: 3, name: "Fibernet Ultra", product: "Fibernet", price: 79.99, quota: "Unlimited", speed: "1 Gbps", active: true },
  { id: 4, name: "Copper Essentials", product: "Broadband Copper", price: 19.99, quota: "50 GB", speed: "25 Mbps", active: true },
  { id: 5, name: "Copper Plus", product: "Broadband Copper", price: 34.99, quota: "200 GB", speed: "75 Mbps", active: true },
];
 
// --- Helper Functions ---
const getFutureDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};
 
// --- Components ---
 
const NotificationPanel = ({ notifications, onClose }) => (
    <div className="notification-panel-overlay" onClick={onClose}>
        <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
            <div className="notification-panel-header">
                <h3>Notifications</h3>
                <button onClick={onClose}>&times;</button>
            </div>
            <div className="notification-list">
                {notifications.length === 0 ? (
                    <p className="empty">No notifications yet.</p>
                ) : (
                    notifications.map((n) => (
                        <li key={n.id} className={`notification-item ${n.type}`}>
                            <div className="message">{n.message}</div>
                            <div className="date">{n.date}</div>
                        </li>
                    ))
                )}
            </div>
        </div>
    </div>
);
 
const PlanCard = ({ plan, onAction, userSubscription }) => {
  const isCurrentUserPlan = userSubscription?.plan.id === plan.id;
  let buttonText = "Subscribe";
  let buttonDisabled = false;
 
  if (userSubscription) {
    if (isCurrentUserPlan) {
      buttonText = "Current Plan";
      buttonDisabled = true;
    } else if (plan.price > userSubscription.plan.price) {
      buttonText = "Upgrade";
    } else if (plan.price < userSubscription.plan.price) {
      buttonText = "Downgrade";
    } else {
      buttonText = "Switch Plan";
    }
  }
 
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
        isCurrentUserPlan ? "bg-orange-600 text-white" : "bg-white"
      }`}
    >
      <h3 className={`text-2xl font-bold mb-2 ${isCurrentUserPlan ? "text-white" : "text-gray-800"}`}>
        {plan.name}
      </h3>
      <p className={`text-sm font-semibold mb-4 ${isCurrentUserPlan ? "text-orange-200" : "text-orange-500"}`}>
        {plan.product}
      </p>
      <div className="my-4">
        <span className={`text-4xl font-extrabold ${isCurrentUserPlan ? "text-white" : "text-gray-900"}`}>
          ${plan.price}
        </span>
        <span className={`ml-1 text-lg ${isCurrentUserPlan ? "text-orange-200" : "text-gray-500"}`}>/month</span>
      </div>
      <ul className={`space-y-2 text-md mb-6 ${isCurrentUserPlan ? "text-orange-100" : "text-gray-600"}`}>
        <li className="flex items-center"><Package className="w-5 h-5 mr-2 text-orange-300" /> Data: {plan.quota}</li>
        <li className="flex items-center"><Users className="w-5 h-5 mr-2 text-orange-300" /> Speed: {plan.speed}</li>
      </ul>
      <button
        onClick={() => onAction(plan)}
        disabled={buttonDisabled}
        className={`w-full py-3 px-6 text-lg font-semibold rounded-lg transition-colors duration-300 ${
          isCurrentUserPlan
            ? "bg-white text-orange-600 hover:bg-orange-100"
            : "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};
 
const UserPortal = ({
  plans,
  userSubscription,
  handleSubscribe,
  handleUpgradeDowngrade,
  handleCancel,
  handleRenew,
}) => (
  <div className="p-4 md:p-8">
    {userSubscription && (
      <div className="mb-12 bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Current Subscription</h3>
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg">
          <div>
            <p className="text-xl font-semibold text-orange-600">{userSubscription.plan.name}</p>
            <p className="text-gray-600">
              Expires on: {userSubscription.expiryDate.toLocaleDateString()}
            </p>
          </div>
          <div className="text-2xl font-bold text-gray-800 my-4 md:my-0">
            ${userSubscription.plan.price}/month
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleRenew}
              className="flex items-center bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" /> Renew
            </button>
            <button
              onClick={() => handleCancel(userSubscription.plan.id)}
              className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              <XCircle className="w-5 h-5 mr-2" /> Cancel
            </button>
          </div>
        </div>
      </div>
    )}
 
    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Explore Our Plans</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plans
        .filter((p) => p.active)
        .map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            userSubscription={userSubscription}
            onAction={userSubscription ? handleUpgradeDowngrade : handleSubscribe}
          />
        ))}
    </div>
  </div>
);
 
// --- Main App ---
function App() {
  const [plans] = useState(initialPlans);
  const [userSubscription, setUserSubscription] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
 
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user_notifications");
      if (saved) {
        setNotifications(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to parse notifications", error);
    }
  }, []);
 
  useEffect(() => {
    localStorage.setItem("user_notifications", JSON.stringify(notifications));
  }, [notifications]);
 
  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      message,
      date: new Date().toLocaleString(),
      type,
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };
 
  const handleBellClick = () => {
    setShowNotificationPanel(true);
    setNotifications(prevNotifications =>
        prevNotifications.map(n => ({...n, read: true}))
    );
  };
 
  const handleSubscribe = (plan) => {
    setUserSubscription({ plan: plan, expiryDate: getFutureDate(30) });
    addNotification("subscribe", `You subscribed to ${plan.name}.`);
  };
 
  const handleUpgradeDowngrade = (newPlan) => {
    const oldPlanName = userSubscription.plan.name;
    const action = newPlan.price > userSubscription.plan.price ? "upgrade" : "downgrade";
    setUserSubscription({ plan: newPlan, expiryDate: getFutureDate(30) });
    addNotification(action, `Plan changed from ${oldPlanName} to ${newPlan.name}.`);
  };
 
  const handleCancel = (planId) => {
    if (userSubscription && userSubscription.plan.id === planId) {
      addNotification("cancel", `Your subscription to ${userSubscription.plan.name} was cancelled.`);
      setUserSubscription(null);
    }
  };
 
  const handleRenew = () => {
    if (userSubscription) {
      const newExpiry = new Date(userSubscription.expiryDate);
      newExpiry.setMonth(newExpiry.getMonth() + 1);
      setUserSubscription({ ...userSubscription, expiryDate: newExpiry });
      addNotification("renew", `Renewed ${userSubscription.plan.name}. New expiry: ${newExpiry.toLocaleDateString()}`);
    }
  };
 
  const unreadCount = notifications.filter(n => !n.read).length;
 
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <GlobalStyles />
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">Lumen Subscriptions</h1>
          </div>
          <div className="relative">
              <button onClick={handleBellClick} className="relative text-gray-600 hover:text-orange-600">
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 &&
                      <span className="absolute -top-2 -right-2 flex h-5 w-5">
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                              {unreadCount}
                          </span>
                      </span>
                  }
              </button>
          </div>
        </nav>
      </header>
 
      <main>
        {showNotificationPanel && <NotificationPanel notifications={notifications} onClose={() => setShowNotificationPanel(false)} />}
        <UserPortal
            plans={plans}
            userSubscription={userSubscription}
            handleSubscribe={handleSubscribe}
            handleUpgradeDowngrade={handleUpgradeDowngrade}
            handleCancel={handleCancel}
            handleRenew={handleRenew}
        />
      </main>
 
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Lumen Technologies. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
 
export default App;