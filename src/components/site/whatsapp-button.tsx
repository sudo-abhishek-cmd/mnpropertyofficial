import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--whatsapp)] text-white shadow-[var(--shadow-luxury)] transition-all duration-300 hover:scale-110 hover:shadow-2xl sm:bottom-6 sm:right-6 animate-float whatsapp-float-mobile"
    >
      <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-110" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--whatsapp)] opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--whatsapp)]" />
      </span>
    </a>
  );
}
