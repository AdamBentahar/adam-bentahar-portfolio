"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding" ref={ref} style={{ background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p className="section-label">Track Record</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(to bottom, transparent, var(--border-accent), transparent)",
              transform: "translateX(-50%)",
              transformOrigin: "top",
            }}
          />

          {experience.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  marginBottom: 40,
                  position: "relative",
                }}
              >
                {/* Left content or spacer */}
                {isLeft ? (
                  <div style={{ paddingRight: 40 }}>
                    <motion.div
                      className="glass-card"
                      whileHover={{ y: -4, boxShadow: `0 0 30px ${exp.color}25` }}
                      style={{ padding: "24px", borderColor: `${exp.color}25` }}
                    >
                      <ExperienceContent exp={exp} />
                    </motion.div>
                  </div>
                ) : (
                  <div />
                )}

                {/* Center dot */}
                <div style={{ position: "absolute", left: "50%", top: 24, transform: "translate(-50%, 0)", zIndex: 2 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 300 }}
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: exp.color,
                      border: "3px solid var(--bg)",
                      boxShadow: `0 0 16px ${exp.color}60`,
                    }}
                  />
                </div>

                {/* Right content or spacer */}
                {!isLeft ? (
                  <div style={{ paddingLeft: 40 }}>
                    <motion.div
                      className="glass-card"
                      whileHover={{ y: -4, boxShadow: `0 0 30px ${exp.color}25` }}
                      style={{ padding: "24px", borderColor: `${exp.color}25` }}
                    >
                      <ExperienceContent exp={exp} />
                    </motion.div>
                  </div>
                ) : (
                  <div />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .exp-grid { grid-template-columns: 1fr !important; }
          #experience .timeline-line { left: 16px !important; }
        }
      `}</style>
    </section>
  );
}

function ExperienceContent({ exp }: { exp: typeof experience[0] }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <span style={{
          padding: "3px 10px",
          borderRadius: 100,
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          background: `${exp.color}15`,
          color: exp.color,
          border: `1px solid ${exp.color}30`,
        }}>
          {exp.type}
        </span>
      </div>
      <h3 style={{ fontWeight: 700, fontSize: 17, marginTop: 8 }}>{exp.company}</h3>
      <p style={{ color: "var(--accent-2)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{exp.role}</p>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>{exp.period} · {exp.location}</p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {exp.highlights.map((h, i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: exp.color, fontSize: 14, marginTop: 2, flexShrink: 0 }}>▸</span>
            <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{h}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
