import React from "react";
export function Badge({ variant, children, ...props }) {
  const bg = variant === "destructive" ? "bg-red-500" : "bg-gray-500";
  return <span {...props} className={`text-white px-2 py-1 rounded ${bg}`}>{children}</span>;
}
