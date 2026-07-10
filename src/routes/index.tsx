import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import portrait from "@/assets/sonia-portrait.png.asset.json";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const portraitRef = useRef<HTMLImageElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let mouseY = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = portraitRef.current;
        const txt = heroTextRef.current;
        const y = window.scrollY || 0;
        if (el) {
          const shift = -y * 0.25 + mouseY * 10;
          el.style.transform = `translate3d(0, ${shift}px, 0) scale(1.12)`;
        }
        if (txt) {
          txt.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
          txt.style.opacity = String(Math.max(0.2, 1 - y / 600));
        }
      });
    };
    const onMouse = (e: MouseEvent) => {
      mouseY = (e.clientY / (window.innerHeight || 1)) - 0.5;
      onScroll();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <div className="font-serif text-xl italic">Sonia Zaid</div>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <a href="#profile" className="hover:text-foreground">Profile</a>
          <a href="#practice" className="hover:text-foreground">Practice</a>
          <a href="#journey" className="hover:text-foreground">Journey</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <a href="#contact" className="text-xs uppercase tracking-[0.2em] text-accent hover:opacity-80">Get in touch →</a>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-20 pt-8 md:grid-cols-12 md:gap-16 md:px-12 md:pt-16">
        <div ref={heroTextRef} className="md:col-span-7 md:pr-8 will-change-transform">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Chief Operating Officer · Karachi, Pakistan
          </p>
          <h1 className="font-serif text-6xl leading-[0.95] md:text-8xl">
            Sonia
            <br />
            <span className="italic text-accent">Zaid.</span>
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Operations leader at <span className="text-foreground">HIGH-Q Pharmaceuticals</span>, orchestrating supply chain, regulatory affairs, business development and export across a company now ranked
            <span className="text-foreground"> 9th in the industry </span>
            with the highest growth rate.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8 md:max-w-lg">
            <Stat value="16+" label="Years at HIGH-Q" />
            <Stat value="9th" label="Industry rank" />
            <Stat value="#1" label="Growth rate" />
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center">
            {/* Particle orbits */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 rounded-full border border-accent/20 animate-[spin_40s_linear_infinite]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={`o1-${i}`}
                    className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(120,170,255,0.6)]"
                    style={{ transform: `rotate(${(360 / 8) * i}deg) translateY(-50%) translateY(-1px)` }}
                  />
                ))}
              </div>
              <div className="absolute inset-6 rounded-full border border-accent/15 animate-[spin_60s_linear_infinite_reverse]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={`o2-${i}`}
                    className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/70"
                    style={{ transform: `rotate(${(360 / 12) * i}deg) translateY(-50%)` }}
                  />
                ))}
              </div>
              <div className="absolute inset-14 rounded-full border border-accent/10 animate-[spin_25s_linear_infinite]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={`o3-${i}`}
                    className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/80 shadow-[0_0_14px_4px_rgba(140,180,255,0.5)]"
                    style={{ transform: `rotate(${(360 / 5) * i}deg) translateY(-50%)` }}
                  />
                ))}
              </div>
              {/* Floating twinkles */}
              {Array.from({ length: 14 }).map((_, i) => {
                const top = (i * 53) % 100;
                const left = (i * 37) % 100;
                const size = (i % 3) + 1;
                const delay = (i % 7) * 0.4;
                const dur = 3 + (i % 5);
                return (
                  <span
                    key={`tw-${i}`}
                    className="absolute rounded-full bg-foreground/80 animate-pulse"
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      animationDelay: `${delay}s`,
                      animationDuration: `${dur}s`,
                      boxShadow: "0 0 8px 2px rgba(180,200,255,0.6)",
                    }}
                  />
                );
              })}
            </div>

            {/* Portrait circle */}
            <div className="relative aspect-square w-[78%] overflow-hidden rounded-full bg-secondary ring-1 ring-accent/30 shadow-[0_0_60px_-10px_rgba(120,170,255,0.4)]">
              <img
                ref={portraitRef}
                src={portrait.url}
                alt="Portrait of Sonia Zaid, Chief Operating Officer at HIGH-Q Pharmaceuticals"
                width={1024}
                height={1280}
                className="h-full w-full object-cover will-change-transform transition-transform duration-75"
                style={{ transform: "translate3d(0,0,0) scale(1.08)" }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/10" />
            </div>

            {/* Caption */}
            <div className="absolute -bottom-2 left-0 right-0 flex items-end justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>Portrait, 2026</span>
              <span>№ 01</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile / Summary */}
      <section id="profile" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">On the record</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">A note from Sonia.</h2>
          </div>
          <div className="md:col-span-8">
            <p className="font-serif text-2xl italic leading-relaxed text-foreground md:text-3xl">
              “Through effective leadership, strategic planning and unwavering dedication, we've elevated our position in the industry — witnessing the company's ascent to the 9th position with the highest growth rate.”
            </p>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                As Head of Operations at HIGH-Q Pharmaceuticals, Sonia leads a high-performing team and oversees the critical functions that drive the company's success and expansion — from brand strategy and market development to supply chain, regulatory and export.
              </p>
              <p>
                Central to her role is the cultivation of high-performing teams across departments. Through workshops, training programmes and mentorship, she nurtures a culture of continuous learning, collaboration and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section id="practice" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">The practice</p>
            <h2 className="mt-4 font-serif text-5xl md:text-6xl">Six disciplines,<br/><span className="italic">one operating rhythm.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A cross-functional portfolio spanning commercial, operational and compliance leadership across the pharmaceutical value chain.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {practice.map((p, i) => (
            <article key={p.title} className="group bg-background p-8 transition-colors hover:bg-card">
              <div className="mb-10 flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span>0{i + 1}</span>
                <span>{p.tag}</span>
              </div>
              <h3 className="font-serif text-3xl leading-tight">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 md:grid-cols-12 md:px-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">The journey</p>
            <h2 className="mt-4 font-serif text-5xl">Experience<br/><span className="italic">& education.</span></h2>
          </div>
          <div className="md:col-span-8">
            <ol className="divide-y divide-border">
              {timeline.map((t) => (
                <li key={t.title + t.year} className="grid grid-cols-12 gap-6 py-8">
                  <div className="col-span-3 font-serif text-2xl text-accent">{t.year}</div>
                  <div className="col-span-9">
                    <h3 className="font-serif text-2xl">{t.title}</h3>
                    <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">{t.org}</p>
                    {t.detail && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Skills strip */}
      <section className="border-y border-border overflow-hidden">
        <div className="flex whitespace-nowrap py-8 text-4xl md:text-6xl font-serif italic text-muted-foreground">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Correspondence</p>
            <h2 className="mt-4 font-serif text-6xl md:text-7xl leading-[0.95]">
              Let's build<br/><span className="italic">what's next.</span>
            </h2>
            <p className="mt-8 max-w-md text-muted-foreground leading-relaxed">
              For partnerships, speaking invitations and press enquiries — reach out directly.
            </p>
          </div>
          <div className="md:col-span-6 md:pt-8">
            <dl className="divide-y divide-border border-y border-border">
              <ContactRow label="Email" value="ssk.aqua@gmail.com" href="mailto:ssk.aqua@gmail.com" />
              <ContactRow label="Mobile" value="+92 334 379 6572" href="tel:+923343796572" />
              <ContactRow label="LinkedIn" value="sonia-zaid" href="https://www.linkedin.com/in/sonia-zaid-03024324" />
              <ContactRow label="Based in" value="Karachi, Sindh — Pakistan" />
              <ContactRow label="Languages" value="English · Urdu" />
            </dl>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex-row md:items-center md:px-12">
          <span>© 2026 Sonia Zaid</span>
          <span className="font-serif text-sm italic normal-case tracking-normal">Operations, quietly, at scale.</span>
          <span>Karachi · Pakistan</span>
        </div>
      </footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-4xl text-foreground">{value}</div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-baseline justify-between gap-6 py-5">
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors">{value}</span>
    </div>
  );
  return href ? (
    <a href={href} className="group block">{content}</a>
  ) : (
    <div>{content}</div>
  );
}

function MarqueeRow() {
  const words = ["Strategic Partnerships", "Supply Chain", "Regulatory Affairs", "Business Development", "Team Development", "Export & Logistics", "Raw Materials"];
  return (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{w}</span>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );
}

const practice = [
  {
    tag: "Commercial",
    title: "Marketing & Business Development",
    body: "Leading strategies that grow brand visibility and market presence — launching campaigns, reading market signals and forging partnerships that expand reach.",
  },
  {
    tag: "Operations",
    title: "Head of Supply Chain",
    body: "Managing end-to-end supply chain — procurement, inventory and distribution — with continuous focus on efficiency and cost reduction.",
  },
  {
    tag: "Compliance",
    title: "Regulatory Affairs",
    body: "Overseeing regulatory submissions, product approvals and evolving standards through the Drug Registration and Licensing Boards.",
  },
  {
    tag: "Production",
    title: "Factory Coordination",
    body: "Bridging headquarters and manufacturing — governing production schedules, inventory levels, quality control and continuous process improvement.",
  },
  {
    tag: "Global",
    title: "Export",
    body: "Overseeing the logistics and documentation for HIGH-Q's export programme, ensuring compliance with international regulations end-to-end.",
  },
  {
    tag: "People",
    title: "Team Development",
    body: "Cultivating a culture of continuous learning through workshops, structured training and mentorship — empowering teams across every function.",
  },
];

const timeline = [
  {
    year: "2010 —",
    title: "Chief Operating Officer",
    org: "HIGH-Q Pharmaceuticals · Karachi",
    detail: "Leading operations across supply chain, regulatory, factory coordination, export, marketing and business development.",
  },
  {
    year: "2017",
    title: "Master of Business Administration",
    org: "Institute of Business Management · Marketing",
  },
  {
    year: "2005 · 09",
    title: "Pharm. D — Doctor of Pharmacy",
    org: "Karachi University · Pharmaceutical",
  },
];
