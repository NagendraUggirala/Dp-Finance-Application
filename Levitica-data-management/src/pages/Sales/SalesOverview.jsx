import React from "react";
import {
  Bell,
  Phone,
  Mail,
  FileText,
  Calendar,
  Target,
  Activity,
} from "lucide-react";

const RECENT_ACTIVITY = [
  { title: "Negotiation Call - Horizon", company: "Horizon Retail", user: "Vikram Joshi", date: "2025-02-10", icon: Phone },
  { title: "Product Demo - TechNova", company: "TechNova Pvt Ltd", user: "Vikram Joshi", date: "2025-01-18", icon: FileText },
  { title: "Proposal Follow-up Email", company: "TechNova Pvt Ltd", user: "Vikram Joshi", date: "2025-01-13", icon: Mail },
  { title: "Initial Discovery Call", company: "Horizon Retail", user: "Vikram Joshi", date: "2025-01-15", icon: Phone },
];

const PIPELINE_STAGES = [
  { label: "Lead", count: 3, color: "bg-blue-400" },
  { label: "Contacted", count: 3, color: "bg-blue-500" },
  { label: "Qualified", count: 3, color: "bg-brand" },
  { label: "Meeting/Demo", count: 3, color: "bg-violet-500" },
  { label: "Proposal Sent", count: 3, color: "bg-purple-500" },
  { label: "Negotiation", count: 1, color: "bg-amber-500" },
];

const LEADS_BY_SOURCE = [
  { label: "Referral", count: 1, color: "bg-blue-500" },
  { label: "Cold Call", count: 1, color: "bg-brand" },
];

const UPCOMING_FOLLOWUPS = [
  { type: "Call", date: "2025-02-28", title: "Horizon Retail", subtitle: null },
  { type: "Follow-up", date: "2025-03-15", title: "Check in with TechNova renewal", subtitle: "TechNova Pvt Ltd" },
];

export default function SalesOverview() {
  const maxPipeline = Math.max(...PIPELINE_STAGES.map((s) => s.count), 1);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Dashboard</h1>
          <p className="text-sm text-body">/ Sales Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search CRM..."
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
        {/* Six metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Leads</p>
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-xs text-blue-600">1 new</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Revenue Won</p>
            <p className="text-2xl font-bold text-success">₹8,50,000</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Active Pipeline</p>
            <p className="text-2xl font-bold text-brand">₹12,00,000</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Win Rate</p>
            <p className="text-2xl font-bold text-amber-600">50%</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Activities</p>
            <p className="text-2xl font-bold text-purple-600">4</p>
            <p className="text-xs text-purple-600">2 calls</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Overdue Tasks</p>
            <p className="text-2xl font-bold text-danger">2</p>
            <p className="text-xs text-danger">2 pending total</p>
          </div>
        </div>

        {/* Pipeline by Stage & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center">
                <Target className="w-5 h-5 text-brand" strokeWidth={2} />
              </span>
              <h2 className="font-semibold text-brand-dark">Pipeline by Stage</h2>
            </div>
            <div className="p-5 space-y-4">
              {PIPELINE_STAGES.map((stage, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-body w-28 shrink-0">{stage.label}</span>
                  <div className="flex-1 min-w-0">
                    <div className="h-6 rounded-lg bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-lg ${stage.color} transition-all`}
                        style={{ width: `${(stage.count / maxPipeline) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-body tabular-nums w-6 text-right shrink-0">
                    {stage.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-amber-600" strokeWidth={2} />
              </span>
              <h2 className="font-semibold text-brand-dark">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_ACTIVITY.map((item, i) => {
                const Icon = item.icon;
                return (
                <div key={i} className="px-5 py-3.5 flex items-start gap-3 hover:bg-gray-50/50 transition">
                  <span className="w-9 h-9 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-brand-dark">{item.title}</p>
                    <p className="text-sm text-body mt-0.5">
                      {item.company} · {item.user} · {item.date}
                    </p>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </div>

        {/* Leads by Source & Upcoming Follow-ups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </span>
              <h2 className="font-semibold text-brand-dark">Leads by Source</h2>
            </div>
            <div className="p-5 space-y-4">
              {LEADS_BY_SOURCE.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-body w-24 shrink-0">{item.label}</span>
                  <div className="flex-1 min-w-0">
                    <div className="h-6 rounded-lg bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-lg ${item.color}`}
                        style={{ width: `${item.count * 50}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-body tabular-nums w-6 text-right shrink-0">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-600" strokeWidth={2} />
              </span>
              <h2 className="font-semibold text-brand-dark">Upcoming Follow-ups</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {UPCOMING_FOLLOWUPS.map((item, i) => (
                <div key={i} className="px-5 py-3.5 flex items-start gap-3 hover:bg-gray-50/50 transition">
                  <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-brand-dark">{item.title}</p>
                    <p className="text-sm text-body mt-0.5">
                      {item.date}
                      {item.subtitle && ` · ${item.subtitle}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
