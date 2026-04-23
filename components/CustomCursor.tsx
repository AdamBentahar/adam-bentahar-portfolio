"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    const onEnterHoverable = () => {
      ringRef.current?.classList.add("hovering");
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(2)";
    };
    const onLeaveHoverable = () => {
      ringRef.current?.classList.remove("hovering");
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    };

    document.addEventListener("mousemove", onMove);
    animRef.current = requestAnimationFrame(animate);

    const hoverables = document.querySelectorAll("a, button, .glass-card, .skill-badge, .cert-item, .contact-item, .tilt-card");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHoverable);
      el.addEventListener("mouseleave", onLeaveHoverable);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <motion.div
        className="scroll-progress"
        style={{ scaleX, position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 10000, originX: 0, background: "linear-gradient(90deg, #6366F1, #EC4899)" }}
      />
    </>
  );
}
