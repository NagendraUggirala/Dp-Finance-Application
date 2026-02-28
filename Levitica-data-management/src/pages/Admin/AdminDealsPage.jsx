import React, { useState } from "react";
import {
  Bell,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Download,
  LayoutGrid,
} from "lucide-react";

const STAGE_STYLES = {
  Won: "bg-emerald-100 text-emerald-700",
  Lost: "bg-red-100 text-red-700",
  "Proposal Sent": "bg-amber-100 text-amber-700",
  Negotiation: "bg-blue-100 text-blue-700",
  "Meeting/Demo": "bg-amber-100 text-amber-700",
  Qualified: "bg-violet-100 text-violet-700",
  Lead: "bg-gray-100 text-gray-700",
};

const INITIAL_DEALS = [
  { id: 1, title: "TechNova Enterprise License", subtext: "Bangalore", company: "TechNova Pvt Ltd", value: "₹8,50,000", stage: "Won", probability: 100, product: "Enterprise Suite", owner: "Vikram Joshi", ownerInitials: "VJ", closeDate: "2025-05-15", followUp: "2025-05-15", lastActivity: "2025-01-15" },
  { id: 2, title: "Horizon Retail Suite", subtext: "Delhi", company: "Horizon Retail Co", value: "₹9,20,000", stage: "Won", probability: 100, product: "Retail Suite", owner: "Aditya Kumar", ownerInitials: "AK", closeDate: "2025-05-20", followUp: "2025-05-20", lastActivity: "2025-01-22" },
  { id: 3, title: "GreenPath Consulting Module", subtext: "Mumbai", company: "GreenPath Solutions", value: "₹3,20,000", stage: "Proposal Sent", probability: 70, product: "Consulting Module", owner: "Meena Reddy", ownerInitials: "MR", closeDate: "2025-04-30", followUp: "2025-03-01", lastActivity: "2025-02-16" },
  { id: 4, title: "MediCore Healthcare Module", subtext: "Ahmedabad", company: "MediCore India", value: "₹5,00,000", stage: "Negotiation", probability: 85, product: "Healthcare Module", owner: "Aditya Kumar", ownerInitials: "AK", closeDate: "2025-05-10", followUp: "2025-03-05", lastActivity: "2025-02-10" },
  { id: 5, title: "EduLeap Education Suite", subtext: "Pune", company: "EduLeap Foundation", value: "₹6,25,000", stage: "Meeting/Demo", probability: 50, product: "Education Suite", owner: "Aditya Kumar", ownerInitials: "AK", closeDate: "2025-05-25", followUp: "2025-03-02", lastActivity: "2025-02-05" },
  { id: 6, title: "FinPlex SaaS Starter", subtext: "Chennai", company: "FinPlex Systems", value: "₹5,80,000", stage: "Qualified", probability: 40, product: "SaaS Starter", owner: "Kavya Shah", ownerInitials: "KS", closeDate: "2025-06-01", followUp: "2025-03-10", lastActivity: "2025-02-08" },
  { id: 7, title: "CloudSoft CRM Pro", subtext: "Hyderabad", company: "CloudSoft India", value: "₹7,00,000", stage: "Qualified", probability: 40, product: "CRM Pro", owner: "Meena Reddy", ownerInitials: "MR", closeDate: "2025-06-15", followUp: "2025-03-12", lastActivity: "2025-02-12" },
  { id: 8, title: "AutoParts Hub - Lead", subtext: "Surat", company: "AutoParts Hub", value: "₹5,00,000", stage: "Lead", probability: 10, product: "SaaS Starter", owner: "Kavya Shah", ownerInitials: "KS", closeDate: "2025-07-01", followUp: "2025-03-20", lastActivity: "2025-02-10" },
];

