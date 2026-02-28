// frontend/src/components/cart/QuantitySelector.tsx
"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "lg";
  min?: number;
  max?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = "sm",
  min = 1,
  max = 99,
}) => {
  const isMinReached = quantity <= min;
  const isMaxReached = quantity >= max;

  const sizeClasses = {
    sm: {
      container: "h-9",
      button: "h-7 w-7",
      icon: "h-3.5 w-3.5",
      text: "text-sm min-w-[2rem]",
    },
    lg: {
      container: "h-12",
      button: "h-10 w-10",
      icon: "h-4 w-4",
      text: "text-base min-w-[2.5rem]",
    },
  };

  const styles = sizeClasses[size];

  return (
    <div
      className={`inline-flex items-center gap-2 bg-gray-50 rounded-full px-1 ${styles.container}`}
    >
      {/* Decrease Button */}
      <button
        onClick={onDecrease}
        disabled={isMinReached}
        className={`${styles.button} rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:active:scale-100 shadow-sm`}
        aria-label="Decrease quantity"
      >
        <Minus className={`${styles.icon} text-gray-700`} />
      </button>

      {/* Quantity Display */}
      <span
        className={`${styles.text} font-semibold text-gray-900 text-center select-none`}
      >
        {quantity}
      </span>

      {/* Increase Button */}
      <button
        onClick={onIncrease}
        disabled={isMaxReached}
        className={`${styles.button} rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:active:scale-100 shadow-sm`}
        aria-label="Increase quantity"
      >
        <Plus className={`${styles.icon} text-gray-700`} />
      </button>
    </div>
  );
};
