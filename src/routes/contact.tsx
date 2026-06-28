import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { MapPin, Phone, Mail, MessageCircle, Share2, Navigation } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { toast } from "sonner";
import { FadeIn, PageHero } from "@/components/site/animate";
import { SITE } from "@/utils/constants";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MN Property" },
      {
        name: "description",
        content: "Visit our office in Central Delhi or message us on WhatsApp.",
      },
      { property: "og:title", content: "Contact — MN Property" },
      { property: "og:description", content: "Visit our office in Central Delhi." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [qr, setQr] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      QRCode.toDataURL(window.location.origin, {
        color: { dark: "#1A365D", light: "#ffffff" },
        margin: 1,
        width: 240,
      }).then(setQr);
    }
  }, []);

  const shareLocation = async () => {
    try {
      await navigator.clipboard.writeText(SITE.map.link);
    } catch {
      /* clipboard unavailable */
    }
    window.open(waLink(`MN Property office location: ${SITE.map.link}`), "_blank");
    toast.success("Location ready to share!");
  };

  const shareSite = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard unavailable */
    }
    window.open(waLink(`Check out MN Property — ${url}`), "_blank");
    toast.success("Site link copied!");
  };

  return (
    <div className="overflow-x-hidden">
      <PageHero
        eyebrow="Get in Touch"
        title="Visit Our Office"
        subtitle="Drop by our Karol Bagh office or reach us instantly on WhatsApp."
        dark
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <div className="flex flex-col gap-6">
            <FadeIn variant="slide-right">
              <div className="rounded-2xl border border-[#2B2B2B] bg-[#131313] p-6 shadow-md sm:p-8 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-300">
                <h2 className="font-display text-2xl font-bold text-white">MN Property Office</h2>
                <ul className="mt-5 space-y-4 text-sm text-[#D8D8D8]">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
                    <div>
                      <div className="font-medium leading-relaxed">{SITE.contact.address}</div>
                      <div className="mt-1 text-xs text-[#9A9A9A]">
                        {SITE.contact.coordinates.lat}, {SITE.contact.coordinates.lng}
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                    <a
                      href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
                      className="hover:text-[var(--gold)] hover:underline"
                    >
                      {SITE.contact.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="break-all hover:text-[var(--gold)] hover:underline"
                    >
                      {SITE.contact.email}
                    </a>
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <a
                    href={waLink("Hi MN Property, I'd like to visit the office.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow hover:scale-105 transition-transform"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                  <a
                    href={SITE.map.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 hover:scale-105 transition-all"
                  >
                    <Navigation className="h-4 w-4 text-[var(--gold)]" /> Get Directions
                  </a>
                  <button
                    onClick={shareLocation}
                    className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black hover:scale-105 transition-all"
                  >
                    <Share2 className="h-4 w-4" /> Share Location
                  </button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150} variant="slide-right">
              <div className="rounded-2xl border border-[#2B2B2B] bg-[#131313] p-6 shadow-md sm:p-8 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-300">
                <h3 className="font-display text-xl font-bold text-white">Share this site</h3>
                <p className="mt-1 text-sm text-[#9A9A9A]">
                  Send to a friend or print the QR code.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-6">
                  {qr && (
                    <img
                      src={qr}
                      alt="QR code"
                      className="h-28 w-28 rounded-xl border border-[#2B2B2B] bg-white p-1 sm:h-32 sm:w-32"
                    />
                  )}
                  <button
                    onClick={shareSite}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-gold)] px-5 py-2.5 text-sm font-bold text-black hover:scale-105 hover:shadow-lg transition-all"
                  >
                    <Share2 className="h-4 w-4" /> Share on WhatsApp
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={100} variant="slide-left" className="min-h-0 lg:flex lg:flex-col">
            <div className="flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#131313] shadow-lg sm:min-h-[340px] lg:min-h-[36rem]">
              <iframe
                src={SITE.map.embed}
                title="MN Property office map"
                className="h-full w-full min-h-[280px] flex-1 sm:min-h-[340px] lg:min-h-[36rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
