import React, { useState } from "react";
import {
  Bell,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const OUTCOME_STYLES = {
  "Voicemail": "bg-amber-100 text-amber-700",
  "Callback Requested": "bg-blue-100 text-blue-700",
  "Connected - Interested": "bg-emerald-100 text-emerald-700",
  "No Answer": "bg-red-100 text-red-700",
};

const INITIAL_CALLS = [
  { id: 1, date: "2025-02-15", subject: "Follow-up - GreenPath", company: "GreenPath Solutions", outcome: "Voicemail", duration: "", rep: "Meena Reddy", repInitials: "MR", deal: "GreenPath Consulting Module", notes: "Left voicemail. Will try again tomorrow.", recording: "None" },
  { id: 2, date: "2025-02-10", subject: "Negotiation Call - Horizon", company: "Horizon Retail Co", outcome: "Callback Requested", duration: "18min", rep: "Vikram Joshi", repInitials: "VJ", deal: "Horizon Retail Integration", notes: "Discussed 10% volume discount. Sending revised proposal.", recording: "None" },
  { id: 3, date: "2025-01-15", subject: "Initial Discovery Call", company: "TechNova Pvt Ltd", outcome: "Connected - Interested", duration: "25min", rep: "Vikram Joshi", repInitials: "VJ", deal: "TechNova Enterprise License", notes: "Client interested in enterprise plan. Demo scheduled.", recording: "None" },
];

export default function AdminCallTrackingPage() {
  const [calls, setCalls] = useState(INITIAL_CALLS);
  const [search, setSearch] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("All Outcomes");

  const filtered = calls.filter((row) => {
    const matchSearch =
      !search ||
      row.subject.toLowerCase().includes(search.toLowerCase()) ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.deal.toLowerCase().includes(search.toLowerCase());
    const matchOutcome = outcomeFilter === "All Outcomes" || row.outcome === outcomeFilter;
    return matchSearch && matchOutcome;
  });

  const connectedCount = calls.filter((c) => c.outcome === "Connected - Interested" || c.outcome?.startsWith("Connected")).length;
  const voicemailCount = calls.filter((c) => c.outcome === "Voicemail").length;
  const noAnswerCount = calls.filter((c) => c.outcome === "No Answer").length;
  const withRecording = calls.filter((c) => c.recording && c.recording !== "None").length;
  const connectRate = calls.length ? Math.round((connectedCount / calls.length) * 100) : 0;

  const handleDelete = (id) => {
    setCalls((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Call Tracking</h1>
          <p className="text-sm text-body">/ Manual Call Log</p>
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
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white font-medium text-sm shadow-sm transition"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Log Call
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Six summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Calls</p>
            <p className="text-2xl font-bold text-teal-600">{calls.length}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Connected</p>
            <p className="text-2xl font-bold text-success">{connectedCount}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Voicemail</p>
            <p className="text-2xl font-bold text-amber-600">{voicemailCount}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">No Answer</p>
            <p className="text-2xl font-bold text-danger">{noAnswerCount}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Recordings</p>
            <p className="text-2xl font-bold text-violet-600">{withRecording}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Connect Rate</p>
            <p className="text-2xl font-bold text-brand">{connectRate}%</p>
          </div>
        </div>

        {/* Call Log table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-brand-dark mb-4">Call Log</h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                placeholder="Search calls..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-52"
              />
              <select
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer pr-8"
              >
                <option>All Outcomes</option>
                <option>Voicemail</option>
                <option>Callback Requested</option>
                <option>Connected - Interested</option>
                <option>No Answer</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Outcome</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Rep</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Deal</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Notes</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Recording</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 text-body">{idx + 1}</td>
                    <td className="py-4 px-4 text-body">{row.date}</td>
                    <td className="py-4 px-4 font-medium text-brand-dark">{row.subject}</td>
                    <td className="py-4 px-4 text-body">{row.company}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${OUTCOME_STYLES[row.outcome] || "bg-gray-100 text-gray-700"}`}>
                        {row.outcome}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-body">{row.duration || "—"}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                          {row.repInitials}
                        </span>
                        <span className="text-body">{row.rep}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.deal}</td>
                    <td className="py-4 px-4 text-body max-w-[180px] truncate" title={row.notes}>
                      {row.notes || "—"}
                    </td>
                    <td className="py-4 px-4 text-body">{row.recording || "—"}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="Edit call"
                        >
                          <Pencil className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="p-2 rounded-lg text-body hover:bg-red-50 hover:text-danger transition"
                          aria-label="Delete call"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-body text-sm">No calls match your filters.</div>
          )}
        </div>
      </div>
    </>
  );
}
