import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Target,
  Users,
  Building2,
  Briefcase,
  ClipboardList,
  Phone,
  Mail,
  Folder,
  Upload,
  BarChart3,
  Lock,
  LogOut,
  Zap,
} from "lucide-react";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleSignOut = () => navigate("/");

  const navClass = ({ isActive }) =>
    `group relative flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-r-lg transition-colors ${
      isActive
        ? "bg-blue-100 text-brand font-semibold border-l-4 border-brand shadow-sm"
        : "text-gray-600 hover:bg-gray-50"
    }`;
  // Selected state shown via border-l-4 in navClass above

  return (
    <aside className="w-64 shrink-0 h-screen flex flex-col bg-white border-r border-gray-200/80 shadow-sm overflow-hidden">
      <div className="flex flex-col h-full min-h-0">
        {/* Logo */}
        <div className="shrink-0 p-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xs shrink-0">
              SP
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brand-dark truncate">SalesPulse</p>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">CRM Platform</p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 p-4 flex flex-col overflow-hidden">
          {/* User profile */}
          <div className="flex items-center gap-3 py-3 mb-4 border-b border-gray-100 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#4A6FB3] flex items-center justify-center text-white font-semibold text-xs shrink-0">
              AK
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 truncate">Arjun Kapoor</p>
              <p className="text-xs text-gray-500">Admin</p>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-success mt-0.5" aria-hidden />
            </div>
          </div>

          <nav className="flex-1 space-y-0.5 min-h-0 overflow-y-auto">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">OVERVIEW</p>
            <NavLink to="/admin" end>
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Zap className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Dashboard</span>
                </div>
              )}
            </NavLink>

            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 mt-3">SALES</p>
            <NavLink to="/admin/leads">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Target className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm flex-1 min-w-0 truncate">Leads</span>
                  <span className="shrink-0 bg-danger text-white text-[10px] font-semibold min-w-[1.25rem] h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </div>
              )}
            </NavLink>
            <NavLink to="/admin/contacts">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Users className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Contacts</span>
                </div>
              )}
            </NavLink>
            <NavLink to="/admin/companies">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Building2 className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Companies</span>
                </div>
              )}
            </NavLink>
            <NavLink to="/admin/deals">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Briefcase className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm flex-1 min-w-0 truncate">Deals</span>
                  <span className="shrink-0 bg-danger text-white text-[10px] font-semibold min-w-[1.25rem] h-5 rounded-full flex items-center justify-center">
                    6
                  </span>
                </div>
              )}
            </NavLink>

            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 mt-3">ACTIVITY</p>
            <NavLink to="/admin/activity">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <ClipboardList className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm flex-1 min-w-0 truncate">Activity Log</span>
                  <span className="shrink-0 bg-danger text-white text-[10px] font-semibold min-w-[1.25rem] h-5 rounded-full flex items-center justify-center">
                    5
                  </span>
                </div>
              )}
            </NavLink>
            <NavLink to="/admin/call-tracking">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Phone className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Call Tracking</span>
                </div>
              )}
            </NavLink>
            <NavLink to="/admin/email-log">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Mail className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Email Log</span>
                </div>
              )}
            </NavLink>

            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 mt-3">FILES</p>
            <NavLink to="/admin/documents">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Folder className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Documents</span>
                </div>
              )}
            </NavLink>
            <NavLink to="/admin/bulk-upload">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Upload className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Bulk Upload</span>
                </div>
              )}
            </NavLink>

            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 mt-3">REPORTS</p>
            <NavLink to="/admin/reports">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <BarChart3 className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Reports</span>
                </div>
              )}
            </NavLink>

            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 mt-3">ADMIN</p>
            <NavLink to="/admin/settings">
              {({ isActive }) => (
                <div className={navClass({ isActive })}>
                  <Lock className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <span className="text-sm">Users & Roles</span>
                </div>
              )}
            </NavLink>
          </nav>

          {/* Sign Out - always visible at bottom */}
          <div className="pt-3 mt-auto border-t border-gray-100 shrink-0">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-danger transition-colors text-left"
            >
              <LogOut className="w-5 h-5 shrink-0" strokeWidth={2} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
