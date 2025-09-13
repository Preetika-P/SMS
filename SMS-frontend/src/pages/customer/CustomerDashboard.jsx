import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Package, Edit, Trash2, PlusCircle, XCircle, RefreshCw, Bell } from 'lucide-react';

// --- Global CSS for new components ---
const GlobalStyles = () => (
  <style>{`
    .notifications-container {
      max-width: 100%; /* Full width within its container */
      margin-top: 2rem;
      margin-bottom: 2rem;
      padding: 24px;
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      border: 1px solid #e5e7eb;
    }
    .notifications-container h3 {
      margin-bottom: 20px;
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .notification-list {
      list-style: none;
      padding: 0;
      max-height: 100%;
      overflow-y: auto;
    }
    .notification-item {
      padding: 14px 16px;
      border-left: 5px solid #3498db; /* Default color */
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
      border-left-color: #2ecc71; /* Green */
    }
    .notification-item.downgrade {
      border-left-color: #f39c12; /* Orange */
    }
    .notification-item.renew {
        border-left-color: #8e44ad; /* Purple */
    }
    .notification-item.cancel {
      border-left-color: #e74c3c; /* Red */
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
  { id: 1, name: 'Fibernet Basic', product: 'Fibernet', price: 29.99, quota: '100 GB', speed: '50 Mbps', active: true },
  { id: 2, name: 'Fibernet Pro', product: 'Fibernet', price: 49.99, quota: '500 GB', speed: '200 Mbps', active: true },
  { id: 3, name: 'Fibernet Ultra', product: 'Fibernet', price: 79.99, quota: 'Unlimited', speed: '1 Gbps', active: true },
  { id: 4, name: 'Copper Essentials', product: 'Broadband Copper', price: 19.99, quota: '50 GB', speed: '25 Mbps', active: true },
  { id: 5, name: 'Copper Plus', product: 'Broadband Copper', price: 34.99, quota: '200 GB', speed: '75 Mbps', active: true },
];

const analyticsData = [
    { name: 'Jan', active: 400, cancelled: 240, upgraded: 50, downgraded: 20 },
    { name: 'Feb', active: 300, cancelled: 139, upgraded: 40, downgraded: 15 },
    { name: 'Mar', active: 450, cancelled: 380, upgraded: 70, downgraded: 25 },
    { name: 'Apr', active: 278, cancelled: 390, upgraded: 60, downgraded: 30 },
    { name: 'May', active: 589, cancelled: 480, upgraded: 90, downgraded: 40 },
    { name: 'Jun', active: 390, cancelled: 380, upgraded: 80, downgraded: 35 },
];


// --- Helper Functions ---
const getFutureDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

// --- Page & Helper Components ---

const LandingPage = ({ navigateTo }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Welcome to Subscription Portal
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Admin Card */}
        <div
          onClick={() => navigateTo("admin")}
          className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-orange-600 text-6xl mb-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M466.5 83.7l-192-80a48.15 48.15 0 00-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 363.2 221.5 407.5a48.11 48.11 0 0036.9 0C381.5 491.2 496 326.5 496 128c0-19.4-11.7-36.9-29.5-44.3zM256 448c-54.9-26.6-163.1-133.5-163.1-285.4a16.2 16.2 0 01.3-3.1l157.8 65.8 157.8-65.8a16.2 16.2 0 01.3 3.1c0 151.9-108.2 258.8-163.1 285.4z"></path></svg>
          <h2 className="text-xl font-semibold text-gray-700">Admin</h2>
        </div>

        {/* Customer Card */}
        <div
          onClick={() => navigateTo("customer")}
          className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="text-orange-600 text-6xl mb-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-18.6C183.5 263.1 167.6 256 150.4 256H86.4c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
          <h2 className="text-xl font-semibold text-gray-700">Customer</h2>
        </div>
      </div>
    </div>
  );
}

const NotificationPanel = ({ notifications, onClose }) => {
    return (
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
};


const PlanCard = ({ plan, onAction, userSubscription }) => {
    const isCurrentUserPlan = userSubscription?.plan.id === plan.id;
    let buttonText = 'Subscribe';
    let buttonDisabled = false;

    if (userSubscription) {
        if (isCurrentUserPlan) {
            buttonText = 'Current Plan';
            buttonDisabled = true;
        } else if (plan.price > userSubscription.plan.price) {
            buttonText = 'Upgrade';
        } else if (plan.price < userSubscription.plan.price) {
            buttonText = 'Downgrade';
        } else {
            buttonText = 'Switch Plan';
        }
    }

    return (
        <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${isCurrentUserPlan ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
            <h3 className={`text-2xl font-bold mb-2 ${isCurrentUserPlan ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h3>
            <p className={`text-sm font-semibold mb-4 ${isCurrentUserPlan ? 'text-indigo-200' : 'text-indigo-500'}`}>{plan.product}</p>
            <div className="my-4">
                <span className={`text-4xl font-extrabold ${isCurrentUserPlan ? 'text-white' : 'text-gray-900'}`}>${plan.price}</span>
                <span className={`ml-1 text-lg ${isCurrentUserPlan ? 'text-indigo-200' : 'text-gray-500'}`}>/month</span>
            </div>
            <ul className={`space-y-2 text-md mb-6 ${isCurrentUserPlan ? 'text-indigo-100' : 'text-gray-600'}`}>
                <li className="flex items-center"><Package className="w-5 h-5 mr-2 text-indigo-300" /> Data: {plan.quota}</li>
                <li className="flex items-center"><Users className="w-5 h-5 mr-2 text-indigo-300" /> Speed: {plan.speed}</li>
            </ul>
            <button
                onClick={() => onAction(plan)}
                disabled={buttonDisabled}
                className={`w-full py-3 px-6 text-lg font-semibold rounded-lg transition-colors duration-300 ${ isCurrentUserPlan ? 'bg-white text-indigo-600 hover:bg-indigo-100' : 'bg-indigo-500 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed'}`}>
                {buttonText}
            </button>
        </div>
    );
};

const UserPortal = ({ plans, userSubscription, handleSubscribe, handleUpgradeDowngrade, handleCancel, handleRenew }) => (
    <div className="p-4 md:p-8">
        
        {userSubscription && (
             <div className="mb-12 bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Current Subscription</h3>
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg">
                    <div>
                        <p className="text-xl font-semibold text-indigo-600">{userSubscription.plan.name}</p>
                        <p className="text-gray-600">Expires on: {userSubscription.expiryDate.toLocaleDateString()}</p>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 my-4 md:my-0">${userSubscription.plan.price}/month</div>
                    <div className="flex space-x-2">
                         <button onClick={handleRenew} className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                            <RefreshCw className="w-5 h-5 mr-2" /> Renew
                        </button>
                        <button onClick={() => handleCancel(userSubscription.plan.id)} className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                            <XCircle className="w-5 h-5 mr-2" /> Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}

        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Explore Our Plans</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.filter(p => p.active).map(plan => (
                <PlanCard key={plan.id} plan={plan} userSubscription={userSubscription} onAction={userSubscription ? handleUpgradeDowngrade : handleSubscribe}/>
            ))}
        </div>
    </div>
);

const PlanForm = ({ plan, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ name: '', product: 'Fibernet', price: '', quota: '', speed: '' });

    useEffect(() => {
        if (plan) setFormData(plan);
        else setFormData({ name: '', product: 'Fibernet', price: '', quota: '', speed: '' });
    }, [plan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, price: parseFloat(formData.price) });
    };
    
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
            <h4 className="text-xl font-bold mb-4">{plan ? 'Edit Plan' : 'Create New Plan'}</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Plan Name" className="p-2 border rounded-lg w-full" required />
                <select name="product" value={formData.product} onChange={handleChange} className="p-2 border rounded-lg w-full">
                    <option>Fibernet</option>
                    <option>Broadband Copper</option>
                </select>
                <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded-lg w-full" required step="0.01" />
                <input name="quota" value={formData.quota} onChange={handleChange} placeholder="Data Quota (e.g., 100 GB)" className="p-2 border rounded-lg w-full" required />
                <input name="speed" value={formData.speed} onChange={handleChange} placeholder="Speed (e.g., 50 Mbps)" className="p-2 border rounded-lg w-full" required />
                <div className="flex space-x-2 md:col-start-3 justify-end">
                    <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">Save Plan</button>
                </div>
            </form>
        </div>
    );
};

