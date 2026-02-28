// frontend/src/components/cart/AddToCartModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "../ui/Button";
import { QuantitySelector } from "./QuantitySelector";
import { formatCurrency } from "@/lib/utils";

export const AddToCartModal: React.FC = () => {
  const { isModalOpen, selectedItem, closeModal, addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when modal opens with new item
  useEffect(() => {
    if (isModalOpen) {
      setQuantity(1);
    }
  }, [isModalOpen, selectedItem]);

  if (!selectedItem) return null;

  const handleAddToCart = () => {
    addItem(selectedItem, quantity);
    closeModal();
    setQuantity(1);
  };

  const totalPrice = selectedItem.price * quantity;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal - Bottom Sheet Style on Mobile, Centered on Desktop */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-white rounded-t-3xl md:rounded-2xl shadow-2xl max-w-lg md:w-full mx-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 transition-colors z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Drag Handle (Mobile only) */}
            <div className="md:hidden flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Content */}
            <div className="p-6 pt-4">
              {/* Image */}
              <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Info */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedItem.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {selectedItem.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(quantity + 1)}
                  onDecrease={() => setQuantity(quantity - 1)}
                  size="sm"
                />
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                size="md"
                className="w-full text-lg font-semibold"
              >
                Add to Cart - {formatCurrency(totalPrice)}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
