import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Users,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Building2,
  Key,
  BarChart3,
  Clock,
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Star,
} from "lucide-react";
import { FadeIn } from "@/components/site/animate";
import { Gallery } from "@/components/site/gallery";
import { VideoSection } from "@/components/site/video-section";
import { MediaTabs, type MediaTab } from "@/components/site/media-tabs";
import { useDriveContent } from "@/hooks/use-drive-content";
import { waLink } from "@/lib/whatsapp";
import { SITE, SOCIAL_LINKS, SOCIAL_HANDLE } from "@/utils/constants";

const HERO_IMG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80";

export const Route = createFileRoute("/")({ component: Index });

const STATS = [
  { value: "500+", label: "Happy Families", icon: Users },
  { value: "10+", label: "Years of Trust", icon: Award },
  { value: "200+", label: "Active Listings", icon: Building2 },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const WHY_US = [
  { icon: ShieldCheck, title: "Verified Listings", desc: "Every property is personally verified before listing." },
  { icon: Clock, title: "Quick Response", desc: "We respond within 30 minutes during business hours." },
  { icon: BarChart3, title: "Market Expertise", desc: "10+ years of Central Delhi real estate experience." },
  { icon: Key, title: "End-to-End Help", desc: "From search to keys — paperwork included." },
];

const SOCIAL_DEFS = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, color: "#25D366", href: waLink(), handle: null, desc: "Chat instantly" },
  { id: "instagram", label: "Instagram", icon: Instagram, color: "#E1306C", href: SOCIAL_LINKS.instagram, handle: SOCIAL_HANDLE, desc: "Property reels" },
  { id: "youtube", label: "YouTube", icon: Youtube, color: "#FF0000", href: SOCIAL_LINKS.youtube, handle: SOCIAL_HANDLE, desc: "Walkthroughs" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "#1877F2", href: SOCIAL_LINKS.facebook, handle: SOCIAL_HANDLE, desc: "Community" },
  { id: "telegram", label: "Telegram", icon: Send, color: "#29A8E0", href: SOCIAL_LINKS.telegram, handle: SOCIAL_HANDLE, desc: "Exclusive deals" },
];

