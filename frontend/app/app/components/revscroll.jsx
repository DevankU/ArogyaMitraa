import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { src: './sy.png', alt: 'Logo 1' },
  { src: './sy.png', alt: 'Logo 2' },
  { src: './sy.png', alt: 'Logo 3' },
  { src: './sy.png', alt: 'Logo 4' },
  { src: './sy.png', alt: 'Logo 5' },
  { src: './sy.png', alt: 'Logo 6' },
  { src: './sy.png', alt: 'Logo 7' },
  { src: './sy.png', alt: 'Logo 8' },
];

const InfiniteScrollingLogosAnimationReverse = () => {
  // Constants for layout
  const logoWidth = 150; // min-w-[150px] per logo
  const gap = 16; // gap-4 in Tailwind = 16px
  const logosPerSet = logos.length; // Number of logos in one set
  const setWidth = logosPerSet * logoWidth + (logosPerSet - 1) * gap; // Width of one logo set including gaps

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50">
      <div className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-32 before:bg-gradient-to-r before:from-blue-50 before:via-blue-50/50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-32 after:bg-gradient-to-l after:from-green-50 after:via-green-50/50 after:to-transparent">
        <motion.div
          className="flex"
          animate={{
            x: [-setWidth, 0], // Move from negative (offscreen left) to zero (right)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: logos.length * 2, // 2 seconds per logo
              ease: 'linear',
            },
          }}
          style={{ width: `${(setWidth * 2) / window.innerWidth * 100}vw` }} // Two sets in viewport width
        >
          {/* Render two sets of logos for seamless looping */}
          {[...Array(2)].map((_, loopIdx) => (
            <div
              className="flex items-center gap-4"
              key={loopIdx}
              style={{ width: `${setWidth}px`, flexShrink: 0 }} // Fixed width per set
            >
              {logos.map((logo, idx) => (
                <motion.div
                  key={`${loopIdx}-${idx}`}
                  className="flex-none min-w-[150px]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-14 w-auto mx-auto grayscale transition-all hover:grayscale-0"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteScrollingLogosAnimationReverse;