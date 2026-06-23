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
      { name: "description", content: "Visit our office in Central Delhi or message us on WhatsApp." },
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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-6">
            <FadeIn variant="slide-right">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-xl font-bold text-foreground">MN Property Office</h2>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                    <div>
                      <div className="font-medium">{SITE.contact.address}</div>
                      <div className="text-muted-foreground">{SITE.contact.landmark}</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                    <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="hover:text-[var(--gold)]">
                      {SITE.contact.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                    <a href={`mailto:${SITE.contact.email}`} className="break-all hover:text-[var(--gold)]">
                      {SITE.contact.email}
                    </a>
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={waLink("Hi MN Property, I'd like to visit the office.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-4 py-2.5 text-sm font-semibold text-white sm:px-5"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                  <a
                    href={SITE.map.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-navy)] px-4 py-2.5 text-sm font-semibold text-white sm:px-5"
                  >
                    <Navigation className="h-4 w-4" /> Get Directions
                  </a>
                  <button
                    onClick={shareLocation}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold sm:px-5"
                  >
                    <Share2 className="h-4 w-4" /> Share Location
                  </button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150} variant="slide-right">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
                <h3 className="font-display text-lg font-bold text-foreground">Share this site</h3>
                <p className="mt-1 text-sm text-muted-foreground">Send to a friend or print the QR code.</p>
                <div className="mt-5 flex flex-wrap items-center gap-6">
                  {qr && (
                    <img src={qr} alt="QR code" className="h-28 w-28 rounded-xl border border-border sm:h-32 sm:w-32" />
                  )}
                  <button
                    onClick={shareSite}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-gold)] px-4 py-2.5 text-sm font-semibold text-[var(--orange)] sm:px-5"
                  >
                    <Share2 className="h-4 w-4" /> Share on WhatsApp
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={100} variant="slide-left">
            <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
              <iframe
                src={SITE.map.embed}
                title="Office Map"
                className="h-[min(500px,60vh)] w-full min-h-[280px]"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