const AdminDashboard = ({ plans, setPlans }) => {
    const [editingPlan, setEditingPlan] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = (newPlan) => {
        setPlans([...plans, { ...newPlan, id: Date.now(), active: true }]);
        setIsCreating(false);
    };

    const handleUpdate = (updatedPlan) => {
        setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
        setEditingPlan(null);
    };

    const handleDelete = (planId) => setPlans(plans.map(p => p.id === planId ? { ...p, active: false } : p));
    
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>
            <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Subscription Trends</h3>
                <div className="bg-white p-6 rounded-2xl shadow-lg h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}/><Legend />
                            <Bar dataKey="active" fill="#4f46e5" name="Active" /><Bar dataKey="cancelled" fill="#ef4444" name="Cancellations" />
                            <Bar dataKey="upgraded" fill="#22c55e" name="Upgrades" /><Bar dataKey="downgraded" fill="#f97316" name="Downgrades" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold text-gray-700">Manage Plans</h3>
                    <button onClick={() => { setIsCreating(true); setEditingPlan(null); }} className="flex items-center bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors">
                        <PlusCircle className="w-5 h-5 mr-2" /> Add Plan
                    </button>
                </div>
                {(editingPlan || isCreating) && ( <PlanForm plan={editingPlan} onSave={editingPlan ? handleUpdate : handleCreate} onCancel={() => { setEditingPlan(null); setIsCreating(false); }}/> )}
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead><tr className="border-b"><th className="p-4">Name</th><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Quota</th><th className="p-4">Speed</th><th className="p-4">Actions</th></tr></thead>
                            <tbody>
                                {plans.filter(p => p.active).map(plan => (
                                    <tr key={plan.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-semibold">{plan.name}</td><td className="p-4">{plan.product}</td><td className="p-4">${plan.price}</td>
                                        <td className="p-4">{plan.quota}</td><td className="p-4">{plan.speed}</td>
                                        <td className="p-4 flex space-x-2">
                                            <button onClick={() => { setEditingPlan(plan); setIsCreating(false); }} className="text-indigo-600 hover:text-indigo-800 p-2"><Edit className="w-5 h-5" /></button>
                                            <button onClick={() => handleDelete(plan.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 className="w-5 h-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

function App() {
    const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'customer', 'admin'
    const [plans, setPlans] = useState(initialPlans);
    const [userSubscription, setUserSubscription] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotificationPanel, setShowNotificationPanel] = useState(false);

    // Load notifications from localStorage on initial render
    useEffect(() => {
        try {
            const saved = localStorage.getItem("user_notifications");
            if (saved) {
                setNotifications(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Failed to parse notifications from localStorage", error);
        }
    }, []);

    // Save notifications to localStorage whenever they change
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
        setNotifications(prev => [newNotification, ...prev]);
    };

    const handleBellClick = () => {
        setShowNotificationPanel(true);
        setNotifications(prevNotifications => 
            prevNotifications.map(n => ({...n, read: true}))
        );
    };

    const handleSubscribe = (plan) => {
        setUserSubscription({ plan: plan, expiryDate: getFutureDate(30) });
        addNotification('subscribe', `You subscribed to ${plan.name}.`);
    };

    const handleUpgradeDowngrade = (newPlan) => {
        const oldPlanName = userSubscription.plan.name;
        const action = newPlan.price > userSubscription.plan.price ? 'upgrade' : 'downgrade';
        setUserSubscription({ plan: newPlan, expiryDate: getFutureDate(30) });
        addNotification(action, `Plan changed from ${oldPlanName} to ${newPlan.name}.`);
    };

    const handleCancel = (planId) => {
        if(userSubscription && userSubscription.plan.id === planId) {
            addNotification('cancel', `Your subscription to ${userSubscription.plan.name} was cancelled.`);
            setUserSubscription(null);
        }
    };

    const handleRenew = () => {
        if(userSubscription) {
            const newExpiry = new Date(userSubscription.expiryDate);
            newExpiry.setMonth(newExpiry.getMonth() + 1);
            setUserSubscription({ ...userSubscription, expiryDate: newExpiry });
            addNotification('renew', `Renewed ${userSubscription.plan.name}. New expiry: ${newExpiry.toLocaleDateString()}`);
        }
    };
    
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <GlobalStyles />
            {currentPage !== 'landing' && (
                <header className="bg-white shadow-md sticky top-0 z-50">
                    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('landing')}>
                             <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            <h1 className="text-2xl font-bold text-gray-800">Lumen Subscriptions</h1>
                        </div>
                        <div className="relative">
                            <button onClick={handleBellClick} className="relative text-gray-600 hover:text-indigo-600">
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
            )}

            <main>
                {showNotificationPanel && <NotificationPanel notifications={notifications} onClose={() => setShowNotificationPanel(false)} />}
                
                {currentPage === 'landing' && <LandingPage navigateTo={setCurrentPage} />}
                {currentPage === 'customer' && <UserPortal plans={plans} userSubscription={userSubscription} handleSubscribe={handleSubscribe} handleUpgradeDowngrade={handleUpgradeDowngrade} handleCancel={handleCancel} handleRenew={handleRenew} />}
                {currentPage === 'admin' && <AdminDashboard plans={plans} setPlans={setPlans} />}

            </main>

            {currentPage !== 'landing' && (
                 <footer className="text-center py-4 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Lumen Technologies. All Rights Reserved.</p>
                </footer>
            )}
        </div>
    );
}

export default App;

