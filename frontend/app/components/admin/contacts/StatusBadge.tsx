"use client";

import React from "react";
import { ContactStatus } from "@/lib/types/contact";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ContactStatus;
  className?: string;
}

const statusConfig = {
  [ContactStatus.NEW]: {
    label: "New",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    icon: "🆕",
  },
  [ContactStatus.READ]: {
    label: "Read",
    className: "bg-gray-100 text-gray-700 border-gray-200",
    icon: "👁️",
  },
  [ContactStatus.REPLIED]: {
    label: "Replied",
    className: "bg-green-100 text-green-700 border-green-200",
    icon: "✅",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className,
      )}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}
