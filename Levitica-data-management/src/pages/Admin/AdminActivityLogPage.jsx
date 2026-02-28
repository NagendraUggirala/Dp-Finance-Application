import React, { useState } from "react";
import {
  Bell,
  Plus,
  Pencil,
  Trash2,
  Check,
  FileText,
  Clock,
} from "lucide-react";

const TYPE_STYLES = {
  Call: "bg-blue-100 text-blue-700",
  Email: "bg-violet-100 text-violet-700",
  Meeting: "bg-amber-100 text-amber-700",
  "Follow-up": "bg-emerald-100 text-emerald-700",
};

const PRIORITY_STYLES = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-gray-100 text-gray-600",
};

const TASK_STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700",
  Done: "bg-emerald-100 text-emerald-700",
};

const INITIAL_ACTIVITIES = [
  { id: 1, type: "Email", subject: "Proposal Sent - GreenPath", company: "GreenPath Solutions", outcome: "", duration: "", rep: "Meena Reddy", repInitials: "MR", dealLinked: "GreenPath Consulting Module", date: "2025-02-18", recording: "" },
  { id: 2, type: "Call", subject: "Follow-up - GreenPath", company: "GreenPath Solutions", outcome: "Voicemail", duration: "", rep: "Meena Reddy", repInitials: "MR", dealLinked: "GreenPath Consulting Module", date: "2025-02-15", recording: "" },
  { id: 3, type: "Call", subject: "Negotiation Call - Horizon", company: "Horizon Retail Co", outcome: "Callback Requested", duration: "18min", rep: "Vikram Joshi", repInitials: "VJ", dealLinked: "Horizon Retail Integration", date: "2025-02-10", recording: "" },
  { id: 4, type: "Meeting", subject: "Product Demo - TechNova", company: "TechNova Pvt Ltd", outcome: "", duration: "60min", rep: "Vikram Joshi", repInitials: "VJ", dealLinked: "TechNova Enterprise License", date: "2025-01-18", recording: "" },
  { id: 5, type: "Email", subject: "Proposal Follow up Email", company: "TechNova Pvt Ltd", outcome: "", duration: "", rep: "Vikram Joshi", repInitials: "VJ", dealLinked: "TechNova Enterprise License", date: "2025-01-16", recording: "" },
  { id: 6, type: "Call", subject: "Initial Discovery Call", company: "TechNova Pvt Ltd", outcome: "Connected - Interested", duration: "25min", rep: "Vikram Joshi", repInitials: "VJ", dealLinked: "TechNova Enterprise License", date: "2025-01-15", recording: "" },
];

const INITIAL_FOLLOWUP_TASKS = [
  { id: 1, type: "Call", subject: "Follow-up call with Horizon Retail", company: "Horizon Retail Co", dueDate: "2025-02-28", priority: "High", status: "Pending", rep: "Vikram Joshi", repInitials: "VJ", deal: "Horizon Retail Integration" },
  { id: 2, type: "Call", subject: "Cold call batch - FinPlex", company: "FinPlex Systems", dueDate: "2025-03-01", priority: "Low", status: "Pending", rep: "Kavya Shah", repInitials: "KS", deal: "FinPlex CRM Setup" },
  { id: 3, type: "Email", subject: "Send revised proposal to GreenPath", company: "GreenPath Solutions", dueDate: "2025-03-01", priority: "High", status: "Pending", rep: "Meena Reddy", repInitials: "MR", deal: "GreenPath Consulting Module" },
  { id: 4, type: "Meeting", subject: "Demo call - EduLeap", company: "EduLeap Foundation", dueDate: "2025-03-02", priority: "Medium", status: "Pending", rep: "Aditya Kumar", repInitials: "AK", deal: "EduLeap Learning Platform" },
  { id: 5, type: "Follow-up", subject: "Check in with TechNova renewal", company: "TechNova Pvt Ltd", dueDate: "2025-03-15", priority: "Medium", status: "Pending", rep: "Vikram Joshi", repInitials: "VJ", deal: "TechNova Enterprise License" },
];

