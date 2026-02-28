import React from "react";
import { Bell, Zap, User, Banknote, Trophy, Wallet, FileText, BarChart3, Receipt } from "lucide-react";

const RECENT_ACTIVITY = [
  { type: "joined", title: "Rahul Sharma joined", subtitle: "CA Engineer · 2025-03-10", icon: "person" },
  { type: "joined", title: "Deepak Rao joined", subtitle: "HR Executive · 2025-03-01", icon: "person" },
  { type: "payment", title: "Payment received MediCore India", subtitle: "₹10,65,600 · 2025-02-25", icon: "payment" },
  { type: "deal", title: "Deal won: MediCore India", subtitle: "₹9,20,000 · 2025-02-20", icon: "trophy" },
  { type: "payment", title: "Payment received Dev Mah...", subtitle: "₹35,100 · 2025-02-10", icon: "payment" },
  { type: "payment", title: "Payment received Ratul MaxGroup", subtitle: "₹29,500 · 2025-02-06", icon: "payment" },
  { type: "payment", title: "Payment received Lata Krishnan", subtitle: "₹29,500 · 2025-02-05", icon: "payment" },
];

const REVENUE_ITEMS = [
  { label: "Company Invoices", value: "₹21,18,100", color: "text-success" },
  { label: "Training Fees", value: "₹1,06,200", color: "text-warning" },
  { label: "Pending Collections", value: "₹7,78,800", color: "text-warning" },
  { label: "Total Expenses", value: "₹9,42,200", color: "text-danger" },
  { label: "Net Profit", value: "₹12,82,100", color: "text-success" },
];

export default function FinanceOverview() {
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Dashboard</h1>
          <p className="text-sm text-body">/ Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search anything..."
            className="w-64 px-4 py-2 rounded-xl bg-brand-soft border border-gray-200 text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
          />
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-brand-soft border border-gray-200 flex items-center justify-center text-body hover:bg-brand-light transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Five summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="rounded-2xl bg-[#0d9488] text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Wallet className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">Total Collected</p>
              <p className="text-xl font-bold">₹22,24,300</p>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Receipt className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">Outstanding</p>
              <p className="text-xl font-bold">₹7,78,800</p>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Wallet className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">Total Expenses</p>
              <p className="text-xl font-bold">₹9,42,200</p>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <BarChart3 className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">Net P&L</p>
              <p className="text-xl font-bold">₹12,82,100</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#1e3a5f] text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">Invoices</p>
              <p className="text-xl font-bold">10</p>
              <p className="text-xs text-white/75 mt-0.5">To overdue</p>
            </div>
          </div>
        </div>

        {/* Two panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-amber-50/80 to-transparent flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" strokeWidth={2} />
              </span>
              <h2 className="font-semibold text-brand-dark">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="px-5 py-3.5 flex items-start gap-3 hover:bg-gray-50/50 transition">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      item.icon === "person"
                        ? "bg-brand-soft text-brand"
                        : item.icon === "trophy"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                    }`}
                    aria-hidden
                  >
                    {item.icon === "person" ? (
                      <User className="w-4 h-4" strokeWidth={2} />
                    ) : item.icon === "trophy" ? (
                      <Trophy className="w-4 h-4" strokeWidth={2} />
                    ) : (
                      <Banknote className="w-4 h-4" strokeWidth={2} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-brand-dark">{item.title}</p>
                    <p className="text-sm text-body mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-brand-soft/80 to-transparent flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center">
                <Wallet className="w-5 h-5 text-brand" strokeWidth={2} />
              </span>
              <h2 className="font-semibold text-brand-dark">Revenue Summary</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {REVENUE_ITEMS.map((item, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                  <span className="text-body font-medium">{item.label}</span>
                  <span className={`font-semibold tabular-nums ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
