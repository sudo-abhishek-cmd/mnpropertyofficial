import { Play } from "lucide-react";
import { FadeIn } from "@/components/site/animate";

interface VideoSectionProps {
  videoUrl: string | null;
  loading?: boolean;
}

const frameClass =
  "relative h-[min(52vw,240px)] w-full overflow-hidden rounded-2xl sm:h-[300px] md:h-[360px] lg:h-[400px]";

export function VideoSection({ videoUrl, loading }: VideoSectionProps) {
  if (loading) {
    return <div className={`${frameClass} animate-pulse bg-muted`} />;
  }

  if (!videoUrl) {
    return (
      <FadeIn>
        <div className={`${frameClass} flex flex-col items-center justify-center border border-dashed border-border bg-muted px-4 text-center`}>
          <Play className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">Video walkthrough coming soon.</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn variant="scale-in">
      <div className={`${frameClass} border border-border/80 bg-[var(--navy-deep)] shadow-lg ring-1 ring-white/10`}>
        <iframe
          src={videoUrl}
          title="Property walkthrough video"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </FadeIn>
  );
}
