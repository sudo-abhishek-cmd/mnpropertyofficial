import { Building2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type MediaTab = "property" | "office";

interface MediaTabsProps {
  active: MediaTab;
  onChange: (tab: MediaTab) => void;
  className?: string;
}

const TABS: { id: MediaTab; label: string; shortLabel: string; icon: typeof Building2 }[] = [
  { id: "property", label: "Property Listings", shortLabel: "Properties", icon: Building2 },
  { id: "office", label: "Our Office", shortLabel: "Office", icon: MapPin },
];

export function MediaTabs({ active, onChange, className }: MediaTabsProps) {
  return (
    <div
      className={cn(
        "media-tab-bar flex gap-2 overflow-x-auto rounded-2xl p-1.5 sm:inline-flex sm:gap-1",
        className,
      )}
      role="tablist"
      aria-label="Media category"
    >
      {TABS.map(({ id, label, shortLabel, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={cn(
              "media-tab flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 sm:px-6",
              isActive ? "media-tab-active shadow-lg" : "media-tab-inactive",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
