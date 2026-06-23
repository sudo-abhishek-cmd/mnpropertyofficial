import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, Users, Home } from "lucide-react";
import { FadeIn, PageHero } from "@/components/site/animate";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MN Property" },
      {
        name: "description",
        content: "10+ years of trust helping families and investors in Central Delhi.",
      },
      { property: "og:title", content: "About — MN Property" },
      { property: "og:description", content: "Meet the team behind MN Property." },
    ],
  }),
  component: About,
});

function About() {
  const stats = [
    { icon: Users, n: "500+", l: "Happy Families" },
    { icon: Home, n: "1200+", l: "Deals Closed" },
    { icon: Award, n: "10+", l: "Years of Trust" },
    { icon: ShieldCheck, n: "100%", l: "Verified Listings" },
  ];

  return (
    <div className="overflow-x-hidden">
      <PageHero
        eyebrow="About Us"
        title="A Decade of Trust in Central Delhi Real Estate"
        subtitle="MN Property is a family-run consultancy that has helped over 500 families and investors buy, sell, rent and invest in Central Delhi since 2014."
        dark
      />

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-6">
          {stats.map((s, i) => (
            <FadeIn key={s.l} delay={i * 100} variant="scale-in">
              <div className="group rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[var(--gold)]/30 hover:shadow-lg">
                <s.icon className="mx-auto h-8 w-8 text-[var(--gold)] transition-transform duration-300 group-hover:scale-110" />
                <div className="mt-3 font-display text-3xl font-bold text-[var(--coral)]">{s.n}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200} className="mx-auto mt-20 max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground">Our Promise</h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              Every property we list is personally verified. Every client gets the same care —
              whether you&apos;re a first-time renter or a seasoned investor.
            </p>
            <p>
              We don&apos;t believe in hidden fees, inflated prices, or pressure tactics. We believe
              in long relationships, honest advice, and being a phone call away whenever you need
              us.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
