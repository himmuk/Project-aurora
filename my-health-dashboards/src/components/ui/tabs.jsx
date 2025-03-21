import React, { useState } from "react";

export function Tabs({ children, defaultValue, ...props }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div {...props}>
      {React.Children.map(children, child => {
        if (child.type.displayName === "TabsTrigger") {
          return React.cloneElement(child, { active, setActive });
        }
        if (child.type.displayName === "TabsContent") {
          return active === child.props.value ? child : null;
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function TabsTrigger({ value, active, setActive, children, ...props }) {
  return (
    <button
      {...props}
      onClick={() => setActive(value)}
      className={`p-2 ${active === value ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ value, children, ...props }) {
  return <div {...props}>{children}</div>;
}
TabsContent.displayName = "TabsContent";
