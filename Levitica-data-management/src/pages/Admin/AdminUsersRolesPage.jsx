import React from "react";
import { Bell, Check, X, Users, User } from "lucide-react";

const USERS = [
  { initials: "AK", name: "Arjun Kapoor", email: "admin@salespulse.com", role: "Admin", roleClass: "bg-blue-100 text-blue-700", dept: "Management", modules: ["/dashboard", "/leads", "/contacts", "/companies", "/deals -6"], viewAll: true, delete: true, export: true, admin: true },
  { initials: "PN", name: "Priya Nair", email: "manager@salespulse.com", role: "Sales Manager", roleClass: "bg-emerald-100 text-emerald-700", dept: "Sales Management", modules: ["/dashboard", "/leads", "/contacts", "/companies", "/deals -7"], viewAll: true, delete: false, export: true, admin: false },
  { initials: "VJ", name: "Vikram Joshi", email: "rep1@salespulse.com", role: "Sales Rep", roleClass: "bg-amber-100 text-amber-700", dept: "Sales", modules: ["/dashboard", "/leads", "/contacts", "/companies", "/deals -4"], viewAll: false, delete: false, export: true, admin: false },
  { initials: "MR", name: "Meena Reddy", email: "rep2@salespulse.com", role: "Sales Rep", roleClass: "bg-amber-100 text-amber-700", dept: "Sales", modules: ["/dashboard", "/leads", "/contacts", "/companies", "/deals -4"], viewAll: false, delete: false, export: true, admin: false },
  { initials: "AD", name: "Aditya Kumar", email: "rep3@salespulse.com", role: "Sales Rep", roleClass: "bg-amber-100 text-amber-700", dept: "Sales", modules: ["/dashboard", "/leads", "/contacts", "/companies", "/deals -4"], viewAll: false, delete: false, export: true, admin: false },
  { initials: "KS", name: "Kavya Shah", email: "rep4@salespulse.com", role: "Sales Rep", roleClass: "bg-amber-100 text-amber-700", dept: "Sales", modules: ["/dashboard", "/leads", "/contacts", "/companies", "/deals -4"], viewAll: false, delete: false, export: true, admin: false },
];

const ROLE_MATRIX = [
  { permission: "View All Records", admin: true, salesManager: true, salesRep: false },
  { permission: "Edit Own Records", admin: true, salesManager: true, salesRep: true },
  { permission: "Delete Records", admin: true, salesManager: false, salesRep: false },
  { permission: "Export Data", admin: true, salesManager: true, salesRep: false },
  { permission: "Bulk Import", admin: true, salesManager: true, salesRep: false },
  { permission: "Manage Users", admin: true, salesManager: false, salesRep: false },
  { permission: "View Reports", admin: true, salesManager: true, salesRep: true },
];

export default function AdminUsersRolesPage() {
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-brand-dark">Users & Roles</h1>
          <p className="text-sm text-body">/ Access Control</p>
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
        </div>
      </header>

      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
              <Users className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Users</p>
              <p className="text-xl font-bold text-brand-dark">6</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <User className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Sales Reps</p>
              <p className="text-xl font-bold text-brand-dark">4</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <User className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Managers</p>
              <p className="text-xl font-bold text-brand-dark">1</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <User className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Admins</p>
              <p className="text-xl font-bold text-brand-dark">1</p>
            </div>
          </div>
        </div>

        {/* Users & Access Control */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-brand-dark">Users & Access Control</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 w-10">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Dept</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Modules</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {USERS.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-3 px-4 text-body">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                          {row.initials}
                        </span>
                        <span className="font-medium text-brand-dark">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-body">{row.email}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${row.roleClass}`}>
                        {row.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-body">{row.dept}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {row.modules.map((m, i) => (
                          <span key={i} className="text-body text-xs flex items-center gap-0.5">
                            <Check className="w-3.5 h-3.5 text-success shrink-0" strokeWidth={2.5} />
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                        <span className={row.viewAll ? "text-success flex items-center gap-1" : "text-danger flex items-center gap-1"}>
                          {row.viewAll ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                          View All
                        </span>
                        <span className={row.delete ? "text-success flex items-center gap-1" : "text-danger flex items-center gap-1"}>
                          {row.delete ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                          Delete
                        </span>
                        <span className={row.export ? "text-success flex items-center gap-1" : "text-danger flex items-center gap-1"}>
                          {row.export ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                          Export
                        </span>
                        <span className={row.admin ? "text-success flex items-center gap-1" : "text-danger flex items-center gap-1"}>
                          {row.admin ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                          Admin
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Permission Matrix */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-brand-dark">Role Permission Matrix</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Permission</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Admin</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Sales Manager</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Sales Rep</th>
                </tr>
              </thead>
              <tbody>
                {ROLE_MATRIX.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-50">
                    <td className="py-3 px-4 font-medium text-brand-dark">{row.permission}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={row.admin ? "text-success inline-flex items-center gap-1" : "text-danger inline-flex items-center gap-1"}>
                        {row.admin ? <><Check className="w-4 h-4" strokeWidth={2.5} /> Yes</> : <><X className="w-4 h-4" strokeWidth={2.5} /> No</>}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={row.salesManager ? "text-success inline-flex items-center gap-1" : "text-danger inline-flex items-center gap-1"}>
                        {row.salesManager ? <><Check className="w-4 h-4" strokeWidth={2.5} /> Yes</> : <><X className="w-4 h-4" strokeWidth={2.5} /> No</>}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={row.salesRep ? "text-success inline-flex items-center gap-1" : "text-danger inline-flex items-center gap-1"}>
                        {row.salesRep ? <><Check className="w-4 h-4" strokeWidth={2.5} /> Yes</> : <><X className="w-4 h-4" strokeWidth={2.5} /> No</>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
