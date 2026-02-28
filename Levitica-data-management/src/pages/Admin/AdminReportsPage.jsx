import React from "react";
import { Bell, Download } from "lucide-react";

const PIPELINE_BY_STAGE = [
  { stage: "Lead", count: 1, value: "₹6,06,068" },
  { stage: "Contacted", count: 1, value: "₹2,86,068" },
  { stage: "Qualified", count: 1, value: "₹4,56,060" },
  { stage: "Meeting/Demo", count: 1, value: "₹3,75,060" },
  { stage: "Proposal Sent", count: 1, value: "₹3,26,068" },
  { stage: "Negotiation", count: 1, value: "₹12,06,060" },
  { stage: "Won", count: 2, value: "₹17,76,068" },
  { stage: "Lost", count: 0, value: "₹0" },
];

const LEADS_BY_SOURCE = [
  { label: "Cold Call", count: 2, color: "bg-blue-500" },
  { label: "Referral", count: 1, color: "bg-emerald-500" },
  { label: "Website", count: 1, color: "bg-violet-500" },
  { label: "LinkedIn", count: 1, color: "bg-blue-600" },
  { label: "Event/Trade Show", count: 1, color: "bg-amber-500" },
  { label: "Partner", count: 1, color: "bg-emerald-600" },
  { label: "Advertisement", count: 1, color: "bg-gray-500" },
];

const REP_PERFORMANCE = [
  { initials: "VJ", name: "Vikram Joshi", totalDeals: 2, won: 1, wonValue: "₹8,56,060", pipelineValue: "₹12,00,000", winRate: "50%", callsLogged: 2, emailsLogged: 1 },
  { initials: "MR", name: "Meena Reddy", totalDeals: 2, won: 0, wonValue: "₹0", pipelineValue: "₹7,70,600", winRate: "0%", callsLogged: 1, emailsLogged: 1 },
  { initials: "AK", name: "Aditya Kumar", totalDeals: 2, won: 1, wonValue: "₹9,26,060", pipelineValue: "₹3,75,600", winRate: "50%", callsLogged: 0, emailsLogged: 0 },
  { initials: "KS", name: "Kavya Shah", totalDeals: 2, won: 0, wonValue: "₹0", pipelineValue: "₹8,80,000", winRate: "0%", callsLogged: 0, emailsLogged: 0 },
];

const FORECAST_VS_TARGET = [
  { label: "Won Revenue", current: "₹17,78,080", target: "₹20,03,038", percent: 89, color: "bg-success" },
  { label: "Weighted Forecast", current: "₹17,68,258", target: "₹15,03,038", percent: 100, color: "bg-violet-500" },
  { label: "Active Pipeline", current: "₹32,25,388", target: "₹58,03,800", percent: 56, color: "bg-amber-500" },
];

const ACTIVITY_BREAKDOWN = [
  { type: "Call", count: 3 },
  { type: "Email", count: 2 },
  { type: "Meeting", count: 1 },
  { type: "Demo", count: 0 },
  { type: "Follow up", count: 0 },
  { type: "Note", count: 0 },
  { type: "Task", count: 0 },
];

export default function AdminReportsPage() {
  const maxLeads = Math.max(...LEADS_BY_SOURCE.map((s) => s.count), 1);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Reports</h1>
          <p className="text-sm text-body">/ Sales Reports</p>
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
        {/* Six KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Revenue Won</p>
            <p className="text-xl font-bold text-success">₹17,70,000</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Active Pipeline</p>
            <p className="text-xl font-bold text-blue-600">₹32,25,000</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Weighted Forecast</p>
            <p className="text-xl font-bold text-violet-600">₹17,60,350</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Win Rate</p>
            <p className="text-xl font-bold text-amber-600">25%</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Activities</p>
            <p className="text-xl font-bold text-teal-600">6</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Calls</p>
            <p className="text-xl font-bold text-danger">3</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pipeline by Stage */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-brand-dark">Pipeline by Stage</h2>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-body hover:bg-gray-50 text-sm font-medium transition"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Stage</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">Count</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {PIPELINE_BY_STAGE.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-3 px-4 font-medium text-brand-dark">{row.stage}</td>
                      <td className="py-3 px-4 text-right text-body">{row.count}</td>
                      <td className="py-3 px-4 text-right font-medium text-body">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Leads by Source */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-brand-dark">Leads by Source</h2>
            </div>
            <div className="p-5 space-y-4">
              {LEADS_BY_SOURCE.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-body w-32 shrink-0">{item.label}</span>
                  <div className="flex-1 min-w-0">
                    <div className="h-6 rounded-lg bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-lg ${item.color}`}
                        style={{ width: `${(item.count / maxLeads) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-body tabular-nums w-6 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rep Performance */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-brand-dark">Rep Performance</h2>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-body hover:bg-gray-50 text-sm font-medium transition"
            >
              <Download className="w-4 h-4" strokeWidth={2} />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Rep</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Total Deals</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Won</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Won Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Pipeline Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Win Rate</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Calls</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Emails</th>
                </tr>
              </thead>
              <tbody>
                {REP_PERFORMANCE.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                          {row.initials}
                        </span>
                        <span className="font-medium text-brand-dark">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-body">{row.totalDeals}</td>
                    <td className="py-3 px-4 text-right text-body">{row.won}</td>
                    <td className="py-3 px-4 text-right font-medium text-body">{row.wonValue}</td>
                    <td className="py-3 px-4 text-right text-body">{row.pipelineValue}</td>
                    <td className="py-3 px-4 text-right font-medium text-body">{row.winRate}</td>
                    <td className="py-3 px-4 text-right text-body">{row.callsLogged}</td>
                    <td className="py-3 px-4 text-right text-body">{row.emailsLogged}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forecast vs Target */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-brand-dark">Forecast vs Target</h2>
            </div>
            <div className="p-5 space-y-5">
              {FORECAST_VS_TARGET.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-brand-dark">{item.label}</span>
                    <span className="text-body">
                      {item.current} / {item.target} ({item.percent}%)
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${Math.min(item.percent, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-brand-dark">Activity Breakdown</h2>
            </div>
            <div className="p-5">
              <ul className="space-y-2">
                {ACTIVITY_BREAKDOWN.map((item, i) => (
                  <li key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-body">{item.type}</span>
                    <span className="font-semibold text-brand-dark tabular-nums">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
