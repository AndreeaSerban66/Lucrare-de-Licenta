import React from "react";

export default function Container({
  className,
  children,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className={`w-full flex ${className}`} style={style}>
      <div className="mx-auto max-w-screen-2xl w-full">{children}</div>
    </div>
  );
}
