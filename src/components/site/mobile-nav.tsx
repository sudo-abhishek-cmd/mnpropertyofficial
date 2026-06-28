import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Building2, MapPin, Info, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "home", label: "Home", to: "/", icon: Home, hash: null },
  { id: "property", label: "Properties", to: "/", icon: Building2, hash: "gallery" },
  { id: "office", label: "Office", to: "/", icon: MapPin, hash: "office" },
  { id: "about", label: "About", to: "/about", icon: Info, hash: null },
  { id: "contact", label: "Contact", to: "/contact", icon: Phone, hash: null },
] as const;

function scrollToSection(hash: string) {
  if (hash === "gallery" || hash === "office") {
    window.history.replaceState(null, "", `/#${hash}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    document.getElementById("media-showcase")?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  window.location.href = `/#${hash}`;
}

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash.replace("#", "") });

  const isActive = (item: (typeof ITEMS)[number]) => {
    if (item.hash) {
      return pathname === "/" && hash === item.hash;
    }
    if (item.to === "/") return pathname === "/" && !hash;
    return pathname === item.to;
  };

  return (
    <nav
      className="mobile-nav-bar fixed inset-x-0 bottom-0 z-50 border-t md:hidden will-change-transform"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom,0px)]">
        {ITEMS.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          if (item.hash) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (pathname !== "/") {
                    window.location.href = `/#${item.hash}`;
                  } else {
                    scrollToSection(item.hash);
                    window.history.replaceState(null, "", `/#${item.hash}`);
                  }
                }}
                className={cn(
                  "mobile-nav-item flex flex-1 flex-col items-center gap-0.5 py-2.5",
                  active && "mobile-nav-item-active",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-semibold leading-none">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.to}
              className={cn(
                "mobile-nav-item flex flex-1 flex-col items-center gap-0.5 py-2.5",
                active && "mobile-nav-item-active",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-semibold leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
