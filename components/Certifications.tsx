"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/lib/data";

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certifications" className="section-padding" ref={ref}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p className="section-label">Credentials</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            <span className="gradient-text">Certifications</span>
          </h2>
          <p style={{ marginTop: 16, color: "var(--text-muted)", fontSize: 16, maxWidth: 500, margin: "16px auto 0" }}>
            Continuously upskilling across data, business, and emerging tech.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {certifications.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              className="glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: groupIdx * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              style={{ padding: "28px" }}
            >
              {/* Category header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${group.color}15`,
                  border: `1px solid ${group.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 14,
                }}>
                  {group.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: group.color }}>{group.category}</h3>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{group.items.length} certifications</p>
              </div>

              <div style={{ height: 1, background: `${group.color}20`, marginBottom: 16 }} />

              {/* Cert items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {group.items.map((cert, certIdx) => (
                  <motion.div
                    key={cert}
                    className="cert-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + groupIdx * 0.1 + certIdx * 0.07, duration: 0.4 }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: group.color, fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
                      <span>{cert}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: "center", marginTop: 40 }}
        >
          <span style={{
            padding: "10px 24px",
            borderRadius: 100,
            border: "1px solid var(--border-accent)",
            fontSize: 14,
            color: "var(--text-muted)",
          }}>
            🏅 {certifications.reduce((sum, g) => sum + g.items.length, 0)} total certifications completed
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #certifications > div > div[style*="repeat(3"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #certifications > div > div[style*="repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
