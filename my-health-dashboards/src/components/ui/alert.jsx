import React from "react";
export function Alert({ variant, children, ...props }) {
  const bg = variant === "warning" ? "bg-yellow-100" : "bg-gray-100";
  return <div {...props} className={`p-4 rounded ${bg}`}>{children}</div>;
}
export function AlertTitle({ children, ...props }) {
  return <h3 {...props} className="font-bold">{children}</h3>;
}
export function AlertDescription({ children, ...props }) {
  return <p {...props}>{children}</p>;
}
