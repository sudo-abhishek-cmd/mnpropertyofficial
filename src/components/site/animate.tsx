import type { ReactNode, CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type AnimationVariant = "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";

const VARIANT_CLASS: Record<AnimationVariant, string> = {
  "fade-up": "animate-fade-up",
  "fade-in": "animate-fade-in",
  "scale-in": "animate-scale-in",
  "slide-left": "animate-slide-left",
  "slide-right": "animate-slide-right",
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
  as?: "div" | "section" | "article" | "li" | "span";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  as: Tag = "div",
}: FadeInProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = { animationDelay: `${delay}ms` } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      className={cn("opacity-0", inView && VARIANT_CLASS[variant], className)}
      style={inView ? style : undefined}
    >
      {children}
    </Tag>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export function PageHero({ eyebrow, title, subtitle, dark }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-28",
        dark
          ? "bg-gradient-to-br from-[var(--navy-deep)] via-[var(--navy)] to-[var(--navy-deep)] text-white"
          : "",
      )}
    >
      {dark && (
        <>
          <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[var(--gold)]/10 blur-3xl animate-float" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl animate-float-delayed" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <FadeIn variant="fade-in">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            {eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1
            className={cn(
              "mt-3 font-display text-4xl font-bold text-balance md:text-5xl lg:text-6xl",
              dark ? "text-white" : "text-foreground",
            )}
          >
            {title}
          </h1>
        </FadeIn>
        {subtitle && (
          <FadeIn delay={200}>
            <p
              className={cn(
                "mx-auto mt-4 max-w-2xl text-lg",
                dark ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {subtitle}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}

export function StaggerGrid({ children, className, staggerMs = 80 }: StaggerGridProps) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {items.map((child, i) =>
        child ? (
          <FadeIn key={i} delay={i * staggerMs} variant="scale-in">
            {child}
          </FadeIn>
        ) : null,
      )}
    </div>
  );
}
