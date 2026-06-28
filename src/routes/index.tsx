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
import comboImg from "@/assets/combo.jpg";

const HERO_IMG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80";

export const Route = createFileRoute("/")({ component: Index });

const STATS = [
  { value: "500+", label: "Happy Families", icon: Users },
  { value: "10+", label: "Years of Trust", icon: Award },
  { value: "200+", label: "Active Listings", icon: Building2 },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const WHY_US = [
  {
    image: comboImg,
    title: "Leadership Trust",
    desc: "Mohit Naagar, Owner & Consultant — 10+ years in Central Delhi",
    icon: null,
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    desc: "Every property is personally verified before listing.",
  },
  {
    icon: BarChart3,
    title: "Market Expertise",
    desc: "10+ years of Central Delhi real estate experience.",
  },
  { icon: Key, title: "End-to-End Help", desc: "From search to keys — paperwork included." },
];

const SOCIAL_DEFS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    color: "#25D366",
    href: waLink(),
    handle: null,
    desc: "Chat instantly",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    color: "#E1306C",
    href: SOCIAL_LINKS.instagram,
    handle: SOCIAL_HANDLE,
    desc: "Property reels",
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: Youtube,
    color: "#FF0000",
    href: SOCIAL_LINKS.youtube,
    handle: SOCIAL_HANDLE,
    desc: "Walkthroughs",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    href: SOCIAL_LINKS.facebook,
    handle: SOCIAL_HANDLE,
    desc: "Community",
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: Send,
    color: "#29A8E0",
    href: SOCIAL_LINKS.telegram,
    handle: SOCIAL_HANDLE,
    desc: "Exclusive deals",
  },
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
        {/* Faded modern building on the right */}
        <div className="absolute right-0 top-0 bottom-0 -z-10 h-full w-full md:w-1/2 object-cover opacity-15 hidden md:block">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[var(--gold)]/10 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-[var(--gold)]/5 blur-3xl animate-float-delayed" />

        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:py-28 md:py-36">
          <div className="animate-hero-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#131313]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--gold)] backdrop-blur-md sm:px-4 sm:text-xs">
              <Award className="h-3.5 w-3.5" /> Central Delhi&apos;s Trusted Realtor
            </span>
          </div>

          <h1
            className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl animate-hero-reveal"
            style={{ animationDelay: "120ms" }}
          >
            <span className="text-white">Invest in Tomorrow.</span>
            <br />
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Own the Extraordinary.
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base text-[#D8D8D8]/95 sm:mt-8 sm:text-lg md:text-xl leading-relaxed animate-hero-reveal"
            style={{ animationDelay: "240ms" }}
          >
            MN Property is a premium consultancy helping families and investors buy, sell, rent, and
            invest in Karol Bagh and Central Delhi since 2014.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-4 sm:mt-10 animate-hero-reveal"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-black shadow-[var(--shadow-luxury)] transition-all duration-300 hover:scale-105 hover:bg-[#E7C95A]"
            >
              <MessageCircle className="h-5 w-5" /> Enquire on WhatsApp
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-transparent px-6 py-3.5 text-sm font-semibold text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-black"
            >
              View Samples <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:max-w-2xl sm:grid-cols-4 sm:gap-6">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div
                key={label}
                className="rounded-2xl border border-[#2B2B2B] bg-[#131313]/90 p-4 text-center sm:p-5 shadow-lg animate-hero-reveal"
                style={{ animationDelay: `${480 + i * 80}ms` }}
              >
                <Icon className="mx-auto mb-2 h-4 w-4 text-[var(--gold)] sm:h-5 sm:w-5" />
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {value}
                </div>
                <div className="mt-1 text-[10px] text-[#9A9A9A] uppercase tracking-wider sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media showcase — Property + Office */}
      <section id="media-showcase" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 md:py-24">
        <div className="rounded-3xl border border-[#2B2B2B] bg-[#131313] p-6 shadow-[var(--shadow-luxury)] sm:p-10 md:p-14">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
              Showcase
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Properties &amp; Office
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[#9A9A9A] sm:text-base leading-relaxed">
              Browse our latest property samples and office photos. Personally verified and curated
              for premium buyers.
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

          <div className="mt-16 sm:mt-24">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                {activeTab === "property" ? "Property Walkthrough" : "Office Tour"}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                {activeTab === "property" ? "Featured Property Video" : "Office Walkthrough Video"}
              </h3>
            </FadeIn>
            <div className="mt-6 w-full overflow-hidden rounded-2xl border border-[#2B2B2B] shadow-2xl">
              <VideoSection videoUrl={activeVideo} loading={isLoading} />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Legacy Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-24 border-t border-[#2A2A2A]/50">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                Our Foundation &amp; Legacy
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">
                Built on Trust, Guided by Values
              </h2>
              <div className="mt-6 space-y-4 text-base text-[#D8D8D8] leading-relaxed">
                <p>
                  At MN Property, we believe real estate is not just about transactions; it is about
                  building lifelong relationships based on integrity and mutual respect.
                </p>
                <p>
                  Founded by Mohit Naagar and guided by the blessings and values of Mann Singh
                  Naagar, our consultancy has been a trusted beacon for premium properties in
                  Central Delhi. We turn spaces into opportunities and help you invest in tomorrow.
                </p>
              </div>

              {/* Quick Contact Info */}
              <div className="mt-8 border-t border-[#2A2A2A] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">
                    Owner &amp; Consultant
                  </p>
                  <p className="text-base font-bold text-white mt-1">Mohit Naagar</p>
                </div>
                <div>
                  <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">Contact Office</p>
                  <p className="text-base font-bold text-[var(--gold)] mt-1">
                    {SITE.contact.phone}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn variant="scale-in">
              <div className="relative overflow-hidden rounded-2xl border border-[#2B2B2B] p-2 bg-[#131313] shadow-[0_20px_40px_rgba(212,175,55,0.15)] group">
                <img
                  src={comboImg}
                  alt="Mann Singh Naagar & Mohit Naagar - MN Property Legacy"
                  className="w-full h-auto rounded-xl object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden bg-[#131313] border-y border-[#2A2A2A] py-12 md:py-24 text-white">
        <div className="relative mx-auto max-w-7xl px-4">
          <FadeIn className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
              Why MN Property
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              The Difference You Feel
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map(({ icon: Icon, title, desc, image }, i) => (
              <FadeIn key={title} delay={i * 100} variant="scale-in">
                <div className="rounded-2xl bg-[#0A0A0A] border border-[#2B2B2B] p-6 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] flex flex-col justify-between h-full">
                  <div>
                    {image ? (
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[var(--gold)] bg-[#1A1A1A] mb-4">
                        <img
                          src={image}
                          className="h-full w-full object-cover scale-[2.5] translate-x-[22%] translate-y-[2%]"
                          alt="Mohit Naagar"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] mb-4">
                        {Icon && <Icon className="h-6 w-6" />}
                      </div>
                    )}
                    <h3 className="font-display text-lg font-bold text-white tracking-wide">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm text-[#D8D8D8]/80 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-24">
        <FadeIn className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            Testimonials
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Client Success Stories
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm text-[#9A9A9A] sm:text-base">
            Hear what our clients say about their premium investment journeys.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={100} variant="scale-in">
            <div className="rounded-2xl border border-[#2B2B2B] bg-[#131313] p-6 md:p-8 flex flex-col justify-between h-full hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-300">
              <p className="text-base md:text-lg italic text-[#D8D8D8] leading-relaxed">
                &ldquo;MN Property helped us secure our dream builder floor in Karol Bagh. Their
                transaction was fully transparent, from paper checks to final possession. Mohit and
                his father&apos;s values of honesty are rare to find in today&apos;s real estate
                market.&rdquo;
              </p>
              <div className="mt-6 border-t border-[#2A2A2A] pt-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-base font-bold text-white">
                    Rajesh &amp; Priya Sharma
                  </p>
                  <p className="text-xs text-[#9A9A9A]">Karol Bagh Resident</p>
                </div>
                <div className="flex gap-0.5 text-[var(--gold)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} variant="scale-in">
            <div className="rounded-2xl border border-[#2B2B2B] bg-[#131313] p-6 md:p-8 flex flex-col justify-between h-full hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-300">
              <p className="text-base md:text-lg italic text-[#D8D8D8] leading-relaxed">
                &ldquo;As an NRI investor, finding a trustworthy advisor in Delhi NCR was crucial.
                Mohit Naagar provided excellent market data and verified commercial listings. They
                managed all paperwork smoothly. Highly recommended for premium listings.&rdquo;
              </p>
              <div className="mt-6 border-t border-[#2A2A2A] pt-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-base font-bold text-white">Vikram Malhotra</p>
                  <p className="text-xs text-[#9A9A9A]">Commercial Investor, London</p>
                </div>
                <div className="flex gap-0.5 text-[var(--gold)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-24 border-t border-[#2A2A2A]/50">
        <FadeIn variant="scale-in">
          <div className="overflow-hidden rounded-3xl border border-[#2B2B2B] bg-[#131313] p-8 shadow-[var(--shadow-vibrant)] sm:p-10 md:p-14">
            <div className="mb-8 text-center sm:mb-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-white/5 px-4 py-1.5 text-xs font-bold text-[var(--gold)]">
                <Sparkles className="h-3.5 w-3.5" /> Stay Connected
              </div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
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
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-white/5 p-4 text-center transition-all hover:-translate-y-1 hover:bg-white/10 sm:gap-3 sm:p-5"
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
                      <div className="mt-0.5 text-[10px] font-medium text-white/70 sm:text-xs">
                        {handle}
                      </div>
                    ) : null}
                    <div className="mt-0.5 text-[10px] text-white/50 sm:text-xs">{desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="mx-auto mb-12 max-w-7xl px-4 md:mb-24">
        <FadeIn variant="scale-in">
          <div className="relative overflow-hidden rounded-3xl border border-[#2B2B2B] bg-[#131313] p-8 shadow-[0_20px_40px_rgba(212,175,55,0.15)] md:p-14">
            <div className="relative grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">
                  Looking for your dream property?
                </h2>
                <p className="mt-4 text-base text-[#D8D8D8] leading-relaxed">
                  Tell us what you need — we&apos;ll handpick the best options in Central Delhi and
                  share them directly on WhatsApp.
                </p>
                <div className="mt-5 flex items-start gap-2 text-sm text-[#9A9A9A]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                  <span className="leading-relaxed">{SITE.contact.address}</span>
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-end w-full">
                <a
                  href={waLink(
                    "Hi MN Property, I'm looking for a premium property in Central Delhi.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-base font-bold text-black shadow-[var(--shadow-luxury)] transition-all duration-300 hover:scale-105 hover:bg-[#E7C95A] w-full text-center"
                >
                  <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37] bg-transparent px-6 py-3.5 text-base font-bold text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-black w-full text-center"
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
