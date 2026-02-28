import React, { useState } from "react";
import {
  Bell,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Download,
} from "lucide-react";

const STATUS_STYLES = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Qualified: "bg-emerald-100 text-emerald-700",
  Converted: "bg-success/15 text-success",
  Disqualified: "bg-danger/15 text-danger",
};

const SOURCE_STYLES = {
  Referral: "bg-success/15 text-success",
  Website: "bg-blue-100 text-blue-700",
  "Cold Call": "bg-amber-100 text-amber-700",
  LinkedIn: "bg-blue-100 text-blue-700",
  "Event/Trade Show": "bg-violet-100 text-violet-700",
  Partner: "bg-emerald-100 text-emerald-700",
  Advertisement: "bg-gray-100 text-gray-700",
};

const INITIAL_LEADS = [
  { id: 1, name: "Rohan Mehta", subtext: "Marat Tech Summit", company: "TechNova Pvt Ltd", phone: "9876543213", email: "rohan@technova.com", industry: "Technology", city: "Bangalore, India", source: "Referral", status: "New", owner: "Vikram Joshi", ownerInitials: "VJ", created: "2025-01-10" },
  { id: 2, name: "Sanya Kapoor", subtext: "Filled contact form", company: "GreenPath Solutions", phone: "9123456783", email: "sanya@greenpath.in", industry: "Consulting", city: "Mumbai, India", source: "Website", status: "Contacted", owner: "Vikram Joshi", ownerInitials: "VJ", created: "2025-01-14" },
  { id: 3, name: "Deepak Rao", subtext: "Budget confirmac", company: "Horizon Retail Co", phone: "9988776655", email: "deepak@horizon.co", industry: "Retail", city: "Delhi, India", source: "Cold Call", status: "Qualified", owner: "Meena Reddy", ownerInitials: "MR", created: "2025-01-18" },
  { id: 4, name: "Anjali Tiwari", subtext: "Connected on LinkedIn", company: "CloudSoft India", phone: "9011223344", email: "anjali@cloudsoft.io", industry: "Technology", city: "Hyderabad, India", source: "LinkedIn", status: "New", owner: "Meena Reddy", ownerInitials: "MR", created: "2025-01-20" },
  { id: 5, name: "Sunil Naik", subtext: "Ready to convert to deal", company: "MediCore India", phone: "583881734", email: "sunil@medicore.in", industry: "Healthcare", city: "Ahmedabad, India", source: "Event/Trade Show", status: "Converted", owner: "Aditya Kumar", ownerInitials: "AK", created: "2025-01-22" },
  { id: 6, name: "Pooja Menon", subtext: "NGO - special pricing needed", company: "EduLeap Foundation", phone: "9658098765", email: "pooja@eduleap.org", industry: "Education", city: "Pune, India", source: "Partner", status: "New", owner: "Aditya Kumar", ownerInitials: "AK", created: "2025-02-05" },
  { id: 7, name: "Ravi Shah", subtext: "Interested in Enterprise plan", company: "FinPlex Systems", phone: "9955884403", email: "ravi@finplex.com", industry: "Finance", city: "Chennai, India", source: "Cold Call", status: "Contacted", owner: "Kavya Shah", ownerInitials: "KS", created: "2025-02-08" },
  { id: 8, name: "Nisha Jain", subtext: "Budget too low", company: "AutoParts Hub", phone: "9738123456", email: "nisha@autoparts.co", industry: "Manufacturing", city: "Surat, India", source: "Advertisement", status: "Disqualified", owner: "Kavya Shah", ownerInitials: "KS", created: "2025-02-10" },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sourceFilter, setSourceFilter] = useState("All Sources");

  const filtered = leads.filter((row) => {
    const matchSearch =
      !search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || row.status === statusFilter;
    const matchSource = sourceFilter === "All Sources" || row.source === sourceFilter;
    return matchSearch && matchStatus && matchSource;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    qualified: leads.filter((l) => l.status === "Qualified").length,
    converted: leads.filter((l) => l.status === "Converted").length,
    disqualified: leads.filter((l) => l.status === "Disqualified").length,
  };

  const handleDelete = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Leads</h1>
          <p className="text-sm text-body">/ Lead Management</p>
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
            Add Lead
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Six summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total</p>
            <p className="text-2xl font-bold text-brand-dark">{stats.total}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">New</p>
            <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Contacted</p>
            <p className="text-2xl font-bold text-amber-600">{stats.contacted}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Qualified</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.qualified}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Converted</p>
            <p className="text-2xl font-bold text-success">{stats.converted}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Disqualified</p>
            <p className="text-2xl font-bold text-danger">{stats.disqualified}</p>
          </div>
        </div>

        {/* Lead Database */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-brand-dark mb-4">Lead Database</h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-52"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer pr-8"
              >
                <option>All Status</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Converted</option>
                <option>Disqualified</option>
              </select>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer pr-8"
              >
                <option>All Sources</option>
                <option>Referral</option>
                <option>Website</option>
                <option>Cold Call</option>
                <option>LinkedIn</option>
                <option>Event/Trade Show</option>
                <option>Partner</option>
                <option>Advertisement</option>
              </select>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-body hover:bg-gray-50 text-sm font-medium transition"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Industry</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">City</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Source</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Owner</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 text-body">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-brand-dark">{row.name}</p>
                        <p className="text-xs text-body">{row.subtext}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.company}</td>
                    <td className="py-4 px-4 text-body">{row.phone}</td>
                    <td className="py-4 px-4 text-body">{row.email}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {row.industry}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-body">{row.city}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${SOURCE_STYLES[row.source] || "bg-gray-100 text-gray-700"}`}>
                        {row.source}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[row.status] || "bg-gray-100 text-gray-700"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                          {row.ownerInitials}
                        </span>
                        <span className="text-body">{row.owner}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.created}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="Edit lead"
                        >
                          <Pencil className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="p-2 rounded-lg text-body hover:bg-red-50 hover:text-danger transition"
                          aria-label="Delete lead"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="View lead"
                        >
                          <Eye className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-body text-sm">No leads match your filters.</div>
          )}
        </div>
      </div>
    </>
  );
}
