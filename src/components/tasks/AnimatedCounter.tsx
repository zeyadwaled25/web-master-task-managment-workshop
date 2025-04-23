import { useState, useEffect } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

export default function AnimatedCounter({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, Math.round);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.6,
      ease: "easeOut",
    });
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplay(latest);
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, rounded, value]);

  return <span>{display}</span>;
}
