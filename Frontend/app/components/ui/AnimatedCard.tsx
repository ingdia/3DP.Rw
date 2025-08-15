// components/ui/AnimatedCard.tsx
"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard = ({ children, className }: AnimatedCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
    //   variants={cardVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
