import React, { useState } from "react";
import { Bell, Filter, Plus, Pencil } from "lucide-react";
import AddDealModal from "./AddDealModal";

const STAGE_STYLES = {
  Lead: "bg-gray-100 text-gray-700",
  Contacted: "bg-blue-100 text-blue-700",
  Demo: "bg-cyan-100 text-cyan-700",
  Proposal: "bg-brand-soft text-brand",
  Negotiation: "bg-warning/15 text-warning",
  Won: "bg-success/15 text-success",
  Lost: "bg-danger/15 text-danger",
};

const SOURCE_STYLES = {
  Referral: "bg-success/15 text-success",
  "Cold Call": "bg-warning/15 text-warning",
  Website: "bg-blue-100 text-blue-700",
};

const INITIAL_DEALS = [
  {
    id: 1,
    company: "TechNova Pvt Ltd",
    location: "Bangalore",
    contact: "Suresh Rajan",
    email: "suresh@technova.com",
    dealValue: "₹8,50,000",
    stage: "Won",
    probability: 100,
    owner: "Vikram Joshi",
    ownerInitials: "VI",
    source: "Referral",
    industry: "Technology",
    followUp: "2025-03-15",
    expectedClose: "2025-01-15",
    lastActivity: "2025-02-15",
  },
  {
    id: 2,
    company: "Horizon Retail Co",
    location: "Delhi",
    contact: "Dev Malhotra",
    email: "dev@horizon.co",
    dealValue: "₹12,00,000",
    stage: "Negotiation",
    probability: 75,
    owner: "Vikram Joshi",
    ownerInitials: "VI",
    source: "Cold Call",
    industry: "Retail",
    followUp: "2025-02-28",
    expectedClose: "2025-03-20",
    lastActivity: "2025-02-22",
  },
  {
    id: 3,
    company: "SwiftLogix",
    location: "Chennai",
    contact: "Kavya Rao",
    email: "kavya@swiftlogic.in",
    dealValue: "₹1,80,000",
    stage: "Lost",
    probability: 0,
    owner: "Vikram Joshi",
    ownerInitials: "VI",
    source: "Website",
    industry: "Logistics",
    followUp: "",
    expectedClose: "2025-01-30",
    lastActivity: "2025-01-30",
  },
];

export default function PipelinePage() {
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [showAddDealModal, setShowAddDealModal] = useState(false);

  const filtered = deals.filter((row) => {
    const matchSearch =
      !search ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.contact.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === "All Stages" || row.stage === stageFilter;
    return matchSearch && matchStage;
  });

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Sales Pipeline</h1>
          <p className="text-sm text-body">/ CRM &amp; Deals</p>
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
          <button
            type="button"
            onClick={() => setShowAddDealModal(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm shadow-sm hover:opacity-95 transition"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Add Deal
          </button>
        </div>
      </header>

      <AddDealModal
        open={showAddDealModal}
        onClose={() => setShowAddDealModal(false)}
        onSave={(deal) => setDeals((prev) => [deal, ...prev])}
      />

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Six metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Deals</p>
            <p className="text-lg font-bold text-brand">3</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Pipeline</p>
            <p className="text-lg font-bold text-brand">1</p>
            <p className="text-xs text-body mt-0.5">₹12,00,000</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Won</p>
            <p className="text-lg font-bold text-success">1</p>
            <p className="text-xs text-body mt-0.5">₹8,50,000</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Lost</p>
            <p className="text-lg font-bold text-danger">1</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Win Rate</p>
            <p className="text-lg font-bold text-warning">33%</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Avg Deal Value</p>
            <p className="text-lg font-bold text-brand">₹7,43,333</p>
          </div>
        </div>

        {/* Sales Pipeline table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-brand-dark flex items-center gap-2">
              <Filter className="w-5 h-5 text-brand" strokeWidth={2} />
              Sales Pipeline
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                placeholder="Search company, contact..."
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
                <option>Contacted</option>
                <option>Demo</option>
                <option>Proposal</option>
                <option>Negotiation</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Contact</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Deal Value</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Stage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Probability</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Owner</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Source</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Industry</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Follow-up</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Expected Close</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Last Activity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 text-body">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-brand-dark">{row.company}</p>
                      <p className="text-xs text-body">{row.location}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-brand-dark">{row.contact}</p>
                      <p className="text-xs text-body">{row.email}</p>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-brand-dark">{row.dealValue}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STAGE_STYLES[row.stage] || "bg-gray-100 text-gray-700"}`}>
                        {row.stage}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${row.probability >= 50 ? "bg-success" : "bg-danger"}`}
                            style={{ width: `${row.probability}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium tabular-nums">{row.probability}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-brand-soft flex items-center justify-center text-brand font-semibold text-xs">
                          {row.ownerInitials}
                        </span>
                        <span className="text-body">{row.owner}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${SOURCE_STYLES[row.source] || "bg-gray-100 text-gray-700"}`}>
                        {row.source}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-body">{row.industry}</td>
                    <td className="py-4 px-4 text-body">{row.followUp || "-"}</td>
                    <td className="py-4 px-4 text-body">{row.expectedClose}</td>
                    <td className="py-4 px-4 text-body">{row.lastActivity}</td>
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => {}}
                        className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                        aria-label="Edit deal"
                      >
                        <Pencil className="w-4 h-4" strokeWidth={2} />
                      </button>
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
