import React, { useState } from "react";
import { Bell, Wallet, Plus, Download, Pencil, X, Save } from "lucide-react";

const inputClass = "w-full px-3 py-2.5 rounded-xl bg-brand-soft border border-gray-200 text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm";
const labelClass = "block text-xs font-medium text-body uppercase tracking-wider mb-1.5";

const formatINR = (n) => (n == null || isNaN(n) ? "0" : "₹" + Number(n).toLocaleString("en-IN"));

function AddExpenseModal({ open, onClose, onSave }) {
  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

  const [form, setForm] = useState({
    title: "",
    category: "Infrastructure",
    amount: "",
    vendor: "",
    status: "Paid",
    paymentMethod: "",
    date: todayStr,
    receiptNo: "REF-" + String(Math.floor(100 + Math.random() * 900)).padStart(3, "0"),
    recurring: "No",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title?.trim()) return;
    const amountNum = parseFloat(String(form.amount).replace(/,/g, "")) || 0;
    const recurringDisplay = form.recurring === "No" ? "One-off" : form.recurring;
    const newExpense = {
      id: Date.now(),
      title: form.title.trim(),
      category: form.category,
      amount: formatINR(amountNum),
      vendor: form.vendor?.trim() || "-",
      status: form.status,
      method: form.paymentMethod || "-",
      date: form.date || "-",
      recurring: recurringDisplay,
      receiptNo: form.receiptNo?.trim() || "-",
      notes: form.notes?.trim() || "-",
    };
    onSave(newExpense);
    setForm({
      title: "",
      category: "Infrastructure",
      amount: "",
      vendor: "",
      status: "Paid",
      paymentMethod: "",
      date: todayStr,
      receiptNo: "REF-" + String(Math.floor(100 + Math.random() * 900)).padStart(3, "0"),
      recurring: "No",
      notes: "",
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-brand-dark">Add Expense</h2>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition" aria-label="Close">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Expense title" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                <option>Infrastructure</option>
                <option>Rent</option>
                <option>Salaries</option>
                <option>Software</option>
                <option>Travel</option>
                <option>Marketing</option>
                <option>Utilities</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Amount (₹) *</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="0" min="0" step="1" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Vendor</label>
              <input type="text" name="vendor" value={form.vendor} onChange={handleChange} placeholder="Vendor name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option>Paid</option>
                <option>Pending</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Payment Method</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className={inputClass}>
                <option value="">Select</option>
                <option>Bank Transfer</option>
                <option>Credit Card</option>
                <option>UPI</option>
                <option>Auto-debit</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input type="text" name="date" value={form.date} onChange={handleChange} placeholder="dd-mm-yyyy" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Receipt #</label>
              <input type="text" name="receiptNo" value={form.receiptNo} onChange={handleChange} placeholder="REF-001" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Recurring?</label>
              <select name="recurring" value={form.recurring} onChange={handleChange} className={inputClass}>
                <option>No</option>
                <option>Yes Monthly</option>
                <option>One-off</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Additional details" className={inputClass} />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-gray-200 text-body hover:bg-gray-50 font-medium text-sm transition">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm shadow-sm hover:opacity-95 transition">
              <Save className="w-4 h-4" strokeWidth={2} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const CATEGORY_STYLES = {
  Infrastructure: "bg-slate-100 text-slate-700",
  Rent: "bg-amber-100 text-amber-700",
  Salaries: "bg-emerald-100 text-emerald-700",
  Software: "bg-blue-100 text-blue-700",
  Travel: "bg-cyan-100 text-cyan-700",
  Marketing: "bg-pink-100 text-pink-700",
  Utilities: "bg-violet-100 text-violet-700",
};

const STATUS_STYLES = {
  Paid: "bg-success/15 text-success",
  Pending: "bg-warning/15 text-warning",
};

const RECURRING_STYLES = {
  "Yes Monthly": "bg-teal-100 text-teal-700",
  "One-off": "bg-gray-100 text-gray-600",
};

const INITIAL_EXPENSES = [
  { id: 1, title: "AWS Cloud Hosting", category: "Infrastructure", amount: "₹42,000", vendor: "Amazon Web Services", status: "Paid", method: "Credit Card", date: "2025-01-31", recurring: "Yes Monthly", receiptNo: "AWS-JAN-2025", notes: "Production servers" },
  { id: 2, title: "Office Rent - Feb", category: "Rent", amount: "₹85,000", vendor: "Prestige Properties", status: "Paid", method: "Bank Transfer", date: "2025-02-01", recurring: "Yes Monthly", receiptNo: "RENT FEB 2025", notes: "Hyderabad Office - 3rd Floor" },
  { id: 3, title: "Salaries - Feb 2025", category: "Salaries", amount: "₹6,80,000", vendor: "Payroll", status: "Paid", method: "Bank Transfer", date: "2025-02-28", recurring: "Yes Monthly", receiptNo: "PAY-FEB-2025", notes: "18 employees" },
  { id: 4, title: "Google Workspace", category: "Software", amount: "₹12,500", vendor: "Google", status: "Paid", method: "Credit Card", date: "2025-02-01", recurring: "Yes Monthly", receiptNo: "GOOG-FEB-2025", notes: "50 seats" },
  { id: 5, title: "Sales Conference Hyderabad", category: "Travel", amount: "₹35,000", vendor: "Multiple", status: "Paid", method: "Credit Card", date: "2025-02-15", recurring: "One-off", receiptNo: "TRAVEL-FEB-2025", notes: "Annual sales meetup" },
  { id: 6, title: "Marketing - LinkedIn Ads", category: "Marketing", amount: "₹28,000", vendor: "LinkedIn", status: "Paid", method: "Credit Card", date: "2025-02-20", recurring: "One-off", receiptNo: "LI-FEB-2025", notes: "Lead gen campaign Q1" },
  { id: 7, title: "Internet & Telecom", category: "Utilities", amount: "₹8,500", vendor: "Jio Business", status: "Paid", method: "Auto-debit", date: "2025-02-05", recurring: "Yes Monthly", receiptNo: "JIO-FEB-2025", notes: "-" },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const filtered = expenses.filter((row) => {
    const matchSearch =
      !search ||
      row.title.toLowerCase().includes(search.toLowerCase()) ||
      row.vendor.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "All Categories" || row.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Expenses</h1>
          <p className="text-sm text-body">/ Cost Tracking</p>
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
            onClick={() => setShowAddExpenseModal(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm shadow-sm hover:opacity-95 transition"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Add Expense
          </button>
        </div>
      </header>

      <AddExpenseModal
        open={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
        onSave={(exp) => setExpenses((prev) => [exp, ...prev])}
      />

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Four summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Spent</p>
            <p className="text-lg font-bold text-danger">₹9,42,200</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending Payment</p>
            <p className="text-lg font-bold text-warning">₹42,000</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Recurring Expenses</p>
            <p className="text-lg font-bold text-brand-dark">6</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Records</p>
            <p className="text-lg font-bold text-brand-dark">10</p>
          </div>
        </div>

        {/* Expenses table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-brand-dark flex items-center gap-2">
              <Wallet className="w-5 h-5 text-brand" strokeWidth={2} />
              Expenses
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                placeholder="Search title, vendor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-48"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer pr-8"
              >
                <option>All Categories</option>
                <option>Infrastructure</option>
                <option>Rent</option>
                <option>Salaries</option>
                <option>Software</option>
                <option>Travel</option>
                <option>Marketing</option>
                <option>Utilities</option>
              </select>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-body hover:bg-brand-light text-sm font-medium transition"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">S.no</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Vendor</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Recurring</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Receipt #</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Notes</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 text-body">{idx + 1}</td>
                    <td className="py-4 px-4 font-medium text-brand-dark">{row.title}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_STYLES[row.category] || "bg-gray-100 text-gray-700"}`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-brand-dark">{row.amount}</td>
                    <td className="py-4 px-4 text-body">{row.vendor}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[row.status] || "bg-gray-100 text-gray-700"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-body">{row.method}</td>
                    <td className="py-4 px-4 text-body">{row.date}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${RECURRING_STYLES[row.recurring] || "bg-gray-100 text-gray-700"}`}>
                        {row.recurring}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-body">{row.receiptNo}</td>
                    <td className="py-4 px-4 text-body max-w-[140px] truncate" title={row.notes}>{row.notes}</td>
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => {}}
                        className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                        aria-label="Edit expense"
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
            <div className="py-12 text-center text-body text-sm">No expenses match your filters.</div>
          )}
        </div>
      </div>
    </>
  );
}
