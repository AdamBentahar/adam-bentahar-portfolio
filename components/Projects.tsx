"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotY = ((x - centerX) / centerX) * 8;
    const rotX = -((y - centerY) / centerY) * 6;
    setTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card"
      style={{
        transform,
        transition: "transform 0.15s ease",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Glow follow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(99,102,241,0.07) 0%, transparent 60%)`,
        pointerEvents: "none",
        zIndex: 0,
        transition: "background 0.1s",
      }} />
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p className="section-label">Work</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ marginTop: 16, color: "var(--text-muted)", fontSize: 16, maxWidth: 500, margin: "16px auto 0" }}>
            Real problems. Real solutions. Measurable outcomes.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                style={{
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeProject === project.id ? project.color + "40" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: activeProject === project.id ? `0 0 40px ${project.color}20` : "none",
                  cursor: "default",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <div
                  style={{ position: "relative", zIndex: 1, padding: "28px" }}
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: `${project.color}18`,
                        border: `1px solid ${project.color}35`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24,
                        transition: "transform 0.3s ease",
                        transform: activeProject === project.id ? "rotate(-5deg) scale(1.1)" : "none",
                      }}>
                        {project.emoji}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: project.color, marginBottom: 4 }}>
                          Project 0{project.id}
                        </div>
                        <h3 style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>{project.title}</h3>
                      </div>
                    </div>

                    {/* Impact badge */}
                    <div style={{
                      textAlign: "center",
                      padding: "8px 14px",
                      borderRadius: 10,
                      background: `${project.color}12`,
                      border: `1px solid ${project.color}25`,
                      minWidth: 70,
                    }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: project.color, lineHeight: 1 }}>{project.impactMetric}</div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{project.impactLabel}</div>
                    </div>
                  </div>

                  {/* Problem / Solution */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", borderLeft: "3px solid rgba(239,68,68,0.4)" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(239,68,68,0.7)", marginBottom: 4 }}>Problem</p>
                      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{project.problem}</p>
                    </div>
                    <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${project.color}60` }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: project.color, marginBottom: 4 }}>Solution</p>
                      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{project.solution}</p>
                    </div>
                  </div>

                  {/* Tools */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {project.tools.map((tool) => (
                      <span key={tool} className="tool-tag">{tool}</span>
                    ))}
                  </div>

                  {/* Impact */}
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: `${project.color}08`,
                    border: `1px solid ${project.color}20`,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                    <span style={{ fontSize: 14 }}>🎯</span>
                    <span style={{ fontSize: 13, color: project.color, fontWeight: 600 }}>{project.impact}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
