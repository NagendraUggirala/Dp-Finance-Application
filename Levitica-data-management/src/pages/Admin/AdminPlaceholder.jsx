import React from "react";

export default function AdminPlaceholder({ title = "Page" }) {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-brand-dark">{title}</h1>
      <p className="text-sm text-body mt-1">Coming soon.</p>
    </div>
  );
}
