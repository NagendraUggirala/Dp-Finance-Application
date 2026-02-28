import React from "react";
import { Zap, User, Banknote, Users, Bell, UserPlus, BadgeCheck, Clock, UserCheck } from "lucide-react";

const RECENT_ACTIVITY = [
  { type: "joined", title: "Deepak Rao", subtitle: "HR Executive · 2025-03-01", icon: "person" },
  { type: "payment", title: "Payment received", subtitle: "MealCore India · ₹10,85,600 · 2025-02-28", icon: "payment" },
  { type: "payment", title: "Payment received", subtitle: "DevMahotre · ₹35,400 · 2025-02-27", icon: "payment" },
  { type: "payment", title: "Payment received", subtitle: "RetailMax Group · ₹29,500 · 2025-02-26", icon: "payment" },
  { type: "payment", title: "Payment received", subtitle: "Lata Krishnan · 2025-02-25", icon: "payment" },
  { type: "payment", title: "Payment received", subtitle: "TechNova Pvt Ltd · 2025-02-24", icon: "payment" },
  { type: "joined", title: "Rohan Mehta", subtitle: "Backend Developer · 2025-02-01", icon: "person" },
];

const PIPELINE_STAGES = [
  { label: "Screening", count: 3, width: "100%" },
  { label: "Technical", count: 3, width: "100%" },
  { label: "HR Round", count: 2, width: "67%" },
  { label: "Offer", count: 2, width: "67%" },
  { label: "Joined", count: 1, width: "33%" },
];

export default function DashboardOverview() {
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <h1 className="text-lg font-semibold text-brand-dark">Dashboard / Overview</h1>
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
        {/* Four stat cards - icon left, content right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl bg-[#1e3a5f] text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <UserPlus className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">My Candidates</p>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-white/75 mt-0.5">Total in pipeline</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#0d9488] text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">Offers Done</p>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-white/80 mt-0.5">Offers accepted</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#ea580c] text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Clock className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">Offers Pending</p>
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs text-white/80 mt-0.5">Awaiting response</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#6d28d9] text-white p-5 shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <UserCheck className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-0.5">Joined</p>
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs text-white/80 mt-0.5">Onboarded</p>
            </div>
          </div>
        </div>

        {/* Two content cards - improved UI */}
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
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.icon === "person" ? "bg-brand-soft text-brand" : "bg-emerald-50 text-emerald-600"}`} aria-hidden>
                    {item.icon === "person" ? <User className="w-4 h-4" strokeWidth={2} /> : <Banknote className="w-4 h-4" strokeWidth={2} />}
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
                <Users className="w-5 h-5 text-brand" strokeWidth={2} />
              </span>
              <h2 className="font-semibold text-brand-dark">HR Pipeline Conversion</h2>
            </div>
            <div className="p-5 space-y-5">
              {PIPELINE_STAGES.map((stage, i) => {
                const colors = ["bg-brand", "bg-info", "bg-[#6d28d9]", "bg-success", "bg-amber-500"];
                const fill = colors[i % colors.length];
                return (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-medium text-brand-dark">{stage.label}</span>
                      <span className="text-body font-semibold tabular-nums">({stage.count})</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${fill} transition-all duration-300`}
                        style={{ width: stage.width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
