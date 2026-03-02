import { useState } from "react";
import Button from "../../../components/ui/Button";
import StatsCard from "../../../components/ui/StatsCard";

import {
  CreditCard,
  Repeat,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Download,
  Pause,
  XCircle,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("history");

  const paymentHistory = [
    {
      id: "INV-001",
      course: "Advanced React Development",
      amount: 99.99,
      date: "2024-01-15",
      status: "completed",
      method: "Credit Card",
    },
    {
      id: "INV-002",
      course: "UI/UX Design Masterclass",
      amount: 149.99,
      date: "2024-01-10",
      status: "completed",
      method: "PayPal",
    },
    {
      id: "INV-003",
      course: "Python Machine Learning",
      amount: 199.99,
      date: "2024-01-05",
      status: "pending",
      method: "Bank Transfer",
    },
    {
      id: "INV-004",
      course: "Premium Subscription",
      amount: 29.99,
      date: "2024-01-01",
      status: "completed",
      method: "Credit Card",
    },
  ];

  const subscriptions = [
    {
      name: "Premium Monthly",
      price: 29.99,
      status: "active",
      nextBilling: "2024-02-01",
      features: ["Unlimited courses", "Certificate downloads", "Priority support"],
    },
    {
      name: "Pro Annual",
      price: 299.99,
      status: "cancelled",
      nextBilling: "N/A",
      features: ["All Premium features", "1-on-1 mentoring", "Exclusive content"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "active":
        return "text-neon-green";
      case "pending":
        return "text-neon-orange";
      case "failed":
        return "text-neon-magenta";
      case "cancelled":
      default:
        return "text-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "pending":
        return "⏳";
      case "failed":
        return "❌";
      case "active":
        return "🟢";
      case "cancelled":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <div className="space-y-8 translate-x-0 fixed md:relative md:translate-x-0 ">
      <div>
        <h1 className="text-3xl font-orbitron font-bold ">Payments & Billing</h1>
        <p className="text-gray-400 mt-1">Manage your payments and subscription details</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Spent" value="$479.96" icon={<CreditCard />} trend={{ value: 15, isPositive: true }} />
        <StatsCard title="Active Subscriptions" value={1} icon={<Repeat />} />
        <StatsCard title="Courses Purchased" value={8} icon={<BookOpen />} trend={{ value: 25, isPositive: true }} />
        <StatsCard title="Next Payment" value="Feb 1" icon={<CalendarDays />} />
      </div>

      <div className="glass-card p-6">
        <div className="flex gap-4 mb-6">
          {[
            { key: "history", label: "Payment History", icon: <ClipboardList size={16} /> },
            { key: "subscriptions", label: "Subscriptions", icon: <Repeat size={16} /> },
            { key: "methods", label: "Payment Methods", icon: <CreditCard size={16} /> },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.key)}
              className={
                activeTab === tab.key
                  ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }
            >
              {tab.icon} <span className="ml-1">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Payment History */}
        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Transaction History</h3>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white">
                <Download size={16} className="mr-1" /> Download Report
              </Button>
            </div>

            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="bg-glass-dark backdrop-blur-sm bg-glass-dark rounded-lg p-4 border border-neon-blue/30 hover:border-neon-cyan/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white">{payment.course}</h4>
                        <span className={`text-sm ${getStatusColor(payment.status)}`}>
                          {getStatusBadge(payment.status)} {payment.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span>ID: {payment.id}</span>
                        <span>Date: {payment.date}</span>
                        <span>Method: {payment.method}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-neon-green">${payment.amount}</div>
                      <Button variant="ghost" size="sm" className="text-neon-cyan hover:bg-neon-cyan/20">
                        View Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscriptions */}
        {activeTab === "subscriptions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Subscription Plans</h3>
              <Button className="bg-gradient-to-r from-neon-green to-neon-cyan text-white">
                <Repeat size={16} className="mr-1" /> Upgrade Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptions.map((sub, index) => (
                <div key={index} className="bg-glass-dark backdrop-blur-sm bg-glass-dark rounded-xl p-6 border border-neon-blue/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">{sub.name}</h4>
                    <span className={`text-sm ${getStatusColor(sub.status)}`}>
                      {getStatusBadge(sub.status)} {sub.status}
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-neon-cyan mb-4">
                    ${sub.price}
                    <span className="text-sm text-gray-400 font-normal">
                      /{sub.name.includes("Annual") ? "year" : "month"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {sub.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-neon-green">✓</span> {feature}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-400 mb-4">Next billing: {sub.nextBilling}</div>

                  <div className="flex gap-2">
                    {sub.status === "active" ? (
                      <>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Pause size={16} className="mr-1" /> Pause
                        </Button>
                        <Button variant="ghost" size="sm" className="text-neon-magenta hover:bg-neon-magenta/20">
                          <XCircle size={16} className="mr-1" /> Cancel
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white">
                        <Repeat size={16} className="mr-1" /> Reactivate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Methods */}
        {activeTab === "methods" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white">
                <Plus size={16} className="mr-1" /> Add New Method
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { type: "Visa", last4: "4242", expires: "12/25", isDefault: true },
                { type: "PayPal", email: "user@example.com", isDefault: false },
                { type: "Mastercard", last4: "8888", expires: "06/26", isDefault: false },
              ].map((method, index) => (
                <div key={index} className="bg-glass-dark backdrop-blur-sm bg-glass-dark rounded-lg p-4 border border-neon-blue/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-neon-purple to-neon-cyan rounded flex items-center justify-center text-white font-bold text-sm">
                        {method.type === "PayPal" ? "PP" : method.type.slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {method.type} {method.last4 && `****${method.last4}`}
                        </div>
                        <div className="text-sm text-gray-400">
                          {method.expires ? `Expires ${method.expires}` : method.email}
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="bg-neon-green/20 text-neon-green text-xs px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-neon-magenta hover:bg-neon-magenta/20">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