export default function AdminDealsPage() {
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [ownerFilter, setOwnerFilter] = useState("All Owners");

  const filtered = deals.filter((row) => {
    const matchSearch =
      !search ||
      row.title.toLowerCase().includes(search.toLowerCase()) ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.product.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === "All Stages" || row.stage === stageFilter;
    const matchOwner = ownerFilter === "All Owners" || row.owner === ownerFilter;
    return matchSearch && matchStage && matchOwner;
  });

  const wonDeals = deals.filter((d) => d.stage === "Won");
  const lostDeals = deals.filter((d) => d.stage === "Lost");
  const pipelineDeals = deals.filter((d) => d.stage !== "Won" && d.stage !== "Lost");
  const wonRevenue = wonDeals.reduce((sum, d) => sum + parseInt(d.value.replace(/[₹,]/g, ""), 10), 0);
  const pipelineValue = pipelineDeals.reduce((sum, d) => sum + parseInt(d.value.replace(/[₹,]/g, ""), 10), 0);
  const totalValue = wonRevenue + pipelineValue;
  const avgDealValue = deals.length ? Math.round(totalValue / deals.length) : 0;
  const winRate = deals.length ? Math.round((wonDeals.length / deals.length) * 100) : 0;

  const formatCurrency = (n) => "₹" + n.toLocaleString("en-IN");

  const handleDelete = (id) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Deals</h1>
          <p className="text-sm text-body">/ Sales Pipeline</p>
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
            Add Deal
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Six KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Deals</p>
            <p className="text-2xl font-bold text-blue-600">{deals.length}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Active Pipeline</p>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(pipelineValue)}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Won Revenue</p>
            <p className="text-2xl font-bold text-success">{formatCurrency(wonRevenue)}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Lost</p>
            <p className="text-2xl font-bold text-danger">{lostDeals.length}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Win Rate</p>
            <p className="text-2xl font-bold text-amber-600">{winRate}%</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Avg Deal Value</p>
            <p className="text-2xl font-bold text-brand">{formatCurrency(avgDealValue)}</p>
          </div>
        </div>

        {/* Sales Pipeline table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-brand-dark mb-4">Sales Pipeline</h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                placeholder="Search deals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-52"
              />
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer pr-8"
              >
                <option>All Stages</option>
                <option>Lead</option>
                <option>Qualified</option>
                <option>Meeting/Demo</option>
                <option>Negotiation</option>
                <option>Proposal Sent</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer pr-8"
              >
                <option>All Owners</option>
                <option>Vikram Joshi</option>
                <option>Meena Reddy</option>
                <option>Aditya Kumar</option>
                <option>Kavya Shah</option>
              </select>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-body hover:bg-gray-50 text-sm font-medium transition"
              >
                <LayoutGrid className="w-4 h-4" strokeWidth={2} />
                Kanban
              </button>
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
            <table className="w-full min-w-[1200px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Deal Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Value</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Stage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Probability</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Owner</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Close Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Follow-up</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Last Activity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 text-body">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-brand-dark">{row.title}</p>
                        <p className="text-xs text-body">{row.subtext}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.company}</td>
                    <td className="py-4 px-4 font-medium text-brand-dark">{row.value}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STAGE_STYLES[row.stage] || "bg-gray-100 text-gray-700"}`}>
                        {row.stage}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden max-w-[60px]">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: `${row.probability}%` }}
                          />
                        </div>
                        <span className="text-body text-xs font-medium tabular-nums">{row.probability}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.product}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                          {row.ownerInitials}
                        </span>
                        <span className="text-body">{row.owner}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body">{row.closeDate}</td>
                    <td className="py-4 px-4 text-body">{row.followUp}</td>
                    <td className="py-4 px-4 text-body">{row.lastActivity}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="Edit deal"
                        >
                          <Pencil className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="View deal"
                        >
                          <Eye className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="p-2 rounded-lg text-body hover:bg-red-50 hover:text-danger transition"
                          aria-label="Delete deal"
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
            <div className="py-12 text-center text-body text-sm">No deals match your filters.</div>
          )}
        </div>
      </div>
    </>
  );
}
