import React, { useState } from "react";
import { motion, Transition } from "framer-motion";

interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: Transition;
  onClick?: () => void;
}

export const RandomLetterSwap: React.FC<RandomLetterSwapProps> = ({
  label,
  className = "",
  staggerDuration = 0.025,
  transition = { duration: 0.5, type: "spring", stiffness: 320, damping: 22 },
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Check if string is Arabic (which requires unified cursive ligature rendering)
  const isArabic = /[\u0600-\u06FF]/.test(label);

  if (isArabic) {
    // For Arabic: Elegant vertical spring slide-up swap preserving 100% connected cursive typography
    return (
      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative inline-flex items-center justify-center overflow-hidden h-[1.35em] leading-normal outline-none cursor-pointer select-none font-yamama ${className}`}
      >
        {/* Top original connected Arabic word sliding up */}
        <motion.span
          className="inline-block"
          initial={false}
          animate={isHovered ? { y: "-120%", opacity: 0 } : { y: "0%", opacity: 1 }}
          transition={transition}
        >
          {label}
        </motion.span>

        {/* Bottom duplicate connected Arabic word sliding up into view */}
        <motion.span
          aria-hidden="true"
          className="absolute right-0 top-0 inline-block"
          initial={false}
          animate={isHovered ? { y: "0%", opacity: 1 } : { y: "120%", opacity: 0 }}
          transition={transition}
        >
          {label}
        </motion.span>
      </motion.button>
    );
  }

  // For Latin / English: Character-by-character staggered spring slide
  const characters = Array.from(label);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center overflow-hidden outline-none cursor-pointer select-none ${className}`}
    >
      <span className="inline-flex">
        {characters.map((char, index) => {
          if (char === " ") {
            return (
              <span key={index} className="inline-block w-1.5">
                &nbsp;
              </span>
            );
          }

          return (
            <span
              key={index}
              className="relative inline-block overflow-hidden h-[1.25em] leading-tight"
            >
              {/* Primary character sliding up */}
              <motion.span
                className="inline-block"
                initial={false}
                animate={isHovered ? { y: "-100%", opacity: 0 } : { y: "0%", opacity: 1 }}
                transition={{
                  ...transition,
                  delay: index * staggerDuration,
                }}
              >
                {char}
              </motion.span>

              {/* Swapped character sliding in from below */}
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 inline-block"
                initial={false}
                animate={isHovered ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{
                  ...transition,
                  delay: index * staggerDuration,
                }}
              >
                {char}
              </motion.span>
            </span>
          );
        })}
      </span>
    </motion.button>
  );
};

export default RandomLetterSwap;
