"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "gray" | "primary";
  animate?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  background = "default",
  animate = true,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const backgroundStyles = {
    default: "bg-background",
    gray: "bg-gray-50",
    primary: "bg-primary/5",
  };

  const content = (
    <section
      id={id}
      ref={ref}
      className={cn("py-16 md:py-24", backgroundStyles[background], className)}
    >
      {children}
    </section>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
};
