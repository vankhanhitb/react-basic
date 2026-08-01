
import { 
  BasicTee61,
  BasicTee62,
  BasicTee63,
  BasicTee64
} from "../assets/products/BasicTee";

import {
  FleeceHoodieKids192,
  FleeceHoodieKids193,
  FleeceHoodieKids194
} from "../assets/products/FleeceHoodieKids";

type Color = {
  name: string,
  color: string,
}

type Size = {
  name: string,
  value: string,
}

type Image = {
  src: string
}

export type productType = {
  productId: number,
  name: string,
  price: {
    salePrice: string,
    onSalePrice?: string,
  },
  description?: string,
  options?: {
    colors?: Color[],
    sizes?: Size[]
  },
  images?: {
    featuredImage?: string,
    gallery?: Image[]
  }
}

export const productDatas: productType[] = [
  {
    productId: 1,
    name: "Basic Tee",
    price: {
      salePrice: "32",
      onSalePrice: "22",
    },
    description: "This essential tee showcases a refined ribbed construction that provides both tactile appeal and reliable support.",
    options: {
      colors: [
        {name: "blue", color: "#9fc6ed"},
        {name: "gray", color: "#C6C8C9"},
        {name: "white", color: "#2A2E36"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: BasicTee61,
      gallery: [
        {src: BasicTee62},
        {src: BasicTee63},
        {src: BasicTee64},
      ]
    }
  },
  {
    productId: 2,
    name: "Fleece Jogger Pants",
    price: {
      salePrice: "23"
    },
    description: "Engineered for comfort and versatility, these fleece jogger pants deliver warmth without bulk.",
    options: {
      colors: [
        {name: "Mud", color: "#8A846F"},
        {name: "Cream", color: "#F0E7D6"},
        {name: "Fade Rose", color: "#B6656A"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: FleeceHoodieKids192,
      gallery: [
        {src: FleeceHoodieKids193},
        {src: FleeceHoodieKids194},
      ]
    }
  },
]