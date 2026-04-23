"use client";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "32px 24px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontSize: 18, fontWeight: 800 }}>
          <span className="gradient-text">AB</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
        </span>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          © 2025 {personalInfo.name} · Built with Next.js & Framer Motion
        </p>
        <a href="#hero" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", cursor: "pointer" }}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
