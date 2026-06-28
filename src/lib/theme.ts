/**
 * MN Property — Premium Design System & Brand Guidelines
 *
 * Inspired by luxury brands (Sotheby's, Rolex, Lamborghini).
 * Consists of a strict 6-color palette, gold gradients, luxury shadows,
 * and high-end typography (Cormorant Garamond + Inter + Montserrat).
 */

export const theme = {
  colors: {
    // 1. Main Background: Almost black, used across major sections.
    primaryBackground: "#0A0A0A",

    // 2. Secondary Background: Dark charcoal for cards and boxes.
    secondaryBackground: "#131313",

    // Card Hover/Overlay Background
    cardBackground: "#1A1A1A",

    // 3. Luxury Gold: Accent color for icons, headings, underlines, and highlights.
    gold: "#D4AF37",
    lightGold: "#F6E27A",
    darkGold: "#C99700",

    // 4. Pure White: Reserved for large prominent headings.
    white: "#FFFFFF",

    // 5. Soft White: Body copy and descriptive paragraphs.
    lightText: "#D8D8D8",
    mutedText: "#9A9A9A",

    // 6. Divider Color: Subtle borders, inputs, and boundaries.
    divider: "#2A2A2A",

    // Functional colors
    success: "#3FAE5A",
    error: "#D9534F",
    whatsapp: "#25D366",
  },

  gradients: {
    // Premium multi-stop gold gradient for buttons and overlays
    gold: "linear-gradient(90deg, #D4AF37 0%, #F6E27A 50%, #C99700 100%)",
    // Premium radial background gradient to prevent flat black appearance
    radialBackground: "radial-gradient(circle at top, #1A1A1A 0%, #0A0A0A 100%)",
    // Subtle luxury hero gradient
    heroOverlay: "linear-gradient(180deg, rgba(10, 10, 10, 0.25) 0%, rgba(10, 10, 10, 0.95) 100%)",
  },

  shadows: {
    // Luxury gold glow shadow for hover state transformations
    luxury: "0 20px 40px rgba(212, 175, 55, 0.15)",
  },

  typography: {
    // Elegant, editorial serif for headings
    headings: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    // Clean, readable sans-serif for body descriptions
    body: '"Inter", "Manrope", sans-serif',
    // Bold, structured sans-serif for action elements and buttons
    buttons: '"Montserrat", sans-serif',
  },

  spacing: {
    sectionMobile: "py-12",
    sectionDesktop: "py-24",
  },
} as const;

export type Theme = typeof theme;
