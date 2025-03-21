import React from "react";
export function Select({ children, ...props }) {
  return <select {...props} className="border p-2 rounded">{children}</select>;
}
export function SelectTrigger({ children, ...props }) {
  return <button {...props} className="border p-2 rounded">{children}</button>;
}
export function SelectValue({ placeholder, ...props }) {
  return <span {...props}>{placeholder}</span>;
}
export function SelectContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
export function SelectItem({ value, children, ...props }) {
  return <option {...props} value={value}>{children}</option>;
}
