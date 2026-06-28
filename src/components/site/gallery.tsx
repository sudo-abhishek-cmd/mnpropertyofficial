import { useState } from "react";
import { ImageIcon, MapPin } from "lucide-react";
import { FadeIn } from "@/components/site/animate";
import { Lightbox } from "@/components/site/lightbox";
import { DRIVE_FETCH_ERROR_MSG } from "@/utils/constants";

interface GalleryProps {
  images: string[];
  loading?: boolean;
  showFallbackNotice?: boolean;
  altPrefix?: string;
}

const PROPERTY_DETAILS = [
  { name: "Super Luxury Builder Floor", location: "Karol Bagh, New Delhi", price: "₹4.5 Cr" },
  { name: "Ultra Modern Apartment", location: "Rajinder Nagar, New Delhi", price: "₹3.8 Cr" },
  { name: "Premium Commercial Space", location: "Connaught Place, New Delhi", price: "₹12.5 Cr" },
  { name: "Elegant Penthouse", location: "Patel Nagar, New Delhi", price: "₹6.2 Cr" },
  { name: "Luxury Family Bungalow", location: "Pusa Road, New Delhi", price: "₹18.0 Cr" },
  { name: "Modern Office Suite", location: "Karol Bagh, New Delhi", price: "₹2.5 Cr" },
];

const OFFICE_DETAILS = [
  { name: "MN Property Headquarters", description: "Karol Bagh, New Delhi" },
  { name: "Executive Conference Room", description: "Karol Bagh, New Delhi" },
  { name: "Client Lounge & Discussion Area", description: "Karol Bagh, New Delhi" },
  { name: "Founder's Cabin", description: "Karol Bagh, New Delhi" },
  { name: "Team Workstations", description: "Karol Bagh, New Delhi" },
  { name: "Reception Lobby", description: "Karol Bagh, New Delhi" },
];

export function Gallery({
  images,
  loading,
  showFallbackNotice,
  altPrefix = "Property",
}: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isProperty = altPrefix === "Property";

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#131313]"
          >
            <div className="aspect-[4/3] w-full animate-pulse bg-[#1A1A1A]" />
            <div className="border-t border-[#2A2A2A] p-5 space-y-3">
              <div className="h-4 w-2/3 animate-pulse rounded bg-[#1A1A1A]" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-[#1A1A1A]" />
              <div className="flex justify-between border-t border-[#2A2A2A]/50 pt-3">
                <div className="h-3 w-1/4 animate-pulse rounded bg-[#1A1A1A]" />
                <div className="h-4 w-1/5 animate-pulse rounded bg-[#1A1A1A]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {showFallbackNotice && (
        <FadeIn>
          <p className="mb-6 rounded-xl border border-[var(--coral)]/30 bg-[var(--coral)]/10 px-4 py-3 text-center text-sm text-foreground">
            {DRIVE_FETCH_ERROR_MSG}
          </p>
        </FadeIn>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => {
          const detailIndex = i % PROPERTY_DETAILS.length;
          const propDetail = PROPERTY_DETAILS[detailIndex];
          const offDetail = OFFICE_DETAILS[detailIndex];

          return (
            <FadeIn key={src} delay={i * 80} variant="scale-in">
              <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#131313] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-[4/3] w-full overflow-hidden focus-visible:outline-none cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`${altPrefix} sample ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35">
                    <span className="flex items-center gap-1.5 rounded-full bg-[var(--gold)] px-4 py-2 text-xs font-bold text-black opacity-0 shadow-lg transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <ImageIcon className="h-3.5 w-3.5" /> View Fullscreen
                    </span>
                  </div>
                </button>

                <div className="border-t border-[#2A2A2A] p-5 bg-[#131313] flex-1 flex flex-col justify-between">
                  {isProperty ? (
                    <div>
                      <h3 className="font-display text-lg font-bold text-white tracking-wide leading-snug">
                        {propDetail.name}
                      </h3>
                      <p className="text-xs text-[#9A9A9A] mt-2 flex items-center gap-1.5 font-sans">
                        <MapPin
                          className="h-3.5 w-3.5 text-[var(--gold)] shrink-0"
                          strokeWidth={2}
                        />{" "}
                        {propDetail.location}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-[#2A2A2A]/50 pt-3">
                        <span className="text-xs font-semibold text-[#9A9A9A]">Investment</span>
                        <span className="font-display text-base font-bold text-[var(--gold)]">
                          {propDetail.price}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-display text-lg font-bold text-white tracking-wide leading-snug">
                        {offDetail.name}
                      </h3>
                      <p className="text-xs text-[#9A9A9A] mt-2 flex items-center gap-1.5 font-sans">
                        <MapPin
                          className="h-3.5 w-3.5 text-[var(--gold)] shrink-0"
                          strokeWidth={2}
                        />{" "}
                        {offDetail.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}
    </>
  );
}