function Index() {
  const { data, isLoading, isError } = useDriveContent();
  const [activeTab, setActiveTab] = useState<MediaTab>("property");

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "office") {
        setActiveTab("office");
        document.getElementById("media-showcase")?.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "gallery") {
        setActiveTab("property");
        document.getElementById("media-showcase")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const showFallbackNotice = isError || data?.fromFallback;
  const property = data?.property ?? { images: [], video: null };
  const office = data?.office ?? { images: [], video: null };

  const activeImages = activeTab === "property" ? property.images : office.images;
  const activeVideo = activeTab === "property" ? property.video : office.video;
  const activeAlt = activeTab === "property" ? "Property" : "Office";

  const handleTabChange = (tab: MediaTab) => {
    setActiveTab(tab);
    const hash = tab === "property" ? "gallery" : "office";
    window.history.replaceState(null, "", `/#${hash}`);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden sm:min-h-[92vh]">
        <img src={HERO_IMG} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-vibrant)] opacity-90 mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--navy-deep)]/95 via-[var(--navy-deep)]/60 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[var(--coral)]/25 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-[var(--teal)]/20 blur-3xl animate-float-delayed" />

        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:py-28 md:py-36">
          <div className="animate-hero-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--coral)]/50 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--coral)] backdrop-blur-md sm:px-4 sm:text-xs">
              <Award className="h-3.5 w-3.5" /> Central Delhi&apos;s Trusted Realtor
            </span>
          </div>

          <h1
            className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.15] text-white text-balance sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl animate-hero-reveal"
            style={{ animationDelay: "120ms" }}
          >
            {SITE.hero.headline}
          </h1>

          <p
            className="mt-4 max-w-xl text-base text-white/85 sm:mt-5 sm:text-lg md:text-xl animate-hero-reveal"
            style={{ animationDelay: "240ms" }}
          >
            {SITE.hero.subheadline}
          </p>

          <div
            className="mt-8 flex flex-wrap gap-3 sm:mt-10 animate-hero-reveal"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" /> Enquire on WhatsApp
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/15 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/25"
            >
              View Samples <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:max-w-2xl sm:grid-cols-4 sm:gap-4">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div
                key={label}
                className="glass rounded-2xl p-3 text-center sm:p-4 animate-hero-reveal"
                style={{ animationDelay: `${480 + i * 80}ms` }}
              >
                <Icon className="mx-auto mb-1 h-4 w-4 text-[var(--coral)] sm:h-5 sm:w-5" />
                <div className="font-display text-xl font-bold text-white sm:text-2xl">{value}</div>
                <div className="mt-0.5 text-[10px] text-white/70 sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media showcase — Property + Office */}
      <section id="media-showcase" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:py-24">
        <div className="rounded-3xl border border-border/60 bg-[var(--card)] p-6 shadow-[var(--shadow-luxury)] sm:p-10">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--teal)]">Showcase</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Properties &amp; Office
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Browse our latest property samples and office photos.
          </p>
        </FadeIn>

        <div className="mt-8 sm:mt-10">
          <MediaTabs active={activeTab} onChange={handleTabChange} className="w-full sm:w-auto" />
        </div>

        <div className="mt-8 sm:mt-12">
          <Gallery
            images={activeImages}
            loading={isLoading}
            showFallbackNotice={showFallbackNotice}
            altPrefix={activeAlt}
          />
        </div>

        <div className="mt-12 sm:mt-16">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--coral)]">
              {activeTab === "property" ? "Property Walkthrough" : "Office Tour"}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
              {activeTab === "property" ? "Property Video" : "Office Video"}
            </h3>
          </FadeIn>
          <div className="mt-6 w-full">
            <VideoSection videoUrl={activeVideo} loading={isLoading} />
          </div>
        </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xs" />

      {/* Why us */}
      <section className="relative overflow-hidden bg-[var(--gradient-vibrant)] py-16 text-white sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4">
          <FadeIn className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--coral)]">Why MN Property</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl md:text-4xl">The Difference You Feel</h2>
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {WHY_US.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 100} variant="scale-in">
                <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-sm sm:p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--coral)]/25 text-[var(--coral)]">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold sm:text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-white/75">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <FadeIn variant="scale-in">
          <div className="overflow-hidden rounded-3xl bg-[var(--gradient-vibrant)] p-6 shadow-[var(--shadow-vibrant)] sm:p-10 md:p-14">
            <div className="mb-8 text-center sm:mb-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-[var(--coral)]">
                <Sparkles className="h-3.5 w-3.5" /> Stay Connected
              </div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Follow Us Everywhere
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
              {SOCIAL_DEFS.map(({ id, label, icon: Icon, color, href, handle, desc }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-4 text-center transition-all hover:-translate-y-1 hover:bg-white/20 sm:gap-3 sm:p-5"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg sm:h-14 sm:w-14"
                    style={{ background: color }}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white sm:text-sm">{label}</div>
                    {handle ? (
                      <div className="mt-0.5 text-[10px] font-medium text-white/70 sm:text-xs">{handle}</div>
                    ) : null}
                    <div className="mt-0.5 text-[10px] text-white/50 sm:text-xs">{desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="mx-auto mb-8 max-w-7xl px-4 sm:mb-16">
        <FadeIn variant="scale-in">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--gradient-gold)] p-6 shadow-[var(--shadow-gold)] sm:p-10 md:p-14">
            <div className="relative grid items-center gap-6 md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-[var(--orange)] sm:text-3xl md:text-4xl">
                  Looking for your dream property?
                </h2>
                <p className="mt-3 text-sm text-[var(--red)]/85 sm:text-base">
                  Tell us what you need — we&apos;ll handpick the best options and share them on WhatsApp.
                </p>
                <div className="mt-3 flex items-start gap-2 text-xs text-[var(--navy)]/75 sm:text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="leading-relaxed">{SITE.contact.address}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--navy-deep)] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-white/20 sm:w-auto"
                >
                  Visit Office <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
