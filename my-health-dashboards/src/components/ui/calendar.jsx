import React from "react";

export function Calendar(props) {
  return (
    <input
      type="date"
      {...props}
      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
