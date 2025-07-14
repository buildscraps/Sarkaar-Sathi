import React from "react";

interface TagChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  selected?: boolean;
}

export default function TagChip({
  label,
  selected,
  className = "",
  ...props
}: TagChipProps) {
  return (
    <span
      className={`badge text-xs font-medium px-2 py-1 rounded-lg transition-all duration-300 ${selected ? "badge-primary text-primary-content" : "badge-outline bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"} ${className}`}
      {...props}
    >
      {label}
    </span>
  );
}
