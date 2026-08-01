import shoppingImage from "../assets/hero/slide-1-v2.webp";
import womenImage from "../assets/hero/slide-2-v2.webp";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  buttonLabel: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "new-arrivals",
    eyebrow: "New arrivals",
    title: "Designed for everyday comfort",
    description: "The latest designs for everyday style.",
    image: shoppingImage,
    href: "/collections/new-arrivals",
    buttonLabel: "Explore collection"
  },
  {
    id: "premium",
    eyebrow: "Premium essentials",
    title: "Quality you can feel",
    description: "High-quality materials, minimalist design, and durability.",
    image: womenImage,
    href: "/collections/premium",
    buttonLabel: "View products"
  }
];