"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div
      className="relative flex h-[36rem] justify-center space-x-16 overflow-y-auto p-10 bg-[#0A0A0A]"
      ref={ref}
    >
      {/* Left: scrolling text */}
      <div className="relative flex items-start">
        <div className="max-w-lg">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-24">
              <motion.h2
                animate={{ opacity: activeCard === index ? 1 : 0.22 }}
                transition={{ duration: 0.25 }}
                className="text-2xl font-bold text-[#E8E2D8]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{ opacity: activeCard === index ? 1 : 0.22 }}
                transition={{ duration: 0.25 }}
                className="text-[14px] mt-6 text-[#E8E2D8]/45 leading-[1.85] max-w-[46ch]"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-32" />
        </div>
      </div>

      {/* Right: sticky content panel */}
      <div
        className={cn(
          "sticky top-10 hidden h-72 w-80 overflow-hidden lg:block border border-white/[0.06] bg-[#111111]",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};
