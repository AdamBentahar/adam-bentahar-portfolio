"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { threshold: 0.4 }
    );
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 24px",
        transition: "background 0.3s ease, box-shadow 0.3s ease, border-bottom 0.3s ease",
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", cursor: "none" }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>
            <span className="gradient-text">AB</span>
            <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: 2 }}>.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
          {navItems.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link" style={{ color: active === href ? "var(--text-primary)" : undefined }}>
              {label}
              {active === href && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "var(--accent)",
                    borderRadius: 2,
                  }}
                />
              )}
            </a>
          ))}
          <a
            href="/cv.pdf"
            download
            className="btn-primary"
            style={{ fontSize: 13, padding: "8px 18px" }}
          >
            Download CV
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "none",
            padding: 8,
            color: "var(--text-primary)",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, height: 2, background: mobileOpen ? "transparent" : "currentColor", marginBottom: 6, transition: "0.2s" }} />
          <div style={{ width: 24, height: 2, background: "currentColor", transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none", marginBottom: 6, transition: "0.2s" }} />
          <div style={{ width: 24, height: 2, background: "currentColor", transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : "none", transition: "0.2s" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(10,10,15,0.97)",
              borderTop: "1px solid var(--border)",
              padding: "20px 24px",
            }}
          >
            {navItems.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "12px 0", fontSize: 16 }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
