// frontend/src/components/cart/CartFloatingBanner.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/utils";

export const CartFloatingBanner: React.FC = () => {
  const { totalItems, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4"
        >
          <Link href="/cart">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              <div className="flex items-center justify-between px-6 py-4">
                {/* Cart Info */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    <div className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-90">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </div>
                    <div className="text-lg font-bold">
                      {formatCurrency(totalPrice)}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">View Cart</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
