import React from "react";
export function Progress({ value, ...props }) {
  return (
    <div className="w-full bg-gray-200 rounded">
      <div className="bg-blue-600 h-2 rounded" style={{ width: `${value}%` }} />
    </div>
  );
}
