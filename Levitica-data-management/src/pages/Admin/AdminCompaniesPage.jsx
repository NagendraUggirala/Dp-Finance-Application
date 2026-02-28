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
};

const INITIAL_COMPANIES = [
  { id: 1, name: "TechNova Pvt Ltd", description: "Enterprise client", industry: "Technology", city: "Bangalore", website: "technova.com", employees: "250", annualRevenue: "₹5,00,00,000", status: "Customer", owner: "Vikram Joshi", ownerInitials: "VJ", contacts: 1, deals: 1 },
  { id: 2, name: "GreenPath Solutions", description: "Growing consultancy", industry: "Consulting", city: "Mumbai", website: "greenpath.in", employees: "80", annualRevenue: "₹1,50,00,000", status: "Prospect", owner: "Meena Reddy", ownerInitials: "MR", contacts: 1, deals: 1 },
  { id: 3, name: "Horizon Retail Co", description: "Large retail chain", industry: "Retail", city: "Delhi", website: "horizon.co", employees: "500", annualRevenue: "₹12,00,00,000", status: "Prospect", owner: "Vikram Joshi", ownerInitials: "VJ", contacts: 1, deals: 1 },
  { id: 4, name: "MediCore India", description: "Healthcare leader", industry: "Healthcare", city: "Ahmedabad", website: "medicore.in", employees: "350", annualRevenue: "₹8,00,00,000", status: "Customer", owner: "Aditya Kumar", ownerInitials: "AK", contacts: 1, deals: 1 },
];

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [search, setSearch] = useState("");

  const filtered = companies.filter(
    (row) =>
      !search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.industry.toLowerCase().includes(search.toLowerCase()) ||
      row.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Companies</h1>
          <p className="text-sm text-body">/ Company Records</p>
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
            Add Company
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-brand-dark mb-4">
              Companies ({companies.length})
            </h2>
            <input
              type="search"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-52"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Industry</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">City</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Website</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Employees</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Annual Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Owner</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Contacts</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Deals</th>
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
                        <p className="text-xs text-body">{row.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.industry}</td>
                    <td className="py-4 px-4 text-body">{row.city}</td>
                    <td className="py-4 px-4 text-body">{row.website}</td>
                    <td className="py-4 px-4 text-body">{row.employees}</td>
                    <td className="py-4 px-4 text-body">{row.annualRevenue}</td>
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
                    <td className="py-4 px-4 text-body">{row.contacts}</td>
                    <td className="py-4 px-4 text-body">{row.deals}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="Edit company"
                        >
                          <Pencil className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="p-2 rounded-lg text-body hover:bg-red-50 hover:text-danger transition"
                          aria-label="Delete company"
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
            <div className="py-12 text-center text-body text-sm">No companies match your search.</div>
          )}
        </div>
      </div>
    </>
  );
}
