"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "Data & Tech": "#6366F1",
  "Business & Operations": "#10B981",
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding" ref={ref} style={{ background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p className="section-label">Toolkit</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p style={{ marginTop: 16, color: "var(--text-muted)", fontSize: 16, maxWidth: 500, margin: "16px auto 0" }}>
            The tools I use to turn raw data into business value.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {Object.entries(skills).map(([category, items], catIdx) => {
            const color = categoryColors[category] || "#6366F1";
            return (
              <motion.div
                key={category}
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIdx * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: "32px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `rgba(${color === "#6366F1" ? "99,102,241" : "16,185,129"},0.15)`,
                    border: `1px solid rgba(${color === "#6366F1" ? "99,102,241" : "16,185,129"},0.3)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>
                    {category === "Data & Tech" ? "💻" : "🏢"}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 17 }}>{category}</h3>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{items.length} skills</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill.name}
                      className="skill-badge"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: catIdx * 0.1 + i * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      style={{ cursor: "default" }}
                    >
                      <span>{skill.icon}</span>
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tool ecosystem visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            marginTop: 40,
            padding: "28px 32px",
            borderRadius: 16,
            background: "rgba(99,102,241,0.04)",
            border: "1px solid rgba(99,102,241,0.15)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Currently Learning
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {["Machine Learning", "Streamlit", "dbt", "Google Looker Studio"].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
                style={{
                  padding: "6px 16px",
                  borderRadius: 100,
                  border: "1px dashed rgba(99,102,241,0.3)",
                  fontSize: 13,
                  color: "var(--accent-2)",
                  fontWeight: 500,
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
