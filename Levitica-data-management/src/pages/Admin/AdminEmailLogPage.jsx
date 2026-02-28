import React, { useState } from "react";
import {
  Bell,
  Plus,
  Pencil,
  Trash2,
  Info,
} from "lucide-react";

const INITIAL_EMAILS = [
  { id: 1, date: "2025-02-18", subject: "Proposal Sent - GreenPath", company: "GreenPath Solutions", rep: "Meena Reddy", repInitials: "MR", deal: "GreenPath Consulting Module", notes: "Emailed proposal with payment terms and timeline. Awaiting response." },
  { id: 2, date: "2025-01-16", subject: "Proposal Follow-up Email", company: "TechNova Pvt Ltd", rep: "Vikram Joshi", repInitials: "VJ", deal: "TechNova Enterprise License", notes: "Sent detailed pricing sheet and implementation timeline. Follow-up call scheduled." },
];

export default function AdminEmailLogPage() {
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [search, setSearch] = useState("");

  const filtered = emails.filter(
    (row) =>
      !search ||
      row.subject.toLowerCase().includes(search.toLowerCase()) ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.deal.toLowerCase().includes(search.toLowerCase())
  );

  const thisMonth = emails.filter((e) => {
    const [y, m] = e.date.split("-").map(Number);
    const now = new Date();
    return y === now.getFullYear() && m === now.getMonth() + 1;
  }).length;

  const linkedToDeals = emails.filter((e) => e.deal).length;

  const handleDelete = (id) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Email Log</h1>
          <p className="text-sm text-body">/ Email Activity</p>
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
            Log Email
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Three summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Emails</p>
            <p className="text-2xl font-bold text-violet-600">{emails.length}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">This Month</p>
            <p className="text-2xl font-bold text-blue-600">{thisMonth}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Linked to Deals</p>
            <p className="text-2xl font-bold text-brand">{linkedToDeals}</p>
          </div>
        </div>

        {/* Email Sync info banner */}
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-start gap-3 mb-6">
          <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4 text-blue-600" strokeWidth={2} />
          </span>
          <p className="text-sm text-blue-800">
            <strong>Email Sync Enabled:</strong> Emails from connected inbox are automatically logged. You can also manually log emails below.
          </p>
        </div>

        {/* Email Activity Log table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-base font-semibold text-brand-dark">Email Activity Log</h2>
            <input
              type="search"
              placeholder="Search emails..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-52"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Rep</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Deal</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Notes</th>
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
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                          {row.repInitials}
                        </span>
                        <span className="text-body">{row.rep}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.deal}</td>
                    <td className="py-4 px-4 text-body max-w-[200px] truncate" title={row.notes}>
                      {row.notes || "—"}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="Edit email"
                        >
                          <Pencil className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="p-2 rounded-lg text-body hover:bg-red-50 hover:text-danger transition"
                          aria-label="Delete email"
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
            <div className="py-12 text-center text-body text-sm">No emails match your search.</div>
          )}
        </div>
      </div>
    </>
  );
}
