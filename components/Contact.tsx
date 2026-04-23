"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data";

const contactItems = [
  { icon: "📧", label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: "📱", label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}` },
  { icon: "📍", label: "Location", value: personalInfo.location, href: "#" },
];

const socialLinks = [
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/adam-bentahar",
    href: personalInfo.github,
    color: "#6366F1",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/adam-bentahar",
    href: personalInfo.linkedin,
    color: "#0077B5",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding" ref={ref} style={{ background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p className="section-label">Contact</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Let's <span className="gradient-text">work together</span>
          </h2>
          <p style={{ marginTop: 16, color: "var(--text-muted)", fontSize: 16, maxWidth: 480, margin: "16px auto 0" }}>
            Open to internships, collaborations, and conversations about data, AI, and business optimization.
          </p>
        </motion.div>

        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            padding: "48px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(236,72,153,0.04))",
            border: "1px solid rgba(99,102,241,0.2)",
            textAlign: "center",
            marginBottom: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.06)", filter: "blur(60px)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Ready to make an impact?</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: 15 }}>
              I'm actively seeking internship opportunities in data engineering, business intelligence, and AI automation.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                onClick={copyEmail}
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: "flex", alignItems: "center", gap: 8, cursor: "none" }}
              >
                {copied ? "✓ Copied!" : "📋 Copy Email"}
              </motion.button>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-outline"
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                📧 Send Email
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 4 }}>Contact Info</p>
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-item"
                style={{ textDecoration: "none" }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2, fontWeight: 600 }}>{item.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 4 }}>Social</p>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                style={{ textDecoration: "none" }}
              >
                <span style={{ fontSize: 20 }}>{social.icon}</span>
                <div>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2, fontWeight: 600 }}>{social.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>{social.value}</p>
                </div>
                <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 12 }}>↗</span>
              </a>
            ))}

            {/* Availability card */}
            <motion.div
              whileHover={{ y: -3 }}
              style={{
                padding: "16px 20px",
                borderRadius: 14,
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.2)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 4,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", flexShrink: 0, animation: "pulse 2s infinite" }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>Available for hire</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Casablanca & Remote · 2025</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          #contact > div > div[style*="padding: 48px"] {
            padding: 28px !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
