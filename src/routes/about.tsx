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

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn key={s.l} delay={i * 100} variant="scale-in">
              <div className="group rounded-2xl border border-[#2B2B2B] bg-[#131313] p-6 text-center shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]">
                <s.icon className="mx-auto h-8 w-8 text-[var(--gold)] transition-transform duration-300 group-hover:scale-110" />
                <div className="mt-4 font-display text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                  {s.n}
                </div>
                <div className="mt-1 text-sm text-[#9A9A9A] font-medium tracking-wide uppercase text-xs">
                  {s.l}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn
          delay={200}
          className="mx-auto mt-20 max-w-3xl border border-[#2B2B2B] bg-[#131313] p-8 md:p-12 rounded-3xl shadow-xl"
        >
          <h2 className="font-display text-3xl font-bold text-white tracking-wide">Our Promise</h2>
          <div className="mt-6 space-y-6 text-base md:text-lg leading-relaxed text-[#D8D8D8]">
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
