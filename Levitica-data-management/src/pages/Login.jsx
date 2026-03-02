import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLES = [
  { value: "", label: "Select role" },
  { value: "admin", label: "Admin" },
  { value: "hr_management", label: "HR Management" },
  { value: "sales_representative", label: "Sales Representative" },
  { value: "finance_management", label: "Finance Management" },
];

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ role: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // When Admin logs in, open Admin CRM Dashboard (Sales Overview)
    if (formData.role === "admin") {
      navigate("/admin");
      return;
    }
    // When HR Management logs in, open HR Dashboard
    if (formData.role === "hr_management") {
      navigate("/dashboard");
      return;
    }
    // When Finance Management logs in, open Finance Dashboard
    if (formData.role === "finance_management") {
      navigate("/finance");
      return;
    }
    // When Sales Representative logs in, open Sales Dashboard
    if (formData.role === "sales_representative") {
      navigate("/sales");
      return;
    }
    // Placeholder: add your auth logic for other roles
    console.log("Sign in", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-white">
      {/* Two-column card: logo left, form right (like template) */}
      <div className="relative z-10 w-full max-w-6xl rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[640px]">
        {/* Left section: logo display (hidden on mobile; shown inline in right section instead) */}
        <div className="hidden md:flex relative w-full md:w-[42%] min-h-0 bg-gradient-to-br from-blue-50 to-white items-center justify-center p-8 overflow-hidden">
          {/* Decorative shapes (template-style) */}
          <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-500/10 -translate-y-1/2 translate-x-1/2" aria-hidden />
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-56 md:h-56 rounded-full bg-blue-500/15 translate-y-1/3 -translate-x-1/3" aria-hidden />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-white/60 -translate-x-1/2 -translate-y-1/2" aria-hidden />
          {/* Logo */}
          <img
            src="/assets/logo.png"
            alt="Levitica Data Management"
            className="relative z-10 h-50 md:h-68 w-auto max-w-[280px] md:max-w-[320px] object-contain drop-shadow-sm"
          />
        </div>

        {/* Right section: form */}
        <div className="flex-1 flex flex-col p-6 sm:p-10">
          {/* Responsive: small inline logo + text (mobile only) */}
          <div className="flex md:hidden items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <img
              src="/assets/logo.png"
              alt=""
              className="h-10 w-auto max-w-[100px] object-contain shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-brand-dark leading-tight">Levitica Data Management</h1>
              <p className="text-[11px] text-body">Data &amp; Analytics Platform</p>
            </div>
          </div>
          {/* Desktop: title block (hidden on mobile) */}
          <div className="hidden md:block m-10">
            <h1 className="text-xl font-bold text-brand-dark">Levitica Data Management</h1>
            <p className="text-xs text-body mt-0.5">Data &amp; Analytics Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          <div>
            <label className="block text-xs font-medium text-body uppercase tracking-wider mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-brand-soft border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition appearance-none cursor-pointer"
              required
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value} disabled={!r.value} className="bg-white text-gray-900">
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-body uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl bg-brand-soft border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-body uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-brand-soft border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition pr-24"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-body hover:text-brand transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-brand font-semibold hover:text-brand-dark transition"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-12 px-8 rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold shadow-sm transition flex items-center justify-center gap-2"
          >
            Sign In
            <span aria-hidden>→</span>
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
