import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Facebook,
  Youtube,
  Send,
  MessageCircle,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Info,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { SITE, SOCIAL_LINKS, SOCIAL_HANDLE, WHATSAPP_NUMBER } from "@/utils/constants";

function SocialCard({
  href,
  icon: Icon,
  label,
  handle,
  color,
  bg,
  description,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  handle: string;
  color: string;
  bg: string;
  description: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-5"
      style={{ background: bg }}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg sm:h-12 sm:w-12"
          style={{ background: color }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <ExternalLink className="h-4 w-4 text-white/40 transition-colors group-hover:text-white/80" />
      </div>
      <div className="relative z-10 mt-3 sm:mt-4">
        <div className="font-display text-sm font-bold text-white sm:text-base">{label}</div>
        <div className="text-xs text-white/60 sm:text-sm">{handle}</div>
        <div className="mt-1 text-[10px] text-white/50 sm:mt-2 sm:text-xs">{description}</div>
      </div>
      <div className="relative z-10 mt-3 flex items-center gap-1 text-xs font-semibold text-white/70 group-hover:text-white">
        Follow <ArrowRight className="h-3 w-3" />
      </div>
    </a>
  );
}

export function SiteFooter() {
  const navLinks = [
    { to: "/", label: "Home", icon: Info },
    { to: "/about", label: "About MN Property", icon: Info },
    { to: "/contact", label: "Visit Our Office", icon: MapPin },
  ];

  const socialCards = [
    {
      href: SOCIAL_LINKS.instagram,
      icon: Instagram,
      label: "Instagram",
      handle: SOCIAL_HANDLE,
      color: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      bg: "linear-gradient(135deg,rgba(240,148,51,0.15),rgba(188,24,136,0.15))",
      description: "Property reels & stories",
    },
    {
      href: SOCIAL_LINKS.facebook,
      icon: Facebook,
      label: "Facebook",
      handle: SOCIAL_HANDLE,
      color: "#1877F2",
      bg: "linear-gradient(135deg,rgba(24,119,242,0.15),rgba(24,119,242,0.05))",
      description: "Latest listings & community",
    },
    {
      href: SOCIAL_LINKS.youtube,
      icon: Youtube,
      label: "YouTube",
      handle: SOCIAL_HANDLE,
      color: "#FF0000",
      bg: "linear-gradient(135deg,rgba(255,0,0,0.15),rgba(255,0,0,0.05))",
      description: "Property walkthroughs",
    },
    {
      href: SOCIAL_LINKS.telegram,
      icon: Send,
      label: "Telegram",
      handle: SOCIAL_HANDLE,
      color: "#29A8E0",
      bg: "linear-gradient(135deg,rgba(41,168,224,0.15),rgba(41,168,224,0.05))",
      description: "Exclusive deals",
    },
    {
      href: waLink(),
      icon: MessageCircle,
      label: "WhatsApp",
      handle: WHATSAPP_NUMBER,
      color: "#25D366",
      bg: "linear-gradient(135deg,rgba(37,211,102,0.15),rgba(37,211,102,0.05))",
      description: "Chat with our agents",
    },
  ];

  return (
    <footer className="mt-16 overflow-x-hidden bg-[var(--navy-deep)] sm:mt-24">
      <div className="border-b border-white/10 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
            Stay Connected
          </div>
          <h2 className="mb-3 text-center font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Follow MN Property
          </h2>
          <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {socialCards.map((c) => (
              <SocialCard key={c.label} {...c} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gold)] to-yellow-500 font-display text-xl font-bold text-[var(--navy-deep)] sm:h-12 sm:w-12 sm:text-2xl">
                M
              </div>
              <div>
                <div className="font-display text-lg font-bold text-white sm:text-xl">MN Property</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--gold)]">Central Delhi</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Trusted real estate partners in Central Delhi. Helping families buy, sell, rent & invest with confidence.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Explore
            </h4>
            <ul className="space-y-2">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[var(--gold)]"
                  >
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {SITE.contact.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                <a href={`mailto:${SITE.contact.email}`} className="break-all hover:text-white">
                  {SITE.contact.email}
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                <span>{SITE.contact.address}</span>
              </li>
            </ul>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366]/15 px-4 py-2.5 text-sm font-semibold text-[#25D366]"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 sm:py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center text-xs text-white/40 sm:flex-row sm:text-left">
          <span>© {new Date().getFullYear()} MN Property. All rights reserved.</span>
          <span>
            Powered by <span className="text-[var(--gold)]">Digital Hub</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
