import { Play } from "lucide-react";
import { FadeIn } from "@/components/site/animate";

interface VideoSectionProps {
  videoUrl: string | null;
  loading?: boolean;
}

export function VideoSection({ videoUrl, loading }: VideoSectionProps) {
  if (loading) {
    return <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted" />;
  }

  if (!videoUrl) {
    return (
      <FadeIn>
        <div className="flex aspect-video w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted px-4 text-center">
          <Play className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">Video walkthrough coming soon.</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn variant="scale-in">
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-[var(--navy-deep)] shadow-lg ring-1 ring-white/10">
        <div className="relative aspect-video w-full max-w-full">
          <iframe
            src={videoUrl}
            title="Property walkthrough video"
            className="h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </FadeIn>
  );
}
