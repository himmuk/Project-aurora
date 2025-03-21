import React from "react";
export function Card({ children, ...props }) {
  return (
    <div {...props} className="border p-4 shadow rounded bg-white">
      {children}
    </div>
  );
}
export function CardContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
