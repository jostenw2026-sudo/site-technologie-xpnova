import { imagePartage } from "@/components/ImagePartage";

// Image de partage des pages anglaises (servie à /en/opengraph-image), voir src/components/ImagePartage.tsx.
export const alt = "Technology — Equipment & Technical Systems Engineering — XP-NOVA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return imagePartage("en");
}
