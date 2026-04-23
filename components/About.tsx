"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats, languages } from "@/lib/data";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding" ref={sectionRef}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">About Me</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.2 }}>
              Where data meets{" "}
              <span className="gradient-text">decisions</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 32 }}>
              {personalInfo.about}
            </p>

            {/* Languages */}
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 16 }}>Languages</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{lang.name}</span>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{lang.level}</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <motion.div
                      className="lang-bar-fill"
                      style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${lang.percent}%` } : { width: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  style={{ padding: "28px 24px", textAlign: "center" }}
                >
                  <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }} className="gradient-text">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8, fontWeight: 500 }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Education card */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ padding: "24px" }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 16 }}>Education</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 18 }}>🎓</span>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>ESITH Casablanca</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 28 }}>Génie Industriel — Option BDM · 2024–Present</p>
                </div>
                <div style={{ height: 1, background: "var(--border)" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 18 }}>📚</span>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>CPGE — Taza</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 28 }}>MPSI · Sep 2022 – Jul 2024</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
