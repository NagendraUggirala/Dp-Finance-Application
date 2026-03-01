import React, { useState, useRef } from "react";
import { Bell, Folder, Plus, Pencil, Eye, FileText, FileAudio, X, Save, Paperclip, Calendar } from "lucide-react";

const inputClass =
  "w-full px-3 py-2.5 rounded-xl bg-brand-soft border border-gray-200 text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm";
const labelClass = "block text-xs font-medium text-body uppercase tracking-wider mb-1.5";

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function UploadDocumentModal({ open, onClose, onSave }) {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    fileName: "",
    fileType: "Proposal",
    company: "",
    fileSize: "",
    linkedDeal: "",
    linkedContact: "",
    uploadDate: new Date().toISOString().slice(0, 10),
    notes: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return; // could show toast
    }
    setSelectedFile(file);
    setForm((prev) => ({
      ...prev,
      fileName: file.name,
      fileSize: formatFileSize(file.size),
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fileName?.trim()) return;
    const newDoc = {
      id: Date.now(),
      fileName: form.fileName.trim(),
      type: form.fileType,
      company: form.company?.trim() || "-",
      linkedDeal: form.linkedDeal || "-",
      uploadedBy: "Vikram Joshi",
      uploadedByInitials: "VJ",
      date: form.uploadDate,
      size: form.fileSize || "-",
      notes: form.notes?.trim() || "",
    };
    onSave(newDoc);
    setForm({
      fileName: "",
      fileType: "Proposal",
      company: "",
      fileSize: "",
      linkedDeal: "",
      linkedContact: "",
      uploadDate: new Date().toISOString().slice(0, 10),
      notes: "",
    });
    setSelectedFile(null);
    onClose();
  };

  const resetForm = () => {
    setForm({
      fileName: "",
      fileType: "Proposal",
      company: "",
      fileSize: "",
      linkedDeal: "",
      linkedContact: "",
      uploadDate: new Date().toISOString().slice(0, 10),
      notes: "",
    });
    setSelectedFile(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={resetForm} aria-hidden />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-brand-dark">Upload Document</h2>
          <button
            type="button"
            onClick={resetForm}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-3 border-b border-brand/30 pb-2">
            File Upload
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.mp3,.mp4"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition mb-6 ${
              isDragging ? "border-brand bg-brand-soft" : "border-gray-200 hover:border-brand hover:bg-brand-soft/50"
            }`}
          >
            <Paperclip className="w-12 h-12 mx-auto text-brand mb-3" strokeWidth={1.5} />
            <p className="text-body font-medium">Click to select file or drag & drop</p>
            <p className="text-xs text-brand mt-1">PDF, DOC, MP3, MP4 up to 50MB</p>
            {selectedFile && (
              <p className="text-sm text-success mt-2">{selectedFile.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div>
              <label className={labelClass}>File Name *</label>
              <input
                type="text"
                name="fileName"
                value={form.fileName}
                onChange={handleChange}
                placeholder="document.pdf"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>File Type</label>
              <select name="fileType" value={form.fileType} onChange={handleChange} className={inputClass}>
                <option>Proposal</option>
                <option>Call Recording</option>
                <option>Contract</option>
                <option>Document</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div>
              <label className={labelClass}>Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>File Size</label>
              <input
                type="text"
                name="fileSize"
                value={form.fileSize}
                onChange={handleChange}
                placeholder="e.g. 2.4 MB"
                className={inputClass}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div>
              <label className={labelClass}>Linked Deal</label>
              <select name="linkedDeal" value={form.linkedDeal} onChange={handleChange} className={inputClass}>
                <option value="">— None —</option>
                <option>Horizon Retail Integration</option>
                <option>TechNova Enterprise License</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Linked Contact</label>
              <select name="linkedContact" value={form.linkedContact} onChange={handleChange} className={inputClass}>
                <option value="">— None —</option>
                <option>Suresh Rajan</option>
                <option>Dev Malhotra</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClass}>Upload Date</label>
            <div className="relative">
              <input
                type="date"
                name="uploadDate"
                value={form.uploadDate}
                onChange={handleChange}
                className={inputClass + " pr-10"}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={2} />
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClass}>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Additional notes..."
              className={inputClass + " min-h-[80px] resize-y"}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-body hover:bg-gray-50 font-medium text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm shadow-sm hover:opacity-95 transition"
            >
              <Save className="w-4 h-4" strokeWidth={2} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const getInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const INITIAL_DOCUMENTS = [
  {
    id: 1,
    fileName: "TechNova_Enterprise_Proposal.pdf",
    type: "Proposal",
    company: "TechNova Pvt Ltd",
    linkedDeal: "TechNova Enterprise License",
    uploadedBy: "Vikram Joshi",
    uploadedByInitials: "VJ",
    date: "2025-01-17",
    size: "2.4 MB",
    notes: "Final accepted proposal",
  },
  {
    id: 2,
    fileName: "Discovery Call TechNova.mp3",
    type: "Call Recording",
    company: "TechNova Pvt Ltd",
    linkedDeal: "TechNova Enterprise License",
    uploadedBy: "Vikram Joshi",
    uploadedByInitials: "VJ",
    date: "2025-01-15",
    size: "8.2 MB",
    notes: "Initial discovery call",
  },
  {
    id: 3,
    fileName: "Horizon_Negotiation_Call.mp3",
    type: "Call Recording",
    company: "Horizon Retail Co",
    linkedDeal: "Horizon Retail Integration",
    uploadedBy: "Vikram Joshi",
    uploadedByInitials: "VJ",
    date: "2025-02-18",
    size: "5.7 MB",
    notes: "Discount discussion call",
  },
];

function FileIcon({ type, className }) {
  if (type === "Call Recording") {
    return <FileAudio className={className} strokeWidth={2} />;
  }
  return <FileText className={className} strokeWidth={2} />;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filtered = documents.filter((row) => {
    const matchSearch =
      !search ||
      row.fileName?.toLowerCase().includes(search.toLowerCase()) ||
      row.company?.toLowerCase().includes(search.toLowerCase()) ||
      row.linkedDeal?.toLowerCase().includes(search.toLowerCase()) ||
      row.notes?.toLowerCase().includes(search.toLowerCase());
    const matchType =
      typeFilter === "All Types" ||
      row.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalFiles = documents.length;
  const callRecordings = documents.filter((d) => d.type === "Call Recording").length;
  const proposals = documents.filter((d) => d.type === "Proposal").length;
  const contracts = documents.filter((d) => d.type === "Contract").length;

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Documents</h1>
          <p className="text-sm text-body">/ File Management</p>
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
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm shadow-sm hover:opacity-95 transition"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Upload File
          </button>
        </div>
      </header>

      <UploadDocumentModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSave={(doc) => setDocuments((prev) => [doc, ...prev])}
      />

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Summary cards - same style as Finance */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="group rounded-2xl bg-gradient-to-br from-brand-soft to-white border border-brand-light/80 p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold text-brand-dark/80 uppercase tracking-wider mb-1.5">Total Files</p>
                <p className="text-2xl font-bold text-brand-dark tabular-nums tracking-tight">{totalFiles}</p>
                <p className="text-xs text-gray-500 mt-1.5">Files</p>
              </div>
              <span className="w-11 h-11 rounded-xl bg-brand-light flex items-center justify-center group-hover:scale-105 transition-transform">
                <Folder className="w-5 h-5 text-brand" strokeWidth={2} />
              </span>
            </div>
          </div>
          <div className="group rounded-2xl bg-gradient-to-br from-violet-50 to-white border border-violet-100/60 p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold text-violet-600/90 uppercase tracking-wider mb-1.5">Call Recordings</p>
                <p className="text-2xl font-bold text-violet-700 tabular-nums tracking-tight">{callRecordings}</p>
                <p className="text-xs text-gray-500 mt-1.5">Recordings</p>
              </div>
              <span className="w-11 h-11 rounded-xl bg-violet-100/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileAudio className="w-5 h-5 text-violet-600" strokeWidth={2} />
              </span>
            </div>
          </div>
          <div className="group rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100/60 p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold text-teal-600/90 uppercase tracking-wider mb-1.5">Proposals</p>
                <p className="text-2xl font-bold text-teal-700 tabular-nums tracking-tight">{proposals}</p>
                <p className="text-xs text-gray-500 mt-1.5">Count</p>
              </div>
              <span className="w-11 h-11 rounded-xl bg-teal-100/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-teal-600" strokeWidth={2} />
              </span>
            </div>
          </div>
          <div className="group rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100/60 p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold text-blue-600/90 uppercase tracking-wider mb-1.5">Contracts</p>
                <p className="text-2xl font-bold text-blue-700 tabular-nums tracking-tight">{contracts}</p>
                <p className="text-xs text-gray-500 mt-1.5">Count</p>
              </div>
              <span className="w-11 h-11 rounded-xl bg-blue-100/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </span>
            </div>
          </div>
        </div>

        {/* Document Library table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-brand-dark flex items-center gap-2">
              <Folder className="w-5 h-5 text-brand" strokeWidth={2} />
              Document Library
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-52"
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer pr-8"
              >
                <option>All Types</option>
                <option>Proposal</option>
                <option>Call Recording</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-max min-w-[1000px] text-sm table-fixed">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-right py-3 px-3 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">File Name</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Linked Deal</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Uploaded By</th>
                  <th className="text-center py-3 px-3 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Size</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Notes</th>
                  <th className="text-center py-3 px-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 text-right text-body tabular-nums">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-8 h-8 rounded-lg bg-brand-soft flex items-center justify-center text-brand shrink-0">
                          <FileIcon type={row.type} className="w-4 h-4" />
                        </span>
                        <span className="font-medium text-brand-dark truncate" title={row.fileName}>{row.fileName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.type === "Proposal"
                            ? "bg-success/15 text-success"
                            : row.type === "Call Recording"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-teal-100 text-teal-700"
                        }`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-body truncate" title={row.company}>{row.company}</td>
                    <td className="py-3 px-3">
                      <button type="button" className="text-brand hover:underline font-medium text-left truncate max-w-full" title={row.linkedDeal}>
                        {row.linkedDeal}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-semibold text-xs shrink-0">
                          {row.uploadedByInitials}
                        </span>
                        <span className="text-body truncate" title={row.uploadedBy}>{row.uploadedBy}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center text-body tabular-nums whitespace-nowrap">{row.date}</td>
                    <td className="py-3 px-3 text-body tabular-nums">{row.size}</td>
                    <td className="py-3 px-3 text-body truncate max-w-0" title={row.notes}>{row.notes}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => {}}
                          className="inline-flex p-2 rounded-lg text-body hover:bg-gray-100 transition"
                          aria-label="View file"
                        >
                          <Eye className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {}}
                          className="inline-flex p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                          aria-label="Edit file"
                        >
                          <Pencil className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-body text-sm">No documents match your filters.</div>
          )}
        </div>
      </div>
    </>
  );
}
