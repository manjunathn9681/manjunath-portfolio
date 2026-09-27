import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Activities",   href: "#activities" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Education",    href: "#education" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Track active section
  useEffect(() => {
    const sections = links.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] px-6 md:px-10 transition-all duration-500 ${
          scrolled ? "nav-scrolled py-3" : "py-5"
        }`}
        style={{
          background: scrolled
            ? "rgba(5,5,5,0.85)"
            : "rgba(5,5,5,0.3)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-3 group"
            aria-label="Manjunath N. Home"
          >
            <img
              src="/logo.jpeg"
              alt="MANJUNATH logo"
              className="h-8 w-auto object-contain rounded-full transition-opacity duration-300 group-hover:opacity-80"
              loading="eager"
              style={{ border: "1px solid rgba(59,130,246,0.25)" }}
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-300 rounded-full ${
                    activeLink === link.href.replace("#", "")
                      ? "text-white"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  {activeLink === link.href.replace("#", "") && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(59,130,246,0.12)",
                        border: "1px solid rgba(59,130,246,0.25)",
                      }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            id="nav-menu-btn"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-[499] flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(40px)" }}
      >
        <img src="/logo.jpeg" alt="MANJUNATH" className="h-12 w-auto mb-12 opacity-80 rounded-full" style={{ border: "1px solid rgba(59,130,246,0.3)" }} />
        <ul className="flex flex-col items-center gap-6">
          {links.map((link, i) => (
            <li
              key={link.label}
              className="transition-all duration-300"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              <a
                href={link.href}
                onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                className={`text-2xl font-light tracking-[0.15em] uppercase transition-colors duration-200 ${
                  activeLink === link.href.replace("#", "")
                    ? "text-[#3B82F6]"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
