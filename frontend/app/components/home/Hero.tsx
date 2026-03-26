"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RESTAURANT_INFO } from "@/lib/constants";
import {
  isRestaurantOpen,
  getNextOpeningTime,
  generateWhatsAppLink,
} from "@/lib/utils";
import Link from "next/link";

export const Hero: React.FC = () => {
  const isOpen = isRestaurantOpen(RESTAURANT_INFO.openingHours);

  // const handleViewMenu = () => {
  //   window.location.href = "/menu";
  // };

  const handleWhatsAppOrder = () => {
    const whatsappLink = generateWhatsAppLink(RESTAURANT_INFO.whatsapp, []);
    window.open(whatsappLink, "_blank");
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-background via-white to-primary/5">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {isOpen
                  ? "We're Open Now!"
                  : `Opens ${getNextOpeningTime(RESTAURANT_INFO.openingHours)}`}
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6 leading-tight">
              {RESTAURANT_INFO.tagline}
            </h1>

            <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed">
              {RESTAURANT_INFO.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/menu">
                <Button variant="primary" size="lg" className="group">
                  View Our Menu
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </Link>
              <Button onClick={handleWhatsAppOrder} variant="outline" size="lg">
                <Phone className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>
                  {RESTAURANT_INFO.address.city},{" "}
                  {RESTAURANT_INFO.address.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-secondary mb-1 ">
                      Visit Us Today
                    </div>
                    <div className="text-sm text-text-muted pl-12">
                      Open {RESTAURANT_INFO.openingHours[0].openTime} AM -{" "}
                      {RESTAURANT_INFO.openingHours[0].closeTime} PM
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border-4 border-background"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-xs text-text-muted">★★★★★</div>
                <div className="text-xs text-text-muted mt-1">500+ Reviews</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border-4 border-background"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-xs text-text-muted mt-1">Menu Items</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
