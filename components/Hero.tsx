"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const WORDS = ["Data.", "AI.", "Impact.", "Business.", "Results."];

function TypewriterEffect() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="gradient-text" style={{ display: "inline-block", minWidth: 140 }}>
      {displayed}
      <span style={{ opacity: Math.sin(Date.now() / 400) > 0 ? 1 : 0, color: "var(--accent)" }}>|</span>
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const PARTICLE_COUNT = 80;
    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number; pulse: number;
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
          p.vx *= 0.95;
          p.vy *= 0.95;
        }
        // max speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) { p.vx = (p.vx / speed) * 2; p.vy = (p.vy / speed) * 2; }

        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.fill();
      });

      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      <ParticleCanvas />

      {/* Background glow orbs */}
      <div className="orb" style={{ width: 600, height: 600, background: "#6366F1", top: -200, left: -200, position: "absolute" }} />
      <div className="orb" style={{ width: 400, height: 400, background: "#EC4899", bottom: -100, right: -100, position: "absolute" }} />

      {/* Grid bg */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}
        >
          <span style={{
            padding: "6px 16px",
            borderRadius: 100,
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--accent-2)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 8px #10B981", animation: "pulse 2s infinite" }} />
            Open to internships & collaborations
          </span>
        </motion.div>

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 28, display: "flex", justifyContent: "center" }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src="/avatar.jpg"
              alt="Adam Bentahar"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                (el.nextSibling as HTMLElement).style.display = "flex";
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
              className="avatar-glow"
            />
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366F1, #EC4899)",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                fontWeight: 800,
                color: "#fff",
              }}
              className="avatar-glow"
            >
              AB
            </div>
            <span style={{
              position: "absolute",
              bottom: 4,
              right: 4,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#10B981",
              border: "3px solid var(--bg)",
              boxShadow: "0 0 8px #10B981",
            }} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: "clamp(20px, 3vw, 32px)",
            fontWeight: 600,
            marginBottom: 20,
            color: "var(--text-muted)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span>Engineering</span>
          <TypewriterEffect />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: 17,
            color: "var(--text-muted)",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          {personalInfo.positioningStatement}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}
        >
          <a href="#projects" className="btn-primary">Explore Projects →</a>
          <a href="#contact" className="btn-outline">Let's Connect</a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: 13 }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ width: 24, height: 40, border: "2px solid rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}
          >
            <div style={{ width: 4, height: 8, background: "var(--accent)", borderRadius: 2 }} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
