export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    "Home", "About", "Activities", "Skills", "Projects", "Certificates", "Contact"
  ];

  return (
    <footer className="relative bg-[#050505] py-12 px-6 md:px-10 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo + name */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpeg`}
              alt="MANJUNATH"
              className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 rounded-full"
              style={{ border: "1px solid rgba(59,130,246,0.25)" }}
            />
            <div className="text-center md:text-left">
              <p className="text-white/80 text-sm font-medium tracking-tight">Manjunath N.</p>
              <p className="text-[#A1A1AA] text-xs mt-0.5">Computer Science &amp; Engineering</p>
              <p className="text-[#A1A1AA]/50 text-[10px] mt-1">REVA University</p>
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              {navLinks.map(label => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase()}`}
                    className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/60 hover:text-white transition-colors duration-300"
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(`#${label.toLowerCase()}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[10px] tracking-[0.15em] text-[#A1A1AA]/40 uppercase">
            © {year} Manjunath N. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse-glow" />
            <span className="text-[10px] tracking-[0.15em] text-[#A1A1AA]/40 uppercase">
              Built with React · TypeScript · GSAP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
