import { imagePartage } from "@/components/ImagePartage";

// Image de partage des pages françaises (servie à /opengraph-image), voir src/components/ImagePartage.tsx.
export const alt = "Technologie — Ingénierie des équipements et systèmes techniques — XP-NOVA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return imagePartage("fr");
}
