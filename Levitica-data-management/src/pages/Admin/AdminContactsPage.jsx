import React, { useState } from "react";
import {
  Bell,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const STATUS_STYLES = {
  Customer: "bg-emerald-100 text-emerald-700",
  Prospect: "bg-amber-100 text-amber-700",
  Lead: "bg-blue-100 text-blue-700",
};

const SOURCE_STYLES = {
  Referral: "bg-success/15 text-success",
  Website: "bg-blue-100 text-blue-700",
  "Cold Call": "bg-amber-100 text-amber-700",
  "Event/Trade Show": "bg-violet-100 text-violet-700",
  LinkedIn: "bg-blue-100 text-blue-700",
};

const INITIAL_CONTACTS = [
  { id: 1, name: "Suresh Rajan", initials: "SR", company: "TechNova Pvt Ltd", title: "CTO", phone: "9876543210", email: "suresh@technova.com", city: "Bangalore", status: "Customer", source: "Referral", owner: "Vikram Joshi", ownerInitials: "VJ", lastContact: "2025-01-15" },
  { id: 2, name: "Meena Joshi", initials: "MJ", company: "GreenPath Solutions", title: "CEO", phone: "9123456789", email: "meena@greenpath.in", city: "Mumbai", status: "Customer", source: "Website", owner: "Vikram Joshi", ownerInitials: "VJ", lastContact: "2025-01-18" },
  { id: 3, name: "Deepak Verma", initials: "DV", company: "Horizon Retail Co", title: "VP Operations", phone: "9988776655", email: "deepak@horizon.co", city: "Delhi", status: "Prospect", source: "Cold Call", owner: "Meena Reddy", ownerInitials: "MR", lastContact: "2025-02-01" },
  { id: 4, name: "Priya Nair", initials: "PN", company: "CloudSoft India", title: "Director", phone: "9011223344", email: "priya@cloudsoft.io", city: "Hyderabad", status: "Prospect", source: "Event/Trade Show", owner: "Meena Reddy", ownerInitials: "MR", lastContact: "2025-02-05" },
  { id: 5, name: "Arun Krishnan", initials: "AK", company: "MediCore India", title: "CFO", phone: "9654321870", email: "arun@medicore.in", city: "Ahmedabad", status: "Lead", source: "LinkedIn", owner: "Aditya Kumar", ownerInitials: "AK", lastContact: "2025-02-10" },
];

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filtered = contacts.filter((row) => {
    const matchSearch =
      !search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || row.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: contacts.length,
    customers: contacts.filter((c) => c.status === "Customer").length,
    prospects: contacts.filter((c) => c.status === "Prospect").length,
    leads: contacts.filter((c) => c.status === "Lead").length,
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Contacts</h1>
          <p className="text-sm text-body">/ Contact Database</p>
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
            Add Contact
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Four summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total</p>
            <p className="text-2xl font-bold text-brand-dark">{stats.total}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Customers</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.customers}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Prospects</p>
            <p className="text-2xl font-bold text-amber-600">{stats.prospects}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Leads</p>
            <p className="text-2xl font-bold text-blue-600">{stats.leads}</p>
          </div>
        </div>

        {/* Contacts table section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-brand-dark mb-4">Contacts</h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                placeholder="Search contacts..."
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
                <option>Customer</option>
                <option>Prospect</option>
                <option>Lead</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">City</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Source</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Owner</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Last Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 text-body">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                          {row.initials}
                        </span>
                        <span className="font-medium text-brand-dark">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.company}</td>
                    <td className="py-4 px-4 text-body">{row.title}</td>
                    <td className="py-4 px-4 text-body">{row.phone}</td>
                    <td className="py-4 px-4 text-body">{row.email}</td>
                    <td className="py-4 px-4 text-body">{row.city}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[row.status] || "bg-gray-100 text-gray-700"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${SOURCE_STYLES[row.source] || "bg-gray-100 text-gray-700"}`}>
                        {row.source}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-brand/80 flex items-center justify-center text-white font-semibold text-xs shrink-0">
                          {row.ownerInitials}
                        </span>
                        <span className="text-body">{row.owner}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.lastContact}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="Edit contact"
                        >
                          <Pencil className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="p-2 rounded-lg text-body hover:bg-red-50 hover:text-danger transition"
                          aria-label="Delete contact"
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
            <div className="py-12 text-center text-body text-sm">No contacts match your filters.</div>
          )}
        </div>
      </div>
    </>
  );
}
