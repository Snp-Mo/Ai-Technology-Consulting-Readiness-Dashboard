import { motion, useReducedMotion } from "framer-motion";

/**
 * Surface card with the 2px left-border accent (square left corners,
 * rounded right). Fades up on mount; hover lift comes from .card-lift in
 * index.css. Both respect prefers-reduced-motion.
 */
export default function Card({
  accent = "var(--color-accent)",
  delay = 0,
  className = "",
  children,
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      className={`card-lift rounded-r-lg border-l-2 bg-surface ${className}`}
      style={{ borderLeftColor: accent }}
    >
      {children}
    </motion.div>
  );
}