export default function AdminActivityLogPage() {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [followUpTasks, setFollowUpTasks] = useState(INITIAL_FOLLOWUP_TASKS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [taskSearch, setTaskSearch] = useState("");
  const [activeTab, setActiveTab] = useState("log"); // "log" | "followups"

  const filtered = activities.filter((row) => {
    const matchSearch =
      !search ||
      row.subject.toLowerCase().includes(search.toLowerCase()) ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.dealLinked.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All Types" || row.type === typeFilter;
    return matchSearch && matchType;
  });

  const stats = {
    total: activities.length,
    calls: activities.filter((a) => a.type === "Call").length,
    emails: activities.filter((a) => a.type === "Email").length,
    meetings: activities.filter((a) => a.type === "Meeting").length,
    overdueTasks: 5,
    pendingTasks: 5,
  };

  const filteredTasks = followUpTasks.filter(
    (row) =>
      !taskSearch ||
      row.subject.toLowerCase().includes(taskSearch.toLowerCase()) ||
      row.company.toLowerCase().includes(taskSearch.toLowerCase()) ||
      row.deal.toLowerCase().includes(taskSearch.toLowerCase())
  );

  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDeleteTask = (id) => {
    setFollowUpTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCompleteTask = (id) => {
    setFollowUpTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Done" } : t))
    );
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Activity Log</h1>
          <p className="text-sm text-body">/ Tasks & Follow-ups</p>
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
            Log Activity
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* Six summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Activities</p>
            <p className="text-2xl font-bold text-brand-dark">{stats.total}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Calls</p>
            <p className="text-2xl font-bold text-blue-600">{stats.calls}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Emails</p>
            <p className="text-2xl font-bold text-violet-600">{stats.emails}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Meetings</p>
            <p className="text-2xl font-bold text-amber-600">{stats.meetings}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Overdue Tasks</p>
            <p className="text-2xl font-bold text-danger">{stats.overdueTasks}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Pending Tasks</p>
            <p className="text-2xl font-bold text-success">{stats.pendingTasks}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("log")}
              className={`flex items-center gap-2 pb-3 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === "log"
                  ? "text-brand border-brand"
                  : "text-body border-transparent hover:text-brand-dark"
              }`}
            >
              <FileText className="w-4 h-4" strokeWidth={2} />
              Activity Log
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("followups")}
              className={`flex items-center gap-2 pb-3 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === "followups"
                  ? "text-brand border-brand"
                  : "text-body border-transparent hover:text-brand-dark"
              }`}
            >
              <Clock className="w-4 h-4" strokeWidth={2} />
              Follow-up Tasks
            </button>
          </div>
        </div>

        {activeTab === "log" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="search"
                  placeholder="Search activities..."
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
                  <option>Call</option>
                  <option>Email</option>
                  <option>Meeting</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Outcome</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Rep</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Deal Linked</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Recording</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 text-body">{idx + 1}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLES[row.type] || "bg-gray-100 text-gray-700"}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-brand-dark">{row.subject}</td>
                      <td className="py-4 px-4 text-body">{row.company}</td>
                      <td className="py-4 px-4 text-body">{row.outcome || "—"}</td>
                      <td className="py-4 px-4 text-body">{row.duration || "—"}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                            {row.repInitials}
                          </span>
                          <span className="text-body">{row.rep}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-body">{row.dealLinked}</td>
                      <td className="py-4 px-4 text-body">{row.date}</td>
                      <td className="py-4 px-4 text-body">{row.recording || "—"}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                            aria-label="Edit activity"
                          >
                            <Pencil className="w-4 h-4" strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(row.id)}
                            className="p-2 rounded-lg text-body hover:bg-red-50 hover:text-danger transition"
                            aria-label="Delete activity"
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
              <div className="py-12 text-center text-body text-sm">No activities match your filters.</div>
            )}
          </div>
        )}

        {activeTab === "followups" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-base font-semibold text-brand-dark">Follow-up Tasks</h2>
              <div className="flex items-center gap-2">
                <input
                  type="search"
                  placeholder="Search tasks..."
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-brand-soft border border-gray-200 text-sm text-body placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand w-52"
                />
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white font-medium text-sm shadow-sm transition"
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Add Task
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Rep</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Deal</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((row, idx) => (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 text-body">{idx + 1}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLES[row.type] || "bg-gray-100 text-gray-700"}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-brand-dark">{row.subject}</td>
                      <td className="py-4 px-4 text-body">{row.company}</td>
                      <td className="py-4 px-4 font-medium text-danger">{row.dueDate}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${PRIORITY_STYLES[row.priority] || "bg-gray-100 text-gray-700"}`}>
                          {row.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${TASK_STATUS_STYLES[row.status] || "bg-gray-100 text-gray-700"}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                            {row.repInitials}
                          </span>
                          <span className="text-body">{row.rep}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-body">{row.deal}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleCompleteTask(row.id)}
                            className="p-2 rounded-lg text-body hover:bg-emerald-50 hover:text-success transition"
                            aria-label="Mark complete"
                            title="Mark complete"
                          >
                            <Check className="w-4 h-4" strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-lg text-body hover:bg-brand-soft hover:text-brand transition"
                            aria-label="Edit task"
                          >
                            <Pencil className="w-4 h-4" strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTask(row.id)}
                            className="p-2 rounded-lg text-body hover:bg-red-50 hover:text-danger transition"
                            aria-label="Delete task"
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
            {filteredTasks.length === 0 && (
              <div className="py-12 text-center text-body text-sm">No follow-up tasks match your search.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
