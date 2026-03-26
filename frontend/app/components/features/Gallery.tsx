// frontend/src/components/features/Gallery.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { GalleryImage } from "@/lib/api/admin";
import { useGalleryImages } from "@/lib/hooks/useGalleryImages";

const CATEGORIES = ["all", "food", "ambiance", "kitchen", "events", "drinks"];

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Use React Query - automatic caching!
  const { data: images = [], isLoading, error, refetch } = useGalleryImages();

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <Section id="gallery" background="default">
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4"
          >
            Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto mb-8"
          >
            Feast your eyes on our culinary creations and inviting atmosphere
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all duration-200",
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-text hover:bg-gray-200"
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🖼️</div>
            <h3 className="font-serif text-2xl font-bold text-secondary mb-2">
              Unable to Load Gallery
            </h3>
            <p className="text-text-muted mb-6">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && !error && filteredImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  index={index}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🖼️</div>
            <h3 className="font-serif text-2xl font-bold text-secondary mb-2">
              No Images Yet
            </h3>
            <p className="text-text-muted">
              {selectedCategory === "all"
                ? "Gallery images will appear here soon!"
                : `No images in the ${selectedCategory} category yet.`}
            </p>
          </div>
        )}
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};

// Gallery Item Component with lazy loading
const GalleryItem: React.FC<{
  image: GalleryImage;
  index: number;
  onClick: () => void;
}> = ({ image, index, onClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 cursor-pointer"
    >
      {inView && (
        <>
          <Image
            src={image.imageUrl}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-500",
              "group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoadingComplete={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-medium">{image.alt}</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

// Lightbox Component
const Lightbox: React.FC<{
  image: GalleryImage;
  onClose: () => void;
}> = ({ image, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 z-50 cursor-pointer"
      />

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="relative max-w-5xl w-full aspect-[4/3]">
          <Image
            src={image.imageUrl}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 text-white" />
      </button>
    </>
  );
};
