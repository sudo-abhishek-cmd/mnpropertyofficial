import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { FadeIn } from "@/components/site/animate";
import { Lightbox } from "@/components/site/lightbox";
import { DRIVE_FETCH_ERROR_MSG } from "@/utils/constants";

interface GalleryProps {
  images: string[];
  loading?: boolean;
  showFallbackNotice?: boolean;
  altPrefix?: string;
}

export function Gallery({ images, loading, showFallbackNotice, altPrefix = "Property" }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <FadeIn key={src} delay={i * 80} variant="scale-in">
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-luxury)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            >
              <img
                src={src}
                alt={`${altPrefix} sample ${i + 1}`}
                loading="lazy"
                className="h-full w-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                <span className="flex items-center gap-1.5 rounded-full bg-[var(--coral)] px-3 py-1.5 text-xs font-semibold text-[var(--navy-deep)] opacity-0 shadow transition-opacity group-hover:opacity-100">
                  <ImageIcon className="h-3.5 w-3.5" /> View
                </span>
              </div>
            </button>
          </FadeIn>
        ))}
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
