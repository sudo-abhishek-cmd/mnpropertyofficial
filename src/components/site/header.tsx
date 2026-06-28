import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, Home, Info, Building2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: MapPin },
] as const;

const scrollLinks = [
  { id: "gallery", label: "Properties", icon: Building2 },
  { id: "office", label: "Office", icon: MapPin },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    if (id === "gallery" || id === "office") {
      window.history.replaceState(null, "", `/#${id}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      document.getElementById("media-showcase")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-[#2A2A2A] bg-[#0A0A0A]/75 shadow-lg backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="group flex min-w-0 items-center gap-2.5">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#131313] border border-[#2B2B2B] shadow-inner transition-transform duration-300 group-hover:scale-105">
              <img
                src={logoImg}
                alt="MN Property Logo"
                className="h-full w-full object-contain p-0.5"
              />
            </div>
            <div className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-base font-bold text-white transition-colors group-hover:text-[var(--gold)] sm:text-lg">
                MN Property
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                Karol Bagh, Central Delhi
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav-link relative px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-[var(--gold)]"
                activeProps={{ className: "nav-link-active text-[var(--gold)]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            {scrollLinks.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="nav-link relative px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-[var(--gold)]"
              >
                {label}
              </button>
            ))}
          </nav>

          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[var(--gradient-gold)] px-5 py-2.5 text-sm font-semibold text-black shadow-[var(--shadow-gold)] transition-all duration-300 hover:scale-105 hover:shadow-lg md:inline-flex"
          >
            <Phone className="h-4 w-4" /> WhatsApp Us
          </a>

          <button
            className={cn(
              "relative z-[80] rounded-lg p-2 transition-colors md:hidden will-change-transform",
              open ? "bg-white/10 text-white" : "text-foreground hover:bg-muted",
            )}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div
        className={cn(
          "mobile-drawer fixed right-0 top-0 z-[70] flex h-full w-[min(320px,88vw)] flex-col border-l border-white/10 bg-[#0A0A0A] shadow-2xl transition-transform duration-500 ease-out md:hidden will-change-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="shrink-0 border-b border-white/10 bg-[#131313] px-5 py-5">
          <p className="font-display text-lg font-bold text-white">MN Property</p>
          <p className="text-xs text-white/60">Navigate the site</p>
        </div>
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto bg-[#0A0A0A] px-4 py-5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="mobile-drawer-link flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold"
            >
              <l.icon className="h-5 w-5 shrink-0 text-[var(--gold)]" />
              {l.label}
            </Link>
          ))}
          {scrollLinks.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className="mobile-drawer-link flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-semibold"
            >
              <Icon className="h-5 w-5 shrink-0 text-[var(--gold)]" />
              {label}
            </button>
          ))}
          <a
            href={waLink()}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-center text-sm font-bold text-white shadow-lg"
          >
            <Phone className="h-4 w-4" /> WhatsApp Us
          </a>
        </nav>
      </div>
    </>
  );
}
