import React, { useState } from "react";
import { Bell, Receipt, Plus, Download, Pencil, X, Save } from "lucide-react";

const inputClass = "w-full px-3 py-2.5 rounded-xl bg-brand-soft border border-gray-200 text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm";
const labelClass = "block text-xs font-medium text-body uppercase tracking-wider mb-1.5";

const formatINR = (n) => (n == null || isNaN(n) ? "0" : "₹" + Number(n).toLocaleString("en-IN"));

function RecordPaymentModal({ open, onClose, onSave }) {
  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

  const [form, setForm] = useState({
    client: "",
    amount: "",
    date: todayStr,
    paymentMethod: "",
    referenceNo: "",
    invoiceRef: "INV-2025-001",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.client?.trim()) return;
    const amountNum = parseFloat(String(form.amount).replace(/,/g, "")) || 0;
    const newPayment = {
      id: Date.now(),
      client: form.client.trim(),
      amount: formatINR(amountNum),
      date: form.date || todayStr,
      method: form.paymentMethod || "-",
      referenceNo: form.referenceNo?.trim() || "-",
      invoiceRef: form.invoiceRef?.trim() || "-",
      notes: form.notes?.trim() || "-",
    };
    onSave(newPayment);
    setForm({
      client: "",
      amount: "",
      date: todayStr,
      paymentMethod: "",
      referenceNo: "",
      invoiceRef: "INV-2025-001",
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
          <h2 className="text-lg font-bold text-brand-dark">Record Payment</h2>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition" aria-label="Close">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Client *</label>
                <input type="text" name="client" value={form.client} onChange={handleChange} placeholder="Client or candidate name" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input type="text" name="date" value={form.date} onChange={handleChange} placeholder="dd-mm-yyyy" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Reference / UTR #</label>
                <input type="text" name="referenceNo" value={form.referenceNo} onChange={handleChange} placeholder="Transaction reference" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Additional notes" className={inputClass} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Amount (₹) *</label>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="0" min="0" step="1" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Payment Method</label>
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className={inputClass}>
                  <option value="">Select</option>
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Credit Card</option>
                  <option>Cash</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Invoice Reference</label>
                <input type="text" name="invoiceRef" value={form.invoiceRef} onChange={handleChange} placeholder="INV-2025-001" className={inputClass} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
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

const INITIAL_PAYMENTS = [
  { id: 1, client: "TechNova Pvt Ltd", amount: "₹10,03,000", date: "2025-01-28", method: "Bank Transfer", referenceNo: "NEFT/TN/202501280", invoiceRef: "Inv1", notes: "Full payment received" },
  { id: 2, client: "MediCore India", amount: "₹10,85,600", date: "2025-02-25", method: "UPI", referenceNo: "UPI-MC-20250225", invoiceRef: "Inv2", notes: "Training fee - Full Stack" },
  { id: 3, client: "Mohit Gupta", amount: "₹35,100", date: "2025-02-10", method: "Credit Card", referenceNo: "CC-MG-20250210", invoiceRef: "Inv5", notes: "First installment 50%" },
  { id: 4, client: "Ratul MaxGroup", amount: "₹29,500", date: "2025-02-06", method: "Bank Transfer", referenceNo: "NEFT-RM-20250206", invoiceRef: "Inv6", notes: "Onboarding fee" },
  { id: 5, client: "Lata Krishnan", amount: "₹29,500", date: "2025-02-05", method: "UPI", referenceNo: "UPI-LK-20250205", invoiceRef: "Inv6", notes: "Certification program" },
  { id: 6, client: "EduLearn Pvt Ltd", amount: "₹54,150", date: "2025-02-18", method: "Bank Transfer", referenceNo: "NEFT-EL-20250218", invoiceRef: "Inv8", notes: "Corporate training batch" },
  { id: 7, client: "Dev Mahajan & Co", amount: "₹14,000", date: "2025-01-20", method: "UPI", referenceNo: "UPI-DM-20250120", invoiceRef: "Inv3", notes: "Partial - training advance" },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [search, setSearch] = useState("");
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);

  const filtered = payments.filter(
    (row) =>
      !search ||
      row.client.toLowerCase().includes(search.toLowerCase()) ||
      row.referenceNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Payments Received</h1>
          <p className="text-sm text-body">/ Payment Ledger</p>
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
            onClick={() => setShowRecordPaymentModal(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm shadow-sm hover:opacity-95 transition"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Record Payment
          </button>
        </div>
      </header>

      <RecordPaymentModal
        open={showRecordPaymentModal}
        onClose={() => setShowRecordPaymentModal(false)}
        onSave={(p) => setPayments((prev) => [p, ...prev])}
      />

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Three summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Received</p>
            <p className="text-lg font-bold text-success">₹22,50,850</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Transactions</p>
            <p className="text-lg font-bold text-brand-dark">7</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">This Month</p>
            <p className="text-lg font-bold text-brand-dark">₹0</p>
          </div>
        </div>

        {/* Payment Ledger */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-brand-dark flex items-center gap-2">
              <Receipt className="w-5 h-5 text-brand" strokeWidth={2} />
              Payment Ledger
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                placeholder="Search client, reference..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-52"
              />
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
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">S.no</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Client</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Reference #</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Invoice Ref</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Notes</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 text-body">{idx + 1}</td>
                    <td className="py-4 px-4 font-medium text-brand-dark">{row.client}</td>
                    <td className="py-4 px-4 text-right font-medium text-success">{row.amount}</td>
                    <td className="py-4 px-4 text-body">{row.date}</td>
                    <td className="py-4 px-4 text-body">{row.method}</td>
                    <td className="py-4 px-4 text-body">{row.referenceNo}</td>
                    <td className="py-4 px-4 text-body">{row.invoiceRef}</td>
                    <td className="py-4 px-4 text-body max-w-[160px] truncate" title={row.notes}>{row.notes}</td>
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => {}}
                        className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                        aria-label="Edit payment"
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
            <div className="py-12 text-center text-body text-sm">No payments match your search.</div>
          )}
        </div>
      </div>
    </>
  );
}
