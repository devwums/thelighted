// frontend/src/components/cart/CartItemRow.tsx
"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore, type CartItem } from "@/lib/store/cartStore";
import { QuantitySelector } from "./QuantitySelector";
import { Button } from "../ui/Button";
import { formatCurrency } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const itemTotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 96px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Remove Button */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">
              {item.name}
            </h3>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 rounded-full bg-red-500 transition-colors z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4 text-white/90" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-500 line-clamp-1 mb-3">
            {item.description}
          </p>

          {/* Quantity and Price */}
          <div className="flex items-center justify-between">
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
              size="sm"
            />
            <div className="text-right">
              <div className="text-sm font-bold text-orange-500">
                {formatCurrency(itemTotal)}
              </div>
              {item.quantity > 1 && (
                <div className="text-xs text-gray-400">
                  {formatCurrency(item.price)} each
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
