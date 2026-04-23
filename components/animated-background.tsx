"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle_at_1px_1px,rgba(15,53,87,0.35)_1px,transparent_0)] [background-size:28px_28px]"
        animate={{ backgroundPosition: ["0px 0px", "40px 24px", "0px 0px"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, 50, -20, 0], y: [0, 36, -24, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-9rem] top-[20%] h-[24rem] w-[24rem] rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, -55, 18, 0], y: [0, -26, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-8rem] left-[24%] h-[22rem] w-[22rem] rounded-full bg-secondary/45 blur-3xl"
        animate={{ x: [0, 40, -24, 0], y: [0, -34, 12, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
