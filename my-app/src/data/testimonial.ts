import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4
} from "../assets/testimonial";

import {
  BannerV1,
  BannerV2,
  BannerV3,
  BannerV4
} from "../assets/banners";

export type testimonialType = {
  name: string,
  image?: string,
  comment: string,
  banner?: string,
}

export const dataTestimonial: testimonialType[] = [
  {
    name: "Jonathan",
    image: Avatar1,
    banner: BannerV1,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis blanditiis ipsam quaerat et asperiores aliquid doloribus debitis velit magnam voluptate autem iure minima laboriosam incidunt molestiae, quibusdam accusantium error!"
  },
  {
    name: "Henry Lu",
    image: Avatar2,
    banner: BannerV2,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis blanditiis ipsam quaerat et asperiores aliquid doloribus debitis velit magnam voluptate autem iure minima laboriosam incidunt molestiae, quibusdam accusantium error!"
  },
  {
    name: "Michale.H",
    image: Avatar3,
    banner: BannerV3,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis blanditiis ipsam quaerat et asperiores aliquid doloribus debitis velit magnam voluptate autem iure minima laboriosam incidunt molestiae, quibusdam accusantium error!"
  },
  {
    name: "Luis Herbs",
    image: Avatar4,
    banner: BannerV4,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis blanditiis ipsam quaerat et asperiores aliquid doloribus debitis velit magnam voluptate autem iure minima laboriosam incidunt molestiae, quibusdam accusantium error!"
  }
]